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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, List } from "react-native-paper";
const red = 29 / 3,
  green = (176 + 186 + 183) / 3,
  blue = (114 + 93 + 65) / 3;
const screenwidth = Dimensions.get("window").width;
const reviews = [
  {
    id: 1,
    name: "Cesar Abboud",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
      "dolore magna aliq.",
  },
  {
    id: 2,
    name: "Cesar Abboud",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
      "dolore magna aliq.",
  },
  {
    id: 3,
    name: "Cesar Abboud",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
      "dolore magna aliq.",
  },
  {
    id: 4,
    name: "Cesar Abboud",
    rating: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet," +
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
      "dolore magna aliq.",
  },
];

const ListReview = ({ item }) => {
  return (
    <View style={{ gap: 10, marginTop: 10, marginHorizontal: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <View
          style={{
            borderRadius: "100",
            overflow: "hidden",
            width: 60,
          }}
        >
          <Image
            source={require("../images/profilepic.jpg")}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View style={{ gap: 3 }}>
          <Text>{item.name}</Text>

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
                iconColor="#ffc107"
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor="#ffc107"
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor="#ffc107"
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor="#ffc107"
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
              <IconButton
                icon="star"
                iconColor="#ffc107"
                size={18}
                style={{ marginHorizontal: -10, marginVertical: -8 }}
              />
            </View>

            <Text>1 Day Ago</Text>
          </View>
        </View>
      </View>
      <Text style={{ color: "#959595", textAlign: "left" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliq.
      </Text>
    </View>
  );
};
function Reviews({ navigation }) {
  return (
    <>
      {/* Reviews listing */}
      <FlatList
        data={reviews}
        renderItem={ListReview}
        keyExtractor={(item) => item.id}
      />
      {/* <Text style={{textAlign:'center',backgroundColor:'red'}}>{reviews.length}</Text> */}
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

const StudentReviews = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{headerShown:false}}
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
