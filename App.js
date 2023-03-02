import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import users from './assets/data/users';
import ProfileCard from './src/components/ProfileCard/ProfileCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedStack from './src/components/AnimatedStack/AnimatedStack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen/MatchesScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');

  const color = '#b5b5b5';
  const activeColor = '#F47C7C';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <GestureHandlerRootView style={styles.root}>
        <View style={styles.topNav}>
          <Pressable onPress={() => setActiveScreen('HOME')}>
            <Fontisto
              name="tinder"
              size={30}
              color={activeScreen === 'HOME' ? activeColor : color}
            />
          </Pressable>
          <Pressable onPress={() => setActiveScreen('MATCH')}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={30}
              color={activeScreen === 'MATCH' ? activeColor : color}
            />
          </Pressable>
          <Pressable onPress={() => setActiveScreen('CHAT')}>
            <Ionicons
              name="ios-chatbubbles"
              size={30}
              color={activeScreen === 'CHAT' ? activeColor : color}
            />
          </Pressable>
          <Pressable onPress={() => setActiveScreen('PROFILE')}>
            <FontAwesome
              name="user"
              size={30}
              color={activeScreen === 'PROFILE' ? activeColor : color}
            />
          </Pressable>
        </View>
        {activeScreen === 'HOME' && <HomeScreen />}
        {activeScreen === 'MATCH' && <MatchesScreen />}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: '#ff0000',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
});

export default App;
