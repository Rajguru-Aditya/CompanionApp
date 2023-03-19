// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC6j4A3MNPHDxeMGq-KBAF9pHnymiN5P18',
  authDomain: 'connect-b1859.firebaseapp.com',
  databaseURL:
    'https://connect-b1859-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'connect-b1859',
  storageBucket: 'connect-b1859.appspot.com',
  messagingSenderId: '77151932586',
  appId: '1:77151932586:web:fd90d988d2d0d072ab00d3',
  measurementId: 'G-TS0JX64NZ8',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const database = getFirestore();
