import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { SvgXml } from "react-native-svg";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const RegisterScreen = ({ navigation }) => {
  const svgLogo =`<svg width="154" height="52" viewBox="0 0 154 52" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="154" height="52" fill="url(#pattern0)"/>
  <defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlink:href="#image0_891_49" transform="matrix(0.000943963 0 0 0.00279558 0 -1.01923)"/>
  </pattern>
  <image id="image0_891_49" width="1080" height="1080" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDgAAAQ4CAYAAADsEGyPAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nOzdW28kaZof9ojVeHamu4Cq/QRV+gTNvRQMuDjA9lFaFRe2LwwYrhrDXturQ1fPTl83+1q2p1qCbcC21NXySYIsD6vntLMjuUlLu5q7IT/BsD7BFoE5HzqMYL1JBjMjyTxEZD5vxO8HsKuKHcxM5iEi3n887/OWVVUVAAAAADn7Ha8eAAAAkDsBBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0BBwAAAJA9AQcAAACQPQEHAAAAkD0B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J3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAXc5D3AAAAk0lEQVQAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAACQJ3AAAAAAeQIHAAAAkCdwAAAAAHkCBwAAAJAncAAAAAB5AgcAAADQNsb4PwDre6MMvxzIAAAAAElFTkSuQmCC"/>
  </defs>
  </svg>`
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (username) => {
    setUsername(username);
  };
  const handleEmail = (email) => {
    setEmail(email);
  };
  const handlePassword = (password) => {
    setPassword(password);
  };
  const myFct = async () => {
    // try {
    //   const response = await fetch('http://127.0.0.1:8000/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: username,
    //       email: email,
    //       password: password
    //     })
    //   });
    //   const resData = await response.json();
    //   console.log(resData);
    //   alert('testing')
    //   navigation.navigate("OnBoarding")
    // } catch (error) {
    //   console.error(error);
    // }
    navigation.navigate("OnBoarding")
  }
  return (
    <ImageBackground
      source={require("../images/startScreenBackground.png")}
      style={styles.background}
    >
      <StatusBar barStyle='dark-content' />

      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.content}>
            <SvgXml xml={svgLogo}/>
            <View style={{ gap: 15 }}>
              <TextInput
                label="Username"
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
                value={username}
                onChangeText={handleUsername}
                //textColor="red"
              />
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
                value={email}
                onChangeText={handleEmail}
              />
              <TextInput
                secureTextEntry={true}
                label="Password"
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
                value={password}
                onChangeText={handlePassword}
                //textColor="red"
              />
            </View>
            <View style={{ gap: 10 }}>
              <TouchableOpacity
                style={styles.registerbtn}
                onPress={myFct}
                  //navigation.navigate("OnBoarding");
                
              >
                <Text
                  style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  sign up
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={{ color: "#03ba55" }}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
    height: screenHeight - 300,
    width: screenWidth - 70,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  registerbtn: {
    backgroundColor: "#03ba55",
    width: 250,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});