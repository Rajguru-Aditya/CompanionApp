import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import users from './assets/data/users';
import ProfileCard from './src/components/ProfileCard/ProfileCard';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = screenWidth * 1.5;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.7, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      console.log('onActive');
    },
    onEnd: event => {
      // if (event.translationX < -100) {
      //   translateX.value = withSpring(-500);
      // } else if (event.translationX > 100) {
      //   translateX.value = withSpring(500);
      // } else {
      //   translateX.value = withSpring(0);
      // }
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => {
          runOnJS(setCurrentIndex)(currentIndex + 1);
        },
      );
      // runOnJS(setCurrentIndex)(currentIndex + 1);
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.pageContainer}>
        <Animated.View style={[styles.nextCardContainer, nextCardStyle]}>
          <ProfileCard user={nextProfile} />
        </Animated.View>
        {currentProfile && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.animatedCard, cardStyle]}>
              {/* {users?.map((user, index) => ( */}
              <ProfileCard user={currentProfile} />
              {/* ))} */}
            </Animated.View>
          </PanGestureHandler>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'white',
  },
  animatedCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  nextCardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
