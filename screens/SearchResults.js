import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Button, IconButton } from "react-native-paper";
import React,{useState,useEffect} from "react";
import { useNavigation,StackActions, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import ToastMessage from "./ToastMessage/ToastMsg";
const App = ({route}) => {
  const {text} = route.params
  const [searchRes,setSearchRes] = useState([])
  const [toastType, setToastType] = useState("info");
  const toastRef = React.useRef(null);
  const [msg,setMsg] = useState(null)
  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };
  const navigation = useNavigation()
  const SearchByName = async () => {

      const token = await AsyncStorage.getItem('token')
      if(token!==null){
        try{
          //sending a regular json caused an error so i sent the title using formdata
          const formData = new FormData()
          formData.append('title',text)
          const response = await fetch('http://192.168.0.107:8000/api/searchCourseByName',{
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
            try{
              const myFav = await AsyncStorage.getItem('userfav')
              const loaded = JSON.parse(myFav)
              console.log('loaded',loaded)
              if(loaded.length !==0){
                console.log('hi loaded')
                const UpdatedSearchRes = resData.courses.map(item => ({
                  ...item,
                  isFav: loaded.some(loadedItem => loadedItem.pivot.course_id === item.id) ? true : false
                }));
                setSearchRes(UpdatedSearchRes)
                console.log('res',searchRes)
              }
              else{
                const UpdatedSearchRes = resData.courses.map(item => ({
                  ...item,
                  isFav: false,
                }));
                setSearchRes(UpdatedSearchRes)
                console.log('res',searchRes)
              }
            }
            catch(err){
              console.log(err)
            }
          }
        }
        catch(err){
          console.log(err)
        }
      }
    }
    const addItemToCart = async (id) => {
      const token = await AsyncStorage.getItem('token')
      if(token !== null){
          try{
              const response = await fetch('http://192.168.0.107:8000/api/addItemToCart/'+id,{
                  method:"POST",
                  headers:{
                      "Authorization":`Bearer ${token}`
                  }
              })
              const resData = await response.json()
              console.log(resData.message)
              
              setMsg(resData.message)
              if(resData.message!== 'item already in cart!' && resData.message !== 'bought' ){
                  // navigation.replace('BottomTab', { screen: 'ShoppingCart' });
                  navigation.dispatch(StackActions.replace('BottomTab', { screen: 'ShoppingCart' }));
                  return
              }
              handleShowToast()
          }
          catch(err){
              console.log(err)
          }
      }
    }
  const AddToFavorites = async (id) => {
    // alert('hiiii')
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/addToFav/'+id,{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log('ho')
        console.log(resData)
        console.log(resData.userFav)
        if (resData.userFav !== undefined && resData.userFav !== null) {
          await AsyncStorage.setItem('userfav', JSON.stringify(resData.userFav));
          console.log('Data saved successfully');
          SearchByName();
        } else {
          console.warn('Data is undefined or null; not saving to AsyncStorage.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  const RemoveFromFav = async (id) => {
    // alert('hi')
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/deleteFromFav/'+id,{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        if (resData.userFav !== undefined && resData.userFav !== null) {
          await AsyncStorage.setItem('userfav', JSON.stringify(resData.userFav));
          console.log('Data saved successfully');
          SearchByName();
        } else {
          console.warn('Data is undefined or null; not saving to AsyncStorage.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  const isFocused = useIsFocused()
  useEffect(()=>{
    if(isFocused){
      SearchByName()
    }
    
  },[isFocused])
  const checkMsg = () => {
    if(msg === 'item already in cart!' || msg ==='bought'){
      return msg
    }
    return
  }
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
          {
            prod.isFav === false ? <IconButton onPress={()=>AddToFavorites(prod.id)} icon={"heart-outline"} iconColor={"#03ba55"}/>
            : <IconButton onPress={()=>RemoveFromFav(prod.id)} icon={"heart"} iconColor={"red"}/>
          }
          
          <View style={{alignSelf:'center'}}>
            <TouchableWithoutFeedback onPress={()=>navigation.navigate(prod.type === 'mp4' ? "CourseDetails" : "BookDetails",{
              cid:prod.id,
              cat:prod.get_category.name,
              uploader:prod.get_user.name,
              cType:prod.type
            })}>
            <Image
            source={{uri:'http://192.168.0.107:8000/'+prod.thumbnail}}
            style={{ width: 200, height: 250,  marginBottom: 12}}
            />
            </TouchableWithoutFeedback>
          
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
                gap:10
              }}
            >
              {/* <IconButton icon={"star"} iconColor="#ffc107" style={{ margin:0 }} /> */}
              <Ionicons name='star' color={'#ffc107'} size={20}/>
              <Text style={{fontSize: 12, fontWeight: '600',color:"#fff"}}>{prod.rating}.0</Text>
            </View>
            <Text style={{fontSize: 16, fontWeight: '600',color:"#fff"}}>${prod.price}</Text>

          </View>
          <TouchableOpacity onPress={()=>addItemToCart(prod.id)} style={{borderWidth:2,borderColor:'#03ba55',height:45,justifyContent:'center',alignItems:'center',borderRadius:10}}>
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

      <ToastMessage
        type={toastType}
        text="Info"
        description={msg === 'item already in cart!' ? 'Item Already In Cart' : 'Item Already Bought!'}
        ref={toastRef} 
        />
      
      
      
    </View>
  );
  }
  
  

export default App;