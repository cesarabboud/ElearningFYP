import React, { Component,useState } from "react";
import { StyleSheet, Text, View, SafeAreaView,StatusBar , ActivityIndicator,Button,Linking} from "react-native";
import { WebView } from "react-native-webview";
import { downloadFile } from 'expo-filedownload'
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {Share} from 'expo'
const MyWebComponent = ({route,navigation}) => {
    const [visible,setVisible] = React.useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { pdfurl,pdftitle,pdftype } = route.params
    const handleDownload = () => {
      setIsLoading(true)
      downloadFile(pdfurl)
          .then(() => setIsLoading(false))
  }
  const handleShare = async () => {
    // Open the share dialog with the file's URL
    try {
      await Linking.openURL(pdfurl);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  const handleDownloadPPT = () => {
    setIsLoading(true);
    // Replace 'downloadFile' with your actual download function.
    downloadFile(pdfurl)
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Error downloading PowerPoint:', error);
        setIsLoading(false);
      });
  };
    const ActivityIndicatorComponent = () =>{
        return(
            <View style={styles.activityIndicatorStyle}>
                <ActivityIndicator color="#000" size={'large'} />
            </View>
        )
    }
  return (
    <>
    <StatusBar barStyle={'dark-content'} />
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',margin:10,justifyContent:'space-between',alignItems:'center'}}>
        <Ionicons onPress={()=>navigation.goBack()} name='chevron-back' size={24} />
        <Text style={{fontWeight:"600",fontSize:20}}>{pdftitle}.{pdftype}</Text>
        <Ionicons onPress={pdfurl.split(".").pop() === 'pptx' ? handleShare : handleDownloadPPT} name="share-social-outline" size={24}/>

      </View>
    <WebView
      
      source={{ uri: pdfurl }}
        //minimumFontSize={50}
        
        showsVerticalScrollIndicator={false}
        pagingEnabled={false}
        scrollEnabled={true}
        renderLoading
        javaScriptEnabled={true}
        dataDetectorTypes
        domStorageEnabled={true}
        pullToRefreshEnabled
        bounces={false}
        onLoadStart={()=>setVisible(true)}
        onLoad={()=>setVisible(false)}
        menuItems={[{ label: 'Tweet', key:'tweet' }, { label: 'Save for later', key: 'saveForLater' },{label:'Whatsapp',key:'Share with Whatsapp'}]}
    />
    { visible ? <ActivityIndicatorComponent/> : null}
    </SafeAreaView>
    
    </>
    
  );
};
export default MyWebComponent;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    activityIndicatorStyle:{
        flex:1,
        position:'absolute',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:'auto',
        marginRight:'auto',
        left:0,
        right:0,
        top:0,
        bottom:0,
        justifyContent:'center'
    }
  });