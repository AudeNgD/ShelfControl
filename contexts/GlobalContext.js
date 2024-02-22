import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Adjust the import path as needed
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [showLoginView, setShowLoginView] = useState(false);
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUser, setCurrentUser] = useState(null); // Use Firebase Auth user object
    const [allUsers, setAllUsers] = useState([]); // Consider fetching from Firestore if needed
    const [allChatRooms, setAllChatRooms] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentGroupName, setCurrentGroupName] = useState('');
    const [allChatMessages, setAllChatMessages] = useState([]);
    const [currentChatMessage, setCurrentChatMessage] = useState('');

    // Firebase Auth
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setCurrentUserName(user.displayName || 'Anonymous');
                setShowLoginView(false); // Automatically hide login view if user is logged in
            } else {
                setCurrentUser(null);
                setShowLoginView(true);
            }
        });
        return () => unsubscribe(); // Cleanup subscription
    }, []);

    // Fetch Chat Rooms from Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "chatRooms"), (snapshot) => {
            const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllChatRooms(rooms);
        });
        return () => unsubscribe(); // Cleanup subscription
    }, []);

    // Example: Fetch Messages for a specific chat room
    // You would call this function when entering a chat room
    const fetchMessagesForRoom = (roomId) => {
        const messagesRef = collection(db, `chatRooms/${roomId}/messages`);
        const q = query(messagesRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllChatMessages(messages);
        });
        return unsubscribe; // Allow for unsubscribing when leaving the room or component unmounts
    };

    return <GlobalContext.Provider value={{
        showLoginView, setShowLoginView,
        currentUserName, setCurrentUserName,
        currentUser, setCurrentUser,
        allUsers, setAllUsers,
        allChatRooms, setAllChatRooms,
        modalVisible, setModalVisible,
        currentGroupName, setCurrentGroupName,
        allChatMessages, setAllChatMessages,
        currentChatMessage, setCurrentChatMessage,
        fetchMessagesForRoom // Make fetchMessagesForRoom available in context
    }}>
        {children}
    </GlobalContext.Provider>;
}

export default GlobalState;