import {Text, View, Image, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import styles from './styles';

const ProfileCard = props => {
  return (
    <View style={styles.card} key={props.id}>
      <ImageBackground
        source={{
          uri: props.img,
        }}
        style={styles.image}>
        <View style={styles.cardInner}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.bio}>{props.bio}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileCard;
