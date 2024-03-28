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

const createSurvey = (id, question) => ({
  id,
  question,
  votes: { up: 0, down: 0 },
  comments: [],
});

const initialSurveys = [
  createSurvey(1, "Le meilleur joueur de foot de tous les temps?"),
  createSurvey(2, "Le club de foot le plus emblématique?"),
  createSurvey(3, "La compétition de foot la plus excitante?"),
];

const SurveysApp = ({navigation}) => {
  const [surveys, setSurveys] = useState(initialSurveys);
  const [newSurveyDescription, setNewSurveyDescription] = useState("");
  const [votedSurveys, setVotedSurveys] = useState([]);

  const vote = (surveyId, type) => {
    const oppositeType = type === "up" ? "down" : "up";

    if (
      !votedSurveys.includes(`${surveyId}-${type}`) &&
      !votedSurveys.includes(`${surveyId}-${oppositeType}`)
    ) {
      setSurveys(
        surveys.map((survey) => {
          if (survey.id === surveyId) {
            return {
              ...survey,
              votes: { ...survey.votes, [type]: survey.votes[type] + 1 },
            };
          }
          return survey;
        })
      );
      setVotedSurveys([...votedSurveys, `${surveyId}-${type}`]);
    }
  };

  const addComment = (surveyId, comment) => {
    setSurveys(
      surveys.map((survey) => {
        if (survey.id === surveyId) {
          return {
            ...survey,
            comments: [...survey.comments, { text: comment, replies: [] }],
          };
        }
        return survey;
      })
    );
  };

  const addReply = (surveyId, commentIndex, reply) => {
    setSurveys(
      surveys.map((survey) => {
        if (survey.id === surveyId) {
          const updatedComments = [...survey.comments];
          updatedComments[commentIndex].replies.push(reply);
          return { ...survey, comments: updatedComments };
        }
        return survey;
      })
    );
  };

  const createNewSurvey = () => {
    const newSurvey = createSurvey(surveys.length + 1, newSurveyDescription);
    setSurveys([...surveys, newSurvey]);
    setNewSurveyDescription("");
  };

  return (
    <ScrollView style={styles.page}>
      <Header title="Paramètre" navigation={navigation}/>
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
          {survey.comments.map((comment, commentIndex) => (
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
                  onSubmitEditing={(event) =>
                    addReply(survey.id, commentIndex, event.nativeEvent.text)
                  }
                  style={styles.commentInput}
                />
                <TouchableOpacity
                  onPress={(event) =>
                    addReply(survey.id, commentIndex, event.nativeEvent.text)
                  }
                  style={styles.replyButton}
                >
                  <Text>Répondre</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TextInput
            placeholder="Ajouter un commentaire..."
            onSubmitEditing={(event) =>
              addComment(survey.id, event.nativeEvent.text)
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
    paddingTop: 96,
    padding: 24,
    gap: 48,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingBottom: 200,
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
});

export default SurveysApp;
