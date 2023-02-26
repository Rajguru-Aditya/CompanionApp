import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import users from './assets/data/users';
import ProfileCard from './src/components/ProfileCard/ProfileCard';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const App = () => {
  const sharedValue = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => ({
    opacity: sharedValue.value,
  }));

  return (
    <View style={styles.pageContainer}>
      <Animated.View style={[styles.animatedCard, cardStyle]}>
        {/* {users?.map((user, index) => ( */}
        <ProfileCard
          img={'user.image'}
          name={'user.name'}
          bio={'user.bio'}
          id={'user.id'}
        />
        {/* ))} */}
      </Animated.View>
      <Pressable onPress={() => (sharedValue.value = Math.random())}>
        <Text>Change Value</Text>
      </Pressable>
    </View>
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
  },
});

export default App;
