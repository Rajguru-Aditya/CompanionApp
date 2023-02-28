import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import users from '../../../assets/data/users';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedStack from '../../components/AnimatedStack/AnimatedStack';

const HomeScreen = () => {
  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };
  const onSwipeRight = user => {
    console.warn('swipe right', user.name);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.pageContainer}>
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
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    // backgroundColor: 'white',
  },
});

export default HomeScreen;
