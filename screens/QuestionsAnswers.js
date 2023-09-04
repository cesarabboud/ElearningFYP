import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { IconButton, Button, Provider } from "react-native-paper";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import BottomSheet from "./BottomSheetQA";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const QuestionsAnswers = () => {
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [searchedQuestions, setSearchedQuestions] = useState([]);
  const getQuestions = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch("http://192.168.0.106:8000/api/allQ", {
          method: "GET",
        });
        const resData = await response.json();
        setQuestions(resData.questions);
        console.log(questions);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  const getAnswers = async (id) => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch(
          "http://192.168.0.106:8000/api/answers/" + id,
          {
            method: "GET",
          }
        );
        const resData = await response.json();
        // console.log(resData.answers ? resData.answers : resData.msg)
        if (resData.answers) {
          setAnswers(resData.answers);
        } else {
          setAnswers([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const calculateTimeDifference = (createdAt) => {
    const currentTime = moment();
    const createdTime = moment(createdAt);
    const duration = moment.duration(currentTime.diff(createdTime));
    const hours = duration.hours();
    const minutes = duration.minutes();
    if (hours !== 0 && minutes !== 0) {
      return `${hours}h ${minutes}min ago`;
    } else if (hours !== 0 && minutes === 0) {
      return `${hours}h ago`;
    }
    return `${minutes}min ago`;
  };

  const searchQuestions = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch(
          "http://192.168.0.106:8000/api/searchQuest",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: text,
            }),
          }
        );
        const resData = await response.json();
        // console.log(resData.questions);
        setSearchedQuestions(resData.questions);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const QuestionLoad = () => {
    return questions.map((q, idx) => {
      return (
        <View key={idx} style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text>Posted By: {q.get_user.name}</Text>
            <Text>{calculateTimeDifference(q.created_at)}</Text>
          </View>
          <Text style={styles.question}>{q.question}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            
            <TouchableOpacity
              onPress={() => {
                getAnswers(q.id);
                setShow(true);
              }}
              style={styles.chat}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                onPress={() => {
                  getAnswers(q.id);
                  setShow(true);
                }}
              />

              <Text style={styles.chatText}>{q.answers_count} Answers</Text>
            </TouchableOpacity>
            {q.correctlyAnswered === true ? (
              <Ionicons
                name="checkmark-circle-outline"
                color={"#03ba55"}
                size={24}
              />
            ) : (
              <Text>No Correct Answer</Text>
            )}
            {/* <Ionicons name="checkmark-circle-outline" color={'#03ba55'} size={24}/> */}
          </View>
        </View>
      );
    });
  };
  const QuestionLoadTextInput = () => {
    return searchedQuestions.map((q, idx) => {
      return (
        <View key={idx} style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text>Posted By: {q.get_user.name}</Text>
            <Text>{calculateTimeDifference(q.created_at)}</Text>
          </View>
          <Text style={styles.question}>{q.question}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                getAnswers(q.id);
                setShow(true);
              }}
              style={styles.chat}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                onPress={() => {
                  getAnswers(q.id);
                  setShow(true);
                }}
              />

              <Text style={styles.chatText}>{q.answers_count} Answers</Text>
            </TouchableOpacity>
            {q.correctlyAnswered === true ? (
              <Ionicons
                name="checkmark-circle-outline"
                color={"#03ba55"}
                size={24}
              />
            ) : (
              <Text>No Correct Answer</Text>
            )}
            {/* <Ionicons name="checkmark-circle-outline" color={'#03ba55'} size={24}/> */}
          </View>
        </View>
      );
    });
  };
  const handleTextChange = (text) => {
    setText(text);
  };
  const [show, setShow] = useState(false);
  return (
    <Provider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View
            style={{
              height: Constants.statusBarHeight,
              backgroundColor: "#202020",
            }}
          />
          <StatusBar style="light" />
          <View style={styles.upperContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search"
                style={styles.input}
                onFocus={()=>setSearchedQuestions([])}
                onChangeText={(text) => {
                  setText(text);
                  if (!text || text == ""){
                    setSearchedQuestions([])
                  }
                  
                }}
                value={text}
                returnKeyType="search"
                onSubmitEditing={searchQuestions}
              />
              {text !== "" ? (
                <TouchableOpacity
                  onPress={() => {
                    setText("");
                    Keyboard.dismiss();
                  }}
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#808080",
                    marginRight: 10,
                    padding: 2,
                  }}
                >
                  <Feather color={"#efefefef"} name="x" />
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity>
              <Button
                mode="elevated"
                buttonColor="#03ba55"
                style={{ borderRadius: 8 }}
                textColor="#000"
              >
                Ask
              </Button>
            </TouchableOpacity>
          </View>
          <ScrollView style={{}}>
            {(text !== "") ? (
              <>
              {
                searchedQuestions.length > 0 ?
                <><Text style={{fontSize:30,fontWeight:"bold",color:"#fff",marginLeft:15}}>{searchedQuestions.length} Result(s) found.</Text>
                <QuestionLoadTextInput />
                </>
                :
                <View style={{height:550,justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:30,fontWeight:"bold",color:"#fff",}}>No Results found</Text>
                </View>
                
              }
                
              </>
            ) : (
              <QuestionLoad />
            )}
          </ScrollView>
          <BottomSheet
            show={show}
            onDismiss={() => {
              setShow(false);
            }}
            enableBackdropDismiss
          >
            {answers.length > 0 ? (
              answers.map((a, idx) => {
                return <Text key={idx}>{a.answer}</Text>;
              })
            ) : (
              <View style={styles.noanswers}>
                <Text style={styles.noanswerstext}>No Answers yet.</Text>
              </View>
            )}
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
};

export default QuestionsAnswers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  upperContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 15,
    gap: 5,
  },
  searchContainer: {
    width: "77%",
    backgroundColor: "#efefefef",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  input: {
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    width: "90%",
  },
  closeIcon: {
    margin: 0,
    padding: 0,
    backgroundColor: "#03ba55",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },
  question: {
    fontSize: 24,
    marginVertical: 15,
  },
  chat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  chatText: {
    fontWeight: "500",
    //color:"#808080"
  },
  noanswers: {
    flex: 1,
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  noanswerstext: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
