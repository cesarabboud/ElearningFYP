import { 
    StyleSheet, Text,TextInput,Keyboard, View, Image, StatusBar,TouchableOpacity, Dimensions,ScrollView ,SafeAreaView,Modal,TouchableHighlight,Button,FlatList
  } from "react-native";
  import { IconButton } from "react-native-paper";
  import React,{useState,useEffect} from "react";
  const screenWidth = Dimensions.get('window').width
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Ionicons,Feather } from "@expo/vector-icons";
  import {StackActions, useNavigation } from "@react-navigation/native";
  const CategoriesList = () => {
    const [input,setInput] = useState("")
    const [catArr,setCatArr] = useState([])
    const getAllCategories = async () => {
        try{
            const response = await fetch('http://192.168.0.107:8000/api/getAllCat',{
                method:"GET",
            })
            const resData = await response.json()
            // console.log(resData)
            setCatArr(resData.catList)
            console.log(catArr)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        getAllCategories()
    },[])
    
    const navigation = useNavigation()
    const SearchByName = (props) => {
        const name = props.name
        const filteredCategories = catArr.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
        if(filteredCategories.length !== 0){
            return (
                <>
                    <Text style={{marginTop:20,marginLeft:15,fontSize:22,fontWeight:"600"}}>{filteredCategories.length} Result{filteredCategories.length !== 1 ? `s` : null} Found.</Text>
                    <ScrollView contentContainerStyle={{marginHorizontal:15}}>
                    {
                        filteredCategories.map((c,idx)=>{
                            return (
                                <TouchableOpacity 
                                onPress={()=>navigation.navigate("CategoryCourses",{
                                  categoryId: c.id,
                                  catName:c.name
                                  })}
                                activeOpacity={.5} key={idx.toString()} style={[styles.catStyle,{
                                    borderLeftColor: (idx+3) % 3 === 0 ? "#002333" : (idx+3) % 3 === 1 ? "#03E476" : (idx+3) % 3 === 2 ? "#3B9ACD" : (idx+3) % 3 === 3 ? "#0BB073" : "#1F4746",
                                    marginBottom:idx === catArr.length -1 ? 20 : 0 }]}>
                                    <Text>{c.name}</Text>
                                    <Ionicons name="chevron-forward" />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                </>
                
            )
        }
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                <Text style={{fontSize:22,fontWeight:"600"}}>No results found.</Text>
            </View>
        )
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.fixedView}>
          {/* Content that you want to be fixed */}
          <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:30,marginHorizontal:10}}>
          <Ionicons name="chevron-back" size={14} onPress={() => navigation.goBack()} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Categories List {(catArr.length !== undefined && catArr.length !== 0) ? `(${catArr.length})` : null}</Text>
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
        <View style={{height:1,backgroundColor:"#ccc"}} />
        {
            input === '' ? <ScrollView contentContainerStyle={{marginHorizontal:15}}>
            {
                catArr.map((c,idx)=>{
                    return (
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("CategoryCourses",{
                        categoryId: c.id,
                        catName:c.name
                        })} 
                        activeOpacity={.5} 
                        key={idx.toString()} 
                        style={[styles.catStyle,{
                        borderLeftColor: (idx+4) % 4 === 0 ? "#4ea8de" : (idx+4) % 4 === 1 ? "#48bfe3" : (idx+4) % 4 === 2 ? "#56cfe1" : (idx+4) % 4 === 3 ? "#64dfdf" : "#72efdd",
                        marginBottom:idx === catArr.length -1 ? 20 : 0 }]}
                        >
                            <Text>{c.name}</Text>
                            <Ionicons name="chevron-forward" />
                        </TouchableOpacity>
                    )
                })
            }
            </ScrollView> : <SearchByName name={input} />
        }
        
        {/* <FlatList
        data={catArr}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=>{
            return <Text>{item.name}</Text>
        }}
        /> */}
        
          
       
      </View>
    );
  };
  
  export default CategoriesList;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#f7fafc',
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
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: "#171717",
    }
  });
  