import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import users from '../../../assets/data/users';
import {Match, User} from '../../models';
import {DataStore} from '@aws-amplify/datastore';
import {Auth} from 'aws-amplify';

const MatchesScreen = () => {
  const [matches, setMatches] = useState([]);
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

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

  useEffect(() => {
    getCurrentUser();
    const fetchUsers = async () => {
      const u = await DataStore.query(User);
      console.warn(u);
      setUsers(u);
    };
    fetchUsers();
  }, []);

  const fetchMatches = async () => {
    console.log('me: ', me.id);
    const result = await DataStore.query(
      Match,
      m => m.isMatch.eq(true),
      m => m.or(m1 => [m1.User1ID.eq(me.id), m1.User2ID.eq(me.id)]),
    );

    console.warn(result);
    setMatches(result);
  };

  useEffect(() => {
    if (!me) {
      return;
    }

    fetchMatches();
  }, [me]);

  useEffect(() => {
    // loop through matches array and find the matched users from users array
    const matchedU = matches.map(match => {
      if (match.User1ID === me.id) {
        return users.find(user => user.id === match.User2ID);
      } else {
        return users.find(user => user.id === match.User1ID);
      }
    });
    setMatchedUsers(matchedU);
    console.warn('matched users: ', matchedU);
  }, [matches, me, users]);

  useEffect(() => {
    const subscription = DataStore.observe(Match).subscribe(msg => {
      console.log('------------------------');
      console.log(msg.model, msg.opType, msg.element);
      fetchMatches();
    });
    return () => subscription.unsubscribe();
  }, [matchedUsers]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.heading}>New Matches</Text>
        <View style={styles.users}>
          {matchedUsers.map(user => (
            <View style={styles.user} key={user?.id}>
              <View style={styles.imageContainer}>
                <Image source={{uri: user?.image}} style={styles.userImage} />
              </View>
              <Text key={user?.id} style={styles.name}>
                {user?.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchesScreen;
