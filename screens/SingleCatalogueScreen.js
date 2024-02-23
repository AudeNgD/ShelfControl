import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation, useNavigationParam } from "@react-navigation/native";
import { getAllBooks } from "../src/getAllBooks";
import { CurrentCatalogueContext } from "../contexts/catalogueContext";

const SingleCatalogueScreen = ({ route }) => {
  const navigation = useNavigation();
  const { catalogue_id } = route.params;
  const [currentBooks, setCurrentBooks] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);
  const { currentCatalogue, setCurrentCatalogue } = useContext(
    CurrentCatalogueContext
  );
  //   const catalogue = useNavigationParam("catalogue_id");

  useEffect(() => {
    getAllBooks(currentUid, catalogue_id).then((res) => {
      let books = [];
      res.forEach((doc) => {
        books.push(doc);
      });
      //console.log(books);
      setCurrentBooks(books);
    });
  }, [catalogue_id]);

  const handleBookClick = (book) => {
    navigation.navigate("SingleBookScreen", {
      catalogue_id: catalogue_id,
      book_data: book.data(),
      book_id: book.id,
    });
  };

  const handleAddBook = () => {
    //connects here with Arran's AddNewBookScreen
    setCurrentCatalogue(catalogue_id);
    navigation.navigate("AddNewBook");
  };

  //this should be moved to Arran's NewBookScreen
  //isbn MUST be a string, will throw an indexOf error otherwise
  // const handleScannedBook = () => {
  //   addScannedBook(currentUid, catalogue_id, isbn);
  // };

  // const handleManualBook = () => {
  //   addManualBook(currentUid, catalogue_id, bookInfo);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(catalogue_id)}</Text> */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {currentBooks.map((book, index) => (
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              // book={book}
              key={index}
              onPress={() => {
                handleBookClick(book);
              }}
            >
              <Text style={styles.buttonCatalogueText}>
                {book.data().title}
              </Text>
              <Text style={styles.buttonCatalogueText}>
                {book.data().author}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={handleAddBook} style={styles.button}>
          <Text style={styles.buttonText}>Add a book</Text>
        </Pressable>
        {/* <Pressable onPress={handleScannedBook} style={styles.button}>
          <Text style={styles.buttonText}>Add a book using ISBN</Text>
        </Pressable>
        <Pressable onPress={handleManualBook} style={styles.button}>
          <Text style={styles.buttonText}>Add a book using form</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

export default SingleCatalogueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#42273B",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#42273B",
    borderWidth: 2,
  },
  buttonCatalogueText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  scrollView: {
    width: "95%",
  },
  bottomContainer: {
    marginBottom: 5,
  },
});
