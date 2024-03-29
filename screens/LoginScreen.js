import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Touchable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/styles";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { CurrentUserContext } from "../contexts/userContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { currentUid, setCurrentUid } = useContext(CurrentUserContext);

  const handleSignUpClick = () => {
    navigation.navigate("SignUpScreen");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const uid = userCredentials.user.uid;
        setCurrentUid(userCredentials.user.uid);
        if (auth.currentUser.emailVerified) {
          navigation.navigate("HomeScreen");
        } else {
          Alert.alert(
            "Only verified users can access the application",
            "Please verify your email and login",
            [
              {
                text: "Send verification again",
                onPress: () => {
                  sendEmailVerification(user).then(() => {
                    alert(
                      "Verification was sent to your email, please verify and login"
                    );
                  });
                },
              },
              {
                text: "Done",
              },
            ]
          );
        }
      })
      .catch((error) => alert(error.message));
    // setEmail("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset email sent, please check your email");
      })
      .catch((error) => {
        alert(
          "please insert your email and click again on Forgot password button"
        );
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <KeyboardAvoidingView style={styles.logContainer} behavior="padding">
      <View style={styles.loginInputContainer} name="form">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.loginInput, styles.passwordInput]}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
        onPress={handleLogin} 
        style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={handleSignUpClick}
          style={styles.buttonOutline}
        >
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </Pressable>

        <Pressable
          onPress={handleForgotPassword}
          style={styles.forgotPasswordButton}
        >
          <Text style={styles.smallButtonText}>Forgot Your Password?</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
