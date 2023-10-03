import { StyleSheet, Text, View , StatusBar,Image,Dimensions,ScrollView,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SvgXml } from 'react-native-svg'
import { TabView,SceneMap,TabBar} from 'react-native-tab-view';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const InstructorDetails = ({route}) => {

    const id = route.params.instructorId
    const name = route.params.name
    const categories = route.params?.categories
    const pp = route.params.pp
    // console.log(categories)
    // console.log(id)
    const navigation=useNavigation()
    const [pdfArr,setPdfArr] = useState([])
    const [pptxArr,setPptxArr] = useState([])
    const [docxArr,setDocxArr] = useState([])
    const [vidArr,setVidArr] = useState([])
    const back =`<svg width="376" height="250" viewBox="0 0 376 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12.658" cy="127.31" rx="12.1753" ry="12.2414" fill="#03BA55" fill-opacity="0.5"/>
    <ellipse cx="275.645" cy="12.2414" rx="12.1753" ry="12.2414" fill="#03BA55" fill-opacity="0.5"/>
    <ellipse cx="52.8367" cy="82.0173" rx="3.6526" ry="3.67241" fill="#03BA55" fill-opacity="0.5"/>
    <ellipse cx="49.1839" cy="239.931" rx="9.74026" ry="9.7931" fill="#03BA55" fill-opacity="0.5"/>
    <ellipse cx="320.694" cy="170.155" rx="3.6526" ry="3.67241" fill="#03BA55" fill-opacity="0.5"/>
    <ellipse cx="357.22" cy="140.776" rx="18.263" ry="18.3621" fill="#03BA55" fill-opacity="0.5"/>
    <ellipse cx="68.6643" cy="24.4827" rx="12.1753" ry="12.2414" fill="#03BA55" fill-opacity="0.5"/>
    <ellipse cx="188" cy="161.5" rx="79" ry="79.5" fill="#03BA55" fill-opacity="0.85"/>
    </svg>
    `
    const getMyCourses = async () => {
        try {
            const response = await fetch('http://192.168.0.107:8000/api/getMyLessons/'+id,{
                method:"GET"
            })
            const resData =await response.json()
            // console.log('length',resData.courses.pdf.length)
            setPdfArr(!resData.courses.pdf ? [] : resData.courses.pdf)
            setPptxArr(!resData.courses.pptx ? [] : resData.courses.pptx)
            setDocxArr(!resData.courses.docx ? [] : resData.courses.docx)
            setVidArr(!resData.courses.mp4 ? [] : resData.courses.mp4)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=> {
        getMyCourses()
    },[])
    const FirstRoute = () => {
      if(pdfArr.length !== 0){
        return (
          <ScrollView style={[styles.scene, {  }]}>
              {
                  
                  pdfArr.map((pdf,idx)=>{
                      return (
              <View key={idx}>
                  <TouchableOpacity
                  onPress={()=>navigation.navigate(pdf.type === 'mp4' ? "CourseDetails": "BookDetails",{
                    cid:pdf.id,
                    cat:pdf.get_category.name,
                    uploader:pdf.get_user.name,
                    cType:pdf.type
                  })}
                  style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                      <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                          <Image 
                          source={{uri:'http://192.168.0.107:8000/'+pdf.thumbnail}}
                          style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                          />
                          <View>
                              <Text style={{fontSize:18,fontWeight:"600"}}>{pdf.title}</Text>
                              <Text style={{fontSize:16}}>${pdf.price}.00</Text>
                          </View>
                      </View>
                      <Ionicons name="chevron-forward" size={20}/>
                      
                      
                      
                  </TouchableOpacity>
                  <View style={{height:1,backgroundColor:"#ccc"}} />
              </View>
                      )
                  }) 
              }
              
          </ScrollView>
          
          );
      }
      return (
        <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
          <Text>No PDFs</Text>
        </View>
      )
    }
        
      const SecondRoute = () => {
        if(pptxArr.length !== 0){
          return (
            <ScrollView style={[styles.scene, {  }]}>
                {
                    
                    pptxArr.map((pptx,idx)=>{
                        return (
                <View key={idx}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate(pptx.type === 'mp4' ? "CourseDetails": "BookDetails",{
                      cid:pptx.id,
                      cat:pptx.get_category.name,
                      uploader:pptx.get_user.name,
                      cType:pptx.type
                    })}
                    style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                            <Image 
                            source={{uri:'http://192.168.0.107:8000/'+pptx.thumbnail}}
                            style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                            />
                            <View>
                                <Text style={{fontSize:18,fontWeight:"600"}}>{pptx.title}</Text>
                                <Text style={{fontSize:16}}>${pptx.price}.00</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20}/>
                        
                        
                        
                    </TouchableOpacity>
                    <View style={{height:1,backgroundColor:"#ccc"}} />
                </View>
                        )
                    }) 
                }
                
            </ScrollView>
            
            );
        }
        return (
          <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
            <Text>No PPTX</Text>
          </View>
        )
    }
      const ThirdRoute = () => {
        if(docxArr.length !== 0){
          return (
            <ScrollView style={[styles.scene, {  }]}>
                {
                    
                    docxArr.map((docx,idx)=>{
                        return (
                <View key={idx}>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate(docx.type === 'mp4' ? "CourseDetails": "BookDetails",{
                      cid:docx.id,
                      cat:docx.get_category.name,
                      uploader:docx.get_user.name,
                      cType:docx.type
                    })}
                    style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                            <Image 
                            source={{uri:'http://192.168.0.107:8000/'+docx.thumbnail}}
                            style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                            />
                            <View>
                                <Text style={{fontSize:18,fontWeight:"600"}}>{docx.title}</Text>
                                <Text style={{fontSize:16}}>${docx.price}.00</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20}/>
                        
                        
                        
                    </TouchableOpacity>
                    <View style={{height:1,backgroundColor:"#ccc"}} />
                </View>
                        )
                    }) 
                }
                
            </ScrollView>
            
            );
        }
        return (
          <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
            <Text>No DOCX</Text>
          </View>
        )
    }
      const FourthRoute = () => {
        if(vidArr.length !== 0){
          return (
            <ScrollView style={[styles.scene, {  }]}>
                {
                    
                    vidArr.map((vid,idx)=>{
                        return (
                <View key={idx}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate(vid.type === 'mp4' ? "CourseDetails": "BookDetails",{
                      cid:vid.id,
                      cat:vid.get_category.name,
                      uploader:vid.get_user.name,
                      cType:vid.type
                    })}
                    style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',padding:25}}>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                            <Image 
                            source={{uri:'http://192.168.0.107:8000/'+vid.thumbnail}}
                            style={{width:60,height:60,overflow:"hidden",borderRadius:8}}
                            />
                            <View>
                                <Text style={{fontSize:18,fontWeight:"600"}}>{vid.title}</Text>
                                <Text style={{fontSize:16}}>${vid.price}.00</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20}/>
                        
                        
                        
                    </TouchableOpacity>
                    <View style={{height:1,backgroundColor:"#ccc"}} />
                </View>
                        )
                    }) 
                }
                
            </ScrollView>
            
            );
        }
        return (
          <View style={[styles.scene,{justifyContent:'center',alignItems:'center'}]}>
            <Text>No Videos</Text>
          </View>
        )
    }
      const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#03ba55' }}
          style={{ backgroundColor: '#ccc' }}
          labelStyle={{ color: '#03ba55' }}
          inactiveColor='#000'
        //   pressOpacity={0.5}
        
        //   inactiveColor='red'
        />
      );
      
      
        const [index, setIndex] = useState(0);
        const [routes] = useState([
          { key: 'first', title: `PDF` },
          { key: 'second', title: 'PPTX' },
          { key: 'third', title: 'DOCX' },
          { key: 'fourth', title: 'MP4' },
        ]);
      
        const renderScene = SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third:ThirdRoute,
          fourth:FourthRoute
        });

  return (
    <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.fixedView}>
          {/* Content that you want to be fixed */}
          <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:30,marginHorizontal:10}}>
          <Ionicons name="chevron-back" size={14} onPress={() => navigation.goBack()} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Instructor Details</Text>
            <Ionicons name="chevron-back" style={{ opacity: 0 }} />
  
          </View>
        </View>
        {/* pic + background view */}
        <View style={{marginTop:65}}>
            <SvgXml xml={back} />
            <Image 
            source={{uri:"http://192.168.0.107:8000/"+pp}}
            style={{height:200,width:200,overflow:"hidden",alignSelf:'center',position:"absolute",bottom:0}}
            />
        </View>
        
        <View style={{margin:20,gap:5}}>
            <Text style={{fontSize:22,fontWeight:"600"}}>{name}</Text>
            <Text style={{fontSize:16,color:"#808080"}}>{categories}</Text>
        </View>
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        
        renderTabBar={renderTabBar}
        />
        
    </View>
  )
}

export default InstructorDetails

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    scene:{
        flex:1,
    },
    fixedView:{
        position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop:20,
      backgroundColor: 'white', // Set your desired background color
      zIndex: 1,
      padding:10,
      borderBottomWidth:1,
      borderBottomColor:'#ccc'
    }
})