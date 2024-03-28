import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";

const createSurvey = (id, question, upVotes, downVotes, comments) => ({
  id,
  question,
  votes: { up: upVotes, down: downVotes },
  comments,
});

const initialSurveys = [
  createSurvey(1, "Le meilleur joueur de foot de tous les temps?", 20, 5, [
    { text: "Messi est le meilleur!", user: "Inconnu", replies: [] },
    { text: "Non, c'est Cristiano Ronaldo!", user: "Inconnu", replies: [] },
  ]),
  createSurvey(2, "Le club de foot le plus emblématique?", 15, 10, [
    { text: "Le Real Madrid, bien sûr!", user: "Inconnu", replies: [] },
    { text: "Non, c'est le FC Barcelona!", user: "Inconnu", replies: [] },
  ]),
  createSurvey(3, "La compétition de foot la plus excitante?", 25, 3, [
    {
      text: "La Ligue des champions est imbattable!",
      user: "Inconnu",
      replies: [],
    },
    { text: "Non, c'est la Coupe du monde!", user: "Inconnu", replies: [] },
  ]),
];

const SurveysApp = ({navigation}) => {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [newSurveyDescription, setNewSurveyDescription] = useState("");
  const [votedSurveys, setVotedSurveys] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newCommentMap, setNewCommentMap] = useState({}); // Utilisation d'un objet pour stocker les nouveaux commentaires pour chaque sondage
  const [newReplyMap, setNewReplyMap] = useState({}); // Utilisation d'un objet pour stocker les nouvelles réponses pour chaque commentaire

  const vote = (surveyId, type) => {
    const updatedSurveys = surveys.map((survey) => {
      if (survey.id === surveyId) {
        if (type === "up") {
          return {
            ...survey,
            votes: { ...survey.votes, up: survey.votes.up + 1 },
          };
        } else if (type === "down") {
          return {
            ...survey,
            votes: { ...survey.votes, down: survey.votes.down + 1 },
          };
        }
      }
      return survey;
    });
    setSurveys(updatedSurveys);
    setVotedSurveys([...votedSurveys, `${surveyId}-${type}`]); // Ajouter l'ID du sondage avec le type de vote à la liste des sondages votés
  };

  const addComment = (surveyId, comment) => {
    const newComment = { text: comment, user: "Inconnu", replies: [] }; // Ajout de l'utilisateur "Inconnu"
    setSurveys(
      surveys.map((survey) => {
        if (survey.id === surveyId) {
          return { ...survey, comments: [...survey.comments, newComment] }; // Ajout du nouveau commentaire avec l'utilisateur "Inconnu"
        }
        return survey;
      })
    );
    setNewCommentMap({ ...newCommentMap, [surveyId]: "" }); // Réinitialisation de la zone de commentaire après avoir ajouté le commentaire
  };

  const addReply = (surveyId, commentIndex, reply) => {
    setSurveys(
      surveys.map((survey) => {
        if (survey.id === surveyId) {
          const updatedComments = survey.comments.map((comment, index) => {
            if (index === commentIndex) {
              return { ...comment, replies: [...comment.replies, reply] };
            }
            return comment;
          });
          return { ...survey, comments: updatedComments };
        }
        return survey;
      })
    );
    setNewReplyMap({ ...newReplyMap, [`${surveyId}-${commentIndex}`]: "" }); // Réinitialisation de la zone de réponse après avoir ajouté la réponse
  };

  const createNewSurvey = () => {
    const newId = surveys.length + 1;
    const newSurvey = createSurvey(newId, newSurveyDescription, 0, 0, []);
    setSurveys([...surveys, newSurvey]);
    setNewSurveyDescription(""); // Réinitialisation de la description du nouveau sondage après sa création
  };

  return (
    <ScrollView style={styles.page}>
      <Header title="Sondages" navigation={navigation}/>
      <View style={styles.newSurveyContainer}>
        <TextInput
          placeholder="Description du nouveau sondage..."
          value={newSurveyDescription}
          onChangeText={setNewSurveyDescription}
          style={styles.newSurveyInput}
        />
        <Button
          title="Créer un sondage"
          onPress={createNewSurvey}
          style={styles.createSurveyButton}
        />
      </View>
      {surveys.map((survey) => (
        <View key={survey.id} style={styles.surveyContainer}>
          <Text style={styles.surveyQuestion}>{survey.question}</Text>
          <TouchableOpacity
            onPress={() => vote(survey.id, "up")}
            disabled={votedSurveys.includes(`${survey.id}-up`)}
            style={[
              styles.voteButton,
              votedSurveys.includes(`${survey.id}-up`)
                ? styles.voteButtonGreen
                : null,
            ]}
          >
            <FontAwesome5 name="thumbs-up" size={20} color="white" />
            <Text style={styles.voteButtonText}> ({survey.votes.up})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => vote(survey.id, "down")}
            disabled={votedSurveys.includes(`${survey.id}-down`)}
            style={[
              styles.voteButton,
              votedSurveys.includes(`${survey.id}-down`)
                ? styles.voteButtonRed
                : null,
            ]}
          >
            <FontAwesome5 name="thumbs-down" size={20} color="white" />
            <Text style={styles.voteButtonText}> ({survey.votes.down})</Text>
          </TouchableOpacity>
          {survey.comments
            .slice(0, showAllComments ? survey.comments.length : 3)
            .map((comment, commentIndex) => (
              <View key={commentIndex}>
                <Text>{comment.text}</Text>
                {comment.replies.map((reply, replyIndex) => (
                  <Text key={replyIndex} style={styles.reply}>
                    {reply}
                  </Text>
                ))}
                <View style={styles.commentContainer}>
                  <TextInput
                    placeholder="Répondre..."
                    value={newReplyMap[`${survey.id}-${commentIndex}`]}
                    onChangeText={(text) =>
                      setNewReplyMap({
                        ...newReplyMap,
                        [`${survey.id}-${commentIndex}`]: text,
                      })
                    }
                    onSubmitEditing={() =>
                      addReply(
                        survey.id,
                        commentIndex,
                        newReplyMap[`${survey.id}-${commentIndex}`]
                      )
                    }
                    style={styles.commentInput}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      addReply(
                        survey.id,
                        commentIndex,
                        newReplyMap[`${survey.id}-${commentIndex}`]
                      )
                    }
                    style={styles.replyButton}
                  >
                    <Text>Répondre</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          {!showAllComments && survey.comments.length > 3 && (
            <TouchableOpacity
              onPress={() => setShowAllComments(true)}
              style={styles.showMoreButton}
            >
              <Text>Afficher plus de commentaires</Text>
            </TouchableOpacity>
          )}
          <TextInput
            placeholder="Ajouter un commentaire..."
            value={newCommentMap[survey.id]}
            onChangeText={(text) =>
              setNewCommentMap({ ...newCommentMap, [survey.id]: text })
            }
            onSubmitEditing={() =>
              addComment(survey.id, newCommentMap[survey.id])
            }
            style={styles.commentInput}
          />
        </View>
      ))}
    </ScrollView>
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
  surveyContainer: {
    marginBottom: 20,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  surveyQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  voteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#ccc", // Gris par défaut
    marginBottom: 10,
  },
  voteButtonGreen: {
    backgroundColor: "green",
  },
  voteButtonRed: {
    backgroundColor: "red",
  },
  voteButtonText: {
    fontSize: 16,
    marginLeft: 5,
    color: "white",
  },
  commentInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flex: 1,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  newSurveyContainer: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  newSurveyInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  createSurveyButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  replyButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  reply: {
    marginLeft: 20,
    fontStyle: "italic",
    color: "#666",
  },
  showMoreButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
});

export default SurveysApp;
