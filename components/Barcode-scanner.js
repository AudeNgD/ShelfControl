import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import {Camera} from 'expo-camera';
import { fetchBook } from "./api";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, TextInput, Text } from "react-native-paper";
import { CurrentUserContext } from "../contexts/userContext";
import { CurrentCatalogueContext } from "../contexts/catalogueContext";
import addBook from "../src/addBook";

const BarcodeScanner = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useState(false);
  const [isbn, setIsbn] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [bookData, setBookData] = useState(null);
  const bookList = [];
  const { currentUid } = useContext(CurrentUserContext);
  const { currentCatalogue, setCurrentCatalogue } = useContext(
    CurrentCatalogueContext
  );
  
  useEffect(()=>{
  (async()=>{
    const cameraStatus = await Camera.requestCameraPermissionsAsync()
    requestPermission(cameraStatus.granted)
  })()
},[])

  useEffect(() => {
    if (isbn) {
      fetchBook(isbn)
        .then(({ items }) => {
          if (items.length === 0) setBookData(null);
          setBookData(items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isbn]);

  const scannerSwitch = () => {
    setScanned(false);
    setBookData(null);
  };
  
  const saveScan = () => {
    if (bookData !== null) {
      bookList.push(bookData);
      setScanned(false);
      setBookData(null);
    } else {
      console.warn("error with saved scan, check bookData value");
    }
  };

  const handleScanAnotherBook = () => {
    //console.log(bookData[0]);
    const bookInfo = {
      author: bookData[0].volumeInfo.authors,
      title: bookData[0].volumeInfo.title,
      publication_date: bookData[0].volumeInfo.publishedDate,
      isbn: bookData[0].volumeInfo.industryIdentifiers[0].identifier,
    };
    addBook(currentUid, currentCatalogue, bookInfo);
    setScanned(false);
    setBookData(null);
    setIsbn(null);
  };

  const handleReturnToCatalogue = () => {
    const bookInfo = {
      author: bookData[0].volumeInfo.authors,
      title: bookData[0].volumeInfo.title,
      publication_date: bookData[0].volumeInfo.publishedDate,
      isbn: bookData[0].volumeInfo.industryIdentifiers[0].identifier,
    };
    addBook(currentUid, currentCatalogue, bookInfo);
    setScanned(false);
    setBookData(null);
    setIsbn(null);
    navigation.navigate("SingleCatalogueScreen", {
      catalogue_id: currentCatalogue,
    });
  };

if(permission){  
return (  
    <View style={styles.container}>
      {bookData ? (
        <Card style={styles.bookcard}>
          <Card.Content>
            <Text style={styles.bookcardText}>ISBN: {isbn}</Text>
            <Text style={styles.bookcardText}>Book id: {bookData[0].id} </Text>
            <Text style={styles.bookcardText}>
              Author: {bookData[0].volumeInfo.authors[0]}
            </Text>
            <Text style={styles.bookcardText}>
              Title: {bookData[0].volumeInfo.title}
            </Text>
          </Card.Content>
        </Card>
      ) : (
        <Text>No book detected</Text>
      )}

      {!scanned ? (
        <View>
          <CameraView
            barCodeScannerSettings={{
              barCodeTypes: ["ean13"],
            }}
            onBarcodeScanned={(bookDetails) => {
              setIsbn(bookDetails.data);
              setScanned(true);
            }}
            style={styles.camera}
          >
            <TouchableOpacity>
              <Text style={styles.crosshair}>[ ]</Text>
            </TouchableOpacity>
          </CameraView>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={scannerSwitch}>
            <Text style={styles.buttonText}>Scan again?/Cancel scan</Text>
          </Pressable>
          {/* <Pressable style={styles.button} onPress={saveScan}>
            <Text style={styles.buttonText}>Scan another book?</Text>
          </Pressable> */}
          <Pressable style={styles.button} onPress={handleScanAnotherBook}>
            <Text style={styles.buttonText}>Scan another book</Text>
          </Pressable>
          {/* <Pressable
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Return to Catalogue</Text>
          </Pressable> */}
          <Pressable style={styles.button} onPress={handleReturnToCatalogue}>
            <Text style={styles.buttonText}>Return to Catalogue</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
  }
  else{
    return(
      <Text>App does not have permission to access camer, please reload app and grant permissions</Text>
    )
  }
}

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  camera: {
    height: "auto",
    width: 300,
  },
  crosshair: {
    color: "white",
    textAlign: "center",
    fontSize: 110,
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
  bookcard: {
    margin: 10,
    marginBottom: 50,
    width: "80%",
  },
  bookcardText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
});
