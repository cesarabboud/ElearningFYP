import { StyleSheet, Text, View ,ScrollView,ActivityIndicator} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Video } from 'expo-av'
import WebView from 'react-native-webview'

const VideoSection = ({route}) => {
    const {url} = route.params
    console.log(url)
    const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      
      
        
            {isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <Video
              source={{uri:'http://192.168.0.107:8000/'+url}}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping
                onError={(err) => {
                  console.error(err);
                }}
                onReadyForDisplay={() => {
                  setIsLoading(false);
                }}
              />
            )}
        
    </View>
  )
}

export default VideoSection

const styles = StyleSheet.create({})