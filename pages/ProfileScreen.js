import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [originalProfileImage, setOriginalProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Désolé, nous avons besoin des permissions de la bibliothèque de photos pour faire fonctionner cette fonctionnalité!"
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (route.params?.name) {
      setName(route.params.name);
      setOriginalName(route.params.name);
    }
    if (route.params?.email) {
      setEmail(route.params.email);
      setOriginalEmail(route.params.email);
    }
  }, [route.params]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      if (!isEditing) {
        setOriginalProfileImage(result.assets[0].uri);
      }
    }
  };

  const toggleEditProfile = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setOriginalName(name);
      setOriginalEmail(email);
      setOriginalProfileImage(profileImage);
    }
  };

  const saveProfileChanges = () => {
    if (email.includes("@")) {
      setIsEditing(false);
    } else {
      Alert.alert(
        "Erreur",
        'Veuillez entrer une adresse e-mail valide avec un "@".'
      );
    }
  };

  const cancelProfileChanges = () => {
    setName(originalName);
    setEmail(originalEmail);
    setProfileImage(originalProfileImage);
    setIsEditing(false);
  };

  const logout = () => {
    setProfileImage(null);
    setName("");
    setEmail("");
    setIsEditing(false);
    navigation.navigate("Login");
  };

  const goToSettings = () => {
    navigation.navigate("Settings"); // Redirection vers la page des paramètres
  };

  return (
    <View style={styles.page}>
      <Header title="Profil" />
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.profil}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.imgProfil} />
          ) : (
            <Ionicons
              name="person"
              size={100}
              color="#FFF7FE"
              style={styles.imgProfil}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.profilName}>{name}</Text>
        <Text style={styles.profilEmail}>{email}</Text>
        {isEditing ? (
          <>
            <TextInput
              style={styles.inputField}
              value={name}
              onChangeText={setName}
              placeholder="Nom"
              autoFocus={true}
            />
            <TextInput
              style={styles.inputField}
              value={email}
              onChangeText={setEmail}
              placeholder="Adresse e-mail"
            />
            <View style={styles.saveCancelButtons}>
              <TouchableOpacity
                onPress={saveProfileChanges}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelProfileChanges}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={toggleEditProfile}
          >
            <Text style={styles.buttonText}>Modifier mon profil</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.settingsButton} onPress={goToSettings}>
          <Text style={styles.buttonText}>Réglages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Un fond blanc pour un look épuré
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imgProfil: {
    width: 140,
    height: 140,
    borderRadius: 70, // Cercle parfait
    backgroundColor: "#F0F0F0", // Fond plus doux pour l'image de profil
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  editButton: {
    backgroundColor: "#4E9F3D", // Couleur plus vibrante pour le bouton
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30, // Boutons arrondis
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsButton: {
    backgroundColor: "#4287f5", // Couleur pour le bouton de réglages
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: "#D3455B", // Couleur qui attire l'attention pour la déconnexion
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF", // Texte blanc pour contraster avec le fond du bouton
    fontWeight: "700", // Texte plus épais
    fontSize: 18, // Taille de police augmentée
  },
  inputField: {
    backgroundColor: "#FFFFFF", // Fond blanc pour se fondre avec la page
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordures plus arrondies
    width: "100%", // Utilise la pleine largeur disponible
    fontSize: 16,
    marginBottom: 16,
    color: "#333333",
    borderWidth: 2, // Bordure plus épaisse
    borderColor: "#E0E0E0", // Couleur de bordure douce
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  saveCancelButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: "#4E9F3D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#D3455B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  profilName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  profilEmail: {
    fontSize: 18,
    color: "#777",
    marginBottom: 16,
  },
});

export default ProfileScreen;
