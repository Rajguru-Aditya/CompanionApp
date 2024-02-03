import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, Image, Pressable} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat';
import {DataStore} from '@aws-amplify/datastore';
import {Match, User} from '../../models';
import {Auth} from 'aws-amplify';

const ChatScreen = ({isUserLoading}) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [me, setMe] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchesIDs, setMatchesIDs] = useState(null);

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
      console.warn('Chat screen matches', result);
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

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <View style={styles.container}>
        <Pressable style={styles.chatTabContainer}>
          <Image
            style={styles.chatTabUserIcon}
            source={{
              uri: 'https://images7.alphacoders.com/393/393842.jpg',
            }}
          />
          <Text style={styles.chatTabUsername}>Saurabh Sapkal</Text>
        </Pressable>
        <Pressable style={styles.chatTabContainer}>
          <Image
            style={styles.chatTabUserIcon}
            source={{
              uri: 'https://images4.alphacoders.com/538/53836.jpg',
            }}
          />
          <Text style={styles.chatTabUsername}>Ritvik Gavand</Text>
        </Pressable>
        <Pressable style={styles.chatTabContainer}>
          <Image
            style={styles.chatTabUserIcon}
            source={{
              uri: 'https://www.asiamediajournal.com/wp-content/uploads/2022/10/Naruto-Uzumaki-PFP.jpg',
            }}
          />
          <Text style={styles.chatTabUsername}>Faiz Shaikh</Text>
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChatScreen;
