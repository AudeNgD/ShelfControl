import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AddNewBookScreen() {
  const navigation = useNavigation();
  const [manIsbn, setManIsbn] = useState(null);
  const [manBookData, setManBookData] = useState(null);

  useEffect(() => {
    if (manIsbn && manIsbn.length === 13) {
      fetchBook(manIsbn)
        .then(({ items }) => {
          if (items.length === 0) setManBookData(null);
          setManBookData(items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [manIsbn]);
  return (
    <View style={styles.container}>
      <Text title="Enter ISBN if known" />
      {!manBookData ? (
        <TextInput
          inputMode="numeric"
          maxLength={13}
          value={manIsbn}
          onChangeText={(text) => setManIsbn(text)}
        />
      ) : (
        <View>
          <Text>{manBookData[0].id}</Text>
          <Text>{manBookData[0].volumeInfo.title}</Text>
          <Text>{manBookData[0].volumeInfo.title}</Text>
          <View>
            <Button title="Submit?" /> {/*build post function*/}
            <Button
              title="Go Back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Scanner");
          }}
        >
          <Text style={styles.buttonText}>Scan a book barcode</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("ManualSearch");
          }}
        >
          <Text style={styles.buttonText}>Manually add a book</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#42273B",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
});
