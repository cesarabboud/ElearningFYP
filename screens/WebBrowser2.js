import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView,StatusBar , ActivityIndicator} from "react-native";
import { WebView } from "react-native-webview";

const MyWebComponent = () => {
    const [visible,setVisible] = React.useState(false)
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
    <WebView
      
      source={{ uri: 'https://eloquentjavascript.net/Eloquent_JavaScript_small.pdf' }}
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