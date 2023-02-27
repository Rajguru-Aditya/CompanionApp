import {Text, View, Image, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import styles from './styles';

const ProfileCard = ({user}) => {
  return (
    <View style={styles.card} key={user?.id}>
      <ImageBackground
        source={{
          uri: user?.image || '',
        }}
        style={styles.image}>
        <View style={styles.cardInner}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.bio}>{user?.bio}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileCard;
