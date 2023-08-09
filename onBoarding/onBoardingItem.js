import { View, Text,StyleSheet,useWindowDimensions,SafeAreaView,Image } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';

function onBoardingItem({item}) {
    const {width} = useWindowDimensions()
  return (
    <View style={[styles.container,{width}]}>
      <Image source={item.image} style={[styles.image,{width ,resizeMode:"contain"}]}/>
      <View style={{flex:0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

export default onBoardingItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image:{
        flex:0.7,
        justifyContent:'center'
    },
    title:{
        fontWeight:'800',
        fontSize:28,
        marginBottom:10,
        color:"#1E2A23",
        textAlign:'center'
    },
    description:{
        fontWeight:'300',
        color:'#62656b',
        textAlign:'center',
        paddingHorizontal:64
    }
  });

  