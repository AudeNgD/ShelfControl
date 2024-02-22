import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserProfilePage from "./screens/UserProfilePage";
import AddNewBookScreen from "./screens/AddNewBookScreen";
import BarcodeScanner from "./components/Barcode-scanner";
import { CurrentUserContext } from "./contexts/userContext";
import { CurrentCatalogueContext } from "./contexts/catalogueContext";
import NewCatalogueScreen from "./screens/NewCatalogueScreen";
import SingleCatalogueScreen from "./screens/SingleCatalogueScreen";
import SingleBookScreen from "./screens/SingleBookScreen";
import ManualSearch from "./components/ManualSearch";
import ChatRoomsScreen from "./screens/ChatRoomsScreen"

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUid, setCurrentUid] = useState("");
  const [currentCatalogue, setCurrentCatalogue] = useState("");

  return (
    <CurrentUserContext.Provider value={{ currentUid, setCurrentUid }}>
      <CurrentCatalogueContext.Provider
        value={{ currentCatalogue, setCurrentCatalogue }}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignUpScreen"
              component={SignUpScreen}
            />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="UserProfilePage" component={UserProfilePage} />

            <Stack.Screen
              name="NewCatalogueScreen"
              component={NewCatalogueScreen}
            />
            <Stack.Screen
              name="SingleCatalogueScreen"
              component={SingleCatalogueScreen}
            />
            <Stack.Screen
              name="SingleBookScreen"
              component={SingleBookScreen}
            />
            <Stack.Screen name="Scanner" component={BarcodeScanner} />
            <Stack.Screen name="AddNewBook" component={AddNewBookScreen} />
            <Stack.Screen name="ManualSearch" component={ManualSearch} />
            <Stack.Screen name="ChatRooms" component={ChatRoomsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentCatalogueContext.Provider>
    </CurrentUserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
