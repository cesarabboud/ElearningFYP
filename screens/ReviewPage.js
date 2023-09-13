import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { NavigationContainer,useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, List } from "react-native-paper";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const red = 29 / 3,
  green = (176 + 186 + 183) / 3,
  blue = (114 + 93 + 65) / 3;
const screenwidth = Dimensions.get("window").width;

const ListReview = ({ item }) => {

  
  return (
    <ScrollView style={{ gap: 10, marginTop: 10, marginHorizontal: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <View
          style={{
            borderRadius: "100",
            overflow: "hidden",
            width: 50,
          }}
        >
          <Image
            source={{uri:'http://192.168.0.107:8000/'+item.get_user.profilepicture}}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={{ gap: 3 }}>
          <Text>
            {item.get_user.name} {/* username */}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: screenwidth - 85,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <IconButton
                icon="star"
                iconColor={ item.rating >=1 ? "#ffc107" : "#b5b2b2"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={ item.rating >=2 ? "#ffc107" : "#b5b2b2"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={ item.rating >=3 ? "#ffc107" : "#b5b2b2"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={ item.rating >=4 ? "#ffc107" : "#b5b2b2"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={ item.rating >=5 ? "#ffc107" : "#b5b2b2"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
            </View>

            <Text>1 Day Ago</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#959595", textAlign: "left", width: 300 }}>
          {item.content}
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <IconButton
            icon={"heart"}
            iconColor="#ccc"
            size={16}
            style={{ margin: 0 }}
            onPress={()=>{}}
          />
          <Text>{item.likes}</Text>
        </View>
      </View>
      <TextInput
        placeholder="Reply to this review..."
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 5,
          marginTop: 10,
        }}
        // Add your logic to handle the user's reply
      />
    </ScrollView>
  );
};

const Reviews = () => {
  const route = useRoute();
  const { id } = route.params;
  const [reviews, setReviews] = useState([]);
  let [avg,setAvg] = useState(0)
  const getCourseReviews = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !==null) {
      try{
        const response = await fetch('http://192.168.0.107:8000/api/getCourseRev/'+id,{
          method:"GET",
          headers:{
          'Authorization':`Bearer ${token}`
          }
        })
        const resData = await response.json()
        //console.log(resData.reviews)
        setReviews(resData.reviews)
        setAvg(resData.avg)
      }
      catch(err){
        console.log(err)
      }
    }
  }
  React.useEffect(()=>{
    getCourseReviews()
  },[])
  return (
    <>
    {/* Review */}
      <View
        style={{
          marginTop: 130,
          backgroundColor: `rgb(${red},${green},${blue})`,
          padding: 8,
          borderRadius: 20,
          alignSelf: "center",
          width: 60,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {Math.floor(avg)}.0
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <IconButton icon="star" iconColor={ avg >=1 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=2 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=3 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=4 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=5 ? "#ffc107" : "#b5b2b2"} style={{ margin: 0 }} />
      </View>
      <Text style={{ textAlign: "center", fontSize: 12 }}>
        Based On {reviews.length} Reviews
      </Text>
      {/* scaling */}
      <View style={{ marginHorizontal: 20, gap: 5, marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#818181", fontWeight: "600" }}>Excellent</Text>
          <View
            style={{
              height: 8,
              width: 150,
              backgroundColor: "#d9d9d9",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "90%",
                backgroundColor: "#818181",
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#818181", fontWeight: "600" }}>Good</Text>
          <View
            style={{
              height: 8,
              width: 150,
              backgroundColor: "#d9d9d9",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "75%",
                backgroundColor: "#818181",
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#818181", fontWeight: "600" }}>Average</Text>
          <View
            style={{
              height: 8,
              width: 150,
              backgroundColor: "#d9d9d9",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "50%",
                backgroundColor: "#818181",
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#818181", fontWeight: "600" }}>
            Below Average
          </Text>
          <View
            style={{
              height: 8,
              width: 150,
              backgroundColor: "#d9d9d9",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "25%",
                backgroundColor: "#818181",
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#818181", fontWeight: "600" }}>Poor</Text>
          <View
            style={{
              height: 8,
              width: 150,
              backgroundColor: "#d9d9d9",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "10%",
                backgroundColor: "#818181",
                borderRadius: 10,
              }}
            ></View>
          </View>
        </View>
      </View>
      {/*  Horizontal Line */}
      <View
        style={{
          width: "80%",
          height: 1,
          backgroundColor: "#ccc",
          alignSelf: "center",
          marginVertical: 15,
        }}
      />
      {/* Reviews listing */}
      <FlatList
        data={reviews}
        renderItem={ListReview}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={()=>{
          return <View style={{height:1,backgroundColor:'#ccc',marginVertical:10}}/>
        }}
        style={{marginVertical:20}}
      />
      
    </>
  );
}

function CustomHeader({ scene, navigation }) {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../images/reviewsbckgrnd2.png")}
        style={styles.headerBackground}
        resizeMode="cover"
      />
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      <Text style={styles.headerText}>Reviews</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const ReviewPage = ({route}) => {
  const {id} = route.params
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        initialParams={{
          id:id
        }}
        options={({ navigation, route }) => ({
          header: (props) => (
            <CustomHeader {...props} navigation={navigation} />
          ),
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>

    //<Reviews />
  );
};

export default ReviewPage;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  //   backButton: {
  //     marginBottom: 70,
  //   },
  backButtonText: {
    fontSize: 16,
    color: "#000",
  },
  headerText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 70,
    fontWeight: "600",
    textAlign:'center'
  },
  starIcon: {
    margin: 0,
    marginRight: -15,
  },
});
