import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, doc, serverTimestamp } from 'firebase/firestore';

export const generateChatId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};

export const sendMessage = async (chatId, message, senderId) => {
  const chatRef = doc(db, "chats", chatId);
  const messageRef = collection(chatRef, "messages");
  await addDoc(messageRef, {
    text: message,
    senderId: senderId,
    createdAt: serverTimestamp(),
  });
};

export const listenForMessages = (chatId, setMessages) => {
  const chatRef = doc(db, "chats", chatId);
  const q = query(collection(chatRef, "messages"), orderBy("createdAt", "asc"));

  return onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    setMessages(messages);
  });
};