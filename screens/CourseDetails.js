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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const CourseDetails = () => {
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <ScrollView>
      <Image source={require("../images/jsyellow.png")} />
      <TouchableOpacity style={styles.playBtnView}>
        <View>
          <IconButton
            icon={"play"}
            iconColor="#fff"
            size={28}
            style={{ margin: 0 }}
          />
        </View>
      </TouchableOpacity>
      <View style={{ marginHorizontal: 15, gap: 5 }}>
        <Text
          style={{
            textTransform: "uppercase",
            color: "#a9a9a9",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          Coding
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 16, fontWeight: "600" }}>
          Learning JS in 30 Days
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
              <Text style={{ marginLeft: -5, fontWeight: "600" }}>4.0</Text>
            </View>
            <Text style={{ color: "#a9a9a9", fontWeight: "600" }}>(20)</Text>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, sapien vel bibendum ultricies, velit nunc bibendum
                nunc, vel blandit velit magna vel velit. Sed euismod, sapien vel
                bibendum ultricies, velit nunc bibendum nunc, vel blandit velit
                magna vel velit
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
            <Text style={{ fontSize: 20 }}>4.0</Text>
            <Text style={{ fontSize: 20 }}>/5</Text>
          </View>
          <Text style={{ fontWeight: "500" }}>Based on 20 Reviews</Text>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <IconButton
              icon="star"
              iconColor="#ffc107"
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor="#ffc107"
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor="#ffc107"
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor="#ffc107"
              size={28}
              style={styles.starIcon}
            />
            <IconButton
              icon="star"
              iconColor="#b5b2b2"
              size={28}
              style={{ margin: 0 }}
            />
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: "#ccc" }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("ReviewPage")}
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
        <View style={{ height: 1, backgroundColor: "#ccc" }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("AddReview")}
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
            $80.00
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
      onPress={() => navigation.navigate("LoginScreen")}
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
  const [isBookmarkPressed, setIsBookmarkPressed] = useState(false);
  return (
    <Stack.Navigator>
<Stack.Screen
      name="CourseDetails"
      component={CourseDetails}
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
