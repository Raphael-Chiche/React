import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import Header from "../components/Header";

const SettingsScreen = ({ navigation }) => {
  // Ajout de deux états pour gérer les options de paramètres
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(true);

  // Fonctions pour basculer les états
  const toggleTheme = () => setIsDarkTheme((previousState) => !previousState);
  const toggleNotifications = () =>
    setAreNotificationsEnabled((previousState) => !previousState);

  // Styles conditionnels
  const containerStyle = isDarkTheme ? styles.containerDark : styles.container;
  const textStyle = isDarkTheme ? styles.textDark : styles.text;

  return (
    <View style={styles.page}>
      <Header title="Paramètre" />
      <View style={styles.container}>
        <Text style={[styles.title, textStyle]}>Settings Screen</Text>

        {/* Option pour changer le thème */}
        <View style={styles.setting}>
          <Text style={textStyle}>Dark Theme</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkTheme}
          />
        </View>

        {/* Option pour activer/désactiver les notifications */}
        <View style={styles.setting}>
          <Text style={textStyle}>Enable Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={areNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotifications}
            value={areNotificationsEnabled}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.editButton}
          color={isDarkTheme ? "#f5dd4b" : "#007AFF"}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF7FE",
    paddingTop: 96,
    padding: 24,
    gap: 48,
  },
  buttonText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  containerDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333", // Couleur de fond sombre
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#000000", // Couleur du texte clair
  },
  textDark: {
    fontSize: 18,
    color: "#FFFFFF", // Couleur du texte sombre
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#D1C4E9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 12,
    shadowColor: "#5E35B1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
});

export default SettingsScreen;
