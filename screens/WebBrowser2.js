import React, { Component,useState } from "react";
import { StyleSheet, Text, View, SafeAreaView,StatusBar , ActivityIndicator,Button,Linking} from "react-native";
import { WebView } from "react-native-webview";
import { downloadFile } from 'expo-filedownload'
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {Share} from 'expo'
const MyWebComponent = ({route}) => {
    const [visible,setVisible] = React.useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { pdfurl } = route.params
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
    <Ionicons onPress={handleDownload} name="share-social-outline" style={{alignSelf:'flex-end',marginRight:10,marginTop:10}} size={24}/>
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
        menuItems={[{ label: 'Tweet', key: 'tweet' }, { label: 'Save for later', key: 'saveForLater' },{label:'Whatsapp',key:'Share with Whatsapp'}]}
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