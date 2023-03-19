import {Text, View, Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Storage} from 'aws-amplify';

const ProfileCard = ({user}) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!user?.image?.startsWith('https')) {
      Storage.get(user?.image).then(setImageUrl);
    } else {
      setImageUrl(user?.image);
    }
  }, [user]);

  return (
    <View style={styles.card} key={user?.id}>
      <ImageBackground
        source={{
          uri: imageUrl || '',
        }}
        style={styles.image}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
          style={styles.cardInner}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.bio}>{user?.bio}</Text>
          <Text style={styles.bio}>{user?.gender}</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ProfileCard;
