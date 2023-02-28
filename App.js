import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import users from './assets/data/users';
import ProfileCard from './src/components/ProfileCard/ProfileCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedStack from './src/components/AnimatedStack/AnimatedStack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen/MatchesScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <MatchesScreen />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
