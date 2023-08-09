import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal
} from "react-native";
import { IconButton } from "react-native-paper";
import React, { useState } from "react";
const width = Dimensions.get("window").width;

const AddReview = () => {
  const [text, setText] = useState("");

  const characterLimit = 300;

  const handleTextChange = (newText) => {
    if (newText.length <= characterLimit) {
      setText(newText);
    }
  };
  const [starRating, setStarRating] = useState(0);

  const handleStarPress = (rating) => {
    setStarRating(rating);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmitReview = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <ScrollView>

    
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); handleStarPress(0)}}>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 15, marginHorizontal: 30,marginVertical:20 }}>
          <Image
            source={require("../images/jsyellow.png")}
            style={{ width: 120, height: 120, borderRadius: 7 }}
          />
          <View style={{ width: width - 200, gap: 5, height: "100%" }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Learn JS in 30 Days
            </Text>
            <Text style={{ color: "#959595", fontSize: 14 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#eaeaea", padding: 30,borderRadius:30,marginVertical:20 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            Write Your Review
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            value={text}
            onChangeText={handleTextChange}
            style={styles.textArea}
            placeholder="What did you like the most about this course ?"
          />
          <Text style={styles.characterCount}>
            {characterLimit - text.length} characters remaining
          </Text>
          <Text style={[styles.ratingText,{marginTop:15}]}>Rate This Course out of 5</Text>
          <View>
      <View style={{flexDirection: "row", alignSelf: "center"}}>
        
        <IconButton
          icon="star"
          iconColor={starRating >= 1 ? '#ffc107' : '#b5b2b2'}
          size={28}
          onPress={() => handleStarPress(1)}
          style={styles.starIcon}
        />
        <IconButton
          icon="star"
          iconColor={starRating >= 2 ? '#ffc107' : '#b5b2b2'}
          size={28}
          onPress={() => handleStarPress(2)}
          style={styles.starIcon}
        />
        <IconButton
          icon="star"
          iconColor={starRating >= 3 ? '#ffc107' : '#b5b2b2'}
          size={28}
          onPress={() => handleStarPress(3)}
          style={styles.starIcon}
        />
        <IconButton
          icon="star"
          iconColor={starRating >= 4 ? '#ffc107' : '#b5b2b2'}
          size={28}
          onPress={() => handleStarPress(4)}
          style={styles.starIcon}
        />
        <IconButton
          icon="star"
          iconColor={starRating >= 5 ? '#ffc107' : '#b5b2b2'}
          size={28}
          onPress={() => handleStarPress(5)}
          style={styles.starIcon}
        />
      </View>
      <Text style={styles.ratingText}>
        Rating: {starRating} / 5
      </Text>
    </View>
    
        </View>
        <TouchableOpacity onPress={handleSubmitReview} style={{backgroundColor:'#02ba5d',justifyContent:'center',alignItems:'center',height:60,marginHorizontal:30,marginBottom:20,borderRadius:10}}>
        <Text style={{textTransform:'uppercase',fontWeight:'600',fontSize:20,color:'#fff'}}>Submit Review</Text>
    </TouchableOpacity>
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Thanks For Submitting Your Review!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <StatusBar barStyle="dark-content" />
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  textArea: {
    height: 150,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 16,
    borderRadius: 10,
    marginTop:30
  },
  characterCount: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: 'hsl(206,100%,52%)',
  },
  starIcon: {
    margin: 0,
    marginRight: -15,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
  modalContainer: {
    flex: 1,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#282828',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap:15,
    height:150,
    justifyContent:'center'
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff'
  },
  closeButton: {
    backgroundColor: '#0AB072',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    width:250,
    height:50
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform:'uppercase'
  },
});