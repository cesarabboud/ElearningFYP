import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const ForgotScreen = () => {
  return (
    <ImageBackground
      source={require("../images/startScreenBackground.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.content}>
          <Image
              style={{ width: "90%", height: 80 }}
              resizeMode="contain"
              source={require("../images/logoblack.png")}
            />
            <View style={{gap:2}}>
              <TextInput
                label="Email"
                mode="outlined"
                style={{ width: 250, height: 40 }}
                theme={{
                  colors: {
                    primary: "#03ba55",
                    text: "red",
                    placeholder: "grey",
                    background: "#fff",
                    onSurfaceVariant: "grey",
                    //working
                    outline: "grey",
                  },
                }}
                keyboardType="email-address"
                //textColor="red"
              />
              <Text style={{fontSize:12}}>An Email will be sent with a password reset link.</Text>
            </View>
            <TouchableOpacity style={styles.sendinstructions}>
                <Text
                  style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  send instructions
                </Text>
              </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain",
    backgroundColor: "#1E2A23",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    height: screenHeight - 345,
    width: screenWidth - 70,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  sendinstructions: {
    backgroundColor: "#03ba55",
    width: 250,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
