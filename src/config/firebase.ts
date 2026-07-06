import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Vb55v68bB1eNxxloQOxEHoT4LfUfKpE",
  authDomain: "smartecommerce-a5deb.firebaseapp.com",
  projectId: "smartecommerce-a5deb",
  storageBucket: "smartecommerce-a5deb.firebasestorage.app",
  messagingSenderId: "684291581351",
  appId: "1:684291581351:web:4c20f5b1b71fa99bcb8282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
