import { StyleSheet, Text, View, Image, TextInput, Dimensions, Button,TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React , {useState , useEffect} from "react";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker'
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { formatDiagnosticsWithColorAndContext } from "typescript";
const EditProfile = () => {
  const [image, setImage] = useState("");
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
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
  const [user,setUser] = useState({})
  const getLoggedInUserDetails = async () =>{
    const token = await AsyncStorage.getItem('token')
    try{
      const response = await fetch("http://192.168.0.105:8000/api/getLoggedInUserDetails",{
        method:"GET",
        headers:{
          "Accept": 'application/json',
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      const resData = await response.json()
      console.log(resData.user)
      setUser(resData.user)
      setUsername(resData.user.name)
      setEmail(resData.user.email)
      //setImage(user.profilepicture)
      //console.log(resData.user.name)
      // console.log(user)
    }
    catch(err){
      console.log('error:',err)
    }
  }
  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };
  const EditProfileData = async () => {
    const token = await AsyncStorage.getItem('token')
    
    if(token !== null){
      try{
        const formData = new FormData()
        if(image !== null && username!=='' && email!==''){
          
          formData.append("image", {
            uri: image,
            type: "image/" + getFileExtension(image),
            name: "myImage.jpg",
          });
          formData.append('uname',username)
          formData.append('uemail',email)
          
        }
        else if (username === '' || email === ''){
          alert("Please fill all the fields")
        }
        console.log(formData)
        const response = await fetch('http://192.168.0.105:8000/api/editProfile',{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${token}`
          },
          body:formData
        })
        const resData = await response.json()
        alert(resData.msg)
        navigation.replace("InstructorProfile")
      }
      catch(e){
        console.log(e)
      }
    }
  }
  useEffect(()=>{
    getLoggedInUserDetails()
  },[])
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
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
            source={{uri: image === '' ? 'http://192.168.0.105:8000/'+user.profilepicture : image }}
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
          <Text>Username</Text>
          <TextInput
            placeholder="Test"
            value={username}
            style={{ borderWidth: 1, padding: 10 , borderRadius:5}}
            onChangeText={(text)=>setUsername(text)}
          />
        </View>
        <View style={{gap:10}}>
          <Text>E-mail</Text>
          <TextInput
            placeholder="Test"
            value={email}
            style={{ borderWidth: 1, padding: 10 , borderRadius:5}}
          />
        </View>
      </View>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'center',gap:20,marginTop:30}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center',alignItems:'center',height:45,borderWidth:1,paddingHorizontal:20 , width:'40%',borderRadius:5,borderColor:'#03ba55',borderWidth:2}}>
          <Text style={{fontSize:18,fontWeight:'500'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={EditProfileData} style={{justifyContent:'center',alignItems:'center',height:45,paddingHorizontal:20 , width:'40%',borderRadius:5,backgroundColor:'#03ba55'}}>
          <Text style={{color:'#fff',fontSize:18,fontWeight:'500'}}>Save</Text>
        </TouchableOpacity>
      </View>
      
    </View></TouchableWithoutFeedback>
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
