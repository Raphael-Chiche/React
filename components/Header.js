import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../variables";

const Header = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.h1}>{title}</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Parametres")}>
        <Ionicons name={"settings"} size={32} color={colors.txtColor} />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  h1: {
    fontSize: 48,
    fontWeight: "900",
    color: colors.txtColor,
  },
});

export default Header;
