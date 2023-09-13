import React, { useState ,useEffect} from "react";
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
import { IconButton,Provider,RadioButton,Checkbox,Chip,Button } from "react-native-paper";
import BottomSheetSearchFilter from './BottomSheetSearchFilter'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search2 from './Search2'
import TopRated from './TopRated'
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { Feather, Ionicons } from "@expo/vector-icons";
let cnt=1, cnt2=0, catCnt=0;
const ScreenWidth = Dimensions.get('screen').width

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
        const response = await fetch('http://192.168.0.107:8000/api/allCategories',{
          method:'GET',
          headers:{
            "Accept": 'application/json',
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
          }
        })
        .then((res) => res.json())
      .then((resData) => {
        // console.log("response data is:",JSON.stringify(resData))
        setCat(resData.categories)
        //console.log(cat)
        // console.log(cat)
      })
      }
      catch(err){
        console.log(err)
      }
    }
  }
  const [types,setTypes] = useState([])
  const getTypes = async () => {
    try{
      const response = await fetch('http://192.168.0.107:8000/api/types',{
        method:'GET',
        headers:{
          "Accept": 'application/json',
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
    .then((resData) => {
      // console.log("response data is:",JSON.stringify(resData))
      setTypes(resData.uniqueTypes)
      // console.log(types)
      // console.log(cat)
    })
    }
    catch(err){
      console.log(err)
    }

  }
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(()=>{
    if(isFocused){
      GetCategories()
      getTypes()
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
  const [selectedTypes, setSelectedTypes] = useState([]); // Array to store selected types

  const handleToggle = (type) => {
    if (selectedTypes.includes(type)) {
      // If the type is already selected, remove it
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
      
    } else {
      // If the type is not selected, add it
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  // useEffect(()=>{
  //   console.log(selectedTypes)
  // },[selectedTypes])

  const [selectedCategories, setSelectedCategories] = useState([]); // Array to store selected types

  const handleToggleCat = (cat) => {
    if (selectedCategories.includes(cat)) {
      // If the type is already selected, remove it
      setSelectedCategories(selectedCategories.filter((item) => item !== cat));
      
    } else {
      // If the type is not selected, add it
      setSelectedCategories([...selectedCategories, cat]);
    }
  };
  // useEffect(()=>{
  //   console.log(selectedCategories)
  // },[selectedCategories])
  const [values, setValues] = useState([0, 500]);

  const handleValuesChange = (newValues) => {
    setValues(newValues);
  };
  const [ratingValue,setRatingValue] = useState(null)
  const SearchByFilters = () => {
    const objects = {
      category: selectedCategories.length!==0 ? selectedCategories : [],
      types: selectedTypes.length!==0 ? selectedTypes : [],
      minval:values[0],
      maxval:values[1],
      
    }
    if (ratingValue !== null) {
      objects.rating = ratingValue;
      objects.sign = sign
    }
    navigation.navigate("SearchResultsByFilters",objects)

    
  }
  const [sign, setSign] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  
  const [signsList,setSignsList] = useState([
    {
      label:<IconButton icon={'greater-than'} style={{margin:0}} size={10}/>,
      value:'Greater'
    },
    {
      label:<IconButton icon={'greater-than-or-equal'} style={{margin:0}} size={10}/>,
      value:'Greater Or Equal'
    },
    {
      label:<IconButton icon={'less-than'} style={{margin:0}} size={10}/>,
      value:'Less'
    },
    {
      label:<IconButton icon={'less-than-or-equal'} style={{margin:0}} size={10}/>,
      value:'Less Or Equal'
    },
    {
      label:<IconButton icon={'equal'} style={{margin:0}} size={10}/>,
      value:'Equal'
    }
  ])
  useEffect(()=>{
    console.log(sign)
    setRatingValue(0)
  },[sign])
  useEffect(()=>{
    console.log(ratingValue)
  },[ratingValue])
  const ResetFilters = () => {
    setRatingValue(null)
    setSelectedCategories([])
    setSelectedTypes([])
    setValue(null)
    setSign('')
  }
  const handleValueChange = (val) => {
    // Ensure that the input value is a valid number between 0 and 5.
    const numericVal = parseFloat(val);

    if (!isNaN(numericVal) && numericVal >= 0 && numericVal <= 5) {
      setRatingValue(numericVal.toString());
    }
    // You can also show an error message or provide feedback to the user if the input is invalid.
  };
  return (
    <Provider>
<TouchableWithoutFeedback onPress={handleScreenPress}>
      <ScrollView style={{backgroundColor:'#1E2A23',flex:1}}>
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
              returnKeyType={searchText === '' ? 'none' : 'search'}
              onSubmitEditing={()=>{
                searchText !== '' ? navigation.navigate("SearchResults",{
                  text:searchText
                }) : alert('field is empty')
              }}
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
        

        
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20,marginHorizontal:15}}>
        <Text style={{ fontWeight: "700", fontSize: 30, color:"#fff" }}>
          Recently Uploaded
        </Text>
        {/* <TouchableOpacity style={{backgroundColor:'#1E2A23',padding:8,borderRadius:20,width:65}}>
          <Text style={{alignSelf:'center',fontWeight:'600',color:"#fff"}}>See All</Text>
        </TouchableOpacity> */}
        </View>
        <Search2 />
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20,marginHorizontal:15,marginTop:15}}>
        <Text style={{ fontWeight: "700", fontSize: 30, color:"#fff" }}>
          Top Rated
        </Text>
        </View>
        <TopRated />
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
            setSign("")
            setRatingValue(0)
            setSelectedTypes([])
            setSelectedCategories([])
            setValue(null)
          }}
          enableBackdropDismiss
        >
          <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
            {/* View For Types */}
            <View style={{marginHorizontal:25}}>
              <Text style={{fontSize:18,marginBottom:10}}>Types</Text>
              <View>
              {
                types.map((type,idx)=>{
                  return(
                    <Checkbox.Item
                    key={idx}
                    label={type.toUpperCase()}
                    labelStyle={{fontWeight:"600",color:selectedTypes.includes(type) ? '#03ba55' : null}}
                    onPress={() => handleToggle(type)}
                    status={selectedTypes.includes(type) ? 'checked' : 'unchecked'}
                    color="#03ba55"
                    />
                  )
                })
              }
              </View>
              
            </View>
            <View style={{height:1,backgroundColor:'#ccc',width:'100%'}} />
            {/* View For Categories */}
          <View style={{paddingHorizontal:25}}>
            <Text style={{fontSize:18,marginVertical:20}}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                  columnGap:10
                }}
              >
              {cat.map((category,idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleToggleCat(category)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    // backgroundColor:
                    //   selectedCategory === category.id ? "#03ba55" : "lightgrey",
                    backgroundColor: selectedCategories.includes(category) ? 'rgba(3, 186, 85, 0.2)' :'#fff',
                    
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: selectedCategories.includes(category) ? "#03ba55" : "#bbb",
                  }}
                >
                  
                  <Text
                    style={{
                      color: selectedCategories.includes(category) ? "#131313" : "#808080",
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView></View>
          <View style={{height:1,backgroundColor:'#ccc',width:'100%'}} />
          {/* View For Price */}
          <View style={{marginHorizontal:25}}>
            <Text style={{fontSize:18,marginVertical:20}}>Price</Text>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:20,marginRight:10}}>
            <MultiSlider
            values={values}
            sliderLength={250}
            onValuesChange={handleValuesChange}
            min={0}
            max={500}
            step={1}
            snapped={true}
            enableLabel={true}
            
            selectedStyle={{
              backgroundColor: '#03ba55',
            }}
            unselectedStyle={{
              backgroundColor: '#ccc',
            }}
            markerStyle={{
              backgroundColor: '#03ba55',
            }}
            
            />

            </View>
            {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:"#03ba55",fontWeight:"600",fontSize:16}}>${values[0]}</Text>
              <Text style={{color:"#03ba55",fontWeight:"600",fontSize:16,marginRight:25}}>${values[1]}</Text>
            </View> */}
          </View>
          <View style={{height:1,backgroundColor:'#ccc',width:'100%',marginTop:20}} />
          {/* View For Rating */}
          <View style={{marginHorizontal:25}}>
            <Text style={{fontSize:18,marginVertical:20}}>Rating</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:25}}>
            <View style={{width:100}}>
            <DropDownPicker
          open={open}
          value={value}
          items={signsList}
          onChangeValue={(value) => {
            setSign(value);
            //console.log("sign" + sign);
          }}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setSignsList}
          // style={styles.drops}
          // dropDownContainerStyle={styles.dropItem}
          placeholder={"Sign"}
          placeholderStyle={{
            fontSize: 16,
            fontWeight: "600",
            paddingLeft: 10,
          }}
          
        />
            </View>
            {
              sign !== '' ? (
                <View style={{flexDirection:'row',gap:10,alignItems:'center',borderRadius:10}}>
                  {
                    sign !== null ? (
                      <>
                      
                      <Feather onPress={()=> ratingValue > 0 ? setRatingValue(ratingValue-1) : null}  name="minus" size={18} disabled={ratingValue===0 ? true : false}  />
                      
                      <View style={{padding:10,backgroundColor:'#03ba55',justifyContent:'center',alignItems:'center',width:35,height:35,borderRadius:5}}>
                      <TextInput style={{fontSize:22,fontWeight:"600",color:"#fff"}} value={ratingValue + ''} onChangeText={(text)=>handleValueChange(text)} keyboardType="numeric" />
                      </View>
                      
                      <Feather onPress={()=> ratingValue < 5 ? setRatingValue(ratingValue+1) : null}  name="plus" size={18}/>
                      
                      </>
                    ) : null
                  }
                  {
                    (sign !== null && ratingValue !== 0) ? <Button onPress={()=>{
                      setSign('')
                      setRatingValue(0)
                    }}>Reset</Button> : null
                  }
                
                </View>
              ) : null
            }
            
            </View>
            
          </View>
          {/* <ScrollView contentContainerStyle={{gap:10}} horizontal showsHorizontalScrollIndicator={false}>
            {
              cat.map((c,idx)=>{
                return <Chip key={idx} focusable style={{height:40,backgroundColor:'#fff',borderWidth:1,borderColor:"#03ba55"}}  icon="check" onPress={() => console.log('Pressed')}>{c.name}</Chip>
              })
            }
          </ScrollView> */}
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:20,gap:15}}>
            <TouchableOpacity onPress={ResetFilters} style={styles.resetFilterBtn}>
              <Text style={{fontWeight:"600",color:"#03ba55",fontSize:18}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={SearchByFilters} style={styles.searchFilterBtn}>
              <Text style={{color:"#fff",fontWeight:"600",fontSize:18}}>Done</Text>
            </TouchableOpacity>
          </View>
        
          </ScrollView>

        </BottomSheetSearchFilter>
        
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
  resetFilterBtn:{
    backgroundColor:'rgba(3, 186, 85, 0.2)',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:15,
    borderRadius:10,
    width:"45%"
  },
  searchFilterBtn:{
    backgroundColor:'#03ba55',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:15,
    borderRadius:10,
    width:"45%"
  }
});

export default SearchBar;
