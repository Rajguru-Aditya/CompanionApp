import '@azure/core-asynciterator-polyfill';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import users from '../../../assets/data/users';
import {Auth} from 'aws-amplify';
import {DataStore} from '@aws-amplify/datastore';
import {User} from '../../models';
import {Picker} from '@react-native-picker/picker';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  useEffect(() => {
    const getCurrentUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      // check attribute sub
      const dbUsers = await DataStore.query(User, u =>
        u.sub.eq(authUser.attributes.sub),
      );

      if (!dbUsers || dbUsers.length === 0) {
        console.warn('this  is a new user');
        return;
      }

      const dbUser = dbUsers[0];
      setUser(dbUser);

      setName(dbUser.name);
      setBio(dbUser.bio);
      setGender(dbUser.gender);
      setLookingFor(dbUser.lookingFor);
    };
    getCurrentUser();
  }, []);

  const handleChangeGender = val => {
    if (val !== 0) {
      setGender(val);
    }
  };

  const handleChangeLookingFor = val => {
    if (val !== 0) {
      setLookingFor(val);
    }
  };

  const isValid = () => {
    return name && bio && gender && lookingFor;
  };

  const save = async () => {
    if (!isValid()) {
      console.warn('Please fill all the fields', name, bio, gender, lookingFor);
      return;
    }

    if (user) {
      const updatedUser = User.copyOf(user, updated => {
        updated.name = name;
        updated.bio = bio;
        updated.gender = gender;
        updated.lookingFor = lookingFor;
      });

      await DataStore.save(updatedUser);
    } else {
      const authUser = await Auth.currentAuthenticatedUser();
      const newUser = new User({
        sub: authUser.attributes.sub,
        name,
        bio,
        gender,
        lookingFor,
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim1.JPG',
      });
      await DataStore.save(newUser);
    }
    Alert.alert('Profile saved successfully');
  };

  const signout = async () => {
    await DataStore.clear();
    await Auth.signOut();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="#aaa"
          onChangeText={setName}
          style={styles.textInput}
          placeholder="Name.."
          value={name}
        />
        <TextInput
          placeholderTextColor="#aaa"
          onChangeText={setBio}
          style={styles.textInput}
          placeholder="Bio.."
          value={bio}
          multiline
          numberOfLines={3}
        />
        <Text style={styles.text}>Gender</Text>
        <View style={styles.picker}>
          <Picker
            style={{color: '#000', placeholderTextColor: '#000'}}
            selectedValue={gender}
            onValueChange={itemValue => handleChangeGender(itemValue)}>
            <Picker.Item label="Select your gender" value="0" />
            <Picker.Item label="Male" value="MALE" />
            <Picker.Item label="Female" value="FEMALE" />
            <Picker.Item label="Other" value="OTHER" />
          </Picker>
        </View>
        <Text style={styles.text}>Looking For</Text>
        <View style={styles.picker}>
          <Picker
            style={{color: '#000', placeholderTextColor: '#000'}}
            selectedValue={lookingFor}
            onValueChange={itemValue => handleChangeLookingFor(itemValue)}>
            <Picker.Item label="Select your preference" value="0" />
            <Picker.Item label="Male" value="MALE" />
            <Picker.Item label="Female" value="FEMALE" />
            <Picker.Item label="Other" value="OTHER" />
          </Picker>
        </View>

        <Pressable style={styles.save} onPress={save}>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>

        <Pressable style={styles.signout} onPress={signout}>
          <Text style={styles.btnText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
