import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Pressable, View, Text, Image} from 'react-native';
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
import Modal from 'react-native-modal';

const HomeScreen = ({isUserLoading}) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [me, setMe] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchesIDs, setMatchesIDs] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  const toggleModal = () => {
    console.log('toggleModal');
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (isUserLoading) {
      return;
    }
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, u =>
        u.sub.eq(user.attributes.sub),
      );
      if (!dbUsers || dbUsers.length < 0) {
        return;
      }
      setMe(dbUsers[0]);
    };
    getCurrentUser();
  }, [isUserLoading]);

  useEffect(() => {
    if (!me) {
      return;
    }

    const fetchMatches = async () => {
      console.log('me: ', me.id);
      const result = await DataStore.query(
        Match,
        m => m.isMatch.eq(true),
        m => m.or(m1 => [m1.User1ID.eq(me.id), m1.User2ID.eq(me.id)]),
      );
      setMatchesIDs(
        result.map(match =>
          match.User1ID === me.id ? match.User2ID : match.User1ID,
        ),
      );
      console.log(
        'matchesIDs: ',
        result.map(match =>
          match.User1ID === me.id ? match.User2ID : match.User1ID,
        ),
      );
      console.warn('home screen matches', result);
      setMatches(result);
    };

    fetchMatches();
  }, [me]);

  useEffect(() => {
    const fetchUsers = async () => {
      const u = await DataStore.query(User, u1 =>
        u1.and(u2 => [
          u2.gender.eq(me?.lookingFor),
          u2.activity.eq(me?.preferredActivity),
        ]),
      );
      const filteredUsers = u.filter(
        user => user.id !== me?.id && !matchesIDs?.includes(user.id),
      );
      setUsers(filteredUsers);
      // console.warn(u);
    };
    fetchUsers();
  }, [isUserLoading, matchesIDs, me]);

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

    const myMatches = await DataStore.query(Match, m =>
      m.and(m1 => [m1.User1ID.eq(me.id), m1.User2ID.eq(currentUser.id)]),
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
      setMatchedUser(currentUser);
      toggleModal();
      const match = theirMatches[0];
      await DataStore.save(
        Match.copyOf(match, updated => (updated.isMatch = true)),
      );
      return;
    }

    console.warn('sending a match request!');
    const newMatch = new Match({
      User1ID: me.id,
      User2ID: currentUser.id,
      isMatch: false,
    });
    console.log(newMatch);
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
        me={me}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.yay}>Yay!</Text>
          <Image
            source={{
              uri: 'https://www.pitpat.com/wp-content/uploads/2018/07/Celebrating-500px.png',
            }}
            style={styles.userImage}
          />
          <Text style={styles.yay}>Its a Match</Text>
          <Pressable style={styles.ok} onPress={() => toggleModal()}>
            <Text style={styles.okText}>Ok</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.icons}>
        <Pressable style={styles.icon}>
          <FontAwesome name="undo" size={30} color="#FBD88B" />
        </Pressable>
        <View style={styles.icon}>
          <Entypo name="cross" size={30} color="#F76C6B" />
        </View>
        <View style={styles.icon}>
          <FontAwesome name="star" size={30} color="#3AB4CC" />
        </View>
        <View
          style={styles.icon}
          onPress={() => {
            // Swipe right
          }}>
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
