import { 
    StyleSheet, Text,TextInput,Keyboard, View, Image, StatusBar,TouchableOpacity, Dimensions,ScrollView ,SafeAreaView,Modal,TouchableHighlight,Button,FlatList
  } from "react-native";
  import { Card, IconButton } from "react-native-paper";
  import React,{useState,useEffect} from "react";
  const screenWidth = Dimensions.get('window').width
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Ionicons,Feather } from "@expo/vector-icons";
  import {StackActions, useNavigation } from "@react-navigation/native";
  import Icon from 'react-native-vector-icons/MaterialIcons'
import { ImageBackground } from "react-native";
  const WIDTH = Dimensions.get("window").width / 2 - 30;
  const CategoryCourses = ({route}) => {
    const {categoryId,catName} = route.params
    const [pdfArr,setPdfArr] = useState([])
    const [pptxArr,setpptxArr] = useState([])
    const [docxArr,setdocxArr] = useState([])
    const [vidArr,setVidArr] = useState([])

    const navigation = useNavigation()
    const [input,setInput] = useState("")
    const GetRelatedCourses = async () => {
        try{
            const response = await fetch('http://192.168.0.107:8000/api/getCoursesByCat/'+categoryId,{
                method:"GET",
            })
            const resData = await response.json()

            setPdfArr(!resData.courses.pdf ? [] : resData.courses.pdf)
            setpptxArr(!resData.courses.pptx ? [] : resData.courses.pptx)
            setVidArr(!resData.courses.mp4 ? [] : resData.courses.mp4)
            setdocxArr(!resData.courses.docx ? [] : resData.courses.docx)
        }
        catch(err){
            console.log(err)
        }
    }

    const PDFInput = (props) => {
        const name = props.name
        const filteredPDFs = pdfArr.filter((c) => c.title.toLowerCase().includes(name.toLowerCase()));
        if(filteredPDFs.length !== 0){
            return (
                <>
            <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>PDF({filteredPDFs.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                
                filteredPDFs.map((elt,idx)=>{
                    return <CardDesign item={elt} key={idx} />
                })
            }
            </ScrollView>
            </>
                
            )
        }
    }
    const PPTXInput = (props) => {
        const name = props.name
        const filteredPPTX = pptxArr.filter((c) => c.title.toLowerCase().includes(name.toLowerCase()));
        if(filteredPPTX.length !== 0){
            return (
                <>
            <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>PPTX({filteredPPTX.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                
                filteredPPTX.map((elt,idx)=>{
                    return <CardDesign item={elt} key={idx} />
                })
            }
            </ScrollView>
            </>
                
            )
        }
    }
    const DOCXInput = (props) => {
        const name = props.name
        const filteredDOCXs = docxArr.filter((c) => c.title.toLowerCase().includes(name.toLowerCase()));
        if(filteredDOCXs.length !== 0){
            return (
                <>
            <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>DOCX({filteredDOCXs.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                
                filteredDOCXs.map((elt,idx)=>{
                    return <CardDesign item={elt} key={idx} />
                })
            }
            </ScrollView>
            </>
                
            )
        }
        return null
    }
    const VidInput = (props) => {
      const name = props.name
      const filteredVids = vidArr.filter((c) => c.title.toLowerCase().includes(name.toLowerCase()));
      if(filteredVids.length !== 0){
          return (
              <>
          <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>MP4({filteredVids.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
              
              filteredVids.map((elt,idx)=>{
                  return <CardDesign item={elt} key={idx} />
              })
          }
          </ScrollView>
          </>
              
          )
      }
      return null
  }
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
    React.useEffect(()=>{
        GetRelatedCourses()
    },[])
    const CardDesign = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={1}>
        <View style={styles.card}>
          
          {/* <Icon name="favorite-outline" 
           size={20}  style={{alignSelf:"flex-end"}}/> */}

          <TouchableOpacity
          onPress={()=>navigation.navigate(item.type === 'mp4' ? "CourseDetails" : "BookDetails",{
            cid:item.id,
            cat:item.get_category.name,
            uploader:item.get_user.name,
            cType:item.type
          })}
          >
          <Image source={{uri:'http://192.168.0.107:8000/'+item.thumbnail}} style={{ marginTop:20, alignSelf:"center", height:110,width:80 , resizeMode: "cover" }} />

          </TouchableOpacity>
          

          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 20, color: "#131313",}}>
          {item.title.length > 10 ? item.title.slice(0,10)+'...' : item.title}
          </Text>

          <View style={{ flexDirection: "row",alignItems:"center", justifyContent: "space-between", marginTop: 5, }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "#131313", marginTop: 2, }}>
              ${item.price}.00
            </Text>

            <TouchableOpacity style={{ height:25,width:25, backgroundColor: "#03ba55", borderRadius: 5, justifyContent: "center", alignItems: "center", }}>
                
                <Feather onPress={()=>addItemToCart(item.id)} name="plus"  color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
        )
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.fixedView}>
          {/* Content that you want to be fixed */}
          <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:30,marginHorizontal:10}}>
          <Ionicons name="chevron-back" size={14} onPress={() => navigation.goBack()} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{catName}</Text>
            <Ionicons name="chevron-back" style={{ opacity: 0 }} />
  
          </View>
        </View>
        <View style={{ marginTop:85,backgroundColor: '#fff',borderRadius:10, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', margin: 15, padding: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Feather name="search" size={14} color={"#03ba55"} />
            <TextInput
              placeholder='Search'
              value={input}
              onChangeText={(text) => setInput(text)}
              style={{ width: "85%", fontSize: 18, paddingLeft: 5 }}
            />
          </View>

          {input !== "" ? (
            <TouchableOpacity
              onPress={() => {
                setInput("");
                Keyboard.dismiss();
              }}
              style={{
                borderRadius: 20,
                backgroundColor: "#808080",
                marginRight: 5,
                padding: 1
              }}
            >
              <Feather color={"#efefefef"} name="x" />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* <View style={{height:1,backgroundColor:"#ccc"}} /> */}
       <ScrollView contentContainerStyle = {{gap:15}}>
        {
            (pdfArr.length !== 0 && input === '') ?
            <>
            <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>PDF({pdfArr.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                
                pdfArr.map((elt,idx)=>{
                    return <CardDesign item={elt} key={idx} />
                })
            }
            </ScrollView>
            </> : <PDFInput name={input} />
        }
        {
            (pptxArr.length !== 0 && input === '') ?
            <>
            <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>PPTX({pptxArr.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                
                pptxArr.map((elt,idx)=>{
                    return <CardDesign item={elt} key={idx} />
                })
            }
            </ScrollView>
            </> : <PPTXInput name={input} />
        }
        {
            (docxArr.length !== 0 && input === '') ?
            <>
            <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>DOCX({docxArr.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                
                docxArr.map((elt,idx)=>{
                    return <CardDesign item={elt} key={idx} />
                })
            }
            </ScrollView>
            </> : <DOCXInput name={input} />
        }
        {
            (vidArr.length !== 0 && input === '') ?
            <>
            <Text style={{marginLeft:15,fontWeight:"600",fontSize:22}}>MP4({vidArr.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                
                vidArr.map((elt,idx)=>{
                    return <CardDesign item={elt} key={idx} />
                })
            }
            </ScrollView>
            </> : <VidInput name={input} />
        }
        
        
        {/* <VidDesign /> */}
       </ScrollView>
        
        
       
      </View>
    );
  };
  
  export default CategoryCourses;
  
  const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor:'#d8f3dc',
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
    card: {
        backgroundColor: "#fff",
        width: 200,
        marginHorizontal: 15,
        borderRadius: 10,
        // you can remove it if you remove the category mtl aade
        padding: 20,
      },
      vidthumbnail: {
        width: 300,
        height: 150,
        // justifyContent: "center",
        // alignItems: "center",
        // opacity: 0.5,
        justifyContent:"space-between",
        borderRadius:10,
        overflow:'hidden',
        alignSelf:"center",
        padding:10
      },
  });
  