import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { NavigationContainer,useRoute} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, List } from "react-native-paper";
const screenwidth = Dimensions.get("window").width;
// const reviews = [
//   {
//     id: 1,
//     name: "Cesar Abboud",
//     rating: 5,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
//       "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
//       "dolore magna aliq.",
//   },
//   {
//     id: 2,
//     name: "Cesar Abboud",
//     rating: 5,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
//       "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
//       "dolore magna aliq.",
//   },
//   {
//     id: 3,
//     name: "Cesar Abboud",
//     rating: 5,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
//       "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
//       "dolore magna aliq.",
//   },
//   {
//     id: 4,
//     name: "Cesar Abboud",
//     rating: 5,
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
//       "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
//       "dolore magna aliq.",
//   },
// ];

const ListReview = ({ item}) => {
  return (
    <View style={{ gap: 10, marginTop: 10, marginHorizontal: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <View
          style={{
            borderRadius: "100",
            overflow: "hidden",
            width: 60,
            backgroundColor:'#ccc'
          }}
        >
          <Image
            source={{uri:'http://192.168.0.107:8000/'+item.get_user.profilepicture}}
            resizeMode="cover"
            style={{ width:60,height:60 }}
          />
        </View>
        <View style={{ gap: 3 }}>
          <Text>{item.get_user.name}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:'center',
              width: screenwidth - 85,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <IconButton
                icon="star"
                iconColor={item.rating >=1 ? "#ffc107" : "#ccc"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={item.rating >=2 ? "#ffc107" : "#ccc"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={item.rating >=3 ? "#ffc107" : "#ccc"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={item.rating >=4 ? "#ffc107" : "#ccc"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor={item.rating >=5 ? "#ffc107" : "#ccc"}
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
            </View>

            <Text style={{fontSize:13}}>{item.get_course.title}</Text>
          </View>
        </View>
      </View>
      <Text style={{ color: "#959595", textAlign: "left" }}>
        {item.content}
      </Text>
    </View>
  );
};
function Reviews({route}) {
  const {pp,reviews} = route.params
  return (
    <>
      {/* Reviews listing */}
      <FlatList
        data={reviews}
        renderItem={({item})=><ListReview item={item} pp={pp}/>}
        keyExtractor={(item) => item.id}
      />
      {/* <Text style={{textAlign:'center',backgroundColor:'red'}}>{reviews.length}</Text> */}
    </>
  );
}


const Stack = createNativeStackNavigator();

const StudentReviews = () => {
  const route = useRoute()
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{headerShown:false}}
        initialParams={{
          pp:route.params.pp,
          reviews:route.params.reviews
        }}
      />
    </Stack.Navigator>

    //<Reviews />
  );
};

export default StudentReviews;

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
  },
  starIcon: {
    margin: 0,
    marginRight: -15,
  },
});
