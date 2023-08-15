import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
export default function App() {
  const COLORS = [
    {
      id: 1,
      name: "Sublime Vivid",
      colors: ["#FC466B", "#3F5EFB"],
    },
    {
      id: 2,
      name: "Rainbow Blue",
      colors: ["#00F260", "#0575E6"],
    },
    {
      id: 3,
      name: "Orange Fun",
      colors: ["#fc4a1a", "#f7b733"],
    },
    {
      id: 4,
      name: "Moon Purple",
      colors: ["#4e54c8", "#8f94fb"],
    },
    {
      id: 5,
      name: "Harvey",
      colors: ["#1f4037", "#99f2c8"],
    },
    {
      id: 6,
      name: "Amin",
      colors: ["#8E2DE2", "#4A00E0"],
    },
    {
      id: 7,
      name: "Yoda",
      colors: ["#FF0099", "#493240"],
    },
    {
      id: 8,
      name: "Piggy Pink",
      colors: ["#ee9ca7", "#ffdde1"],
    },
    {
      id: 9,
      name: "Mango",
      colors: ["#ffe259", "#ffa751"],
    },
    {
      id: 10,
      name: "Purpink",
      colors: ["#7F00FF", "#E100FF"],
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 ,backgroundColor:'#1E2a23' }}>
        <StatusBar barStyle={'light-content'} />
        <IconButton icon={'tag'} iconColor="#fff"  style={{margin:0,alignSelf:'center'}} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {/* {COLORS.map((item,index) => 
        <Animated.View entering={FadeInLeft.delay(500 * (index) )}>
        <LinearGradient
          key={item.id}
          colors={item.colors}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={{ justifyContent: 'center', alignItems: 'center', height: 120, borderRadius: 10, marginBottom: 8, }}>
            <Text style={{fontSize: 20, fontWeight: '800', color:'#FFF'}}>{item.name}</Text>
        </LinearGradient>
        </Animated.View>
        )} */}
        <Animated.View
          style={{
            borderColor: "#03ba55",
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
          }}
          entering={FadeInRight.delay(500)}
        >
          <IconButton icon={"heart-outline"} iconColor="#03ba55"/>
          <Image
            source={require("../images/pdfcover.png")}
            style={{ width: '100%', height: 250, resizeMode: 'contain', marginBottom: 12}}
          />
          <Text style={{ textAlign:'left' , marginTop: 20,color:'#fff',fontSize: 14, fontWeight: '600', }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, sapien vel bibendum ultricies, velit nunc bibendum nunc,
            vel blandit velit magna vel velit.
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 8,color:"#fff" }}>JS For Beginners</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center"}}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <IconButton icon={"star"} iconColor="#ffc107" style={{ margin:0 }} />
              <Text style={{fontSize: 12, fontWeight: '600',color:"#fff"}}>3.9</Text>
            </View>
            <Text style={{fontSize: 16, fontWeight: '600',color:"#fff"}}>$109.5</Text>

          </View>
          <TouchableOpacity style={{borderWidth:2,borderColor:'#03ba55',height:45,justifyContent:'center',alignItems:'center',borderRadius:10}}>
            <Text style={{color:"#03ba55"}}>Add To Cart</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            borderColor: "#03ba55",
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
            marginTop:20
          }}
          entering={FadeInRight.delay(1000)}
        >
          <IconButton icon={"heart-outline"} iconColor="#03ba55"/>
          <Image
            source={require("../images/pdfcover.png")}
            style={{ width: '100%', height: 250, resizeMode: 'contain', marginBottom: 12}}
          />
          <Text style={{ textAlign:'left' , marginTop: 20,color:'#fff',fontSize: 14, fontWeight: '600', }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, sapien vel bibendum ultricies, velit nunc bibendum nunc,
            vel blandit velit magna vel velit.
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 8,color:"#fff" }}>JS For Beginners</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center"}}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <IconButton icon={"star"} iconColor="#ffc107" style={{ margin:0 }} />
              <Text style={{fontSize: 12, fontWeight: '600',color:"#fff"}}>3.9</Text>
            </View>
            <Text style={{fontSize: 16, fontWeight: '600',color:"#fff"}}>$109.5</Text>

          </View>
          <TouchableOpacity style={{borderWidth:2,borderColor:'#03ba55',height:45,justifyContent:'center',alignItems:'center',borderRadius:10}}>
            <Text style={{color:"#03ba55"}}>Add To Cart</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            borderColor: "#03ba55",
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
            marginTop:20
          }}
          entering={FadeInRight.delay(1500)}
        >
          <IconButton icon={"heart-outline"} iconColor="#03ba55"/>
          <Image
            source={require("../images/pdfcover.png")}
            style={{ width: '100%', height: 250, resizeMode: 'contain', marginBottom: 12}}
          />
          <Text style={{ textAlign:'left' , marginTop: 20,color:'#fff',fontSize: 14, fontWeight: '600', }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, sapien vel bibendum ultricies, velit nunc bibendum nunc,
            vel blandit velit magna vel velit.
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 8,color:"#fff" }}>JS For Beginners</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center"}}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <IconButton icon={"star"} iconColor="#ffc107" style={{ margin:0 }} />
              <Text style={{fontSize: 12, fontWeight: '600',color:"#fff"}}>3.9</Text>
            </View>
            <Text style={{fontSize: 16, fontWeight: '600',color:"#fff"}}>$109.5</Text>

          </View>
          <TouchableOpacity style={{borderWidth:2,borderColor:'#03ba55',height:45,justifyContent:'center',alignItems:'center',borderRadius:10}}>
            <Text style={{color:"#03ba55"}}>Add To Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
