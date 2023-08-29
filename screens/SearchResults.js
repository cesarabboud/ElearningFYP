import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from "react-native";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
export default function App() {

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
