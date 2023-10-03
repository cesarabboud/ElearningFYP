import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React,{useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

const StudentDetails = ({route}) => {
  const {studId,fullName,email,pp} = route.params
  // console.log(id)
  const [nbC,setNbC] = useState(0)
  const [pic,setPic] = useState("")
  const [revs,setRevs] = useState([])
  const getStudentDetails = async () => {
    try{
      const resp = await fetch('http://192.168.0.107:8000/api/getStudentDetails/'+studId,{
        method:"GET",
      })
      const resData = await resp.json()
      setNbC(resData.nbCourses)
      setPic(resData.pp)
      setRevs(resData.reviews)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getStudentDetails()
  },[])
  const navigation =useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ gap: 15,justifyContent:'center',alignItems:'center' }}>
        <View style={{backgroundColor:'#fff', borderRadius: 10,overflow:"hidden"}}>
        <Image
          source={{uri:'http://192.168.0.107:8000/'+pic}}
          resizeMode="cover"
          style={{ width: 200, height: 200 }}
        />
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
            User Name
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{fullName}</Text>
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
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{email}</Text>
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
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{nbC}</Text>
        </View>
      </View>
      {
        revs.length > 0 ?<TouchableOpacity onPress={()=>navigation.navigate("StudentReviews",{
          pp:pp,
          reviews:revs
        })} style={{backgroundColor:'#03ba55',height:50,width:screenWidth-100,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontWeight:'500',fontSize:18}}>See {fullName}'s reviews({revs.length})</Text>
        </TouchableOpacity> : null
      }
      
    </View>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30,
    alignItems: "center",
    backgroundColor: "#1e2a23",
    gap:80
  },
});
