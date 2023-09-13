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
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheetFilter from "./BottomSheetFilter";
import { IconButton, Provider, RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createLanguageService } from "typescript";
import { useNavigation } from "@react-navigation/native";
const categories = [
  { id: 1, name: "Security" },
  { id: 2, name: "Web Dev" },
  { id: 3, name: "Networks" },
  { id: 4, name: "Mobile Dev" },
  { id: 5, name: "Machine Learning" },
  { id: 6, name: "Mathematics" },
  // Add more categories as needed
];
const MyPDFs = () => {
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
          {/* <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 15,
                  marginBottom: 20,
                  columnGap: 10,
                }}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleCategoryPress(category)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      backgroundColor:
                        selectedCategory === category.id
                          ? "#0ad143"
                          : "lightgrey",
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
          </View> */}
          <ScrollView
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
          </ScrollView>
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
});
