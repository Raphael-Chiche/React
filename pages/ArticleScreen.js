import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

const ArticleScreen = ({navigation}) => {
  const [openArticle, setOpenArticle] = useState(null);
//   const [votes, setVotes] = useState({ 1: null, 2: null, 3: null });

  const toggleArticle = (id) => {
    setOpenArticle(openArticle === id ? null : id);
  };

//   const handleVote = (articleId, vote) => {
//     setVotes((prevVotes) => ({
//       ...prevVotes,
//       [articleId]: vote,
//     }));
//   };

//   const renderVoteButtons = (articleId) => (
//     <View style={styles.voteContainer}>
//       <TouchableOpacity
//         onPress={() => handleVote(articleId, "yes")}
//         disabled={votes[articleId] !== null}
//         style={[
//           styles.voteButton,
//           votes[articleId] === "yes" && styles.voteButtonSelected,
//         ]}
//       >
//         <Text style={styles.voteText}>Oui</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => handleVote(articleId, "no")}
//         disabled={votes[articleId] !== null}
//         style={[
//           styles.voteButton,
//           votes[articleId] === "no" && styles.voteButtonSelected,
//         ]}
//       >
//         <Text style={styles.voteText}>Non</Text>
//       </TouchableOpacity>
//     </View>
//   );

  const articles = [
    {
      id: 1,
      title: "Nouveau projet de rénovation urbaine à Antony",
      description:
        "La ville d'Antony lance un projet de rénovation urbaine pour le quartier de la gare.",
      descriptionPlus:
        "La ville d'Antony a annoncé le lancement d'un nouveau projet de rénovation urbaine pour le quartier de la gare. Ce projet vise à améliorer la qualité de vie des habitants et à dynamiser le quartier. Les travaux, qui débuteront en 2025, comprendront la construction de nouveaux logements, la rénovation des espaces publics et la création d'une nouvelle gare routière.",
    },
    {
      id: 2,
      title: "La ville d'Antony s'engage pour la transition écologique",
      description:
        "Antony adopte un plan d'action pour réduire ses émissions de gaz à effet de serre.",
      descriptionPlus:
        "La ville d'Antony s'est engagée à réduire ses émissions de gaz à effet de serre de 40 % d'ici 2030. Pour atteindre cet objectif, la ville a adopté un plan d'action qui comprend plusieurs mesures, telles que la rénovation énergétique des bâtiments publics, le développement des transports en commun et la promotion des énergies renouvelables.",
    },
    {
      id: 3,
      title: "Antony célèbre ses 500 ans d'histoire",
      description:
        "La ville d'Antony organise une série d'événements pour célébrer son 500e anniversaire.",
      descriptionPlus:
        "La ville d'Antony célèbre en 2024 son 500e anniversaire. Pour l'occasion, la ville a organisé une série d'événements tout au long de l'année. Parmi les événements prévus, il y aura des expositions, des concerts, des conférences et des spectacles. Un grand défilé historique est également prévu le 14 juillet.",
    },
    // Add more articles as needed
  ];
  return (
    <View style={styles.page}>
      <Header title="Actualité" navigation={navigation}/>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {articles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleWrapper}
              onPress={() => toggleArticle(article.id)}
            >
              <View
                style={[
                  styles.article,
                  { height: openArticle === article.id ? 350 : 125 },
                  { width: 300 },
                ]}
              >
                <Text style={styles.titleArticle}>{article.title}</Text>
                <View style={styles.articleContainer}>
                  <Text style={styles.descArticle}>{article.description}</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={24} // Taille ajustée pour correspondre à l'utilisation typique
                    style={[
                      styles.arrowArticle,
                      {
                        transform:
                          openArticle === article.id
                            ? [{ rotate: "90deg" }]
                            : [{ rotate: "0deg" }],
                      },
                    ]}
                  />
                </View>
                {openArticle === article.id && (
                  <>
                    <Text style={styles.descArticlePlus}>
                      {article.descriptionPlus}.
                    </Text>
                    {/* {renderVoteButtons(article.id)} */}
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://participer.ville-antony.fr/fr-FR/projects/budget-participatif-4"
              )
            }
            style={styles.mairieButton}
          >
            <Text style={styles.voteText}>En savoir plus</Text>
          </TouchableOpacity>
        </ScrollView>
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
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: "center",

  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003366", // Bleu foncé pour le titre
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 20, // Ajouté pour un meilleur espacement en bas
  },
  articleWrapper: {
    marginBottom: 20, // Espacement entre les éléments d'article
    borderRadius: 10, // Bordures arrondies
    overflow: "hidden", // Assure que les enfants ne débordent pas des bordures arrondies
    elevation: 3, // Ombre sous les éléments d'article pour Android
    shadowColor: "#000", // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  article: {
    backgroundColor: "#007A9D", // Bleu plus vif pour l'arrière-plan des éléments d'article
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: "100%",
  },
  articleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12, // Espacement entre le titre et la description
  },
  titleArticle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  descArticle: {
    color: "#e6e6ff", // Couleur légère pour la description pour moins de contraste
    fontSize: 14,
  },
  arrowArticle: {
    marginLeft: "auto",
    color: "#fff", // Assurer que la couleur de l'icône est blanche
  },
  descArticlePlus: {
    color: "#b3b3ff", // Un bleu plus clair pour les informations supplémentaires
    fontSize: 14,
    marginTop: 10,
  },
  voteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  voteButton: {
    backgroundColor: "#66ccff", // Bleu clair pour les boutons
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20, // Bordures très arrondies
    marginHorizontal: 10,
    elevation: 2, // Ombre pour Android
    shadowColor: "#000", // Ombre pour iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  voteButtonSelected: {
    backgroundColor: "#28a745", // Vert pour les boutons sélectionnés
  },
  voteText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  mairieButton: {
    marginTop: 20,
    borderRadius: 8,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "rgba(246, 116, 162, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ArticleScreen;
