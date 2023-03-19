import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <View style={styles.container}>
        <GiftedChat />
      </View>
    </GestureHandlerRootView>
  );
};

export default Chat;
