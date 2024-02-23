import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Assuming these functions are exported from your ChatService.js
import { sendMessage, listenForMessages } from '../utils/ChatService';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const route = useRoute();
  const { friendId } = route.params;
  const chatId = friendId; // This is a placeholder, replace with generateChatId if necessary

  useEffect(() => {
    // Assuming listenForMessages returns a function to unsubscribe from the listener
    const unsubscribe = listenForMessages(chatId, setMessages);

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [chatId]);

  const handleSend = async () => {
    if (inputText.trim()) {
      await sendMessage(chatId, {
        text: inputText,
        createdAt: new Date(),
      });
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  message: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatScreen;