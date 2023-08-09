import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  useColorScheme
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";

const ShoppingCart = () => {
  return (
    //if the cart is empty
      <SafeAreaView style={{justifyContent:'center',alignItems:'center',flex:1,gap:20,backgroundColor:'#fff'}}>

        <StatusBar style="dark" />
        <Image
            style={{ height:180 }}
            resizeMode="contain"
            source={require("../images/undrawEmpty.png")}
          />
          <Text style={{fontSize:30,color:'#11b741',fontWeight:'500'}}>Your Cart Is Empty !</Text>
          <Text style={{fontSize:16,width:Dimensions.get('window').width-200,textAlign:'center',color:'#bababa'}}>Looks like you haven’t added anything to your cart yet.</Text>
          <TouchableOpacity style={{borderColor:'#02ba5d',borderWidth:1,borderRadius:10,padding:15,width:Dimensions.get('window').width-150,justifyContent:'center',alignItems:'center',height:55}}>
            <Text style={{fontWeight:'500',color:'#02ba5d'}}>Check Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#02ba5d',borderRadius:10,padding:15,width:Dimensions.get('window').width-150,justifyContent:'center',alignItems:'center',height:55}}>
            <Text style={{color:'#fff',fontWeight:'500'}}>Start Browsing</Text>
          </TouchableOpacity>
          
          
          <StatusBar style='dark'/>
      </SafeAreaView>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({});
