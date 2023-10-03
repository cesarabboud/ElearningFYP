import React, { Component,useState } from "react";
import { StyleSheet, Text, View, SafeAreaView,StatusBar , ActivityIndicator,Button,Linking,TouchableOpacity} from "react-native";
import { WebView } from "react-native-webview";
import { downloadFile } from 'expo-filedownload'
import { Ionicons,Feather } from "@expo/vector-icons";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {Share} from 'expo'
import * as WebBrowser from 'expo-web-browser'
import { useIsFocused, useNavigation } from "@react-navigation/native";
const MyWebComponent = ({route}) => {
    const [visible,setVisible] = React.useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { pdfId,pdfurl,pdftitle,pdftype } = route.params
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
    //  await WebBrowser.openBrowserAsync(pdfurl);
  };
  const handleDownloadPPT = () => {
    setIsLoading(true);
    // Replace 'downloadFile' with your actual download function.
    console.log('okkkkkkkkkk')
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
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }
  function renameProperties(oldObject) {
      const newObject = {};
      for (const key in oldObject) {
        // Rename properties as needed
        if (key === "correct_answer") {
          newObject.correct_option = oldObject[key];
        }
        else if(key === 'incorrect_answers'){
          newObject.options = oldObject[key]
        }
        else {
          newObject[key] = oldObject[key];
        }
      }
      return newObject;
    }
    const loadData = () => {
      const apiUrl = "https://opentdb.com/api.php?amount=5";
      return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const modifiedArr = data.results;
          modifiedArr.forEach(question => {
            const correctAnswer = question.correct_answer;
            question.incorrect_answers.push(correctAnswer);
            shuffleArray(question.incorrect_answers);
          });
    
          const renamedQuestions = modifiedArr.map(question => renameProperties(question));
          return renamedQuestions;
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error; // Re-throw the error to be caught elsewhere if needed
        });
    };
  const [quest,setQuest] = useState([])
  const isFocused = useIsFocused()

  React.useEffect(()=>{
    if(isFocused){
      loadData().then(arr => {
        console.log('arr', arr);
        setQuest(arr);
        console.log('quest',quest)
      }).catch(error => {
        console.log(error)
        // Handle the error here if needed
      });
    }
    
  },[isFocused])
    const Test = () => {
      // console.log(quest)
      console.log(pdfId)
      // return
      navigation.navigate("QuizSection",{
        pdfId:pdfId,
        questArr:quest
      })
    }
    const [show,setIsShow] = useState(true)
    const navigation = useNavigation()
  return (
    <>
    <StatusBar barStyle={'dark-content'} />
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',margin:10,justifyContent:'space-between',alignItems:'center'}}>
        <Ionicons onPress={()=>navigation.goBack()} name='chevron-back' size={24} />
        <Text style={{fontWeight:"600",fontSize:20}}>{pdftitle}.{pdftype}</Text>
        <Ionicons onPress={pdfurl.split(".").pop() === 'pptx' ? handleShare : handleDownloadPPT} name="share-social-outline" size={24}/>


      </View>
      <View style={{height:1,backgroundColor:"#ccc"}}/>
      {
        show ? <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
          <Text><Text onPress={Test} style={{color:'#03a9f4',textDecorationLine:'underline'}}>Press here</Text> to test your knowledge.</Text>
          <Ionicons name="help-circle-outline" size={24} />
          </View>
          <TouchableOpacity
          onPress={()=>setIsShow(!show)}
          style={{
            borderRadius: 20,
            backgroundColor: "#808080",
            padding: 2,
            alignItems:'center'
          }}
          >
            <Feather color={"#efefefef"} name="x" size={10} />
          </TouchableOpacity>
        </View>
        <View style={{height:1,backgroundColor:"#ccc"}}/>
        </View> : null
      }
      
      
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