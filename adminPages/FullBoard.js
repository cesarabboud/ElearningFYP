import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React, { useState, useEffect } from "react";
import {  Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image } from "react-native";
const FullBoard = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const getStudents = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.107:8000/api/getAverageQuizScores",
        {
          method: "GET",
        }
      );
      const resData = await response.json();
      setStudents(resData.students);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getStudents();
  }, []);
  const hexagonPoints = [
    '50,0',
    '100,25',
    '100,75',
    '50,100',
    '0,75',
    '0,25',
  ].join(' ');
  return (
    <View style={styles.container}>
      <View style={styles.fixedView}>
        {/* Content that you want to be fixed */}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 30,
            marginHorizontal: 10,
          }}
        >
          <Ionicons
            name="chevron-back"
            size={14}
            onPress={() => navigation.goBack()}
          />
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            Leaderboard
          </Text>
          <Ionicons name="chevron-back" style={{ opacity: 0 }} />
        </View>
      </View>
      <View style={{marginTop:70,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:80,backgroundColor:'#03ba55'}}>
          <View style={{width:"100%",flexDirection:'row',justifyContent:"center",alignItems:"center",gap:65,marginTop:10}}>
          {
            students.map((s,idx)=>{
                if(idx === 1 || idx === 2){
                    return (
                        <View style={{alignItems:'center',gap:10}}>
                        <Text style={{fontSize:22,fontWeight:"600",color:"#fff"}}>{idx+1}</Text>
                        <Image 
                source={{uri:'http://192.168.0.107:8000/'+s.profilepicture}} 
                style={{width:90,height:90,overflow:"hidden",borderRadius:50,backgroundColor:"#ccc"}}
                />
                <Text style={{fontSize:24,fontWeight:"600",color:"#fff"}}>{s.averageScore * 20}</Text>
                    </View>
                    )
                }
                return
            })
          }
          </View>
          
          {
  students.map((s, idx) => {
    if (idx === 0) {
      return (
        <View style={{ alignSelf:"center", alignItems: 'center', gap: 10 ,position:"absolute",left:0,right:0,top:15,bottom:0}}>
            <Text style={{fontSize:22,fontWeight:"600",color:"#fff"}}>{idx+1}</Text>
            <Icon name="crown" color={"#ffc107"} size={22} />
          <View style={{ shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 5, shadowColor: "#131313", position: "relative" }}>
            <Image
              source={{ uri: 'http://192.168.0.107:8000/' + s.profilepicture }}
              style={{ marginBottom: -5, width: 110, height: 110, overflow: "hidden", borderRadius: 70, backgroundColor: "#ccc" }}
            />
            
          </View>
          <Text style={{fontSize:24,fontWeight:"600",color:"#fff"}}>{s.averageScore *20}</Text>
          {/* Place the Icon here */}
          
        </View>
      );
    }
  })
}

          {/* {
            students.map((s,idx)=>{
                if(idx === 2){
                    return (
                        <View style={{alignItems:'center',gap:10,position:"relative"}}>
                            <Text style={{fontSize:22,fontWeight:"600",color:"#fff"}}>{idx+1}</Text>
                            <Image 
                    source={{uri:'http://192.168.0.107:8000/'+s.profilepicture}} 
                    style={{width:80,height:80,overflow:"hidden",borderRadius:50,backgroundColor:"red",zIndex:999}}
                    />
                        </View>
                    
                    )
                }
            })
          } */}
      </View>
      <ScrollView>
        
        {students.map((s, idx) => {
            if(idx >=3){
                return (
                    <View key={idx} style={{backgroundColor:(idx + 1) % 2 === 0 ? "#ccc" : "#fff"}}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: 15,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Text style={{ fontSize: 22 }}>{idx + 1}</Text>
                          <Text>{s.name}</Text>
                        </View>
                        <Text style={{fontWeight:"600"}}>{s.averageScore * 20}</Text>
                      </View>
                      {idx !== students.length - 1 ? (
                        <View style={{ height: 1, backgroundColor: "#ccc" }} />
                      ) : null}
                    </View>
                  );
            }
          
        })}
      </ScrollView>
    </View>
  );
};

export default FullBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  fixedView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    backgroundColor: "white",
    zIndex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
