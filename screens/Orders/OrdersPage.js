import { StyleSheet, Text, View, TouchableOpacity, StatusBar,ScrollView} from 'react-native'
import React,{useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Secret_key } from '../keys/keys'
const OrdersPage = ({navigation}) => {
    const [ordersArr,setOrdersArr] = useState([])
    const LoadOrders = async () => {
        const token = await AsyncStorage.getItem('token')
        if(token !== null){
            try{
                const response = await fetch('http://192.168.0.107:8000/api/getMyOrders',{
                    method:"GET",
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                const resData = await response.json()
                // console.log(resData)
                setOrdersArr(resData.orders)
            }
            catch(err){
                console.log(err)
            }
        }
    }
    const calculatePercentage = async (id) => {
        const resp = await fetch('https://api.stripe.com/v1/charges',{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${Secret_key}`
            }
        })
        const resData = await resp.json()
        // console.log(resData.data)
        const Filtered = resData.data.filter((charge)=>charge.description === (id+''))
        console.log(Filtered[0].amount)
        return Filtered[0].amount
    }
    useEffect(()=>{
        LoadOrders()
    },[])
    const getTotal = (coursesOwned) => {
        let sum = 0;
        for(let i = 0; i<coursesOwned.length ;i++){
            sum+=coursesOwned[i].get_course.price;
        }
        return sum;
    }
    const FormatDate = (date) => {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        const month = newDate.getMonth() + 1
        const day = newDate.getDate()
        return `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2, '0')}`
    }
    const GoToDetails = async (id,coursesOwned) => {
        
        let amountPaid = await calculatePercentage(id)/100 //132
        let tot = getTotal(coursesOwned)
        let disc = 0
        if(amountPaid !== tot){
            disc = ((amountPaid*100)/tot).toFixed(2)
        }
        navigation.navigate("OrderDetails",{
            courses:coursesOwned,
            discount: disc
        })
    }
  return (
    <View style={{flex:1}}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.fixedView}>

          {/* Content that you want to be fixed */}
          <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:30,marginHorizontal:10}}>
          <Ionicons name="chevron-back" size={14} onPress={() => navigation.goBack()} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>My Orders</Text>
            <Ionicons name="chevron-back" style={{ opacity: 0 }} />
  
          </View>
        </View>
        <View style={[{marginTop:50}]} />
        <ScrollView contentContainerStyle={{paddingVertical:15,marginHorizontal:20}}>
            {
                ordersArr.map((o,idx)=>{
                    return (
                        <View style={styles.catStyle}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:18}}>Order #{idx+1}</Text>
                            <Text>{FormatDate(o.created_at)}</Text>
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Total:${getTotal(o.get_courses_owned)}</Text>
                            <Text onPress={()=>GoToDetails(o.id,o.get_courses_owned)} style={styles.orderDetailsStyle}>Order Details</Text>
                            </View>
                            
                        </View>
                    )
                })
            }
            

        </ScrollView>
    </View>
  )
}

export default OrdersPage;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    fixedView: {
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
    },
    catStyle:{
        backgroundColor:"#fff",
        marginTop:20,
        padding:20,
        borderLeftWidth:5,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: "#171717",
        gap:10
    },
    orderDetailsStyle:{
        textDecorationLine:'underline',
        color:"#898989"
    }
})