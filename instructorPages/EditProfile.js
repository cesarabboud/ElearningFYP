import { StyleSheet, Text, View, Image, TextInput, Dimensions, Button,TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React , {useState} from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'
const EditProfile = () => {
  const [image, setImage] = useState("../images/profilepic.jpg");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="" />
      <View style={{  marginBottom: 30 }}>
        <View
          style={{
            borderRadius: "100",
            overflow: "hidden",
            alignSelf: "center",
          }}
        >
          <Image
            source={{uri:image}}
            style={{ width: 100, height: 100 }}
          />
        </View>
          <TouchableOpacity onPress={pickImage}>
          <IconButton
            icon={"square-edit-outline"}
            iconColor="#000"
            size={16}
            style={{ margin: 0,backgroundColor:'#03ba55',position:'absolute',bottom:0,left:Dimensions.get('window').width/2,borderWidth:3,borderColor:'#f5f5f5'}}
          />
          </TouchableOpacity>
          
      </View>

      <View style={{ gap: 20 }}>
        <View style={{gap:10}}>
          <Text>First Name</Text>
          <TextInput
            placeholder="Test"
            value="Cesar"
            style={{ borderWidth: 1, padding: 10 , borderRadius:5}}
          />
        </View>
        <View style={{gap:10}}>
          <Text>Last Name</Text>
          <TextInput
            placeholder="Test"
            value="Abboud"
            style={{ borderWidth: 1, padding: 10 , borderRadius:5}}
          />
        </View>
        <View style={{gap:10}}>
          <Text>E-mail</Text>
          <TextInput
            placeholder="Test"
            value="cesar@gmail.com"
            style={{ borderWidth: 1, padding: 10 , borderRadius:5}}
          />
        </View>
      </View>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'center',gap:20,marginTop:30}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center',alignItems:'center',height:45,borderWidth:1,paddingHorizontal:20 , width:'40%',borderRadius:5,borderColor:'#03ba55',borderWidth:2}}>
          <Text style={{fontSize:18,fontWeight:'500'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>alert("Changes Saved !")} style={{justifyContent:'center',alignItems:'center',height:45,paddingHorizontal:20 , width:'40%',borderRadius:5,backgroundColor:'#03ba55'}}>
          <Text style={{color:'#fff',fontSize:18,fontWeight:'500'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#f5f5f5",
    marginTop: 30,
    marginHorizontal: 20,
  },
});
