import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  
  TouchableWithoutFeedback,
  
} from "react-native";
import Splash from "./screens/splash";
import OnBoarding from "./onBoarding/onBoarding";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/forgotpassScreen";
import ChooseRole from "./screens/chooseRole";
import {
  NavigationContainer,
  useNavigation,
  getFocusedRouteNameFromRoute,
  
} from "@react-navigation/native";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import TestScreen from "./screens/testScreen";
import StudentProfile from "./screens/StudentProfile";
import ReviewPage from "./screens/ReviewPage";
import SearchPage from "./screens/SearchPage";
import CourseDetails from "./screens/CourseDetails";
import AddReview from "./screens/AddReview";
import MyPDFs from "./screens/MyPDFs";
import Settings from "./screens/Settings";
import { IconButton } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import Wishlist from "./screens/Wishlist";
import ShoppingCart from "./screens/ShoppingCart";
//import Test from './screens/test.tsx'
import StudentsList from "./adminPages/StudentsList";
import TeachersList from "./adminPages/TeachersList";
import StudentDetails from "./adminPages/StudentDetails";
import AdminProfile from "./adminPages/AdminProfile";
import StudentReviews from "./adminPages/StudentReviews";
import InstructorProfile from "./instructorPages/InstructorProfile";
import UploadCourse from "./instructorPages/UploadCourse";
import InstructorStudents from "./instructorPages/InstructorStudents";
import EditProfile from "./instructorPages/EditProfile";
import WebBrowser from "./screens/WebBrowser";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabsAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="StudentsList"
      screenOptions={{
        tabBarActiveTintColor: "#03ba55",
        tabBarInactiveTintColor: "#fff",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#13131A",
        },
        tabBarLabelStyle: {
          display: "none",
        },
      }}
    >
      <Tab.Screen
        name="StudentsList"
        component={StudentsList}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const focusedRoute = getFocusedRouteNameFromRoute(route);
            const isCurrentScreen = focusedRoute === "StudentsList";

            return (
              <Feather
                name="users"
                color={isCurrentScreen ? "#03ba55" : color}
                size={size}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="TeachersList"
        component={TeachersList}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const focusedRoute = getFocusedRouteNameFromRoute(route);
            const isCurrentScreen = focusedRoute === "TeachersList";

            return (
              <MaterialCommunityIcons
                name="alpha-t"
                color={isCurrentScreen ? "#03ba55" : color}
                size={40}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const focusedRoute = getFocusedRouteNameFromRoute(route);
            const isCurrentScreen = focusedRoute === "AdminProfile";

            return (
              <MaterialCommunityIcons
                name="account-circle"
                color={isCurrentScreen ? "#03ba55" : color}
                size={30}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
}
function MyTabsStudent() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "#03ba55", 
        tabBarInactiveTintColor: "#fff",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
      }}
      
    >
      <Tab.Screen

        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          //tabBarBadge:2
        }}
      />
      {/* <Tab.Screen
        name="ProfileScreen"
        component={StudentProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const MyPDFGoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <IconButton
        style={{
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        icon="chevron-left"
        iconColor="#000"
      />
    </TouchableOpacity>
  );
};
const AddReviewHeader = () => {
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
const App = ({ navigation }) => {
  

  // const CustomHeader = ({ scene, navigation }) => {
  //   return (
  //     <View style={styles.headerContainer}>
  //       <Image
  //         source={require("./images/reviewsbckgrnd2.png")}
  //         style={styles.headerBackground}
  //         resizeMode="cover"
  //       />
  //       {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
  //         <Text style={styles.backButtonText}>Back</Text>
  //       </TouchableOpacity> */}
  //       <Text style={styles.headerText}>Reviews</Text>
  //     </View>
  //   );
  // };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="ChooseRole"
          component={ChooseRole}
          options={{
            headerLeft: () => <></>,

            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: "#1e2a23", // set the background color
            },
            headerTintColor: "#fff", // set the text color

            headerTitle: "Choose Role",
          }}
        />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        {/* <Stack.Screen
          name="ReviewwwPage"
          component={ReviewPage}
          options={({ navigation }) => ({
            header: ({ scene }) => (
              <CustomHeader navigation={navigation} scene={scene} />
            ),
            headerTransparent: true,
          })}
        /> */}
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          
        />
        <Stack.Screen
          name="AddReview"
          component={AddReview}
          options={{
            headerLeft: () => <AddReviewHeader />,
            headerShown: true,
            title: "Add Review",
            // headerStyle:{
            //   backgroundColor:'#02ba5d'
            // }
          }}
        />
        <Stack.Screen
          name="MyPDFs"
          component={MyPDFs}
          options={{
            headerShown: true,
            title: "My PDFs",
            headerBackVisible: false,
            headerLeft: () => <MyPDFGoBack />,

            headerTitleContainerStyle: {
              height: 100, // Adjust the height value as needed
            },
          }}
        />
        <Stack.Screen name="ReviewPage" component={ReviewPage} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            headerBackVisible: false,
            headerLeft: () => <MyPDFGoBack />,
          }}
        />
        <Stack.Screen name="Wishlist" component={Wishlist} options={{}} />
        <Stack.Screen name="BottomTab" component={MyTabsStudent} />
        <Stack.Screen name="StudentsList" component={StudentsList} />
        <Stack.Screen name="AdminTab" component={MyTabsAdmin} />
        <Stack.Screen
          name="StudentDetails"
          component={StudentDetails}
          options={{
            headerShown: true,
            title: "Student Details",
            headerStyle: { backgroundColor: "#03ba55" },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconButton
                  icon="chevron-left"
                  iconColor="#000"
                  style={{ margin: 0 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        {/* ma3 l admin */}
        <Stack.Screen
          name="StudentReviews"
          component={StudentReviews}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#03ba55" },
            title: "Student Reviews",
            headerLeft: () => (
              <IconButton
                icon={"chevron-left"}
                iconColor="#000"
                style={{ margin: 0 }}
              />
            ),
          }}
        />
        <Stack.Screen name="InstructorProfile" component={InstructorProfile} />
        <Stack.Screen
          name="UploadCourse"
          component={UploadCourse}
          options={{
            headerShown: true,
            title: "Upload Course",
            headerStyle: {},
          }}
        />
        <Stack.Screen
          name="InstructorStudents"
          component={InstructorStudents}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: true, title: "Edit Profile",headerLeft:()=><></>}}
        />
        <Stack.Screen
          name="WebBrowser"
          component={WebBrowser}
          
        />
        <Stack.Screen
        name="Studentprofile"
        component={StudentProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  //return <ReviewPage />;
  //return <StudentProfile />
};
export default App;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
