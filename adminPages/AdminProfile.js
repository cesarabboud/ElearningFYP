import { StyleSheet, Text, View, Image, StatusBar,TouchableOpacity, Dimensions,ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import React from "react";
const screenWidth = Dimensions.get('window').width
const AdminProfile = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 50,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 24, color: "#fff", fontWeight: "500" }}>
          Username Here
        </Text>
        <Image
          source={require("../images/profilepic.jpg")}
          style={{ height: 60, width: 60, borderRadius: 100 }}
        />
      </View>
        <View style={{alignItems:'center',marginTop:30}}>
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',backgroundColor:'#03ba55',width:'80%',gap:15,padding:20,borderRadius:15}}>
          <View style={{ gap: 15 }}>
          <Text style={{textAlign:'center',fontSize:22,fontWeight:'500'}}>Teachers</Text>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'500',color:'#e5bd83'}}>30</Text>
          </View>
          <View style={{ gap: 15 }}>
          <Text style={{textAlign:'center',fontSize:22,fontWeight:'500'}}>Students</Text>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'500',color:'#e5bd83'}}>30</Text>
          </View>
          <View style={{ gap: 15 }}>
          <Text style={{textAlign:'center',fontSize:22,fontWeight:'500'}}>Courses</Text>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'500',color:'#e5bd83'}}>30</Text>
          </View>
          <View style={{ gap: 15 }}>
          <Text style={{textAlign:'center',fontSize:22,fontWeight:'500'}}>PDFs</Text>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'500',color:'#e5bd83'}}>30</Text>
          </View>
          <View style={{ gap: 15 }}>
          <Text style={{textAlign:'center',fontSize:22,fontWeight:'500'}}>Reviews</Text>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'500',color:'#e5bd83'}}>30</Text>
          </View>
        </View>
        </View>
        <View style={{padding:20,gap:15}}>
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
                <IconButton icon="key" size={24} iconColor="#000" />
                <Text>Change Password</Text>
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
                <IconButton icon="account-edit" size={24} iconColor="#000" />
                <Text>Edit Profile</Text>
              </View>
              <IconButton icon="chevron-right" size={20} />
            </View>
          </TouchableOpacity>
          
        </View>
        
        <TouchableOpacity style={{alignSelf:'center',position:'absolute',bottom:40,backgroundColor:'#fff',padding:15,justifyContent:'center',alignItems:'center',borderRadius:5,paddingVertical:15,width:screenWidth-40}}>
            <Text style={{textTransform:'uppercase',fontSize:20,fontWeight:'bold',color:'#11b741'}}>Sign Out</Text>
        </TouchableOpacity>
     
    </View>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e2a23",
  },
});
