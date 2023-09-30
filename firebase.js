// firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const fetchUserData = async (userId) => {
  try {
    const userDoc = await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (userDoc.exists) {
      return userDoc.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  }
};

export { fetchUserData };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
