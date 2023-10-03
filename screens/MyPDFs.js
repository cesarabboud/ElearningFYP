import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
  Button,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheetFilter from "./BottomSheetFilter";
import { IconButton, Provider, RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TabView,SceneMap,TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
const categories = [
  { id: 1, name: "Security" },
  { id: 2, name: "Web Dev" },
  { id: 3, name: "Networks" },
  { id: 4, name: "Mobile Dev" },
  { id: 5, name: "Machine Learning" },
  { id: 6, name: "Mathematics" },
  // Add more categories as needed
];
/*const MyPDFs = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [mypdfs, setMypdfs] = useState([]);
  const getMyPDFs = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch("http://192.168.0.107:8000/api/getPDFs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resData = await response.json();
        console.log(resData.pdfs);
        setMypdfs(resData.pdfs);
        console.log("mypdfs : ", mypdfs);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const navigation = useNavigation()
  useEffect(() => {
    getMyPDFs();
  }, []);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  //----
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [show, setShow] = useState(false);
  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
  };
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setShowCancelButton(text.length > 0);
  };

  const handleCancelPress = () => {
    setSearchText("");
    setShowCancelButton(false);
    Keyboard.dismiss();
  };

  const handleFilterPress = () => {
    setShowSortModal(true);
    setShow(true);
  };
  const SearchByName = (props) => {
    const name = props.name
    const filteredPdfs = mypdfs.filter((pdf) => pdf.title.toLowerCase().includes(name.toLowerCase()));
    return <ScrollView
    contentContainerStyle={{
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      marginHorizontal: 20,
      padding: 20,
      rowGap: 20,
      columnGap: 35,
    }}
  >
    {filteredPdfs.map((pdf, idx) => {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
          key={idx}
        >
          <TouchableOpacity 
          onPress={()=>navigation.navigate("MyWebComponent",{
            pdfId:pdf.id,
            pdfurl:'http://192.168.0.107:8000/'+pdf.link,
            pdftitle:pdf.title,
            pdftype:pdf.type
          })}
          >
          <Image source={{uri:'http://192.168.0.107:8000/'+pdf.thumbnail}} style={{height:120,width:100}}/>
          </TouchableOpacity>
          
          <Text
            style={{
              color: "#fff",
              width:pdf.title.length > 15 ? 80 : null,
              textAlign:'center'
            }}
          >
            {pdf.title}
          </Text>
        </View>
      );
    })}
  </ScrollView>
    // do something with the filtered PDFs
  };
  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: "#1e2a23" }}>
      <StatusBar barStyle={"dark-content"} />
        {
          mypdfs.length > 0 ? <>
          <View style={styles.searchbar}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "75%",
              }}
            >
              <IconButton
                icon="magnify"
                iconColor="#11B741"
                size={24}
                style={{ margin: 0 }}
              />
              <TextInput
                style={{
                  padding: 10,
                  fontSize: 20,
                  width: "80%",
                  fontWeight: "600",
                }}
                placeholder="Search My PDFs"
                value={searchText}
                onChangeText={handleSearchTextChange}
              />
            </View>
            <View style={{}}>
              {showCancelButton ? (
                <TouchableOpacity onPress={handleCancelPress}>
                  <Text style={{ color: "#008BD9", fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleFilterPress}>
                  <IconButton
                    icon="filter-variant"
                    iconColor="#11B741"
                    size={24}
                    style={{ margin: 0 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {
            searchText === '' ? <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              marginHorizontal: 20,
              padding: 20,
              rowGap: 20,
              columnGap: 35,
            }}
          >
            {mypdfs.map((pdf, idx) => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                  key={idx}
                >
                  <TouchableOpacity onPress={()=>navigation.navigate("MyWebComponent",{
                    pdfId:pdf.id,
                    pdfurl:'http://192.168.0.107:8000/'+pdf.link,
                    pdftitle:pdf.title,
                    pdftype:pdf.type
                  })}>
                  <Image source={{uri:'http://192.168.0.107:8000/'+pdf.thumbnail}} style={{height:120,width:100}}/>
                  </TouchableOpacity>
                  
                  <Text
                    style={{
                      color: "#fff",
                      width:pdf.title.length > 15 ? 80 : null,
                      textAlign:'center'
                    }}
                  >
                    {pdf.title}
                  </Text>
                </View>
              );
            })}
          </ScrollView> : <SearchByName name={searchText} />
          }
          
          <BottomSheetFilter
            show={show}
            onDismiss={() => {
              setShow(false);
            }}
            enableBackdropDismiss
          >
            <View style={{ padding: 30, rowGap: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    fontSize: 20,
                  }}
                >
                  Sort By
                </Text>
                {selectedOption !== null ? (
                  <Button onPress={() => setSelectedOption(null)} title="Reset" />
                ) : null}
              </View>
  
              <View style={{ rowGap: 30 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton.Android
                    status={
                      selectedOption === "priceHighToLow"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleOptionChange("priceHighToLow")}
                    color="#11B741"
                  />
                  <Text style={{ fontWeight: "600", fontSize: 20 }}>
                    Price: High To Low
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton.Android
                    status={
                      selectedOption === "priceLowToHigh"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleOptionChange("priceLowToHigh")}
                    color="#11B741"
                  />
                  <Text style={{ fontWeight: "600", fontSize: 20 }}>
                    Price: Low To High
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton.Android
                    status={
                      selectedOption === "alphabeticalAZ"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleOptionChange("alphabeticalAZ")}
                    color="#11B741"
                  />
                  <Text style={{ fontWeight: "600", fontSize: 20 }}>
                    Alphabetically: A-Z
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton.Android
                    status={
                      selectedOption === "alphabeticalZA"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleOptionChange("alphabeticalZA")}
                    color="#11B741"
                  />
                  <Text style={{ fontWeight: "600", fontSize: 20 }}>
                    Alphabetically: Z-A
                  </Text>
                </View>
              </View>
            </View>
          </BottomSheetFilter></> : <View style={{justifyContent:'center',alignItems:'center',height:"100%"}}><Text style={{fontSize:24,color:"#fff",fontWeight:"600"}}>No PDFs purchased.</Text></View>
        }
        
      </View>
    </Provider>
  );
};

export default MyPDFs;

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 15,
  },
  container: {},
});*/
const MyPDFs = () => {
  const [pdfArr,setPdfArr] = useState([])
    const [pptxArr,setPptxArr] = useState([])
    const [docxArr,setDocxArr] = useState([])
    const [vidArr,setVidArr] = useState([])
    const navigation = useNavigation()
  const getMyCourses = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !== null){
      try {
        const response = await fetch('http://192.168.0.107:8000/api/getOwnedCourses',{
            method:"GET",
            headers:{
              "Authorization":`Bearer ${token}`
            }
        })
        const resData =await response.json()
        console.log('length',resData.courses.pdf.length)
        setPdfArr(!resData.courses.pdf ? [] : resData.courses.pdf)
        setPptxArr(!resData.courses.pptx ? [] : resData.courses.pptx)
        setDocxArr(!resData.courses.docx ? [] : resData.courses.docx)
        setVidArr(!resData.courses.mp4 ? [] : resData.courses.mp4)
        
    }
    catch(err){
        console.log(err)
    }
    }
    
}
useEffect(()=> {
    getMyCourses()
},[])
const FirstRoute = () => {
  if(pdfArr.length !== 0){
    return (
      <ScrollView style={[styles.scene, {  }]}>
          {
              
              pdfArr.map((pdf,idx)=>{
                  return (
          <View key={idx}>
              <TouchableOpacity
              onPress={()=>navigation.navigate("MyWebComponent",{
                pdfId:pdf.get_course.id,
                pdfurl:'http://192.168.0.107:8000/'+pdf.get_course.link,
                pdftitle:pdf.get_course.title,
                pdftype:pdf.get_course.type
              })}
              style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                  <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                      <Image 
                      source={{uri:'http://192.168.0.107:8000/'+pdf.get_course.thumbnail}}
                      style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                      />
                      <View>
                          <Text style={{fontSize:18,fontWeight:"600"}}>{pdf.get_course.title}</Text>
                          <Text style={{fontSize:16}}>{pdf.get_course.get_category.name}</Text>
                      </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20}/>
                  
                  
                  
              </TouchableOpacity>
              <View style={{height:1,backgroundColor:"#ccc"}} />
          </View>
                  )
              }) 
          }
          
      </ScrollView>
      
      );
  }
  return (
    <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
      <Text>No PDFs</Text>
    </View>
  )
}
    
  const SecondRoute = () => {
    if(pptxArr.length !== 0){
      return (
        <ScrollView style={[styles.scene, {  }]}>
            {
                
                pptxArr.map((pptx,idx)=>{
                    return (
            <View key={idx}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate("MyWebComponent",{
                  pdfId:pptx.get_course.id,
                  pdfurl:'http://192.168.0.107:8000/'+pptx.get_course.link,
                  pdftitle:pptx.get_course.title,
                  pdftype:pptx.get_course.type
                })}
                style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                        <Image 
                        source={{uri:'http://192.168.0.107:8000/'+pptx.get_course.thumbnail}}
                        style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                        />
                        <View>
                            <Text style={{fontSize:18,fontWeight:"600"}}>{pptx.get_course.title}</Text>
                            <Text style={{fontSize:16}}>{pptx.get_course.get_category.name}</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20}/>
                    
                    
                    
                </TouchableOpacity>
                <View style={{height:1,backgroundColor:"#ccc"}} />
            </View>
                    )
                }) 
            }
            
        </ScrollView>
        
        );
    }
    return (
      <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
        <Text>No PPTX</Text>
      </View>
    )
}
  const ThirdRoute = () => {
    if(docxArr.length !== 0){
      return (
        <ScrollView style={[styles.scene, {  }]}>
            {
                
                docxArr.map((docx,idx)=>{
                    return (
            <View key={idx}>
                <TouchableOpacity
                onPress={()=>navigation.navigate(docx.get_course.type === 'mp4' ? "CourseDetails": "BookDetails",{
                  cid:docx.get_course.id,
                  cat:docx.get_course.get_category.name,
                  uploader:docx.get_course.get_user.name,
                  cType:docx.get_course.type
                })}
                style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                        <Image 
                        source={{uri:'http://192.168.0.107:8000/'+docx.get_course.thumbnail}}
                        style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                        />
                        <View>
                            <Text style={{fontSize:18,fontWeight:"600"}}>{docx.get_course.title}</Text>
                            <Text style={{fontSize:16}}>{docx.get_course.get_category.name}</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20}/>
                    
                    
                    
                </TouchableOpacity>
                <View style={{height:1,backgroundColor:"#ccc"}} />
            </View>
                    )
                }) 
            }
            
        </ScrollView>
        
        );
    }
    return (
      <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
        <Text>No DOCX</Text>
      </View>
    )
}
  const FourthRoute = () => {
    if(vidArr.length !== 0){
      return (
        <ScrollView style={[styles.scene, {  }]}>
            {
                
                vidArr.map((vid,idx)=>{
                    return (
            <View key={idx}>
                <TouchableOpacity 
                onPress={()=>navigation.navigate("VideoSection",{
                  url:vid.get_course.link
                })}
                style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                        <Image 
                        source={{uri:'http://192.168.0.107:8000/'+vid.get_course.thumbnail}}
                        style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                        />
                        <View>
                            <Text style={{fontSize:18,fontWeight:"600"}}>{vid.get_course.title}</Text>
                            <Text style={{fontSize:16}}>{vid.get_course.get_category.name}</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20}/>
                    
                    
                    
                </TouchableOpacity>
                <View style={{height:1,backgroundColor:"#ccc"}} />
            </View>
                    )
                }) 
            }
            
        </ScrollView>
        
        );
    }
    return (
      <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
        <Text>No Videos</Text>
      </View>
    )
}
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#03ba55' }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: '#03ba55' }}
      inactiveColor='#000'
    //   pressOpacity={0.5}
    
    //   inactiveColor='red'
    />
  );
  
  
    const [index, setIndex] = useState(0);
    const [routes,setRoutes] = useState([
      { key: 'first', title: `PDF` },
      { key: 'second', title: 'PPTX' },
      { key: 'third', title: 'DOCX' },
      { key: 'fourth', title: 'MP4' },
    ]);
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third:ThirdRoute,
      fourth:FourthRoute
    });
  return (
    <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        
        renderTabBar={renderTabBar}
        />
  )
}

export default MyPDFs;

const styles = StyleSheet.create({
  scene:{
    flex:1
  }
})