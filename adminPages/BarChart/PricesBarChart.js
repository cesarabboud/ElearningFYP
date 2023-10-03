import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {BarChart} from 'react-native-chart-kit'



const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  decimalPlaces:0,
  
//   useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
});

const BarChartExample = () => {
    
      const [newData,setNewData] = useState([])
      const [types,setTypes] = useState([])
      const getPricesFromDb = async () => {
        try{
            const response = await fetch('http://192.168.0.107:8000/api/getAvgCoursesPricesByType',{
                method:"GET"
            })
            const resData = await response.json()
            // console.log(resData);
            setNewData(resData.prices)
            setTypes(resData.types.map((t)=>t.toUpperCase()))
        }
        catch(err){
            console.log(err)
        }
      }
      const data = {
        labels: types,
        datasets: [
          {
            data: newData,
          },
        ],
      };
      React.useEffect(()=>{
        getPricesFromDb()
      },[])
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={300}
        height={200}
        yAxisLabel="$"
        // yAxisSuffix='k'
        chartConfig={chartConfig}
        style={{borderRadius:5,marginTop:20}}
        showValuesOnTopOfBars
        // fromZero
      />
    </View>
  );
};

export default BarChartExample;