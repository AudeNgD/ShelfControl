import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Searchbar } from "react-native-paper";
import { Button, Card, TextInput, Text } from "react-native-paper";
import addBook from "../src/addBook";
import { CurrentUserContext } from "../contexts/userContext";
import { CurrentCatalogueContext } from "../contexts/catalogueContext";
import { useNavigation } from "@react-navigation/native";

const ManualSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [text, setText] = useState("");
  const [manualAdd, setManualAdd] = useState(false);
  const [manualBookTitle, setManualBookTitle] = useState("");
  const [manualAuthorName, setManualAuthorName] = useState("");
  const [manualPublishDate, setManualPublishDate] = useState("");
  const [manuallyAddedBook, setMannuallyAddedBook] = useState({});
  const [bookAdded, setBookAdded] = useState(false);
  const [infoNeeded, setInfoNeeded] = useState("");
  const { currentUid } = useContext(CurrentUserContext);
  const { currentCatalogue, setCurrentCatalogue } = useContext(
    CurrentCatalogueContext
  );
  const navigation = useNavigation();
  const [selectedBook, setSelectedBook] = useState([]);

  function searchBook() {
    Keyboard.dismiss();
    setIsLoading(true);
    setManualAdd(false);

    if (bookTitle.length === 0) {
      setAlert("You must write a book title!");
      setIsLoading(false);
      setBookTitle("");
    } else {
      axios({
        method: "get",
        url: `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`,
      }).then((response) => {
        if (response.data.items) {
          setBooks(response.data.items);
          setIsLoading(false);
          setBookTitle("");
        } else {
          setError("No results found");
          setBooks([]);
        }
      });
    }
  }

  function handleAddClick() {
    setManualAdd(true);
  }

  function handleManualBookAdd() {
    if (manualAuthorName === "" || manualBookTitle === "") {
      setInfoNeeded("Need to fill out title and author name!");
    } else {
      setInfoNeeded("");
      setMannuallyAddedBook({
        title: manualBookTitle,
        author: manualAuthorName,
        publication_date: manualPublishDate,
      });
      setBookAdded(true);
    }
  }

  function handleCancelClick() {
    setBookAdded(false);
    setManualBookTitle("");
    setManualAuthorName("");
    setManualPublishDate("");
  }

  function handleEditClick() {
    setBookAdded(false);
  }

  function handleSubmitManualBook() {
    addBook(currentUid, currentCatalogue, manuallyAddedBook).then(() => {
      // navigation.navigate("ManualSearch");
      setManualAdd(true);
      setManualBookTitle("");
      setManualAuthorName("");
      setManualPublishDate("");
      setBookAdded(false);
    });
  }

  //console.log(selectedBook);
  function handleSubmitSearchedBook(book) {
    const bookInfo = {
      author: book.volumeInfo.authors,
      title: book.volumeInfo.title,
      publication_date: book.volumeInfo.publishedDate,
      isbn: book.volumeInfo.industryIdentifiers[0].identifier,
    };
    addBook(currentUid, currentCatalogue, bookInfo).then(() => {
      console.log("success");
    });
  }

  //Search Options Chosen
  if (books.length === 0 && !manualAdd) {
    return (
      <View style={styles.searchbar}>
        <Button icon="plus" mode="contained" onPress={handleAddClick}>
          Add a Book
        </Button>

        <Searchbar
          placeholder="Search Book Title"
          onChangeText={(bookTitle) => setBookTitle(bookTitle)}
          value={bookTitle}
          onIconPress={searchBook}
        />
        <Text>{alert}</Text>
        <Text>{error}</Text>
        <StatusBar style="auto" />
      </View>
    );

    // Books shown from Google Books Api
  } else if (books.length !== 0 && !manualAdd) {
    return (
      <View style={styles.searchbar}>
        <Button icon="plus" mode="contained" onPress={handleAddClick}>
          Add a Book
        </Button>

        <Searchbar
          placeholder="Search Book Title"
          onChangeText={(bookTitle) => setBookTitle(bookTitle)}
          value={bookTitle}
          onIconPress={searchBook}
        />

        <StatusBar style="auto" />
        <ScrollView>
          <View style={styles.container}>
            {books.map((book, i) => {
              //issue with thumbnail at times
              return (
                <Card key={i} style={styles.bookcard}>
                  <Card.Title
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.authors}
                  />
                  <Card.Cover
                    style={styles.bookcover}
                    source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                  />
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        handleSubmitSearchedBook(book);
                      }}
                    >
                      Add Book
                    </Button>
                  </Card.Actions>
                </Card>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );

    //Manually adding book information
  } else if (manualAdd) {
    //Manually adding form
    if (!bookAdded) {
      return (
        <View style={styles.searchbar}>
          <Button icon="plus" mode="contained" onPress={handleAddClick}>
            Add a Book
          </Button>

          <Searchbar
            placeholder="Search Book Title"
            onChangeText={(bookTitle) => setBookTitle(bookTitle)}
            value={bookTitle}
            onIconPress={searchBook}
          />

          <View style={styles.bookForm}>
            <Text style={styles.bookFormText} variant="headlineLarge">
              Add your book details
            </Text>
            <TextInput
              style={styles.bookFormComponent}
              label="Book Title"
              value={manualBookTitle}
              onChangeText={(manualBookTitle) =>
                setManualBookTitle(manualBookTitle)
              }
            />
            <TextInput
              style={styles.bookFormComponent}
              label="Book Author"
              value={manualAuthorName}
              onChangeText={(manualAuthorName) =>
                setManualAuthorName(manualAuthorName)
              }
            />
            <TextInput
              style={styles.bookFormComponent}
              label="Year Published"
              value={manualPublishDate}
              keyboardType="numeric"
              onChangeText={(manualPublishDate) =>
                setManualPublishDate(manualPublishDate)
              }
            />

            <Button
              style={styles.bookFormComponent}
              icon="camera"
              mode="contained"
            >
              Add a cover
            </Button>

            <Button
              style={styles.bookFormComponent}
              icon={{
                uri: "https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png",
              }}
              mode="contained"
              onPress={handleManualBookAdd}
              title="Check Book Details"
            >
              Check Details
            </Button>

            <Text style={styles.bookFormText}>{infoNeeded}</Text>
            <Button title="Check Book Details!" onPress={handleManualBookAdd} />
          </View>
        </View>
      );

      //Book information displayed for check before adding
    } else {
      return (
        <View style={styles.searchbar}>
          <Button icon="plus" mode="contained" onPress={handleAddClick}>
            Add a Book
          </Button>

          <Searchbar
            placeholder="Search Book Title"
            onChangeText={(bookTitle) => setBookTitle(bookTitle)}
            value={bookTitle}
            onIconPress={searchBook}
          />

          <Card>
            <Card.Content>
              <Text variant="titleLarge">Title: {manuallyAddedBook.title}</Text>
              <Text variant="bodyMedium">
                Author: {manuallyAddedBook.author}
              </Text>
              <Text variant="bodyMedium">
                Published: {manuallyAddedBook.publication_date}
              </Text>
            </Card.Content>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button
                icon={{
                  uri: "https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png",
                }}
                onPress={handleCancelClick}
              />
              <Button onPress={handleEditClick}>Edit Book</Button>
              <Button onPress={handleSubmitManualBook}>Add Book</Button>
            </Card.Actions>
          </Card>
        </View>
      );
    }
  }
};

export default ManualSearch;

const styles = StyleSheet.create({
  bookFormText: {
    textAlign: "center",
  },
  bookFormComponent: {
    margin: 10,
  },
  bookForm: {
    margin: 40,
  },
  bookcover: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "55%",
  },
  bookcard: {
    margin: 10,
    marginBottom: 50,
    width: "70%",
  },
  searchbar: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20, // Increased margin between boxes
    width: "40%", // Shortened width
  },
});
