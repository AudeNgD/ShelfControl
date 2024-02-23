import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { CurrentUserContext } from "../contexts/userContext";
import { getAllCatalogues } from "../src/getAllCatalogues";
import { TextInput } from "react-native-web";
import NavigationBar from "../components/Navbar"
import styles from "../styles/styles";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentCatalogues, setCurrentCatalogues] = useState([]);
  const { currentUid } = useContext(CurrentUserContext);

  useEffect(() => {
    getAllCatalogues(currentUid).then((res) => {
      let catalogues = [];
      res.forEach((doc) => {
        catalogues.push(doc.id);
        // console.log(doc.data());
      });
      setCurrentCatalogues(catalogues);
    });
  }, []);

  console.log(auth.currentUser.providerData);

  const handleAddCatalogue = () => {
    navigation.navigate("NewCatalogueScreen");
  };

  const handleCatalogueClick = (catalogue) => {
    navigation.navigate("SingleCatalogueScreen", { catalogue_id: catalogue });
  };

  const handleProfilePageClick = (catalogue) => {
    navigation.navigate("UserProfilePage");
  };
  
  return (

    <SafeAreaView style={styles.homeContainer}>
      <Pressable onPress={handleProfilePageClick} style={styles.button}>
          <Text style={styles.buttonText}>Profile Page</Text>
        </Pressable>
      <View style={styles.container}>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {currentCatalogues.map((catalogue, index) => (
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              // catalogue={catalogue}
              key={index}
              onPress={() => {
                handleCatalogueClick(catalogue);
              }}
            >
              <Text style={styles.buttonCatalogueText}>{catalogue}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={handleAddCatalogue} style={styles.button}>
          <Text style={styles.buttonText}>Add a new catalogue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({
//   homeContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   button: {
//     backgroundColor: "#42273B",
//     width: "90%",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 40,
//   },
//   buttonOutline: {
//     backgroundColor: "white",
//     marginTop: 5,
//     borderColor: "#42273B",
//     borderWidth: 2,
//   },
//   buttonCatalogueText: {
//     color: "#42273B",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   scrollView: {
//     width: "95%",
//   },
//   bottomContainer: {
//     marginBottom: 5,
//   },
// });
