import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/userContext";
import { getUser } from "../src/getUser";
import { useFocusEffect } from "@react-navigation/native";
import updateUser from "../src/updateUser";
import deleteSingleUser from "../src/deleteUser";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const UserProfilePage = () => {
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);
  const [user, setUser] = useState();
  const [editable, isEditable] = useState(false);
  const navigation = useNavigation();
  const loggedInUser = getAuth().currentUser;
  const filename = "";
  const [image, setImage] = useState(null);
  const [userAuth, setUserAuth] = useState(null);

  const profilePicRef = ref(
    getStorage(),
    `images/${currentUid}/profilePicture/${filename}`
  );

  //   useLayoutEffect(() => {
  //     getUser(currentUid, setUser);
  //   }, [currentUid]);

  useFocusEffect(
    React.useCallback(() => {
      getUser(currentUid, setUser);
    }, [currentUid])
  );

  // To have the track of the users and to see if their email has been verified
  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        console.log(userCred.email, "user is logged in");
        // console.log(
        //   userCred.email,
        //   userCred.emailVerified,
        //   "Has email been confirmed"
        // );
        const { email, emailVerified } = userCred;
        setUserAuth({ email, emailVerified });
      } else {
        console.log(userAuth.email, "user is logged out");
      }
    });
  }, []);

  const handlePicPick = () => {
    // uploadBytes(profilePicRef, file);
  };

  const handleEditClick = () => {
    editable ? isEditable(false) : isEditable(true);
  };

  const handleEditSubmission = () => {
    editable ? isEditable(false) : isEditable(true);
    console.log(currentUid);
    updateUser(currentUid, user).then(() => {
      alert("your profile has been updated");
    });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDelete = () => {
    deleteSingleUser(currentUid, user).then(() => {
      navigation.navigate("Login");
    });
  };

  const handlePasswordChange = () => {
    sendPasswordResetEmail(auth, user.email).then(() => {
      alert(
        "password reset email sent, please check your email and login with the new password"
      );
    });
  };

  //if statement to wait until currentUid has updated before calling getUser again
  //and rendering the page
  if (user) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.profileContainer}>
          {/*<Image
            style={styles.profileImage}
            source={{ uri: user.avatar_img }}
          />
          <Text style={styles.profileText}>Firstname - {user.firstname}</Text>
          <Text style={styles.profileText}>Username - {user.username}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Edit profile</Text>
          </Pressable>*/}

          <Pressable
            style={[styles.button, styles.buttonOutline]}
            onPress={handlePicPick}>
            <Text style={styles.buttonOutlineText}>Pick a profile pic</Text>
          </Pressable>

          <TextInput
            style={
              editable
                ? [styles.profileText, styles.editable]
                : styles.profileText
            }
            //style={styles.input}
            editable={editable}
            placeholder="First Name"
            value={user.firstname}
            onChangeText={(text) =>
              setUser((currentUser) => {
                return { ...currentUser, firstname: text };
              })
            }
          />
          <TextInput
            placeholder="Last Name"
            editable={editable}
            value={user.lastname}
            onChangeText={(text) =>
              setUser((currentUser) => {
                return { ...currentUser, lastname: text };
              })
            }
            style={
              editable
                ? [styles.profileText, styles.editable]
                : styles.profileText
            }
          />
          <TextInput
            placeholder="Username"
            value={user.username}
            // onChangeText={(text) => setUsername(text)}
            style={styles.profileText}
            readOnly
          />
          <TextInput
            placeholder="Email"
            style={styles.profileText}
            editable={editable}
            value={user.email}
            onChangeText={(text) =>
              setUser((currentUser) => {
                return { ...currentUser, email: text };
              })
            }
            readOnly
          />
          {/* {userAuth && (
            <Text
              style={[styles.profileText, { backgroundColor: "aquamarine" }]}>
              {userAuth?.emailVerified
                ? "Email is verified"
                : "Email is not verified"}
            </Text>
          )} */}
        </View>
        <View style={styles.buttonContainer}>
          {editable ? (
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              onPress={handleEditSubmission}>
              <Text style={styles.buttonOutlineText}>Done!</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              onPress={handleEditClick}>
              <Text style={styles.buttonOutlineText}>Edit profile</Text>
            </Pressable>
          )}
          <Pressable
            style={[styles.button, styles.buttonOutline]}
            onPress={handlePasswordChange}>
            <Text style={styles.buttonOutlineText}>Change Password</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={handleSignOut}
            style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Sign out</Text>
          </Pressable>
        </View>

        <View>
          <Pressable
            style={[styles.button, styles.buttonOutline]}
            onPress={handleDelete}>
            <Text style={styles.buttonOutlineText}>Delete profile</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

export default UserProfilePage;

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
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#42273B",
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
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#42273B",
    fontWeight: "700",
    fontSize: 16,
  },
  editable: {
    backgroundColor: "aquamarine",
    fontWeight: "700",
    fontSize: 16,
  },
});
