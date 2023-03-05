import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import users from '../../../assets/data/users';

const MatchesScreen = () => {
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
