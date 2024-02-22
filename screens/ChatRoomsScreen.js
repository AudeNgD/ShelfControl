import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy data for friends list
const friendsList = [
  { id: '1', name: 'Friend 1' },
  { id: '2', name: 'Friend 2' },
];

const FriendsListScreen = () => {
  const navigation = useNavigation();

  const startChat = (friendId) => {
    navigation.navigate('ChatRoomDetails', { friendId });
  };

  const renderFriend = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => startChat(item.id)}
      >
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={friendsList}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FriendsListScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 22,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: "white",
      borderBottomWidth: 2,
      borderBottomColor: "#42273B",
      padding: 10,
      width: "90%",
      marginVertical: 5,
      borderRadius: 20, 
    },
    name: {
      color: "#42273B",
      fontWeight: "700",
      fontSize: 16,
    },
    button: {
      backgroundColor: "#42273B",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
  });