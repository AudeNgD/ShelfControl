import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { useNavigation, useNavigationParam } from "@react-navigation/native";
import { getAllBooks } from "../src/getAllBooks";
import { getSingleBook } from "../src/getSingleBook";
import { fetchBook } from "../components/api";


const SingleBookScreen = ({ route }) => {
  const { catalogue_id, book_data, book_id } = route.params;
  const [currentBook, setCurrentBook] = useState({});
  const { currentUid } = useContext(CurrentUserContext);
  const [currentIsbn, setCurrentIsbn] = useState(null);
  

   
  useEffect(() => {
    if (currentIsbn) {
      fetchBook(currentIsbn).then((result) => {
        setCurrentBook({
          title: result.items[0].volumeInfo.title,
          author: result.items[0].volumeInfo.authors,
          description: result.items[0].volumeInfo.description,
          image: result.items[0].volumeInfo.imageLinks.thumbnail,
        })
      })
    }else{
      setCurrentBook({
        title: book_data.title,
        author: book_data.author,
        description: "no",
        image: 'https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png',
      })
    }
  }, [currentIsbn]);

  console.log(currentBook);


  useEffect(() => {
    getSingleBook(catalogue_id, currentUid, book_id).then((res) => {
      if (res.data().hasOwnProperty("isbn")) {
        setCurrentIsbn(res.data().isbn)
      }
    }) 
  }, [book_id]);


  return (
  
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.imageContainer}>
        <Image  source={{uri:currentBook.image}} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{currentBook.title}</Text>
        <Text style={styles.author}>By {currentBook.author}</Text>
        <Text style={styles.description}>{currentBook.description}</Text>
      </View>
      </ScrollView>
     </View>
  
  )
  
  
};

export default SingleBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light gray
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 300,
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Dark gray
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
    color: '#555', // Medium gray
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777', // Light gray
  },
});
