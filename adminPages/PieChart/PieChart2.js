import { PieChart } from "react-native-gifted-charts";
import {View,Text} from 'react-native'
import React,{useState,useEffect} from 'react'
const App = () => {
  const [focusedSection, setFocusedSection] = useState(0);
  const getStudentsPerformancePercentages = async () =>{
    try{
      const response = await fetch('http://192.168.0.107:8000/api/studentsPerformance',{
        method:"GET"
      })
      const resData = await response.json();
      setPieData([
        {
          value: resData.percentagesArr[0],
          color: '#009FFF',
          gradientCenterColor: '#006DFF',
          label:"Excellent",
          focused:true
        },
        {value: resData.percentagesArr[1], color: '#93FCF8', gradientCenterColor: '#3BE9DE',label:"Good",focused:false},
        {value: resData.percentagesArr[2], color: '#BDB2FA', gradientCenterColor: '#8F80F3',label:"Okay",focused:false},
        {value: resData.percentagesArr[3], color: '#FFA5BA', gradientCenterColor: '#FF7F97',label:"Poor",focused:false},])
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getStudentsPerformancePercentages()
  },[])
  const [pieData,setPieData] = useState([
  {
    value: 47,
    color: '#009FFF',
    gradientCenterColor: '#006DFF',
    label:"Excellent",
    focused:true
  },
  {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE',label:"Good",focused:false},
  {value: 10, color: '#BDB2FA', gradientCenterColor: '#8F80F3',label:"Okay",focused:false},
  {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97',label:"Poor",focused:false},
]);

const renderDot = color => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#006DFF')}
          <Text style={{color: '#000'}}>Excellent: {pieData[0].value}%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#8F80F3')}
          <Text style={{color: '#000'}}>Okay: {pieData[2].value}%</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#3BE9DE')}
          <Text style={{color: '#000'}}>Good: {pieData[1].value}%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FF7F97')}
          <Text style={{color: '#000'}}>Poor: {pieData[3].value}%</Text>
        </View>
      </View>
    </>
  );
};
const onSectionPress = (sectionIndex) => {
    // When a section is pressed, update the focusedSection state
    setFocusedSection(sectionIndex);
  };
  const [dim,setDim] = useState(false)
return (
  <View
    style={{
      flex: 1,
    }}>
    <View
      style={{
        margin: 10,
        padding: 16,
        // borderRadius: 20,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: "#171717",
      }}>
      <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
        Students Performance
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          focusOnPress
          
          innerCircleColor={'#232B5D'}
          onPress={(item,index) => {
            console.log(item)
            setFocusedSection(index)
            }
          }
          
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  {focusedSection !== null
                      ? pieData[focusedSection].value + '%'
                      : '47%'}
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>{focusedSection !== null
                      ? pieData[focusedSection].label
                      : pieData[0].label}</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  </View>);
}
export default App

