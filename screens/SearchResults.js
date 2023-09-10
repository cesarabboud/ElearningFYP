import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Button, IconButton } from "react-native-paper";
import React,{useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
const App = ({route}) => {
  const {text} = route.params
  const [searchRes,setSearchRes] = useState([])
  const navigation = useNavigation()
  const SearchByName = async () => {

      const token = await AsyncStorage.getItem('token')
      if(token!==null){
        try{
          //sending a regular json caused an error so i sent the title using formdata
          const formData = new FormData()
          formData.append('title',text)
          const response = await fetch('http://192.168.0.105:8000/api/searchCourseByName',{
            method:"POST",
            headers:{
              "Authorization":`Bearer ${token}`
            },
            body:formData
          })
          const resData = await response.json()
          if(resData.nbcourses){
            console.log(resData.nbcourses)
            setSearchRes(resData.courses)
          }
        }
        catch(err){
          console.log(err)
        }
      }
    }
  useEffect(()=>{
    SearchByName()
  },[])  
  return (
    
    <View style={{ flex: 1, justifyContent: "center", padding: 20 ,backgroundColor:'#1E2a23' }}>
        <StatusBar barStyle={'light-content'} />
        <View>
        {
          searchRes.length !== 0 ? (
            <View>
            <IconButton icon={'chevron-left'} style={{margin:0,position:'absolute'}} iconColor="#fff" onPress={()=>navigation.goBack()} />
            <IconButton icon={'tag'} iconColor="#fff"  style={{margin:0,alignSelf:'center'}} />
            <Text style={{color:"#fff",fontWeight:"600",fontSize:24,textAlign:'center'}}>{searchRes.length} Result{searchRes.length > 1 ? "s" : null} Found.</Text></View>
          ) : null
        }
        
        </View>
        

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {/* {COLORS.map((item,index) => 
        <Animated.View entering={FadeInLeft.delay(500 * (index) )}>
        <LinearGradient
          key={item.id}
          colors={item.colors}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={{ justifyContent: 'center', alignItems: 'center', height: 120, borderRadius: 10, marginBottom: 8, }}>
            <Text style={{fontSize: 20, fontWeight: '800', color:'#FFF'}}>{item.name}</Text>
        </LinearGradient>
        </Animated.View>
        )} */}
        {
            searchRes.map((prod,idx)=>{
              return (
          <Animated.View
          style={{
            borderColor: "#03ba55",
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
            marginBottom:20
          }}
          entering={FadeInRight.delay((idx+1) * 500)}
        >
          <IconButton icon={"heart-outline"} iconColor="#03ba55"/>
          <View style={{alignSelf:'center'}}>
          <Image
            source={{uri:'http://192.168.0.105:8000/'+prod.thumbnail}}
            style={{ width: 200, height: 250,  marginBottom: 12}}
          />
          </View>
          
          <Text style={{ textAlign:'left' , marginTop: 20,color:'#fff',fontSize: 14, fontWeight: '600', }}>
            {prod.description}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 8,color:"#fff" }}>{prod.title}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center",marginVertical:10}}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {/* <IconButton icon={"star"} iconColor="#ffc107" style={{ margin:0 }} /> */}
              <Ionicons name='star' color={'#ffc107'} size={20}/>
              <Text style={{fontSize: 12, fontWeight: '600',color:"#fff"}}>{prod.rating}</Text>
            </View>
            <Text style={{fontSize: 16, fontWeight: '600',color:"#fff"}}>${prod.price}</Text>

          </View>
          <TouchableOpacity style={{borderWidth:2,borderColor:'#03ba55',height:45,justifyContent:'center',alignItems:'center',borderRadius:10}}>
            <Text style={{color:"#03ba55"}}>Add To Cart</Text>
          </TouchableOpacity>
        </Animated.View>
              )
            })
        }
        {searchRes.length === 0 ? (
          <View style={{justifyContent:'center',alignItems:'center',marginTop:300,gap:10}}>
          <Text style={{color:"#fff",fontWeight:"600",fontSize:24,}}>No Results Found.</Text>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Button style={{backgroundColor:'#03ba55',width:'25%',borderRadius:10}} rippleColor={'#000'} textColor="#fff">
        Go Back
        </Button>
          </TouchableOpacity>
        </View>
        ) : null}
      </ScrollView>
    </View>
  );
  }
  
  

export default App;