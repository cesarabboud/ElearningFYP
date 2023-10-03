import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
const OrderDetails = ({navigation,route}) => {
  const courses = route.params.courses
  const discount = route.params.discount
  // console.log(courses)
  const calculateSum = () => {
    let sum = 0;
    for(let i=0 ; i< courses.length; i++){
      sum+=courses[i].get_course.price;
    }
    return sum;
  }
  return (
    <View style={{flex:1}}>
      <View style={styles.fixedView}>

        <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:30,marginHorizontal:10}}>
        <Ionicons name="chevron-back" size={14} onPress={() => navigation.goBack()} />
          <Text style={{ fontWeight: "600", fontSize: 16 }}>Order Details</Text>
          <Ionicons name="chevron-back" style={{ opacity: 0 }} />
        </View>
      </View>
      <ScrollView style={{marginTop:90,marginHorizontal:20}}>
        {
          courses.map((c,idx)=>{
            return (
              <View key={idx} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text>{idx+1}){c.get_course.title}</Text>
                <Text>${c.get_course.price}.00</Text>
              </View>
            
            )
          })
        }
        <View style={{height:1,backgroundColor:"#000"}} />
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={{fontWeight:"600"}}>Total</Text>
          <Text style={{fontWeight:"600"}}>${calculateSum()}.00</Text>
        </View>
        
        {
          discount !== 0 ? <>
            <View style={{height:1,backgroundColor:"#000"}} />
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text>Discount({100 - discount}%)</Text>
            <Text>$-{calculateSum() - ((calculateSum()*discount)/100)}.00</Text>
            </View>
          </> : null
        }
        {
          discount !== 0 ? <>
            <View style={{height:1,backgroundColor:"#000"}} />
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:"600"}}>Total After Discount</Text>
            <Text style={{fontWeight:"600"}}>${calculateSum() - ( calculateSum() - ((calculateSum()*discount)/100) )}.00</Text>
            </View>
          </> : null
        }
      </ScrollView>
    </View>
  )
}

export default OrderDetails

const styles = StyleSheet.create({
  fixedView:{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop:20,
      backgroundColor: 'white', // Set your desired background color
      zIndex: 1,
      padding:10,
      borderBottomWidth:1,
      borderBottomColor:'#ccc'
  
  }
})