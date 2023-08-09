//import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  
  Image,
  SafeAreaView,
  Dimensions,
  Modal,
  Alert,
  
} from "react-native";

import { IconButton, Provider } from "react-native-paper";
import BottomSheet from "./BottomSheet";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import Icon from "react-native-vector-icons/Octicons";
import { Octicons } from "@expo/vector-icons";

const list = [
  {
    id: 1,
    name: "cog-outline",
    color: "black",
    value: "Settings",
  },
  {
    id: 2,

    name: "content-copy", //library
    color: "black",
    value: "My PDFs",
  },
  {
    id: 3,
    name: "star-outline",
    color: "black",
    value: "Wishlist",
  },
  {
    id: 4,
    name: "cart-outline",
    color: "black",
    value: "Purchased Courses",
  },
  {
    id: 5,
    name: "information-outline",
    color: "black",
    value: "About Us",
  },
];
const ScreenWidth = Dimensions.get("window").width;
const  StudentProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const [result, setResult] = useState(null);
  const handlePressButtonAsync = async () => {
    //const modifiedLink = `http://${link}`;
    let result = await WebBrowser.openBrowserAsync('http://google.com.lb');
    setResult(result);
  };
  return (
    <Provider>
      <View style={styles.container}>
      <StatusBar style="light" />
        {/* <Button onPress={() => setShow(true)} title="Show Bottom Sheet" /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 20,
          }}
        >
          <Image
            style={{ width: "24%", height: 24 }}
            resizeMode="contain"
            source={require("../images/logo.png")}
          />
          <TouchableOpacity onPress={() => setShow(true)}>
            <IconButton icon="menu" iconColor="white" />
            {/* <Octicons name="three-bars" color="white" size={24}/> */}
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ borderRadius: "100", overflow: "hidden" }}>
            <Image
            source={{uri: 'https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png'}}
               //source={require("../images/profilepic.jpg")}
              style={{ width: 100, height: 100,backgroundColor:'#ccc' }}
              resizeMode='cover'
            />
          </View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Cesar Abboud
          </Text>
          <TouchableOpacity>
            <Text
              style={{ color: "#03ba55", fontWeight: "500", marginBottom: 10 }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{ width: "100%", height: 1, backgroundColor: "#81008C" }}
        /> */}
        <View style={{ padding: 20, gap: 15 }}>
          <TouchableOpacity activeOpacity={0.6}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#d9d9d9",
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton
                  icon="star-box-outline"
                  size={24}
                  iconColor="#000"
                />
                <Text>Check My Reviews</Text>
              </View>
              <IconButton icon="chevron-right" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#d9d9d9",
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton icon="wallet-outline" size={24} iconColor="#000" />
                <Text>Wallet</Text>
              </View>
              <IconButton icon="chevron-right" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#d9d9d9",
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton icon="download" size={24} iconColor="#000" />
                <Text>Downloads</Text>
              </View>
              <IconButton icon="chevron-right" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate("ForgotPasswordScreen")}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#d9d9d9",
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton icon="key" size={24} iconColor="#000" />
                <Text>Change Password</Text>
              </View>
              <IconButton icon="chevron-right" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#11B741",
            alignSelf: "center",
            width: ScreenWidth - 40,
            paddingVertical: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <IconButton
                style={{ alignSelf: "flex-end" }}
                onPress={() => setModalVisible(!modalVisible)}
                icon="close"
                iconColor="white"
              />
              <View>
                <IconButton
                  style={{ alignSelf: "center", margin: 0 }}
                  icon="information"
                  iconColor="#FF7E28"
                  size={35}
                />
                <Text style={styles.modalText}>About Us</Text>
              </View>

              <Text
                style={{ textAlign: "center", marginTop: 10, color: "white" }}
              >
                The quick brown fox jumps over the lazy dog.
              </Text>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: 24,
                  backgroundColor: "#03BA55",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "#1E2A23", fontSize: 12 }}>
                  Learnify.All Rights Reserved.2023
                </Text>
                <IconButton
                  style={{ margin: -5 }}
                  icon="copyright"
                  size={18}
                  iconColor="#1E2A23"
                />
              </View>
            </View>
          </View>
        </Modal>
        <BottomSheet
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
        >
          <View style={{ paddingLeft: 25, paddingVertical: 25 }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity>
                  <IconButton icon="cog-outline" iconColor="#000" />
                </TouchableOpacity>

                <Text>Settings</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: ScreenWidth - 75,
                  backgroundColor: "rgba(128, 128, 128,0.4)",
                  height: 1,
                  alignSelf: "flex-end",
                }}
              />
              <TouchableOpacity
                // onPress={() => navigation.navigate("WebBrowser")}
                onPress={handlePressButtonAsync}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                
                  <IconButton icon="search-web" iconColor="#000" />
                

                <Text>Search The Web</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: ScreenWidth - 75,
                  backgroundColor: "rgba(128, 128, 128,0.4)",
                  height: 1,
                  alignSelf: "flex-end",
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("MyPDFs")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("MyPDFs")}>
                  <IconButton icon="content-copy" iconColor="#000" />
                </TouchableOpacity>

                <Text>My PDFs</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: ScreenWidth - 75,
                  backgroundColor: "rgba(128, 128, 128,0.4)",
                  height: 1,
                  alignSelf: "flex-end",
                }}
              />
              <TouchableOpacity onPress={()=>navigation.navigate("Wishlist")} style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <IconButton icon="star-outline" iconColor="#000" />
                </TouchableOpacity>

                <Text>Wishlist</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: ScreenWidth - 75,
                  backgroundColor: "rgba(128, 128, 128,0.4)",
                  height: 1,
                  alignSelf: "flex-end",
                }}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <IconButton icon="cart-outline" iconColor="#000" />
                </TouchableOpacity>

                <Text>My Courses</Text>
              </View>
              <View
                style={{
                  width: ScreenWidth - 75,
                  backgroundColor: "rgba(128, 128, 128,0.4)",
                  height: 1,
                  alignSelf: "flex-end",
                }}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity>
                  <IconButton icon="information-outline" iconColor="#000" />
                </TouchableOpacity>

                <Text>About Us</Text>
              </TouchableOpacity>
              {/* <View
                      style={{
                        width: ScreenWidth - 75,
                        backgroundColor: "rgba(128, 128, 128,0.4)",
                        height: 1,
                        alignSelf: "flex-end",
                      }}
                    /> */}
            </View>
          </View>
        </BottomSheet>
        
      </View>
    </Provider>
  );
}
export default StudentProfile;
// onPress={() => setModalVisible(!modalVisible)}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2A23",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#1E2A23",
    height: 200,
    width: ScreenWidth - 50,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    color: "#03BA55",
    fontWeight: "500",
    fontSize: 25,
    marginBottom: 10,
  },
});
