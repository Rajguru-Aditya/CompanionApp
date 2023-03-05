import {Text, View, Image, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const ProfileCard = ({user}) => {
  return (
    <View style={styles.card} key={user?.id}>
      <ImageBackground
        source={{
          uri: user?.image || '',
        }}
        style={styles.image}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
          style={styles.cardInner}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.bio}>{user?.bio}</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ProfileCard;
