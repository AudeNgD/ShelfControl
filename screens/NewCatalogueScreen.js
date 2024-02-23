import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { addCatalogue } from "../src/addCatalogue";
import { useNavigation } from "@react-navigation/native";

const NewCatalogueScreen = () => {
  const [catalogueName, setCatalogueName] = useState("");
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);
  const navigation = useNavigation();

  const handleCatalogueAdd = () => {
    addCatalogue(currentUid, catalogueName).then(() => {
      navigation.navigate("HomeScreen");
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.profileContainer}>
        <TextInput
          placeholder="Catalogue Name"
          style={styles.profileText}
          value={catalogueName}
          onChangeText={(text) => setCatalogueName(text)}
        ></TextInput>
        <Pressable
          style={[styles.button, styles.buttonOutline]}
          onPress={handleCatalogueAdd}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewCatalogueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#42273B",
  },
  profileContainer: {
    width: "80%",
  },
  profileText: {
    backgroundColor: "white",
    color: "#42273B",
    marginTop: 20,
    fontWeight: "700",
    fontSize: 16,
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
});
