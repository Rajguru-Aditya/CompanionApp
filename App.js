import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import users from './assets/data/users';
import ProfileCard from './src/components/ProfileCard/ProfileCard';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      {users?.map((user, index) => (
        <ProfileCard
          img={user.image}
          name={user.name}
          bio={user.bio}
          id={user.id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
