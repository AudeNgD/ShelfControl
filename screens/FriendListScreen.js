import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const FriendsListScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersArray);
    };

    fetchUsers();
  }, []);

  const goToChatWithFriend = (friendId) => {
    navigation.navigate('ChatScreen', { friendId });
  };

  const renderFriendItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.username}</Text>
      <TouchableOpacity
        onPress={() => goToChatWithFriend(item.id)}
        style={styles.chatButton}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FriendsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  name: {
    fontSize: 18,
  },
  chatButton: {
    backgroundColor: '#42273B',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
  },
});