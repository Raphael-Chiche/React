import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const passwordValidation = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUpperCase && hasNumber;
  };

  const handleLogin = () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Credentials", "Please enter a valid email address.");
      return;
    }
    if (!passwordValidation(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least one uppercase letter and one number."
      );
      return;
    }
    if (!name) {
      Alert.alert("Invalid Credentials", "Please enter your name.");
      return;
    }
    navigation.navigate("Profilsq", { email: email, name: name });
  };

  return (
    <View style={styles.container}>
      <Header title="Connexion" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#f8f8f8",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default LoginScreen;
