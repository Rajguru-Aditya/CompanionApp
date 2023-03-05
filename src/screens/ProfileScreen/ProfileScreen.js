import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';
import users from '../../../assets/data/users';
import {Auth} from 'aws-amplify';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Pressable onPress={() => Auth.signOut()}>
          <Text style={styles.heading}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
