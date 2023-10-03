import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const LeaderBoards = () => {
    const navigation = useNavigation()
    const [leaders,setLeaders] = useState([])
    const getLeaders = async () => {
        try{
            const response = await fetch('http://192.168.0.107:8000/api/getLeaders',{
                method:"GET"
            })
            const resData = await response.json()
            setLeaders(resData.leaders)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getLeaders()
    },[])
  return (
    <View style={styles.container}>
        <View style={{padding:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{fontSize:26,fontWeight:"600"}}>Leaders</Text>
        <Text onPress={()=>navigation.navigate("FullBoard")} style={{fontWeight:"600",color:"#03ba55"}}>See All</Text>
        </View>
        
        <View style={{height:1,backgroundColor:"#000"}} />
        {
            leaders.map((l,idx)=>{
                return (
                    <View key={idx}>
                    <View  style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:15}}>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                            <Text style={{fontSize:22}}>{idx+1}</Text>
                            <Text>{l.name}</Text>
                        </View>
                        <Text style={{fontWeight:"600"}}>{l.averageScore * 20}</Text>
                    </View>
                    { idx !== leaders.length -1 ? <View style={{height:1,backgroundColor:"#ccc"}} /> : null}
                    </View>
                )
            })
        }
    </View>
  )
}

export default LeaderBoards

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowColor: "#171717",
      marginHorizontal:10,
    }
})