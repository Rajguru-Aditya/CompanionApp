import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import users from './assets/data/users';
import ProfileCard from './src/components/ProfileCard/ProfileCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedStack from './src/components/AnimatedStack/AnimatedStack';

const App = () => {
  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };
  const onSwipeRight = user => {
    console.warn('swipe right', user.name);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.root}>
        <AnimatedStack
          data={users}
          renderItem={({item}) => <ProfileCard user={item} />}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'white',
  },
});

export default App;
