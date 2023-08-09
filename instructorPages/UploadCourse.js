import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  ScrollView
} from "react-native";
import Slider from 'react-native-slider'
import React,{useState} from "react";
import { IconButton } from "react-native-paper";

const UploadCourse = () => {
    const [value, setValue] = useState('');
    const [price, setPrice] = useState(50);

    const handlePriceChange = (value) => {
      setPrice(value);
    };
  const handleTextChange = (text) => {
    // Remove non-numeric characters from the input
    const numericValue = text.replace(/[^0-9]/g, '');
    
    const limitedValue = numericValue.slice(0, 3);
    setValue(limitedValue);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#fff",
          width: "70%",
          height: 150,
          justifyContent: "center",
          alignItems: "center",
          
          marginTop:10
        }}
      >
        <IconButton
          icon={"cloud-upload-outline"}
          iconColor="#fff"
          size={50}
          style={{ margin: -5 }}
        />
        <Text style={{ color: "#fff", fontSize: 20 }}>Upload Video</Text>
      </TouchableOpacity>
      <View style={{ width: "70%", gap: 15 }}>
        <TextInput
          placeholder="Course Name"
          placeholderTextColor="grey"
          style={{
            height: 45,
            backgroundColor: "#f5f5f5",
            borderRadius: 5,
            padding: 15,
            fontSize: 18,
          }}
        />
        <TextInput
          placeholder="Course Name"
          placeholderTextColor="grey"
          style={{
            height: 45,
            backgroundColor: "#f5f5f5",
            borderRadius: 5,
            padding: 15,
            fontSize: 18,
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
        maximumValue={1000}
        value={price}
        onValueChange={handlePriceChange}
        thumbTintColor="#03ba55"
        minimumTrackTintColor="#03ba55"
        maximumTrackTintColor="#ccc"
        
        step={1}
        
      />
      <Text style={{color:'#fff',fontSize:16,textAlign:'center'}}>Price: ${price}</Text>
      </View>
      <TouchableOpacity style={{backgroundColor:'#11b741',padding:10,width:'70%',borderRadius:5,marginTop:30}}>
        <Text style={{fontSize:18,alignSelf:'center',fontWeight:'500',textTransform:'uppercase'}}>Upload</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UploadCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
