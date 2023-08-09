import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

const StudentDetails = () => {
  const navigation =useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ gap: 15,justifyContent:'center',alignItems:'center' }}>
        <Image
          source={require("../images/profilepic.jpg")}
          resizeMode="cover"
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#f5f5fa",
            width: screenWidth - 100,
            height: 50,
            gap: 5,
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontSize: 14, color: "#ccc", fontWeight: "500" }}>
            Full Name
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Cesar Abboud</Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#f5f5fa",
            width: screenWidth - 100,
            height: 50,
            gap: 5,
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontSize: 14, color: "#ccc", fontWeight: "500" }}>
            Email
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>cesar@gmail.com</Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#f5f5fa",
            width: screenWidth - 100,
            height: 50,
            gap: 5,
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontSize: 14, color: "#ccc", fontWeight: "500" }}>
            Courses Taken
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>6</Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#f5f5fa",
            width: screenWidth - 100,
            height: 50,
            gap: 5,
            justifyContent: "center",
            paddingLeft: 15,
          }}
        >
          <Text style={{ fontSize: 14, color: "#ccc", fontWeight: "500" }}>
            PDFs Taken
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>3</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("StudentReviews")} style={{backgroundColor:'#03ba55',height:50,width:screenWidth-140,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontWeight:'500',fontSize:18,color:'#fff'}}>See Cesar Abboud's Reviews</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e2a23",
    gap:30
  },
});
