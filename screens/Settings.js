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
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children } from "react";
import { useNavigation,StackActions } from "@react-navigation/native";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const [isEnabledNotif, setIsEnabledNotif] = useState(false);

  const toggleSwitchNotif = () => {
    setIsEnabledNotif((previousState) => !previousState);
  };

  const navigation = useNavigation()

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Async Storage Cleared !!')
  }

  const DeleteAcc = () =>{
    Alert.alert(
      'Delete Account',
  'Are you sure you want to delete your account ? This action cannot be undone.',
      [
        {
          text:'Cancel',
          style:'cancel',
          onPress:()=>{
            console.log('Cancel Pressed')
          }
        },
        {
          text:'Delete',
          style:'destructive',
          onPress: async () => {
            const token = await AsyncStorage.getItem('token')
            if(token!==null){
              const response = await fetch('http://192.168.0.105:8000/api/deleteAcc',{
                method:"GET",
                headers:{
                  "Accept": 'application/json',
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
              })
              const resData = response.json()
              console.log(resData.message)
              try{
                clearAll()
                console.log('test')
              }
              catch(err){
                console.log(err)
              }
              token2 = await AsyncStorage.getItem('token')
              if(token2 === null){
                console.log('async storage cleared')
              }
              navigation.dispatch(StackActions.replace("LoginScreen"))
            }
          }
        }
      ]
    )
  }

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
            onPress={DeleteAcc}
              style={{
                marginRight: 20,
                backgroundColor: "#f40204",
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
