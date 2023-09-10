import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { StatusBar } from "react-native";
import { Button } from "react-native-paper";
const AskQuestion = () => {
  const [question, setQuestion] = React.useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: Constants.statusBarHeight,
            backgroundColor: "#909090",
          }}
        />
        <StatusBar barStyle={"dark-content"} />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 30,
            marginLeft: 20,
            marginVertical: 15,
          }}
        >
          Ask Question
        </Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Ask..."
            placeholderTextColor="grey"
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => setQuestion(text)}
            value={question}
          />
        </View>
        <Button disabled={question !== '' ? false : true} textColor="#03ba55" >Add</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AskQuestion;

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    fontSize: 18,
    padding: 10,
  },
});
