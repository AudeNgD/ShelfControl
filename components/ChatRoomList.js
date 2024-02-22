import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ChatRoomItem from './ChatRoomItem';
import { GlobalContext } from '../contexts/GlobalContext';

const ChatRoomList = ({ navigation }) => {
    const { allChatRooms } = useContext(GlobalContext);


    const handlePress = (roomId) => {
        navigation.navigate('MessageRoomScreen', { roomId });
    };

    return (
        <View>
            <FlatList
                data={allChatRooms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatRoomItem 
                        item={item} 
                        onPress={() => handlePress(item.id)} 
                    />
                )}
            />
        </View>
    );
};

export default ChatRoomList;