import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";

const ContactScreen = ({ navigation }) => {
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

  const [selectedValue, setSelectedValue] = React.useState("void");

  return (
    <View style={styles.page}>
      <Header title="Contact" navigation={navigation} />
      <View style={styles.container}>
        {/* show me how we do a TexInput pls */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#4B659F", "#1C336E"]}
          style={styles.category}
        >
          <View style={styles.horizontal}>
            <View>
              <Text style={styles.h3}>Nom :</Text>
              <TextInput
                style={styles.inputSmall}
                placeholder="Nom"
                placeholderTextColor="rgba(000, 000, 000, 0.5)"
                backgroundColor="#fff"
              />
            </View>
            <View>
              <Text style={styles.h3}>Prénom :</Text>
              <TextInput
                style={styles.inputSmall}
                placeholder="Prénom"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                backgroundColor="#fff"
              />
            </View>
          </View>

          <View>
            <Text style={styles.h3}>Mail :</Text>
            <TextInput
              style={styles.inputBig}
              placeholder="mail@mail.fr"
              placeholderTextColor="rgba(000, 000, 000, 0.5)"
              backgroundColor="#fff"
            />
          </View>

          <View>
            <Text style={styles.h3}>Objet de la demande :</Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.inputBig}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="-----" value="void" />
              <Picker.Item label="Horaires" value="js" />
              <Picker.Item label="Tarifs" value="ts" />
              <Picker.Item label="Autres" value="py" />
              <Picker.Item label="Demande de partenariat" value="pyp" />
              <Picker.Item label="Demande de stage" value="pys" />
              <Picker.Item label="Demande de renseignements" value="pyr" />
              <Picker.Item label="Demande de devis" value="pyd" />
              <Picker.Item label="Demande de documentation" value="pydd" />
            </Picker>
          </View>

          <View>
            <Text style={styles.h3}>Sujet :</Text>
            <TextInput
              style={styles.inputVeryBig}
              placeholder=""
              placeholderTextColor="rgba(000, 000, 000, 0.5)"
              backgroundColor="#fff"
            />
          </View>
        </LinearGradient>
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
  h3: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  category: {
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 12,
    justifyContent: "flex-start",
    flex: 1,
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
    // backgroundColor: "#FFFFFF", // Couleur de fond claire
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
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
  inputSmall: {
    height: 60,
    width: "80%",
    padding: 10,
    borderRadius: 8,
    color: "#000",
    fontSize: 20,
    width: 150,
  },
  inputBig: {
    height: 60,
    maxWidth: "100%",
    padding: 10,
    borderRadius: 8,
    color: "#000",
    fontSize: 20,
    backgroundColor: "#fff",
  },
  inputVeryBig: {
    height: 60,
    maxWidth: "100%",
    padding: 10,
    borderRadius: 8,
    color: "#000",
    fontSize: 20,
    height: 180,
    textAlignVertical: "top",
  },
});

export default ContactScreen;
