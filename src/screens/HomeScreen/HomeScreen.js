import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, StyleSheet} from 'react-native';
import users from '../../../assets/data/users';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedStack from '../../components/AnimatedStack/AnimatedStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };
  const onSwipeRight = user => {
    console.warn('swipe right', user.name);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.pageContainer}>
        <AnimatedStack
          data={users}
          renderItem={({item}) => <ProfileCard user={item} />}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
        <View style={styles.icons}>
          <View style={styles.icon}>
            <FontAwesome name="undo" size={30} color="#FBD88B" />
          </View>
          <View style={styles.icon}>
            <Entypo name="cross" size={30} color="#F76C6B" />
          </View>
          <View style={styles.icon}>
            <FontAwesome name="star" size={30} color="#3AB4CC" />
          </View>
          <View style={styles.icon}>
            <FontAwesome name="heart" size={30} color="#4FCC94" />
          </View>
          <View style={styles.icon}>
            <Ionicons name="flash" size={30} color="#A65CD2" />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
