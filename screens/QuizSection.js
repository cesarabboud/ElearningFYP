import React, { useState,useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated,ScrollView } from 'react-native'
import { COLORS, SIZES } from './QuizTheme/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Quiz = () => {
    const route = useRoute()
    const allQuestions = route.params?.questArr || [];
    console.log(route.params?.pdfId)
    // console.log(idPdf)
    //    console.log(questArr)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            // Set Score
            setScore(score+1)
        }
        // Show Next Button
        setShowNextButton(true)
    }
    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
        setTimer(0)
    }


    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40,
                gap:10
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent:'center'
                }}>
                    <Text style={{ fontSize: 28, opacity: 0.6,fontWeight:"bold"}}>Question {currentQuestionIndex+1}/{allQuestions.length}</Text>
                </View>

                {/* Question */}
                <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#0AB072", "#02BA5D", "#11B741"]}
                style={{
                  padding:15,
                  justifyContent: "center",
                  borderRadius: 15}}>
                <Text style={{
                    color: COLORS.white,
                    fontSize: 26,
                    fontWeight:"600"
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
                </LinearGradient>
                
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                        onPress={()=> validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==correctOption 
                            ? COLORS.success
                            : option==currentOptionSelected 
                            ? COLORS.error 
                            : "transparent",
                            backgroundColor: option==correctOption 
                            ? COLORS.success +'20'
                            : option==currentOptionSelected 
                            ? COLORS.error +'20'
                            : "#ccc",
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 50,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                onPress={handleNext}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                }}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }

    const BackToCourse = async () => {
      const token = await AsyncStorage.getItem('token')
      if(token !== null){
        try{
          const response = await fetch('http://192.168.0.107:8000/api/postQuiz/'+route.params?.pdfId,{
            method:"POST",
            headers:{
            "Authorization":`Bearer ${token}`,
            Accept: 'application.json',
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              grade:score,
              duration:timer
            })
          })
          const resData = await response.json()
          console.log(resData)
          
        }
        catch(err){
          console.log(err)
        }
        finally{
          navigation.goBack()
        }
      }
    }
    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }
    const [timer, setTimer] = useState(0);

    
    useEffect(() => {
      

      let intervalId;
  
      if (currentQuestionIndex < allQuestions.length && !showScoreModal) {
        // Start the timer when the quiz begins
        intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
      }
  
      return () => {
        clearInterval(intervalId);
      };
    }, [currentQuestionIndex, allQuestions.length, showScoreModal]);
    const navigation = useNavigation()
    return (
       <ScrollView style={{
           flex: 1
       }}>
           <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
           <View style={{
               flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
              //  backgroundColor: COLORS.background,
               position:'relative'
           }}>

               {/* <Text>{timer}</Text> */}
               {/* ProgressBar */}
               { renderProgressBar() }

               {/* Question */}
               {renderQuestion()}

               {/* Options */}
               {renderOptions()}

               {/* Next Button */}
               {renderNextButton()}

               {/* Score Modal */}
               <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: COLORS.primary,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: COLORS.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>Score</Text>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 20,
                                   color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/{ allQuestions.length }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <View style={{width:'100%',gap:15}}>
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                               }}>Retry Quiz</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                           onPress={BackToCourse}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                               }}>Back To Course</Text>
                           </TouchableOpacity>
                           <Text style={{textAlign:'center'}}>Time spent:{timer >=60 ?`${Math.floor(timer/60)} minute(s) ${timer%60} second(s)`:`${timer} second(s)`}</Text>
                           </View>
                           
                       </View>

                   </View>
               </Modal>

               {/* Background Image */}
               {/* <Image
                source={require('../images/DottedBG.png')}
                style={{
                    width: SIZES.width,
                    height: 130,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.5
                }}
                resizeMode={'contain'}
                /> */}

           </View>
       </ScrollView>
    )
}

export default Quiz