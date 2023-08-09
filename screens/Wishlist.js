import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, List } from "react-native-paper";
const Stack = createNativeStackNavigator();
function CustomHeader({navigation}) {
  return (
    <ImageBackground
      source={require("../images/reviewsbckgrnd2.png")}
      style={{ height: 150 }}
    >
      <SafeAreaView>
        <TouchableOpacity
          style={{ position: "absolute", marginTop: 18, marginLeft: 15 }}
          
        >
          <IconButton
            onPress={()=>navigation.goBack()}
            icon={"chevron-left"}
            style={{ margin: 0 }}
            iconColor="#000"
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            marginTop: 10,
            fontSize: 18,
          }}
        >
          Wishlist
        </Text>
      </SafeAreaView>

      <StatusBar barStyle={"dark-content"} />
    </ImageBackground>
  );
}
const Wishlist = () => {
  return (
    <View
      style={{
        marginTop: 160,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "lightgrey",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 18 }}>
          In-Wishlist Items(10)
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "600", fontSize: 18, color: "#11b741" }}>
            Clear Wishlist
          </Text>
          <IconButton
            icon={"delete"}
            iconColor="#11b741"
            style={{ margin: 0 }}
          />
        </TouchableOpacity>
      </View>
      {/* list of pdfs */}

        
      
      <View style={{marginBottom:100}}>
        <ScrollView contentContainerStyle={{gap:15,margin:30}}>

        
        <View
          style={{
            borderRadius: 12,
            flexDirection: "row",
            gap: 5,
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "#02ba5d",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              resizeMode="contain"
              source={require("../images/pdfcover.png")}
              style={{ height: 120 }}
            />
            <View style={{ justifyContent: "flex-start", rowGap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                JS For Beginners
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
                By: Axel Raushmayer
              </Text>
            </View>
          </View>

          
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity>
              <IconButton icon="close" style={{}} iconColor="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderRadius: 12,
            flexDirection: "row",
            gap: 5,
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "#02ba5d",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              resizeMode="contain"
              source={require("../images/pdfcover.png")}
              style={{ height: 120 }}
            />
            <View style={{ justifyContent: "flex-start", rowGap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                JS For Beginners
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
                By: Axel Raushmayer
              </Text>
            </View>
          </View>

          
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity>
              <IconButton icon="close" style={{}} iconColor="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>


        <View
          style={{
            borderRadius: 12,
            flexDirection: "row",
            gap: 5,
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "#02ba5d",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              resizeMode="contain"
              source={require("../images/pdfcover.png")}
              style={{ height: 120 }}
            />
            <View style={{ justifyContent: "flex-start", rowGap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                JS For Beginners
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
                By: Axel Raushmayer
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity>
              <IconButton icon="close" style={{}} iconColor="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderRadius: 12,
            flexDirection: "row",
            gap: 5,
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "#02ba5d",
            //hom mn oul eza ken ekhir pdf bade margin bottom = 100 eza la2 mabadna chi
            marginBottom:100
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              resizeMode="contain"
              source={require("../images/pdfcover.png")}
              style={{ height: 120 }}
            />
            <View style={{ justifyContent: "flex-start", rowGap: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                JS For Beginners
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
                By: Axel Raushmayer
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity>
              <IconButton icon="close" style={{}} iconColor="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
     </View>
  );
};
const WishlistPage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
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

export default WishlistPage;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: StatusBar.currentHeight,
    height: 150,
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  headerText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
});
