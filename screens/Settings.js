import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Switch,
  useColorScheme
} from "react-native";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const [isEnabledNotif, setIsEnabledNotif] = useState(false);

  const toggleSwitchNotif = () => {
    setIsEnabledNotif((previousState) => !previousState);
  };
  const colorScheme = useColorScheme()
  useEffect(()=>{
    console.log(colorScheme)
  },[colorScheme])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginVertical: 20,
                fontWeight: "600",
              }}
            >
              Dark Mode ({colorScheme})
            </Text>
            
            <Switch
              trackColor={{ false: "#ddd", true: "#49d161" }}
              thumbColor={isEnabled ? "#fff" : "#fff"}
              ios_backgroundColor="#ddd"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginVertical: 20,
                fontWeight: "600",
              }}
            >
              Allow Notifications
            </Text>
            <Switch
              trackColor={{ false: "#ddd", true: "#49d161" }}
              thumbColor={isEnabled ? "#fff" : "#fff"}
              ios_backgroundColor="#ddd"
              onValueChange={toggleSwitchNotif}
              value={isEnabledNotif}
            />
          </View>
          <View style={styles.line} />
        </View>
        <View>
          <Text style={styles.title}>Get In Touch</Text>
          <Text style={styles.sub}>Contact Support</Text>
          <View style={styles.line} />
        </View>
        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.sub}>Terms of Service</Text>
          <View
            style={{
              height: 1.5,
              backgroundColor: "#bababa",
              alignSelf: "flex-end",
              width: Dimensions.get("window").width - 30,
            }}
          />
          <Text style={styles.sub}>Privacy Policy</Text>
          <View
            style={{
              height: 1.5,
              backgroundColor: "#bababa",
              alignSelf: "flex-end",
              width: Dimensions.get("window").width - 30,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.sub}>Delete Account</Text>
            <TouchableOpacity
              style={{
                marginRight: 20,
                backgroundColor: "#11b741",
                padding: 8,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>Delete My Account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.line} />
        </View>
      </View>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
  },
  sub: {
    fontSize: 20,
    marginLeft: 30,
    marginVertical: 20,
    fontWeight: "600",
  },
  line: {
    height: 1.5,
    backgroundColor: "#bababa",
    marginBottom: 20,
    //width:Dimensions.get('window').width-30
  },
});
