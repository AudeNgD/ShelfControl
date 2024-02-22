import React, { createContext, useState } from 'react';
import { fetchMessagesFromFirestore, sendMessageToFirestore } from '../utils/firebase.utils';

export const ChatRoomContext = createContext();

export const ChatRoomProvider = ({ children }) => {
  const fetchMessages = (roomId, setMessagesCallback) => {
    return fetchMessagesFromFirestore(roomId, setMessagesCallback);
  };

  const sendMessage = (roomId, messageText) => {
    sendMessageToFirestore(roomId, messageText);
  };

  return (
    <ChatRoomContext.Provider value={{ fetchMessages, sendMessage }}>
      {children}
    </ChatRoomContext.Provider>
  );
};