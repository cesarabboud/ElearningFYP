import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';



const ChartExample = () => {

  const data = [
    {
      name: 'PDF',
      population: 25,
      color: 'tomato',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'PPTX',
      population: 25,
      color: 'skyblue',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'DOCX',
      population: 25,
      color: 'gold',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'MP4',
      population: 25,
      color: '#268A8E',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
  ];
  const [data2,setData2] = useState(data)
  const GetPercentagesFromDb = async () => {
    try{
      const response = await fetch('http://192.168.0.107:8000/api/getPercentages',{
        method:"GET",
      })
      const resData = await response.json()
      
      // data.forEach((d,idx) => {
      //   d.population = resData[idx]
      // })
      data2.forEach((d,idx) => {
        if(idx === 0){
          d.population = resData[idx] + 1
        }
        d.population = resData[idx]
      })
    }
    catch(err){
      console.log(err)
    }
  }
  const isFocused = useIsFocused()
  React.useEffect(()=> {
    if(isFocused){
      GetPercentagesFromDb()
    }
  },[isFocused])
  return (
    <View style={{alignSelf:'center'}}>
      <PieChart
        data={data2}
        width={300}
        height={220}
        
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        
        paddingLeft="15"
        
      />
    </View>
  );
};

export default ChartExample;
