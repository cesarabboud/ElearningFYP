import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet, Image,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Ionicons,AntDesign } from '@expo/vector-icons';
import { useNavigation,useIsFocused } from '@react-navigation/native';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const App = () => {
  const [index, setIndex] = useState(0);
  const [recentUploads, setRecentUploads] = useState([]);

  const getRecent = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      try {
        const response = await fetch('http://192.168.0.107:8000/api/recentCourses', {
          method: 'GET'
        }).then((res) => res.json())
        .then((resData) => {
          // console.log("response data is:",JSON.stringify(resData))
          setRecentUploads(resData.courses)
          //console.log(cat)
          // console.log(cat)
        })
        // const resData = await response.json();
        // setRecentUploads(resData.courses);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const navigation = useNavigation()
  const addItemToCart = async (id) => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
        try{
            const response = await fetch('http://192.168.0.107:8000/api/addItemToCart/'+id,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            const resData = await response.json()
            console.log(resData.message)
            if(resData.message!== 'item already in cart!' && resData.message !== 'bought'){
                navigation.navigate('BottomTab', { screen: 'ShoppingCart' });
                return
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
  }
  const isFocused = useIsFocused()
  useEffect(() => {
    if(isFocused)
    getRecent();
  }, [isFocused]);
  
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={()=>navigation.navigate("CourseDetails",{
            cid:item.id,
            cat:item.get_category.name
        })}>
        <View style={{ width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden',justifyContent:'center',alignItems:'center' }}>
          <Image 
          style={{ width: '100%', height: 140 }} 
          source={{uri : 'http://192.168.0.107:8000/'+item.thumbnail}} 
          />
        </View>
        </TouchableWithoutFeedback>
        
        <View style={{ paddingLeft: 10, paddingTop: 10, gap: 5 }}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#ccc' }}>{item.get_category.name}</Text>
            {/* <View style={{flexDirection:'row',gap:3,marginRight:10}}>
                <Ionicons name='star' color={"#ffc107"} />
                <Text style={{}}>{item.rating}.00</Text>
            </View> */}
            </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{ fontSize: 16, fontWeight: '600',  }}>{item.title.length > 15 ? item.title.slice(0,15)+'...' : item.title}</Text>
            <Text style={{ fontSize: 16, fontWeight: '600' ,marginRight:10 }}>Instructor:{item.get_user.name.length > 6 ? item.get_user.name.slice(0,6)+'...' : item.get_user.name}</Text>
            
          </View>
          
        </View>
        <TouchableOpacity onPress={()=>addItemToCart(item.id)} style={{backgroundColor:'#02ba78',alignSelf:'flex-end',right:10,top:10,padding:10,position:'absolute',borderRadius:10}}>
        <Ionicons name='cart-outline' color={'#fff'} size={14}/>

        </TouchableOpacity>
        <View style={{backgroundColor:'#02ba78',alignSelf:'flex-start',left:10,top:10,padding:10,position:'absolute',borderRadius:10}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
        <AntDesign name='star' color={'#ffc107'} size={14}/>
        <Text style={{fontWeight:"600",color:"#fff"}}>{item.rating}.0</Text>
        </View>
        
        
        </View>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={recentUploads}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={0}
        onSnapToItem={setIndex}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
      />
      {/* <Text style={styles.counter}>{index+ 1}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    // backgroundColor:'red'
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default App;
