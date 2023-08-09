/*import React, { useEffect, useState,useRef } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Platform,
  StyleSheet,
  Button, // import Button component
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Carousel,{ParallaxImage} from "react-native-snap-carousel";
import { IconButton } from "react-native-paper";
// const test = () => {

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function getUsers() {
//       try {
//         const Users = await axios.get("http://127.0.0.1:8000/api/userss");
//         console.log(Users.data);
//         setUsers(Users.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getUsers();
//   }, []);

//   return (
//     <SafeAreaView>
//       <Text>Nbr of users : {users.length}</Text>
//       {users.map((user, index) => {
//         return (
//           <View key={user.id} style={{flexDirection:'row',gap:30}}>
//             <Text>
//               id:{user.id} email:{user.email}
//             </Text>
//           </View>
//         );
//       })}
//       <View></View>
//     </SafeAreaView>
//   );
// };

// export default test;
const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const {width: screenWidth} = Dimensions.get('window');
const Fct = () => {
  // const route = useRoute()
  
  // return (
  //   <View>
  //     <Text>hi {route.params.uname}</Text>

  //   </View>
  // );
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  const goBack = () =>{
    carouselRef.current.snapToPrev();
  }
  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
      <IconButton icon={'arrow-left'} onPress={goBack}/>
      <IconButton icon={'arrow-right'} onPress={goForward}/>
    </View>
  );
};

export default Fct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
*/
//--------
import React from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const App = () => (
  <View style={styles.container}>
    <SwiperFlatList
      bounces={false}
      paginationActiveColor="#03ba55"
      paginationStyleItemInactive={{ backgroundColor: "#fff" }}
      paginationStyleItem={{
        borderRadius: 10,
        width: 10,
        height: 10,
        marginTop: 0,
      }}
      showPagination
    >
      <View style={[styles.child, { backgroundColor: "thistle" }]}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "thistle" }]}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "skyblue" }]}>
        <Text style={styles.text}>3</Text>
      </View>
      <View style={[styles.child, { backgroundColor: "teal" }]}>
        <Text style={styles.text}>4</Text>
      </View>
    </SwiperFlatList>
  </View>
);

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  child: { height: 200, justifyContent: "center", width, alignItems: "center" },
  text: { fontSize: 24, textAlign: "center" },
});

export default App;
