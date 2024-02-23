import { db, auth } from './firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Example function to add a new chat room
export const addChatRoom = async (roomName) => {
  await addDoc(collection(db, "chatRooms"), {
    name: roomName,
    createdAt: serverTimestamp(),
  });
};

// Authentication utilities
export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  await signOut(auth);
};