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
const QuestionsAnswers = () => {
  const [text, setText] = useState("");
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
                onChangeText={(text) => setText(text)}
                value={text}
              />
              {text !== "" ? (
                <TouchableOpacity
                  onPress={() => {
                    setText("");
                    //Keyboard.dismiss();
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
            <Button
              mode="elevated"
              buttonColor="#03ba55"
              style={{ borderRadius: 8 }}
              textColor="#000"
            >
              Ask
            </Button>
          </View>
          <ScrollView style={{}}>
        <View style={styles.card}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                <Text>Posted By: username</Text>
                <Text>Asked 1 Day Ago</Text>
            </View>
            <Text style={styles.question}>How can I change my expo port address ? Your answer will be appreciated.</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <TouchableOpacity onPress={() => setShow(true)} style={styles.chat}>
                    <Ionicons name="chatbubble-outline" size={24} />
                    <Text style={styles.chatText}>20 Answers</Text>
                </TouchableOpacity>
                {/* <Ionicons name="checkmark-circle-outline" color={'#03ba55'} size={24}/> */}
                <Text>No Correct Answer</Text>
            </View>
            
            <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
        >
            
        </BottomSheet>
        </View>
        <View style={styles.card}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                <Text>Posted By: username</Text>
                <Text>Asked 1 Day Ago</Text>
            </View>
            <Text style={styles.question}>How can I change my expo port address ? Your answer will be appreciated.</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <TouchableOpacity onPress={() => setShow(true)} style={styles.chat}>
                    <Ionicons name="chatbubble-outline" size={24} />
                    <Text style={styles.chatText}>20 Answers</Text>
                </TouchableOpacity>
                <Ionicons name="checkbox" color={'#03ba55'} size={24}/>
            </View>
            
            <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
        >
            
        </BottomSheet>
        </View>
        
        

        

        

        

        </ScrollView>
          
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
    marginHorizontal:15,
    marginVertical:5,
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
});
