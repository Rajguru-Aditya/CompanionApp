import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, StyleSheet} from 'react-native';
// import users from '../../../assets/data/users';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedStack from '../../components/AnimatedStack/AnimatedStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {DataStore} from '@aws-amplify/datastore';
import {Match, User} from '../../models';
import {Auth} from 'aws-amplify';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [me, setMe] = useState(null);
  const [isMyMatch, setIsMyMatch] = useState(false);
  const [isTheirMatch, setisTheirMatch] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, u =>
        u.sub.eq(user.attributes.sub),
      );
      if (dbUsers.length < 0) {
        return;
      }
      setMe(dbUsers[0]);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const u = await DataStore.query(User);
      setUsers(u);
      // console.warn(u);
    };
    fetchUsers();
  }, []);

  const onSwipeLeft = () => {
    if (!currentUser || !me) {
      return;
    }
    console.warn('swipe left', currentUser.name);
  };

  const onSwipeRight = async () => {
    if (!currentUser || !me) {
      return;
    }
    console.warn('swipe right', currentUser.name);

    const myMatches = await DataStore.query(
      Match,
      m => m.User1ID.eq(me.id) && m.User2ID.eq(currentUser.id),
    );
    console.warn(myMatches.length);
    if (myMatches.length > 0) {
      console.warn('You already have a match with this user');
      return;
    }
    console.warn(myMatches.length);
    // loop through all the matches and check if there is a match
    // myMatches.forEach(async match => {
    //   if (match.User1ID === me.id && match.User2ID === currentUser.id) {
    //     console.warn('You already have a match with this user');
    //     setIsMyMatch(true);
    //     return;
    //   }
    // });

    const theirMatches = await DataStore.query(
      Match,
      m => m.User1ID.eq(currentUser.id) && m.User2ID.eq(me.id),
    );
    console.warn(theirMatches.length);

    if (theirMatches.length > 0) {
      console.warn('Yay! You have a match');
      const match = theirMatches[0];
      await DataStore.save(
        Match.copyOf(match, updated => (updated.isMatch = true)),
      );
      return;
    }

    console.warn('sending a match request!');
    const newMatch = new Match({
      User1ID: me?.id,
      User2ID: currentUser?.id,
      isMatch: false,
    });
    DataStore.save(newMatch);
  };

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <ProfileCard user={item} />}
        setCurrentUser={setCurrentUser}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      <View style={styles.icons}>
        <View style={styles.icon}>
          <FontAwesome name="undo" size={30} color="#FBD88B" />
        </View>
        <View style={styles.icon}>
          <Entypo name="cross" size={30} color="#F76C6B" />
        </View>
        <View style={styles.icon}>
          <FontAwesome name="star" size={30} color="#3AB4CC" />
        </View>
        <View style={styles.icon}>
          <FontAwesome name="heart" size={30} color="#4FCC94" />
        </View>
        <View style={styles.icon}>
          <Ionicons name="flash" size={30} color="#A65CD2" />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
