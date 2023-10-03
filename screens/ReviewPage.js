import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,

} from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { NavigationContainer,useIsFocused,useNavigation,useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, List } from "react-native-paper";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Ionicons,Feather } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import AnimationWithDelete from './AnimationWithDelete'
import { Button } from "react-native";
import { Keyboard } from "react-native";
import { ImageBackground } from "react-native";
const red = 29 / 3,
  green = (176 + 186 + 183) / 3,
  blue = (114 + 93 + 65) / 3;
const screenwidth = Dimensions.get("window").width;


const Reviews = () => {
  const route = useRoute();
  const { id } = route.params;
  const [reviews, setReviews] = useState([]);
  let [avg,setAvg] = useState(0)


  const [reviewIdToReply,setReviewIdToReply] = useState(-1)
  const HandleReplyPress = (id) => {
    setIsFocused(!isFocusedd)
    setIsHidden(!hidden)
    setReviewIdToReply(id)
  }
  const AddReply = async () => {
    
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/addReply/'+reviewIdToReply,{
          method:'POST',
          headers:{
          "Authorization":`Bearer ${token}`,
          "Accept": 'application.json',
          'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            response:answerfield
          })
        })
        const resData = await response.json()
        console.log(resData)
        Keyboard.dismiss()
        setIsFocused(!isFocusedd)
        setIsHidden(true)
        setAnswerField('')
        getCourseReviews()
      }
      catch(err){
        console.log(err)
      }
    }
  }


  const [isFocusedd,setIsFocused] =useState(false)
  const [answerfield,setAnswerField] = useState('')
  const [hidden,setIsHidden] = useState(true)
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const Basic = () => {
    const [listData, setListData] = useState(
      reviews.map((item, index) => ({ 
        key: `${index}`,
        id:item.id,
        review:item.content,
        rating:item.rating,
        picture:item.get_user.profilepicture,
        uName:item.get_user.name,
        userId:item.get_user.id,
        repliesCount:item.get_replies_count,
        repliesForReview:item.get_replies,
        visible:false
    }))
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey,reviewId) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
        const token = await AsyncStorage.getItem('token')
        if(token !== null){
          try{
            const response = await fetch('http://192.168.0.107:8000/api/deleteReview/'+reviewId,{
              method:"GET",
              headers:{
                "Authorization":`Bearer ${token}`
              }
            })
            const resData = await response.json()
            console.log(resData)
            getCourseReviews()
            
          }
          catch(err){
            console.log(err)
          }
        }
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };
    const changeVisibility = (revId) => {
      const updatedArr = listData.map((item, index) => {
        if (item.id === revId) {
          return {
            ...item,
            visible: true
          };
        }
        return item;
      });
    setListData(updatedArr)
    }

    const hideReplies = (revId) => {
      const updatedArr = listData.map((item, index) => {
        if (item.id === revId) {
          return {
            ...item,
            visible: false
          };
        }
        return item;
      });
    setListData(updatedArr)
    }

    
    

    const renderItem = (data,rowMap) => {
      
      return (
        <>
          <View style={{}}>
      <SwipeRow
          // disableLeftSwipe={parseInt(data.item.key) % 2 === 0}
          // leftOpenValue={20 + Math.random() * 150}
          rightOpenValue={-75}
      >
          
          <View style={styles.rowBack}>
              {/* <Text>Left</Text> */}
              {/* <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={() => closeRow(rowMap, data.item.key)}
              >
                  <Text style={styles.backTextWhite}>Close</Text>
              </TouchableOpacity> */}
              
              <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => deleteRow(rowMap, data.item.key,data.item.id)}
              >
                  <Text style={styles.backTextWhite}>Delete</Text>
              </TouchableOpacity>
          </View>
          <TouchableHighlight
              onPress={() => {
                console.log('You touched me')
              }}
              style={styles.rowFront}
              underlayColor={'#AAA'}
          >
              <View style={{justifyContent:'center',marginHorizontal:20,gap:5}}> 
  
  
                  {/* <Text>{data.item.review}</Text> */}
                  {/* {data.item.repliesForReview.length > 0 ?
                   <View>
                    {
                      data.item.repliesForReview.map((r,idx)=>{
                        return <Text>{r.response}</Text>
                      })
                    }
                   </View>
                   : null} */}
                <View style={{flexDirection:'row',gap:5}}>
                  <Image 
                  source={{uri:'http://192.168.0.107:8000/'+data.item.picture}}
                  style={{width:40,height:40,overflow:"hidden",backgroundColor:'#ccc',borderRadius:50}}
                  />
                  <View style={{justifyContent:'space-between'}}>
                  <Text style={{fontSize:18}}>{data.item.uName}</Text>
                  <View style={{flexDirection:'row',gap:5}}>
                  <View style={{flexDirection:'row',gap:1}}>
                   <Ionicons name="star" color={data.item.rating >= 1 ? "#ffc107" : "#B5B2B2"} />
                   <Ionicons name="star" color={data.item.rating >= 2 ? "#ffc107" : "#B5B2B2"} />
                   <Ionicons name="star" color={data.item.rating >= 3 ? "#ffc107" : "#B5B2B2"} />
                   <Ionicons name="star" color={data.item.rating >= 4 ? "#ffc107" : "#B5B2B2"} />
                   <Ionicons name="star" color={data.item.rating >= 5 ? "#ffc107" : "#B5B2B2"} />
                  </View>
                  <Text>{data.item.rating}.0</Text>
                  </View>
                  
                  </View>
                  
                </View>
                <Text style={{color:"#959595"}}>{data.item.review}</Text>
              </View>
          </TouchableHighlight>
      </SwipeRow>
  
      {/* Add the additional text outside of SwipeRow */}
      {/* replies list for each review */}
      <View style={{}}>
      
      {data.item.repliesCount > 0 && data.item.visible === false ?
      <View style={{flexDirection:'row',gap:5}}>
      <TouchableOpacity onPress={()=>HandleReplyPress(data.item.id)}>
      <Text style={{marginLeft:55}}>Reply</Text>
      </TouchableOpacity>
      
      <Text onPress={()=>changeVisibility(data.item.id)}>See Replies({data.item.repliesCount})</Text>
      
      </View> 
    :
    <>
    <View style={{flexDirection:'row',gap:5}}>
      
    <TouchableOpacity onPress={()=>HandleReplyPress(data.item.id)}>
      <Text style={{marginLeft:55}}>Reply</Text>
      </TouchableOpacity>
      {data.item.repliesForReview.length > 0 ? <Text onPress={()=>hideReplies(data.item.id)}>Hide Replies</Text> : null}
    </View>
      
      { data.item.repliesForReview.length > 0 ? <AnimationWithDelete repliesData={data.item.repliesForReview} idOfUser={userId} /> : null}
    </>
  }
        
      </View>
      
  </View>
        </>
          
      );
    } 

    const renderHiddenItem = (data, rowMap) =>{
      if(userId === data.item.userId){
        return (
          <View style={styles.rowBack}>
              {/* <Text>Left</Text> */}
              <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={() => closeRow(rowMap, data.item.key)}
              >
                  <Text style={styles.backTextWhite}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => deleteRow(rowMap, data.item.key,data.item.id)}
              >
                  <Text style={styles.backTextWhite}>Delete</Text>
              </TouchableOpacity>
          </View>
      );
      }
      
    } 

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                // renderHiddenItem={renderHiddenItem}
                // leftOpenValue={75}
                // rightOpenValue={-150}
                // previewRowKey={'0'}
                // previewOpenValue={-40}
                // previewOpenDelay={3000}
                // onRowDidOpen={onRowDidOpen}
                // style={{paddingTop:20}}
            />
        </View>
    );
}
  const navigation = useNavigation()
  const [percentages,setPercentages] = useState([])
  const [userId,setUserId] = useState(-1)
  const getCourseReviews = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !==null) {
      try{
        const response = await fetch('http://192.168.0.107:8000/api/getCourseRev/'+id,{
          method:"GET",
          headers:{
          'Authorization':`Bearer ${token}`
          }
        })
        const resData = await response.json()
        //console.log(resData.reviews)
        setReviews(resData.reviews)
        
        setAvg(resData.avg)
        setPercentages(resData.percentages)
        // console.log(percentages)
        setUserId(resData.uId)
        if(resData.reviews.length === 0){
          navigation.goBack()
        }
      }
      catch(err){
        console.log(err)
      }
    }
  }
  const isFocused = useIsFocused()
  React.useEffect(()=>{
    if(isFocused){
      getCourseReviews()
    }
    
  },[isFocused])
  const revHeader =`<svg width="439" height="156" viewBox="0 0 439 156" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M211.554 118.335C317.722 47.9538 353.087 171.621 439 154.32V0H0V38.8841C34.684 105.131 109.253 186.153 211.554 118.335Z" fill="#1E2A23"/>
  <path d="M211.554 71.3046C317.722 28.8953 353.087 103.412 439 92.9878V0H0V23.4302C34.684 63.3482 109.253 112.169 211.554 71.3046Z" fill="url(#paint0_linear_1230_4)"/>
  <defs>
  <linearGradient id="paint0_linear_1230_4" x1="419.07" y1="-82.6919" x2="261.342" y2="230.573" gradientUnits="userSpaceOnUse">
  <stop stop-color="#0AB072"/>
  <stop offset="0.479167" stop-color="#02BA5D"/>
  <stop offset="0.994792" stop-color="#11B741"/>
  </linearGradient>
  </defs>
  </svg>
  `
  const levels=["Excellent","Good","Average","Below Average","Poor"], 
  colors=["#50AB52","#a1d22e","#f9e742","#f7a330","#ef3a18"]
  return (
    <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
    {/* Review */}
      <View>
        <ImageBackground
        source={require('../images/reviewsbckgrnd2.png')}
        style={{width:'100%',height:170}}
        >
          <View style={{marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:20}}>
            <Ionicons name="chevron-back" onPress={()=>navigation.goBack()}/>
            <Text style={{fontSize:17,fontWeight:"600"}}>Reviews</Text>
            <Ionicons name="chevron-back" style={{opacity:0}} />
          </View>
        </ImageBackground>
        {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          
          <Ionicons name="chevron-back" />
          <Text style={{textAlign:'center'}}>Reviews</Text>
          <Ionicons name="add" style={{opacity:0}}/>

        </View> */}
        
      </View>
      
      <View
        style={{
          backgroundColor: `rgb(${red},${green},${blue})`,
          padding: 8,
          borderRadius: 20,
          alignSelf: "center",
          width: 60,
          
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {Math.floor(avg)}.0
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <IconButton icon="star" iconColor={ avg >=1 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=2 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=3 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=4 ? "#ffc107" : "#b5b2b2"} style={styles.starIcon} />
        <IconButton icon="star" iconColor={ avg >=5 ? "#ffc107" : "#b5b2b2"} style={{ margin: 0 }} />
      </View>
      <Text style={{ textAlign: "center", fontSize: 12 }}>
        Based On {reviews.length} Reviews
      </Text>
      {/* scaling */}
      <View style={{ marginHorizontal: 20, gap: 5, marginTop: 20 }}>
        {
          percentages.map((p,idx)=>{
            return (
              <View
              key={idx.toString()}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#818181", fontWeight: "600" }}>{levels[idx]}</Text>
              <View
                style={{
                  height: 8,
                  width: 150,
                  backgroundColor: "#d9d9d9",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: `${p}%`,
                    backgroundColor: colors[idx],
                    borderRadius: 10,
                  }}
                ></View>
              </View>
            </View>
              )
          })
        }
        
        
        
        
        
      </View>
      {/*  Horizontal Line */}
      <View
        style={{
          width: "80%",
          height: 1,
          backgroundColor: "#ccc",
          alignSelf: "center",
          marginVertical: 15,
        }}
      />
      {/* Reviews listing */}
      {/* <FlatList
        data={reviews}
        renderItem={ListReview}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={()=>{
          return <View style={{height:1,backgroundColor:'#ccc',marginVertical:10}}/>
        }}
        style={{marginVertical:20}}
      /> */}
      <Basic />
      {
        hidden ? null : <View style={[{flexDirection:'row', height: 50, backgroundColor: '#fff', width: '100%',borderTopWidth:2,borderTopColor:"#ccc" }, isFocusedd && styles.focusedTextInput]}>
        <View style={{justifyContent:'center',alignItems:'center',width:50,height:50}}>
            <Feather name="send" size={20} color={'#808080'}/>
          </View>
          <TextInput
          placeholder={'Leave A Reply'} 
          style={{width:'72.7%',height:'100%',paddingLeft:5}} 
          onFocus={handleFocus} 
          onBlur={handleBlur}
          value={answerfield}
          onChangeText={(text)=>setAnswerField(text)}
          autoFocus
          />
          {/* <Text>{keyboardHeight}</Text> */}
          <TouchableOpacity onPress={AddReply} disabled={answerfield === '' ? true : false} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#4090db',width:50,height:50}}>
            <Feather name="check" size={20} color={answerfield === '' ?'#ccc' : '#fff'}/>
          </TouchableOpacity>
        </View>
      }
      
    </View>
  );
}

function CustomHeader({ scene, navigation }) {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../images/reviewsbckgrnd2.png")}
        style={styles.headerBackground}
        resizeMode="cover"
      />
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      <Text style={styles.headerText}>Reviews</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const ReviewPage = ({route}) => {
  const {id} = route.params
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        initialParams={{
          id:id
        }}
        // options={({ navigation, route }) => ({
        //   header: (props) => (
        //     <CustomHeader {...props} navigation={navigation} />
        //   ),
        //   headerTransparent: true,
        // })}
        options={{headerShown:false}}
      />
    </Stack.Navigator>

    //<Reviews />
  );
};

export default ReviewPage;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    textAlign:'center'
  },
  starIcon: {
    margin: 0,
    marginRight: -15,
  },

  //---
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
},
backTextWhite: {
    color: '#FFF',
},
rowFront: {
    // alignItems: 'center',
    backgroundColor: '#f5f5f5',
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    justifyContent: 'center',
},
rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
},
backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
},
backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
},
focusedTextInput: {
  marginBottom: 215,
},
});
