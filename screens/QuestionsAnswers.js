import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView
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
import { Dimensions } from "react-native";
import { Alert } from "react-native";
import { formatDiagnostic } from "typescript";
import { useIsFocused } from "@react-navigation/native";
const QuestionsAnswers = ({navigation}) => {
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [searchedQuestions, setSearchedQuestions] = useState([]);
  const getQuestions = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch("http://192.168.0.105:8000/api/allQ", {
          method: "GET",
        });
        const resData = await response.json();
        setQuestions(resData.questions);
        //console.log(questions);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const isFocusedd = useIsFocused()
  useEffect(() => {
    if(isFocusedd){
      getQuestions();
    }
    
  }, [isFocusedd]);
  const [questionIdToAnswer,setQuestionIdToAnswer] = useState(0)
  const getAnswers = async (id) => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch(
          "http://192.168.0.105:8000/api/answers/" + id,
          {
            method: "GET",
          }
        );
        setQuestionIdToAnswer(id)
        const resData = await response.json();
        // console.log(resData.answers ? resData.answers : resData.msg)
        if (resData.answers) {
          setAnswers(resData.answers);
          // console.log(resData.answers)
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
    else if(minutes === 0){
      return `Just Now`
    }
    return `${minutes}min ago`;
  };

  const searchQuestions = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch(
          "http://192.168.0.105:8000/api/searchQuest",
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
  const AddAnswer = async (QuestionId) => {
    const token = await AsyncStorage.getItem('token')
    if(token!==null){
      console.log('fi token')
      try{
        const response = await fetch('http://192.168.0.105:8000/api/respondToQuestion/'+QuestionId,{
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${token}`
          },
          body:JSON.stringify({
            answer:answerfield
          })
        })
        const resData = await response.json()
        console.log(resData.msg)
        setAnswerField('')
        Keyboard.dismiss()
        getAnswers(QuestionId)
        getQuestions()
      }
      catch(err){
        console.log(err)
      }
    }
  }
  const GetUserAnswer = (qid) => {
    Alert.prompt(
      'Answer',
      null,
      (userInput) => {
        if (userInput !== null && userInput !== '') {
          console.log('qid:',qid)
          console.log(`User entered: ${userInput}`);
          AddAnswer(qid,userInput)
          alert('answer added !!')
        } else if (userInput === null) {
          console.log('User cancelled the prompt');
        } else {
          console.log('User entered an empty string');
        }
      }
    );
  }
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

              <Text style={styles.chatText}>
                {q.answers_count > 0 ?
                <Text>{q.answers_count} </Text> : <Text>No </Text>}
                {q.answers_count === 1 ? <Text>Answer</Text> : <Text>Answers</Text>} 
              </Text>
            </TouchableOpacity>
            {q.answers_count === 0 ? null : (
            q.correctlyAnswered ? (
              <Ionicons
                name="checkmark-circle-outline"
                color={"#03ba55"}
                size={24}
              />
            ) : (
              <Text>No Correct answer</Text>
            )
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
  const MapAnswers = () => {
    return (
      answers.map((a, idx) => {

        return(
          <View key={idx} style={{marginBottom:20}}>
            <View style={{flexDirection:'row',gap:10}}>
            <View style={{ borderRadius: "100",width:50, overflow: "hidden" }}>
              <Image
              source={{uri: 'http://192.168.0.105:8000/'+a.get_user.profilepicture}}
                //source={require("../images/profilepic.jpg")}
                style={{ width: 50, height: 50,backgroundColor:'#ccc' }}
                resizeMode='contain'
              />
            </View>
            <View style={{gap:5}}>
            <Text style={{fontWeight:"500"}}>{a.get_user.name}</Text>
            <Text style={{fontSize:18}}>{a.answer} {a.answered ? <Ionicons name="checkbox" color={'#03ba55'} size={20}/> : null}</Text>
            </View>
            
            </View>
            {idx !== answers.length - 1 ? <View style={{height:1.5,backgroundColor:'#ccc',marginTop:10}} /> : null}
          </View>
        
        )
      })
    )
    
  }
  const AddQuestionToDb = async (q) => {
    console.log(q)
    const token = await AsyncStorage.getItem('token')
    if(token !== null) {
      try{
        console.log('token not null')
        const formData = new FormData()
        formData.append('question',q)
        const response = await fetch('http://192.168.0.105:8000/api/askQuestion',{
          method:"POST",
          headers:{
            
            "Authorization":`Bearer ${token}`
          },
          body:formData
        })
        const resData = await response.json()
        console.log(resData.message)
        getQuestions()

      }
      catch(err){
        console.log(err)
      }
    }
  }
  const AskQuestion = () => {
    Alert.prompt(
      'Ask Your Question',
      null,
      (text) => {
        if (text === null) {
          // User clicked "Cancel"
          console.log('Prompt canceled');
          alert('cancel')
        } else {
          // User entered text
          if( text !== ''){
            console.log('User entered:', text);
            AddQuestionToDb(text)
          }
          else{
            alert('Your Field is Empty !')
          }
          
        }
      }
    );
  }
  const [show, setShow] = useState(false);
  const [isFocused,setIsFocused] =useState(false)
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  // const [keyboardHeight, setKeyboardHeight] = useState(0);
  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     (event) => {
  //       setKeyboardHeight(event.endCoordinates.height);
  //     }
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardHeight(0);
  //     }
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  const [answerfield,setAnswerField] = useState('')
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
            <TouchableOpacity onPress={AskQuestion}>
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
              if(!Keyboard.dismiss()){
                Keyboard.dismiss()
              }
            }}
            enableBackdropDismiss
          >
            {answers.length > 0 ? (
              <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                <MapAnswers />
              </ScrollView>
              
            </KeyboardAvoidingView>
            ) : (
              <ScrollView contentContainerStyle={styles.noanswers}>
                <Text style={styles.noanswerstext}>No Answers yet.</Text>
                <Text style={[styles.noanswerstext,{color:"#ccc",marginTop:5,fontSize:16}]}>Be The First One to Answer</Text>
              </ScrollView>
            )}
            <View style={[{flexDirection:'row', height: 50, backgroundColor: '#fff', width: '100%',borderTopWidth:2,borderTopColor:"#ccc" }, isFocused && styles.focusedTextInput]}>
              <View style={{justifyContent:'center',alignItems:'center',width:50,height:50}}>
                  <Feather name="send" size={20} color={'#808080'}/>
                </View>
                <TextInput
                placeholder={'Add An Answer'} 
                style={{width:'72.7%',height:'100%',paddingLeft:5}} 
                onFocus={handleFocus} 
                onBlur={handleBlur}
                value={answerfield}
                onChangeText={(text)=>setAnswerField(text)}
                />
                {/* <Text>{keyboardHeight}</Text> */}
                <TouchableOpacity onPress={()=>AddAnswer(questionIdToAnswer)} disabled={answerfield === '' ? true : false} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#4090db',width:50,height:50}}>
                  <Feather name="check" size={20} color={answerfield === '' ?'#ccc' : '#fff'}/>
                </TouchableOpacity>
              </View>
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
  focusedTextInput: {
    marginBottom: 167,
  },
});
