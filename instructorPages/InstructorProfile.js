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
import BottomSheet from "../screens/BottomSheetInstructor";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const ScreenWidth = Dimensions.get("window").width;
export default function InstructorProfile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
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
          <View style={{ flexDirection: "row",justifyContent:'center',alignItems:'center' }}>
            
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <IconButton icon="cog-outline" iconColor="white" size={20} style={{margin:-10}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShow(true)}>
              <IconButton icon="plus" iconColor="white" />
            </TouchableOpacity>
          </View>
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
              source={require("../images/profilepic.jpg")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Cesar Abboud
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("EditProfile")}>
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
          <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.navigate("InstructorStudents")}>
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
                <IconButton icon={'account-outline'} iconColor="#000"/>
                <Text>My Students</Text>
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
                <IconButton icon="book-outline" size={24} iconColor="#000" />
                <Text>My Courses</Text>
              </View>
              <IconButton icon="chevron-right" size={20} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
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
            position:'absolute',
            bottom:30
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
          <View style={{ paddingLeft: 25, paddingVertical: 25}}>
            <View>
              <TouchableOpacity
                onPress={()=>navigation.navigate("UploadCourse")}
                style={{ flexDirection: "row", alignItems: "center" }}
                
              >
                <TouchableOpacity>
                  <IconButton icon="upload" iconColor="#000" />
                </TouchableOpacity>

                <Text>Upload Video</Text>
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
                onPress={() => {}}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TouchableOpacity>
                  <IconButton icon="file-upload-outline" iconColor="#000" />
                </TouchableOpacity>

                <Text>Upload PDF</Text>
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
