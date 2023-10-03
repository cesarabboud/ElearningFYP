import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  ScrollView,
  Button,
  Image,
} from "react-native";
import Slider from "react-native-slider";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResizeMode, Video } from "expo-av";
const UploadCourse = () => {
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(50);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setcategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,

    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //console.log('ext:',getFileExtension(image))
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    if (result.type === "success") {
      setSelectedFile(result);
    }
  };
  const [cat, setCat] = useState([]);

  const [catDisplay, setCatDisplay] = useState([]);
  const GetCategories = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch(
          "http://192.168.0.107:8000/api/allCategories",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((resData) => {
            setCat(resData.categories);
            console.log("cat:", cat);
            const newArray = resData.categories.map((item,idx) => {
              return {
                label: item,
                value: item,
              };
            });
            console.log(newArray.length);
            setCatDisplay(newArray);
            console.log(catDisplay);
            console.log(category);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
      GetCategories();
  }, []);
  const navigation = useNavigation()
  const uploadDocument = async () => {
    if (
      selectedFile === null ||
      courseDesc === "" ||
      courseName === "" ||
      image === null ||
      category === ""
    ) {
      alert("please fill all the fields");
      return;
    }
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const formData = new FormData();
        formData.append("myfile", {
          uri: selectedFile.uri,
          type: "application/" + getFileExtension(selectedFile.uri),
          name: `document.${getFileExtension(selectedFile.uri)}`,
        });
        // var jsonBlob = new Blob([JSON.stringify(jsonData)],{
        //   type:'application/json'
        // })
        // formData.append('json', jsonBlob, 'data.json');
        formData.append("image", {
          uri: image,
          type: "image/" + getFileExtension(image),
          name: "myImage.jpg",
        });
        formData.append("title", courseName);
        formData.append("description", courseDesc);
        formData.append(
          "size",
          selectedFile !== null ? selectedFile.size / (1024 * 1024) : 0
        );
        formData.append(
          "type",
          selectedFile !== null ? getFileExtension(selectedFile.uri) : ""
        );
        formData.append("price", price);
        formData.append("category", category);

        const response = await fetch(
          "http://192.168.0.107:8000/api/uploadCourse",
          {
            method: "POST",
            body: formData,
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const resData = await response.json();
        console.log(resData);
        // alert("Course Uploaded !");
        navigation.replace("InstructorProfile")
        
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };
  const handlePriceChange = (value) => {
    setPrice(value);
  };
  const handleTextChange = (text) => {
    // Remove non-numeric characters from the input
    const numericValue = text.replace(/[^0-9]/g, "");

    const limitedValue = numericValue.slice(0, 3);
    setValue(limitedValue);
  };
  function formatFileSize(bytes, decimalPoint) {
    if (bytes == 0) return "0 Bytes";
    const k = 1024;
    const dm = decimalPoint || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle={"dark-content"} />

      {image !== null ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#fff",
            width: "70%",
            height: 150,
            justifyContent: "center",
            alignItems: "center",

            marginTop: 15,
          }}
          onPress={pickImage}
        >
          <IconButton
            icon={"file-image"}
            iconColor="#fff"
            size={50}
            style={{ margin: -5 }}
          />
          <Text style={{ color: "#fff", fontSize: 20 }}>Upload Image</Text>
        </TouchableOpacity>
      )}

      {selectedFile === null ? (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#fff",
            width: "70%",
            height: 150,
            justifyContent: "center",
            alignItems: "center",

            marginTop: 15,
          }}
          onPress={pickDocument}
        >
          <IconButton
            icon={"cloud-upload-outline"}
            iconColor="#fff"
            size={50}
            style={{ margin: -5 }}
          />
          <Text style={{ color: "#fff", fontSize: 20 }}>Upload Course</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Video
            source={{ uri: selectedFile.uri }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
            style={{ width: "70%", height: 150, borderRadius: 10 }}
          />

          {/* <Text>{selectedFile.uri}</Text>
        <Text>{getFileExtension(selectedFile.uri)}</Text> */}
          <Text style={{ color: "#fff", fontSize: 18 }}>
            File Size:{formatFileSize(selectedFile.size, 2)}
          </Text>
          {/* <Image 
        source={{uri : 'http://192.168.0.105:8000/uploads/1693863904.jpg'}}
        style={{width:200,height:200}}
        /> */}
        </>
      )}
      {/* <Image 
        source={{uri : 'http://192.168.0.105:8000/uploads/1693940647test.jpg'}}
        style={{width:200,height:200}}
        /> */}
      <View style={{ width: "70%", gap: 15 }}>
        <TextInput
          placeholder="Course Name"
          onChangeText={(text) => setCourseName(text)}
          value={courseName}
          placeholderTextColor="grey"
          style={{
            height: 45,
            backgroundColor: "#f5f5f5",
            borderRadius: 5,
            padding: 15,
            fontSize: 18,
          }}
        />
        <DropDownPicker
          open={open}
          value={value}
          items={catDisplay}
          onChangeValue={(value) => {
            setcategory(value);
            console.log("cat" + category);
          }}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setCatDisplay}
          style={styles.drops}
          dropDownContainerStyle={styles.dropItem}
          placeholder={"Category"}
          placeholderStyle={{
            fontSize: 16,
            fontWeight: "600",
            paddingLeft: 10,
          }}
        />
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Course Description"
            placeholderTextColor="grey"
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => setCourseDesc(text)}
            value={courseDesc}
          />
        </View>
        {/* <TextInput
          placeholder="Price ($US)"
          value={value}
          
          onChangeText={handleTextChange}
          placeholderTextColor="grey"
          keyboardType='numeric'
          maxLength={3}
          style={{
            height: 50,
            backgroundColor: "#f5f5f5",
            borderRadius: 5,
            padding: 15,
            fontSize: 18,
          }}
        /> */}
        <Slider
          minimumValue={50}
          maximumValue={500}
          value={price}
          onValueChange={handlePriceChange}
          thumbTintColor="#03ba55"
          minimumTrackTintColor="#03ba55"
          maximumTrackTintColor="#ccc"
          step={1}
        />
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
          Price: ${price}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#11b741",
          padding: 10,
          width: "70%",
          borderRadius: 5,
          marginTop: 30,
          marginBottom: "10%",
        }}
        onPress={uploadDocument}
      >
        <Text
          style={{
            fontSize: 18,
            alignSelf: "center",
            fontWeight: "500",
            textTransform: "uppercase",
          }}
        >
          Upload
        </Text>
      </TouchableOpacity>
      {/* {selectedFile && (
        <>
        <Button title="Uploadd PDF" onPress={uploadDocument} />
        <Text>{selectedFile.uri}</Text>
        <Text>{getFileExtension(selectedFile.uri)}</Text>
        <Text>{formatFileSize(selectedFile.size,2)}</Text>
        </>
      )} */}
    </ScrollView>
  );
};

export default UploadCourse;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1e2a23",
    gap: 15,
  },
  textAreaContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#f5f5f5",
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    fontSize: 18,
    padding: 10,
  },
  dropItem: {
    color: "#131313",
    fontSize: 17,
    fontWeight: "600",
  },
  image: {
    width: "70%",
    height: 150,
    marginTop: 20,
    borderRadius: 10,
  },
});
