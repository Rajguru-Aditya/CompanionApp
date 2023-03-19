import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Amplify, Hub} from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');
  const [isUserloading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const listener = Hub.listen('datastore', async hubData => {
      const {event, data} = hubData.payload;
      if (event === 'modelSynced' && data?.model?.name === 'User') {
        console.warn(`Model synced: ${data?.model?.name}`);
        setIsUserLoading(false);
      }
    });

    return () => listener();
  }, []);

  const renderPage = () => {
    if (activeScreen === 'HOME') {
      return <HomeScreen isUserLoading={isUserloading} />;
    }
    if (isUserloading) {
      return <ActivityIndicator size="large" color="#F47C7C" />;
    }
    if (activeScreen === 'MATCH') {
      return <MatchesScreen />;
    }
    if (activeScreen === 'PROFILE') {
      return <ProfileScreen />;
    }
    if (activeScreen === 'CHAT') {
      return <ChatScreen />;
    }
  };

  const color = '#b5b5b5';
  const activeColor = '#F47C7C';
  return (
    <SafeAreaView style={styles.safeArea}>
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
        {renderPage()}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
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
    elevation: 1,
    backgroundColor: '#fff',
  },
});

export default withAuthenticator(App);
