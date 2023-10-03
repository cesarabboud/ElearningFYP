import { 
    StyleSheet, Text,TextInput,Keyboard, View, Image, StatusBar,TouchableOpacity, Dimensions,ScrollView ,SafeAreaView,Modal,TouchableHighlight,Button,FlatList
  } from "react-native";
  import { IconButton } from "react-native-paper";
  import React,{useState,useEffect} from "react";
  const screenWidth = Dimensions.get('window').width
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Ionicons,Feather } from "@expo/vector-icons";
  import {StackActions, useNavigation } from "@react-navigation/native";
  const InstructorsList = () => {
    const [input,setInput] = useState("")
    const [mentorsArr,setMentorsArr] = useState([])
    const getAllMentors = async () => {
        try{
            const response = await fetch('http://192.168.0.107:8000/api/getMentors',{
                method:"GET",
            })
            const resData = await response.json()
            // console.log(resData)
            setMentorsArr(resData.mentors)
            // console.log(mentorsArr)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        getAllMentors()
    },[])
    
    const navigation = useNavigation()
    const SearchByName = (props) => {
        const name = props.name
        const filteredMentors = mentorsArr.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
        if(filteredMentors.length !== 0){
            return (
                <>
                    <Text style={{marginTop:20,marginLeft:15,fontSize:22,fontWeight:"600"}}>{filteredMentors.length} Result{filteredMentors.length !== 1 ? `s` : null} Found.</Text>
                    <ScrollView contentContainerStyle={{marginHorizontal:15}}>
            {
                filteredMentors.map((c,idx)=>{
                    return (
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("InstructorDetails",{
                          instructorId:c.id,
                          name:c.name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
                          categories:FilterValuesNavigate(c.courses),
                          pp:c.profilepicture
                        })}
                        activeOpacity={.5} 
                        key={idx.toString()} 
                        style={[styles.catStyle,{
                        borderLeftColor: (idx+4) % 4 === 0 ? "#4ea8de" : (idx+4) % 4 === 1 ? "#48bfe3" : (idx+4) % 4 === 2 ? "#56cfe1" : (idx+4) % 4 === 3 ? "#64dfdf" : "#72efdd",
                        marginBottom:idx === mentorsArr.length -1 ? 20 : 0 }]}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <Image 
                                source={{uri:"http://192.168.0.107:8000/"+c.profilepicture}}
                                style={{width:60,height:60,overflow:"hidden",borderRadius:50,backgroundColor:"#ccc"}}
                                />
                                <View style={{gap:10}}>
                                    <Text style={{fontSize:20}}>{c.name}</Text>
                                    <Text style={{color:"#808080"}}>{FilterValues(c.courses)}</Text>
                                </View>
                            </View>
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
    const FilterValues = (courses) => {
        const catNames = courses.map(cat => cat.catName);
        const uniqueCatNames = [...new Set(catNames)];
        if(uniqueCatNames.length > 3){
            return uniqueCatNames.slice(0, 3).join(",")+'...';
        }
        return uniqueCatNames.join(",")
        
    }
    const FilterValuesNavigate = (courses) => {
      const catNames = courses.map(cat => cat.catName);
        const uniqueCatNames = [...new Set(catNames)];
        return uniqueCatNames.join(",")
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.fixedView}>
          {/* Content that you want to be fixed */}
          <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:30,marginHorizontal:10}}>
          <Ionicons name="chevron-back" size={14} onPress={() => navigation.goBack()} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Mentors List {(mentorsArr.length !== undefined && mentorsArr.length !== 0) ? `(${mentorsArr.length})` : null}</Text>
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
                mentorsArr.map((c,idx)=>{
                    return (
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("InstructorDetails",{
                          instructorId:c.id,
                          name:c.name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
                          categories:FilterValuesNavigate(c.courses),
                          pp:c.profilepicture
                        })}
                        activeOpacity={.5} 
                        key={idx.toString()} 
                        style={[styles.catStyle,{
                        borderLeftColor: (idx+4) % 4 === 0 ? "#4ea8de" : (idx+4) % 4 === 1 ? "#48bfe3" : (idx+4) % 4 === 2 ? "#56cfe1" : (idx+4) % 4 === 3 ? "#64dfdf" : "#72efdd",
                        marginBottom:idx === mentorsArr.length -1 ? 20 : 0 }]}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <Image 
                                source={{uri:"http://192.168.0.107:8000/"+c.profilepicture}}
                                style={{width:60,height:60,overflow:"hidden",borderRadius:50,backgroundColor:"#ccc"}}
                                />
                                <View style={{gap:10}}>
                                    <Text style={{fontSize:20}}>{c.name}</Text>
                                    <Text style={{color:"#808080"}}>{FilterValues(c.courses)}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" />
                        </TouchableOpacity>
                    )
                })
            }
            </ScrollView> : <SearchByName name={input} />
        }
        
        {/* <FlatList
        data={mentorsArr}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=>{
            return <Text>{item.name}</Text>
        }}
        /> */}
        
          
       
      </View>
    );
  };
  
  export default InstructorsList;
  
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
        // borderLeftWidth:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderRadius:10,
        shadowColor: "#171717",
    }
  });
  