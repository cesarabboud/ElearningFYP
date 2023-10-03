import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation,useIsFocused,StackActions } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
const BookDetails = ({route}) => {
    const {cid,cat,uploader,cType} = route.params
    
  const [course,setCourse] = useState({})
  const [nbrev,setNbrev] = useState(0)
  const DetailsDeCours = async () =>{
      const token = await AsyncStorage.getItem('token')
      if(token!==null){
        try{
          const response = await fetch('http://192.168.0.107:8000/api/courseDetails/'+cid,{
            method:"GET",
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
          const resData = await response.json()
          // console.log(resData.course)
          // console.log(resData.course.get_category.name)
          setCourse(resData.course)
          console.log(resData.course)
          // console.log('course cat :',course.get_category.name)
          // console.log(resData.course.get_category.name)
          setNbrev(resData.nbrev)
          console.log('nb:'+nbrev)
        }
        catch(err){
          console.log(err)
        }
      }
    }
    const [owned,setIsOwned] = useState(null)
    const CheckIfPurchased = async () => {
      const token = await AsyncStorage.getItem('token')
      if(token !==null) {
        try{
          const response = await fetch('http://192.168.0.107:8000/api/canReview/'+cid,{
            method:'GET',
            headers:{
              'Authorization':`Bearer ${token}`
            }
          })
          const resData = await response.json()
          // console.log(resData.message)
          resData.message === 'owned' ? setIsOwned(true) : setIsOwned(false)
          console.log(owned)
        }
        catch(err){
          console.log(err)
        }
      }
    }
  const isFocused = useIsFocused()
  useEffect(()=>{
    if(isFocused){
        DetailsDeCours()
        CheckIfPurchased()
        checkifInFav()
    }
      
    
    
  },[isFocused])
  const [showMore, setShowMore] = useState(false);
  const [isBookmarkPressed,setIsBookmarkPressed] = useState(null)
  const navigation = useNavigation();
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const checkifInFav = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/checkIfInFav/'+route.params.cid,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log('resdata',resData)
        setIsBookmarkPressed(resData === 0 ? false : true)
      }
      catch(err){
        console.log(err)
      }
    }
  }
  const AddToFavorites = async () => {
    // alert('hiiii')
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/addToFav/'+route.params.cid,{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log('ho')
        console.log(resData)
        console.log(resData.userFav)
        if (resData.userFav !== undefined && resData.userFav !== null) {
          await AsyncStorage.setItem('userfav', JSON.stringify(resData.userFav));
          console.log('Data saved successfully');
        } else {
          console.warn('Data is undefined or null; not saving to AsyncStorage.');
        }
      } catch (err) {
        console.error(err);
      }
      finally {
        setIsBookmarkPressed(!isBookmarkPressed)
      }
    }
  }

  const RemoveFromFav = async () => {
    // alert('hi')
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/deleteFromFav/'+route.params.cid,{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        if (resData.userFav !== undefined && resData.userFav !== null) {
          await AsyncStorage.setItem('userfav', JSON.stringify(resData.userFav));
          console.log('Data saved successfully');
        } else {
          console.warn('Data is undefined or null; not saving to AsyncStorage.');
        }
      } catch (err) {
        console.error(err);
      }
      finally{
        setIsBookmarkPressed(!isBookmarkPressed)
      }
    }
  }
  const addItemToCart = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
        try{
            const response = await fetch('http://192.168.0.107:8000/api/addItemToCart/'+cid,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            const resData = await response.json()
            console.log(resData.message)
            
            if(resData.message!== 'item already in cart!' && resData.message !== 'bought' ){
                // navigation.replace('BottomTab', { screen: 'ShoppingCart' });
                navigation.dispatch(StackActions.replace('BottomTab', { screen: 'ShoppingCart' }));
                return
            }
        }
        catch(err){
            console.log(err)
        }
    }
  }
  return (
    <View style={{flex:1}}>
      <View style={styles.topBar}>
        <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
        <Ionicons onPress={()=>navigation.goBack()} name='chevron-back' color={"#fff"} size={20}/>
        <Text style={{fontSize:18,fontWeight:"600",color:"#fff"}}>{cType.toUpperCase()} Details</Text>
        <Ionicons onPress={isBookmarkPressed === false ? AddToFavorites : RemoveFromFav} name={isBookmarkPressed ? "bookmark" : "bookmark-outline"} color={"#fff"} size={20}/>
        </View>
        <Image 
        source={{uri:'http://192.168.0.107:8000/'+course.thumbnail}}
        style={{height:100,width:100,overflow:"hidden",borderRadius:10,marginTop:40,alignSelf:"center"}}
        />
      </View>
      <View style={{marginTop:70,alignSelf:'center',gap:8,justifyContent:'center',alignItems:"center"}}>
        <Text style={{fontSize:16,fontWeight:"600"}}>{course.title}</Text>
        <Text style={{fontSize:16,fontWeight:"600"}}>Category:{cat}</Text>
        <Text style={{fontSize:16,color:"#989898",fontWeight:"600"}}> By:{uploader}</Text>
        <Text style={{fontSize:20,fontWeight:"600"}}>{course.rating}.0</Text>
        <View style={{flexDirection:'row',gap:3}}>
            <AntDesign name='star' size={22} color={course.rating >=1 ? "#ffc107" : "#d9d9d9"}/>
            <AntDesign name='star' size={22} color={course.rating >=2 ? "#ffc107" : "#d9d9d9"}/>
            <AntDesign name='star' size={22} color={course.rating >=3 ? "#ffc107" : "#d9d9d9"}/>
            <AntDesign name='star' size={22} color={course.rating >=4 ? "#ffc107" : "#d9d9d9"}/>
            <AntDesign name='star' size={22} color={course.rating >=5 ? "#ffc107" : "#d9d9d9"}/>
        </View>
        <Text style={{fontSize:12}}>Based on {nbrev} {nbrev !== 1 ? `Reviews` : `Review`}</Text>
      </View>
      <View style={{height:1,backgroundColor:'#ccc',marginTop:20}} />
      <ScrollView>
      <View style={{margin:20,gap:15}}>
        <Text style={{fontSize:26,fontWeight:"500"}}>About</Text>
        <Text>
            {course.description}
        </Text>
      </View>
      <View style={{height:1,backgroundColor:"#ccc"}} />
      {
        nbrev > 0 ? <TouchableOpacity
        onPress={() => navigation.navigate("ReviewPage",{
          id:cid
        })}
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
      </TouchableOpacity> : null
      }
      
      <View style={{ height: 1, backgroundColor: "#ccc" }} />
      {
        owned === true ? <><TouchableOpacity
        onPress={() => navigation.navigate("AddReview",{
          id:cid,
          course:course
        })}
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
      </TouchableOpacity><View style={{height:1,backgroundColor:'#ccc'}}/></> : null
      }
          
        <View
          style={{
            alignSelf: "center",
            width: Dimensions.get("window").width - 70,
            backgroundColor: "#03ba55",
            height: 60,
            borderRadius: 12,
            marginVertical:30,
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
            ${course.price}.00
          </Text>
          <TouchableOpacity
          onPress={addItemToCart}
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
      </ScrollView>
      
          
    </View>
  )
}

export default BookDetails

const styles = StyleSheet.create({
    topBar:{
        backgroundColor:"#1E2A23",
        height:140,
        paddingTop:30,
        paddingHorizontal:20,
        
    }
})