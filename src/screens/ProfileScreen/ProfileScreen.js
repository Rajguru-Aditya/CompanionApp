import '@azure/core-asynciterator-polyfill';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import users from '../../../assets/data/users';
import {Auth, Storage} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';
import {DataStore} from '@aws-amplify/datastore';
import {User} from '../../models';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [preferredActivity, setpreferredActivity] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
    setImage(dbUser.image);
    setActivity(dbUser.activity);
    setpreferredActivity(dbUser.preferredActivity);
  };
  useEffect(() => {
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

  const handleChangeActivity = val => {
    console.log('val', val);
    if (val !== 0) {
      setActivity(val);
    }
  };

  const handleChangePreferredActivity = val => {
    console.log('val', val);
    if (val !== 0) {
      setpreferredActivity(val);
    }
  };

  const isValid = () => {
    return name && bio && gender && lookingFor && activity && preferredActivity;
  };

  const save = async () => {
    if (!isValid()) {
      console.warn(
        'Please fill all the fields',
        name,
        bio,
        gender,
        lookingFor,
        activity,
        preferredActivity,
      );
      return;
    }

    if (user) {
      const updatedUser = User.copyOf(user, updated => {
        updated.name = name;
        updated.bio = bio;
        updated.gender = gender;
        updated.lookingFor = lookingFor;
        updated.activity = activity;
        updated.preferredActivity = preferredActivity;
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
        activity,
        preferredActivity,
        image:
          selectedImage ||
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      });
      await DataStore.save(newUser);
    }
    Alert.alert('Profile saved successfully');
  };

  const pickImage = async () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        console.warn('User cancelled image picker');
      } else if (response.errorCode) {
        console.warn('ImagePicker Error: ', response.errorMessage);
      } else {
        console.warn('ImagePicker Response: ', response);
        const image1 = response.assets[0].uri;
        if (user) {
          // const updatedUser = User.copyOf(user, updated => {
          //   updated.image = image;
          // });
          // await DataStore.save(updatedUser);
          setSelectedImage(image1);
        }
      }
    });
  };

  const uploadImage = async () => {
    let newImage = await storeImage();
    if (selectedImage) {
      newImage = await storeImage();
    }
    if (user) {
      if (newImage) {
        const updatedUser = User.copyOf(user, updated => {
          updated.image = newImage;
        });
        await DataStore.save(updatedUser);
        setSelectedImage(null);
        await getCurrentUser();
      }
    }
  };

  const storeImage = async () => {
    try {
      const response = await fetch(selectedImage);
      console.log('response', response);
      const blob = await response.blob();
      console.log('blob', blob);
      const urlParts = selectedImage.split('.');
      console.log('urlParts', urlParts);
      const extension = urlParts[urlParts.length - 1];
      console.log('extension', extension);
      const key = `${user.id}.${extension}`;
      console.log('key', key);
      await Storage.put(key, blob);
      return key;
    } catch (e) {
      console.warn('Error uploading image', e);
    }
  };

  const signout = async () => {
    await DataStore.clear();
    await Auth.signOut();
  };

  const renderImage = () => {
    if (selectedImage) {
      return <Image source={{uri: selectedImage}} style={styles.userImage} />;
    }
    if (user?.image?.startsWith('http')) {
      return <Image source={{uri: image}} style={styles.userImage} />;
    }
    return <S3Image imgKey={user?.image} style={styles.userImage} />;
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          {renderImage()}
          <Pressable
            onPress={() => {
              console.warn('Edit profile picture');
              pickImage();
            }}
            style={styles.editImg}>
            <Entypo name="edit" size={30} color={'#fff'} />
          </Pressable>
        </View>
        <Pressable
          style={selectedImage ? styles.save : styles.invisible}
          onPress={uploadImage}>
          <Text style={styles.btnText}>Upload Image</Text>
        </Pressable>
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
        <Text style={styles.text}>Your Activity</Text>
        <View style={styles.picker}>
          <Picker
            style={{color: '#000', placeholderTextColor: '#000'}}
            selectedValue={activity}
            onValueChange={itemValue => handleChangeActivity(itemValue)}>
            <Picker.Item label="Select your Activity" value="0" />
            <Picker.Item label="Cycling" value="CYCLING" />
            <Picker.Item label="Hiking" value="HIKING" />
            <Picker.Item label="Trekking" value="TREKKING" />
            <Picker.Item label="Concert" value="CONCERT" />
            <Picker.Item label="Movie" value="MOVIE" />
            <Picker.Item label="Party" value="PARTY" />
            <Picker.Item label="Gym" value="GYM" />
            <Picker.Item label="Walk" value="WALK" />
          </Picker>
        </View>
        <Text style={styles.text}>Preferred Activity</Text>
        <View style={styles.picker}>
          <Picker
            style={{color: '#000', placeholderTextColor: '#000'}}
            selectedValue={preferredActivity}
            onValueChange={itemValue =>
              handleChangePreferredActivity(itemValue)
            }>
            <Picker.Item label="Select your preferred Activities" value="0" />
            <Picker.Item label="Cycling" value="CYCLING" />
            <Picker.Item label="Hiking" value="HIKING" />
            <Picker.Item label="Trekking" value="TREKKING" />
            <Picker.Item label="Concert" value="CONCERT" />
            <Picker.Item label="Movie" value="MOVIE" />
            <Picker.Item label="Party" value="PARTY" />
            <Picker.Item label="Gym" value="GYM" />
            <Picker.Item label="Walk" value="WALK" />
          </Picker>
        </View>

        <Pressable style={styles.save} onPress={save}>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>

        <Pressable style={styles.signout} onPress={signout}>
          <Text style={styles.btnText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
