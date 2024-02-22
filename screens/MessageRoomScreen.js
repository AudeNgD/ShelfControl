import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { ChatRoomContext } from '../contexts/ChatRoomContext';
import MessageList from '../components/MessageList';

const MessageRoomScreen = ({ route }) => {
  const { roomId } = route.params;
  const { fetchMessages, sendMessage } = useContext(ChatRoomContext);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchMessages(roomId, setMessages);
    return () => unsubscribe(); // Clean up the subscription
  }, [roomId]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(roomId, newMessage);
      setNewMessage('');
    }
  };

  return (
    <View>
      <MessageList messages={messages} />
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default MessageRoomScreen;