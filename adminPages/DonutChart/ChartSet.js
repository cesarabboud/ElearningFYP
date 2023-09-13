/**
 * Inspiration: https://dribbble.com/shots/6971340-Anthill-Real-Estate-Home-Animated
 */

import * as React from 'react';
import { Text, StatusBar, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Donut from './Donut'

const data = [{
  percentage: 8,
  color: 'tomato',
  max: 20,
  type:"Students"
}, {
//   percentage: 14,
  color: 'skyblue',
  max: 20,
  type:"Teachers"
}, {
//   percentage: 92,
  color: 'gold',
  max: 100,
  type:"Courses",

}, {
//   percentage: 240,
  color: '#222',
  max: 100,
  type:"Reviews"
}, {
//   percentage: 250,
  color: '#268A8E',
  max: 100,
  type:"Questions"
}, {
    //   percentage: 250,
      color: '#adc178',
      max: 100,
      type:"Answers"
    }
]
export default function ChartSet() {
    const [statistics,setStatistics] = React.useState([])
    const getStats = async () => {
        try{
            const response = await fetch('http://192.168.0.107:8000/api/getStats',{
                method:"GET"
            })
            const resData = await response.json()
            // console.log(resData)
            setStatistics(resData.arr);
            // console.log(statistics[0].key)
            console.log(statistics.length)
        }
        catch(err){
            console.log(err)
        }
    }
    React.useEffect(()=>{
       getStats() 
    },[])

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center',gap:15}}>
        {data.map((p, i) => {
          return <Donut key={i} type={p.type} percentage={statistics[i]} color={p.color} delay={500 + 100 * i} max={p.max}/>
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#fff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
