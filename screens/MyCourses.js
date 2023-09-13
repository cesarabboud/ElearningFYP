import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import React, { useState,useEffect } from 'react';
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View, SafeAreaView,ScrollView,ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import WebView from 'react-native-webview';

const App = () => {
  const [listVideos,setListVideos] = useState([])
  const getMyVids = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token!==null){
      try{
        const response = await fetch('http://192.168.0.105:8000/api/getVideos',{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log(resData)
        setListVideos(resData.videos)
      }
      catch(err){
        console.log(err)
      }
    }
  }
  
  useEffect(()=>{
    getMyVids()
  },[])
  const MyCoursesCarousel = () =>{
    const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
    },
  ];

  const _renderItem = ({ item, index }) => (
    <View
      style={{
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 25,
        marginRight: 25,
      }}>
      <Text style={{ fontSize: 30 }}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 150 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginLeft: 40,
          marginTop:100
        }}>
        <Carousel
          layout='stack'
          data={carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
  }
  
  const video = React.useRef(null)
  const videoUri = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };
  const PlayVid = () => {
    try {
      return (
        <Video
          source={{ uri: videoUri }}
          style={{ height: 200, width: 300  }}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay={isPlaying}
          
        />
      );
    } catch (error) {
      console.error('Video playback error:', error);
      return null;
    }
  }
  const [videoDuration, setVideoDuration] = useState(null);

  useEffect(() => {
    // Function to load and retrieve video duration
    const fetchVideoDuration = async () => {
      const videoObject = new Video.Sound();
      try {
        await videoObject.loadAsync({ uri: videoUri });
        const durationMillis = await videoObject.getDurationAsync();
        // Convert duration from milliseconds to seconds
        const durationSeconds = durationMillis / 1000;
        setVideoDuration(durationSeconds);
      } catch (error) {
        console.error('Error loading video:', error);
      } finally {
        // Unload the video to release resources
        videoObject.unloadAsync();
      }
    };

    fetchVideoDuration();
  }, []);
  const [remainingDuration, setRemainingDuration] = useState(0);
  const formatDuration = (durationMillis) => {
  const durationInSeconds = durationMillis / 1000;
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
  return (
    // <MyCoursesCarousel />
    <SafeAreaView style={styles.container}>
      <View>
      <Video
        source={{ uri: videoUri }}
        rate={1.0}
        volume={1}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={isPlaying}
        style={styles.video}
        useNativeControls
      />
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={toggleVideo} />
      <Text>{formatDuration(remainingDuration)}</Text>
      </View>
      
    </SafeAreaView>
      
      
    
  )
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    height: 200,
    width: 300,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Optional: Add a semi-transparent background
  },
})

export default App;
