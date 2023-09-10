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
import { useNavigation, useRoute } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultFormat } from "moment";
const CourseDetails = ({route}) => {
  const {courseId,cat} = route.params
  // console.log(cat + courseId)
  const [course,setCourse] = useState({})
  const [nbrev,setNbrev] = useState(0)
  const DetailsDeCours = async () =>{
      const token = await AsyncStorage.getItem('token')
      if(token!==null){
        try{
          const response = await fetch('http://192.168.0.105:8000/api/courseDetails/'+courseId,{
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
          
        }
        catch(err){
          console.log(err)
        }
      }
    }
  useEffect(()=>{
    DetailsDeCours()
  },[])
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <ScrollView>
      <Image source={{uri:'http://192.168.0.105:8000/'+course.thumbnail}}
      style={{width:'100%',height:200,marginBottom:20}}
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
              <Text style={{ marginLeft: -5, fontWeight: "600" }}>{course.rating}.0</Text>
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
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <IconButton
              icon="star"
              iconColor={ course.rating >= 1 ? "#ffc107" : "#b5b2b2"}
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor={ course.rating >= 2 ? "#ffc107" : "#b5b2b2"}
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor={ course.rating >= 3 ? "#ffc107" : "#b5b2b2"}
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor={ course.rating >= 4 ? "#ffc107" : "#b5b2b2"}
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor={ course.rating >= 5 ? "#ffc107" : "#b5b2b2"}
              size={28}
              style={styles.starIcon}
            />
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: "#ccc" }} />
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
  const [isBookmarkPressed, setIsBookmarkPressed] = useState(false);
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
                onPress={() => setIsBookmarkPressed(!isBookmarkPressed)}
              >
                <IconButton
                  icon={isBookmarkPressed ? "bookmark" : "bookmark-outline"}
                  style={{ margin: 0 }}
                  animated
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
