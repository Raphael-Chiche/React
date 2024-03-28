import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import Header from "../components/Header";

const CalendarScreen = ({navigation}) => {
  const [events, setEvents] = useState({
    "2024-03-06": ["PSG a joué son 8eme de final de LDC"],
    "2024-01-01": ["Jour de l'an"],
    "2024-04-01": ["Lundi de Pâques"],
    "2024-05-01": ["Fête du travail"],
    "2024-05-08": ["Victoire 1945"],
    "2024-05-30": ["Ascension"],
    "2024-06-09": ["Pentecôte"],
    "2024-07-14": ["Fête nationale"],
    "2024-08-15": ["Assomption"],
    "2024-11-01": ["Toussaint"],
    "2024-11-11": ["Armistice 1918"],
    "2024-12-25": ["Noël"],
  });
  const [selectedDate, setSelectedDate] = useState("");

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const scheduleNotification = (date) => {
    if (events[date]) {
      // Ici, intégrez la logique de programmation de la notification réelle
      Alert.alert(
        "Notification programmée",
        `Une notification pour les événements du ${date} a été programmée.`
      );
    } else {
      Alert.alert(
        "Aucun événement",
        `Il n'y a pas d'événement à notifier pour cette date.`
      );
    }
  };

  const markedDates = Object.keys(events).reduce((acc, curr) => {
    acc[curr] = { marked: true, dotColor: "red", activeOpacity: 0 };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: "blue",
    };
  }

  return (
    <View style={styles.page}>
      <Header title="Calendrier" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            style={styles.calendar}
            theme={{}}
            markedDates={markedDates}
            onDayPress={handleDayPress}
          />
        </View>
        <View style={styles.upcomingEvents}>
          <Text style={styles.upcomingEventsText}>
            {events[selectedDate]
              ? events[selectedDate].join("\n")
              : "Aucun événement à venir"}
          </Text>
          {events[selectedDate] && (
            <Button
              title="Ajouter notification"
              onPress={() => scheduleNotification(selectedDate)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF7FE",
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    color: "#FFFFFF", // Texte blanc pour contraster avec l'arrière-plan foncé
    fontSize: 24,
    fontWeight: "600", // 600 pour un effet gras mais moins lourd que 'bold'
  },
  calendarContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFFFFF", // Arrière-plan blanc pour faire ressortir le calendrier
    borderRadius: 16, // Bordures plus arrondies pour une apparence douce
    marginHorizontal: 10, // Ajout d'une marge horizontale pour l'aération
    shadowColor: "#000", // Ombres pour la profondeur
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  calendar: {
    borderRadius: 8, // Cohérence des bordures arrondies avec le conteneur
  },
  upcomingEvents: {
    marginHorizontal: 20,
    marginTop: 20, // Ajout d'un espace au-dessus de la section des événements à venir
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000", // Même style d'ombre que le conteneur du calendrier
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  upcomingEventsText: {
    color: "#2d4150",
    fontSize: 16,
    fontWeight: "400", // Moins de gras pour un texte plus lisible
    textAlign: "center",
    marginBottom: 20,
  },
});

export default CalendarScreen;
