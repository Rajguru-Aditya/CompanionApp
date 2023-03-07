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

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!me) {
      return;
    }

    const fetchMatches = async () => {
      // const fetchedMatches = await DataStore.query(User, u =>
      //   u.matches.contains(user.id),
      // );
      // setMatches(fetchedMatches);
      const result = await DataStore.query(
        Match,
        match =>
          match.isMatch.eq(true) ||
          match.user1ID.eq(me.id) ||
          match.user2ID.eq(me.id),
      );
      console.warn(result);
      setMatches(result);
    };
    fetchMatches();
  }, [me]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.heading}>New Matches</Text>
        <View style={styles.users}>
          {matches.map(user => (
            <View style={styles.user}>
              <Image source={{uri: user.image}} style={styles.userImage} />
              <Text key={user.id}>{user.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchesScreen;
