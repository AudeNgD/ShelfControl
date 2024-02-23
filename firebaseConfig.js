import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Optionally import the services that you want to use
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// Initialize Firebase
//in Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyA-ThA-06PAvkqApsbiQQKXkcT4aBWXwZ4",
  authDomain: "shelfcontrol-1b6e0.firebaseapp.com",
  databaseURL: "https://shelfcontrol-1b6e0.firebaseio.com",
  projectId: "shelfcontrol-1b6e0",
  // storageBucket: "fir-db-demo-1d319.appspot.com",
  //changed to actual storage bucket
  storageBucket: "gs://shelfcontrol-1b6e0.appspot.com",
  messagingSenderId: "487149707576",
  appId: "1:487149707576:ios:4b196376eb5e35df55e1cd",
  //   measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

//Initialize auth
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// const auth = initializeAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
