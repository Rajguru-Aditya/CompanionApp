import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import users from '../../../assets/data/users';
import {Match} from '../../models';
import {DataStore} from '@aws-amplify/datastore';

const MatchesScreen = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      // const fetchedMatches = await DataStore.query(User, u =>
      //   u.matches.contains(user.id),
      // );
      // setMatches(fetchedMatches);
      const result = await DataStore.query(Match);
      console.warn(result);
    };
    fetchMatches();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.heading}>New Matches</Text>
        <View style={styles.users}>
          {users.map(user => (
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
