import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  Pressable,
} from 'react-native';

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
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

import Like from '../../../assets/images/LIKE.png';
import Nope from '../../../assets/images/nope.png';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const AnimatedStack = props => {
  const {data, me, renderItem, onSwipeRight, onSwipeLeft, setCurrentUser} =
    props;
  // const userData = JSON.parse(JSON.stringify(data));
  const filteredData = data.filter(item => item?.id !== me?.id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentProfile = filteredData[currentIndex];
  const nextProfile = filteredData[nextIndex];

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
          [1, 0.5, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: event => {
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
      const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
      onSwipe && runOnJS(onSwipe)();
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  useEffect(() => {
    setCurrentUser(currentProfile);
  }, [currentProfile, setCurrentUser]);

  return (
    <GestureHandlerRootView style={styles.root}>
      {/* <View style={styles.container}> */}
      {nextProfile && (
        <Animated.View style={[styles.nextCardContainer, nextCardStyle]}>
          {renderItem({item: nextProfile})}
        </Animated.View>
      )}
      {currentProfile ? (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image
              source={Like}
              style={[styles.like, {left: 10}, likeStyle]}
            />
            <Animated.Image
              source={Nope}
              style={[styles.like, {right: 10}, nopeStyle]}
            />
            {renderItem({item: currentProfile})}
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <View>
          <Text style={{color: '#000'}}>Oops, No more profiles</Text>
        </View>
      )}
      {/* </View> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'red',
    width: '100%',
    backgroundColor: '#ededed',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedCard: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 10,
    zIndex: 1,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    paddingBottom: 30,
    marginTop: 50,
  },
  icon: {
    padding: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedStack;
