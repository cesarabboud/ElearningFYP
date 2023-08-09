import { StyleSheet,Animated,useWindowDimensions , View } from 'react-native'
import React from 'react'

const paginator = ({data,scrollX}) => {
    const {width} = useWindowDimensions()
    
  return (
    <View style={{flexDirection:'row',height:64}}>
      {data.map((_,i)=>{
        const inputRange = [(i-1) * width , i*width , (i+1)*width]
        
        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange:[10,30,10],
            extrapolate:'clamp'
        })
        /*const opacity=scrollX.interpolate({
            inputRange,
            outputRange:[1,1,1],
            extrapolate:'clamp'
        })*/
        const color = scrollX.interpolate({
            inputRange,
            outputRange:["#1E2A23","#03BA55","#1E2A23"],
            extrapolate: 'clamp',
          });
        return <Animated.View style={[styles.dot,{width:dotWidth,backgroundColor:color}]} key={i.toString()}/>
      })}
    </View>
  )
}

export default paginator;

const styles = StyleSheet.create({
    dot:{
        height:10,
        borderRadius:5,
        backgroundColor:"#03ba55",
        marginHorizontal:4,
    }
})