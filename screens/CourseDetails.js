import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
//import Animated,{ FadeInRight } from 'react-native-reanimated'
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation, useRoute,StackActions } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultFormat } from "moment";
import ToastMessage from "./ToastMessage/ToastMsg";
import { Ionicons } from "@expo/vector-icons";
const CourseDetails = ({route}) => {
  const {courseId,cat} = route.params
  // console.log(cat + courseId)
  const [course,setCourse] = useState({})
  const [nbrev,setNbrev] = useState(0)
  const DetailsDeCours = async () =>{
      const token = await AsyncStorage.getItem('token')
      if(token!==null){
        try{
          const response = await fetch('http://192.168.0.107:8000/api/courseDetails/'+courseId,{
            method:"GET",
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
          const resData = await response.json()
          // console.log(resData.course)
          // console.log(resData.course.get_category.name)
          setCourse(resData.course)
          // console.log('course cat :',course.get_category.name)
          // console.log(resData.course.get_category.name)
          setNbrev(resData.nbrev)
          console.log('nb:'+nbrev)
        }
        catch(err){
          console.log(err)
        }
      }
    }
    const [owned,setIsOwned] = useState(null)
    const CheckIfPurchased = async () => {
      const token = await AsyncStorage.getItem('token')
      if(token !==null) {
        try{
          const response = await fetch('http://192.168.0.107:8000/api/canReview/'+courseId,{
            method:'GET',
            headers:{
              'Authorization':`Bearer ${token}`
            }
          })
          const resData = await response.json()
          // console.log(resData.message)
          resData.message === 'owned' ? setIsOwned(true) : setIsOwned(false)
          console.log(owned)
        }
        catch(err){
          console.log(err)
        }
      }
    }
  const isFocused = useIsFocused()
  useEffect(()=>{
    if(isFocused){
      DetailsDeCours()
      CheckIfPurchased()
    }
    
  },[isFocused])
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const [msg,setMsg] =useState("")
  const toastRef = React.useRef(null)
  const [toastType, setToastType] = useState("info");
  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };
  const addItemToCart = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
        try{
            const response = await fetch('http://192.168.0.107:8000/api/addItemToCart/'+courseId,{
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
  return (
    <ScrollView>
      <Image source={{uri:'http://192.168.0.107:8000/'+course.thumbnail}}
      style={{width:'100%',height:200,marginBottom:20}}
      resizeMode="cover"
      //or resizeMode = contain
      />
      {/* <TouchableOpacity style={styles.playBtnView}>
        <View>
          <IconButton
            icon={"play"}
            iconColor="#fff"
            size={28}
            style={{ margin: 0 }}
          />
        </View>
      </TouchableOpacity> */}
      <View style={{ marginHorizontal: 15, gap: 5 }}>
        <Text
          style={{
            textTransform: "uppercase",
            color: "#a9a9a9",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
        {/* {course.get_category.name} */}{cat}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 16, fontWeight: "600" }}>
          {course.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#0ad143",
              alignSelf: "flex-start",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 10,
              opacity:0
            }}
          >
            <Text
              style={{
                textTransform: "capitalize",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Recommended
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                icon={"star"}
                iconColor="#ffc107"
                style={{ margin: 0 }}
              />
              <Text style={{ marginLeft: -5, fontWeight: "600" }}>{nbrev === 0 ? 0 : course.rating+'.0'}</Text>
            </View>
            <Text style={{ color: "#a9a9a9", fontWeight: "600" }}>({nbrev})</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "600", fontSize: 20 }}>Course Info</Text>

          <TouchableOpacity onPress={toggleShowMore}>
            <Text
              style={{ color: "#959595" }}
              numberOfLines={showMore ? undefined : 2}
            >
              <Text style={{ marginRight: 10 }}>
                {course.description}
              </Text>
              <Text
                style={{
                  color: "hsl(206,100%,52%)",
                  fontWeight: "500",
                  marginLeft: 100,
                }}
              >
                Read Less
              </Text>
            </Text>
            <Text
              style={{
                color: "hsl(206,100%,52%)",
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {showMore ? null : "Read More"}
            </Text>
          </TouchableOpacity>
        </View>
        {
          nbrev > 0 ? (
          <>
          <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 180,
            backgroundColor: "lightgray",
            gap: 10,
            borderRadius: 10,
            marginVertical: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>{course.rating}.0</Text>
            <Text style={{ fontSize: 20 }}>/5</Text>
          </View>
          <Text style={{ fontWeight: "500" }}>Based on {nbrev} Reviews</Text>
          <View style={{ flexDirection: "row", alignSelf: "center",gap:3 }}>
            <Ionicons
            name="star"
            color={ course.rating >= 1 ? "#ffc107" : "#b5b2b2"}
            size={24}
            />
            <Ionicons
            name="star"
            color={ course.rating >= 2 ? "#ffc107" : "#b5b2b2"}
            size={24}
            />
            <Ionicons
            name="star"
            color={ course.rating >= 3 ? "#ffc107" : "#b5b2b2"}
            size={24}
            />
            <Ionicons
            name="star"
            color={ course.rating >= 4 ? "#ffc107" : "#b5b2b2"}
            size={24}
            />
            <Ionicons
            name="star"
            color={ course.rating >= 5 ? "#ffc107" : "#b5b2b2"}
            size={24}
            />
          </View>
        </View>
        {
          nbrev > 0 ? <View style={{ height: 1, backgroundColor: "#ccc" }} /> : null
        }
        
        <TouchableOpacity
          onPress={() => navigation.navigate("ReviewPage",{
            id:courseId
          })}
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton icon={"message-outline"} iconColor="#000" />
            <Text style={{ fontWeight: "600", fontSize: 18 }}>See Reviews</Text>
          </View>
          <IconButton
            icon={"chevron-right"}
            iconColor="#000"
            style={{ margin: 0 }}
          />
        </TouchableOpacity>
        
        </>
          ) : null
        }
        
        
        {
          owned ? <>
          <View style={{ height: 1, backgroundColor: "#ccc" }} />
          <TouchableOpacity
          onPress={() => navigation.navigate("AddReview",{
            id:courseId,
            course:course
          })}
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton icon={"plus"} iconColor="#000" />
            <Text style={{ fontWeight: "600", fontSize: 18 }}>Add Review</Text>
          </View>
          <IconButton
            icon={"chevron-right"}
            iconColor="#000"
            style={{ margin: 0 }}
          />
        </TouchableOpacity> 
          </>: null
        }
        
        {
          nbrev === 0 ? <View style={{ height: 1, backgroundColor: "#ccc",marginBottom:20 }} /> : null
        }
        <View
          style={{
            alignSelf: "center",
            width: Dimensions.get("window").width - 70,
            backgroundColor: "#03ba55",
            height: 60,
            borderRadius: 12,
            marginBottom: 30,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              fontSize: 20,
              marginLeft: 15,
            }}
          >
            ${course.price}.00
          </Text>
          <TouchableOpacity
          onPress={addItemToCart}
            activeOpacity={0.7}
            style={{
              height: "100%",
              position: "absolute",
              right: 0,
              backgroundColor: "#028755",
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 20 }}>
              Add To Cart
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <View style={{position:"absolute",top:0}}>
      {/* <ToastMessage
        type={toastType}
        text="Info"
        description={msg === 'item already in cart!' ? 'Item Already In Cart' : 'Item Already Bought!'}
        ref={toastRef} 
        /> */}
      </View>
      
      <StatusBar barStyle="dark-content" />
    </ScrollView>
  );
};
const Stack = createNativeStackNavigator();
//left header
const CourseDetailsCustomComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ alignItems: "center", justifyContent: "center" }}
      onPress={() => navigation.goBack()}
    >
      <IconButton
        icon="chevron-left"
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
        //iconColor="hsl(206,100%,52%)"
        iconColor="#000"
      />
    </TouchableOpacity>
  );
};

const CourseDetailsExport = () => {
  const route = useRoute();
  const [isBookmarkPressed, setIsBookmarkPressed] = useState(null);
  // console.log(route.params.cid)
  const checkifInFav = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/checkIfInFav/'+route.params.cid,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log('resdata',resData)
        setIsBookmarkPressed(resData === 0 ? false : true)
      }
      catch(err){
        console.log(err)
      }
    }
  }
  const AddToFavorites = async () => {
    // alert('hiiii')
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/addToFav/'+route.params.cid,{
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
        } else {
          console.warn('Data is undefined or null; not saving to AsyncStorage.');
        }
      } catch (err) {
        console.error(err);
      }
      finally {
        setIsBookmarkPressed(!isBookmarkPressed)
      }
    }
  }

  const RemoveFromFav = async () => {
    // alert('hi')
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/deleteFromFav/'+route.params.cid,{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        if (resData.userFav !== undefined && resData.userFav !== null) {
          await AsyncStorage.setItem('userfav', JSON.stringify(resData.userFav));
          console.log('Data saved successfully');
        } else {
          console.warn('Data is undefined or null; not saving to AsyncStorage.');
        }
      } catch (err) {
        console.error(err);
      }
      finally{
        setIsBookmarkPressed(!isBookmarkPressed)
      }
    }
  }
  const HandleBookmark = () => {

    alert('hi')
  }
  
  React.useEffect(()=>{
    checkifInFav()
  },[])
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        initialParams={{courseId : route.params.cid, cat:route.params.cat}}
        options={{
          headerLeft: () => <CourseDetailsCustomComponent />,
          headerShown: true,
          title: "Course Details",
          headerTitleStyle: {
            fontSize: 16,
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={isBookmarkPressed === false ? AddToFavorites : RemoveFromFav}
              >
                <IconButton
                  icon={isBookmarkPressed ? "bookmark" : "bookmark-outline"}
                  style={{ margin: 0 }}
                  iconColor="#000"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default CourseDetailsExport;

const styles = StyleSheet.create({
  playBtnView: {
    backgroundColor: "#202020",
    width: 50,
    height: 50,
    borderRadius: "100",
    alignSelf: "flex-end",
    marginRight: 30,
    marginTop: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  starIcon: {
    margin: 0,
    marginRight: -15,
  },
});
