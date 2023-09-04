import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  ScrollView,
  
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { IconButton,Provider } from "react-native-paper";
import BottomSheetSearchFilter from './BottomSheetSearchFilter'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import Search2 from './Search2'
import { useIsFocused } from "@react-navigation/native";
let cnt=1, cnt2=0, catCnt=0;
const ScreenWidth = Dimensions.get('screen').width
const categories = [
  "Mobile Dev "+ ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
  "Mobile Dev " + ++catCnt,
];
const categories2 = [
  { id: 1, name: "Security" },
  { id: 2, name: "Web Dev" },
  { id: 3, name: "Networks" },
  { id: 4, name: "Mobile Dev" },
  { id: 5, name: "Machine Learning" },
  { id: 6, name: "Mathematics" },
  // Add more categories as needed
];

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [show, setShow] = useState(false);
  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
  };

  const [cat,setCat] = useState([])



  const GetCategories = async () =>{
    const token = await AsyncStorage.getItem('token')
    if(token !==null){
      try{
        const response = await fetch('http://192.168.0.106:8000/api/allCategories',{
          method:'GET',
          headers:{
            "Accept": 'application/json',
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
          }
        })
        .then((res) => res.json())
      .then((resData) => {
        console.log("response data is:",JSON.stringify(resData))
        setCat(resData.categories)
        console.log(cat)
      })
      }
      catch(err){
        console.log(err)
      }
    }
  }
  const isFocused = useIsFocused()
  useEffect(()=>{
    if(isFocused){
      GetCategories()
    }
    
  },[isFocused])
  //----------------
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
  };

  const handleSortOptionSelect = (option) => {
    // Handle sort option selection here
    console.log("Selected sort option:", option);
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowSortModal(false);
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  const CategoryItem = ({ item }) => {
    const isGreenBckgrnd = (cnt2 % 2 === 0);
    cnt++;
    console.log("counter 1" , cnt)
    cnt2 = cnt % 2 ===0 ?  cnt2 + 1 : cnt2;
    return (
      <View
        style={{
          width: "40%",
          height: 120,
          backgroundColor: isGreenBckgrnd  ? "#0ab072" : "#1E2A23",
          borderRadius: 15,
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700", width: 80, margin: 15 , color: "#fff"}}>
          {item}
        </Text>
        <Image
          source={require("../images/blurryrect.png")}
          resizeMode="cover"
          style={{ position: "absolute", right: -20, bottom: 20 }}
        />
      </View>
      
    );
    
  };
  return (
    <Provider>
<TouchableWithoutFeedback onPress={handleScreenPress}>
      <ScrollView style={{backgroundColor:'#1E2A23'}}>
      <SafeAreaView>
        
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            height: 50,
            //borderWidth: 1,
            borderRadius: 30,
            backgroundColor: "white",
            marginHorizontal: 15,
            marginVertical: 15,
          }}
        >
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
              style={{ padding: 10, fontSize: 20, width: "80%" }}
              placeholder="Search"
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
          </View>

          <View style={{}}>
            {showCancelButton ? (
              <TouchableOpacity onPress={handleCancelPress}>
                <Text style={{ color: "#008BD9", fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShow(true)}>
                <IconButton
                  icon="filter-variant"
                  iconColor="#11B741"
                  size={24}
                  style={{ margin: 0 }}
                />
              </TouchableOpacity>
            )}
          </View>
          <Modal
            isVisible={showSortModal}
            onBackdropPress={handleModalClose}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            backdropColor="rgba(0,0,0,.5)"
            useNativeDriver={true}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => handleSortOptionSelect("A-Z")}
              >
                <Text>A-Z</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => handleSortOptionSelect("Z-A")}
              >
                <Text>Z-A</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 15,
                marginBottom: 20,
                columnGap:10
              }}
            >
              {cat.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategoryPress(category)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor:
                      selectedCategory === category.id ? "#03ba55" : "lightgrey",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedCategory === category.id ? "white" : "black",
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20,marginHorizontal:15}}>
        <Text style={{ fontWeight: "700", fontSize: 30, color:"#fff" }}>
          Recently Uploaded
        </Text>
        {/* <TouchableOpacity style={{backgroundColor:'#1E2A23',padding:8,borderRadius:20,width:65}}>
          <Text style={{alignSelf:'center',fontWeight:'600',color:"#fff"}}>See All</Text>
        </TouchableOpacity> */}
        </View>
        
        {/* Category List */}
          {/* <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap",
              rowGap:15,
            }}
          >
            {categories.map((item, idx) => {
              return <CategoryItem key={idx} item={item} />;
            })}
          </View> */}
          <StatusBar style="light" />
      </SafeAreaView>
      <BottomSheetSearchFilter
          show={show}
          onDismiss={() => {
            setShow(false);
          }}
          enableBackdropDismiss
        >
          <View style={{ paddingLeft: 25, paddingVertical: 25 }}>
            
          </View>
        </BottomSheetSearchFilter>
        <Search2 />

      </ScrollView>
      
    </TouchableWithoutFeedback>
    </Provider>
    
    
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    alignItems: "center",
    top: 20, // Adjust the top position as needed
    right: 20, // Adjust the right position as needed
    width: 100,
  },
  sortOption: {
    paddingVertical: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
  },
  contentContainer: {
    padding: 16,
  },
  content: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default SearchBar;
