import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const ProjectsScreen = () => {
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.h1}>Accueil</Text>
                <Ionicons name={"search"} size={32} />
            </View>

            <View style={styles.buttonContainer}>
                <ImageBackground
                    source={require("../assets/banner.jpg")}
                    style={styles.banner}
                >
                    <LinearGradient
                        colors={[
                            "rgba(0, 122, 157, 0.5)",
                            "rgba(0, 122, 157, 0.5)",
                        ]}
                        style={styles.banner}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(
                                    "https://participer.ville-antony.fr/fr-FR/"
                                );
                            }}
                            style={styles.buttonRed}
                        >
                            <Text style={styles.text}>Voir les projets</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#FFF7FE",
        paddingTop: 96,
        gap: 48,
        justifyContent: "space-between", // This will push the header to the top and the button to the bottom
    },
    banner: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center", // This will center the button vertically
        alignItems: "center", // This will center the button horizontally
    },
    text: {
        color: "#fff",
        fontSize: 40,
    },
    buttonRed: {
        alignItems: "center",
        backgroundColor: "#007A9D",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    h1: {
        fontSize: 48,
        fontWeight: "900",
    },
});

export default ProjectsScreen;
