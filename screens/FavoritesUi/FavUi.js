import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ImageBackground,
    ScrollView
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

const rowSwipeAnimatedValues = {};
Array(20)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const FavUi = () => {
    const navigation = useNavigation()
    const [nb,setNb] = useState(0)
    const getMyFavData = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            try {
                const response = await fetch('http://192.168.0.107:8000/api/getMyFav', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const resData = await response.json();
                setListData(resData.fav.map((item, i) => ({ key: `${i}`, id: item.id,title:item.title,category:item.get_category.name,pic:item.thumbnail,dateAdded:item.pivot.dateAdded,cid:item.pivot.course_id })));
                setNb(resData.count)
                await AsyncStorage.setItem('userfav',JSON.stringify(listData))
                console.log(nb)
            } catch (err) {
                console.log(err);
            }
        }
    };
    const clearFav = async () => {
        const token = await AsyncStorage.getItem('token')
        if(token!==null){
            try{
                const response = await fetch('http://192.168.0.107:8000/api/clearFav',{
                    method:"GET",
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                const resData = await response.json()
                console.log(resData)
                getMyFavData()
                await AsyncStorage.setItem('userfav',JSON.stringify([]))
                setNb(0)
            }
            catch(err){
                console.log(err)
            }
        }
    }
    React.useEffect(()=>{
        getMyFavData()
    },[])
    const [listData, setListData] = useState([]);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey, courseId) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
        const token = await AsyncStorage.getItem('token')
        if(token !== null){
            try{
                const response = await fetch('http://192.168.0.107:8000/api/deleteFromFav/'+courseId,{
                    method:"POST",
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                const resData = await response.json()
                console.log(resData)
                getMyFavData()
                await AsyncStorage.setItem('userfav',JSON.stringify(listData))
            }
            catch(err){
                console.log(err)
            }
        }
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = (data) => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
        >
            <View style={{padding:15}}>
                <View style={{flexDirection:'row',gap:5}}>
                <Image 
                source={{uri: 'http://192.168.0.107:8000/'+data.item.pic}}
                style={{height:100,width:80}}
                />
                <View style={{gap:5}}>
                    <Text>{data.item.title}</Text>
                    <Text>Category: {data.item.category}</Text>
                    <Text>{data.item.dateAdded !== null ? `Added ${data.item.dateAdded}` : null }</Text>
                </View>
                </View>
                
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text style={{opacity:0}}>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft,{opacity:0}]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key,data.item.cid)}
            >
                <Animated.View
                    style={[
                        // styles.trash,
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0,1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Ionicons 
                    name="trash"
                    size={32}
                    color={"#fff"}
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
        <ImageBackground
        source={require('../../images/reviewsbckgrnd2.png')}
        style={{width:'100%',height:170}}
        >
          <View style={{marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginHorizontal:20}}>
            <Ionicons name="chevron-back" onPress={()=>navigation.goBack()}/>
            <Text style={{fontSize:17,fontWeight:"600"}}>Wishlist{(nb !== -1 && nb!==0) ? `(${nb})` : null}</Text>
            <Ionicons name="chevron-back" style={{opacity:0}} />
          </View>
        </ImageBackground>
        {
            nb !== 0 ? <><View style={{width:'100%',backgroundColor:'#ccc',marginBottom:20,padding:20,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',gap:5}}>
            <Text style={{fontSize:16,fontWeight:"600",color:"#e01e37"}}>Clear Favorites</Text>
            <Ionicons onPress={clearFav} color={"#e01e37"} name="trash-outline" size={20}/>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
            
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                // leftOpenValue={75}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
                onSwipeValueChange={onSwipeValueChange}
                showsVerticalScrollIndicator={false}
                style={{borderRadius:10}}
                ItemSeparatorComponent={()=>{
                  return <View style={{height:1,backgroundColor:'#ccc'}} />
                }}
            />
        </ScrollView></> : <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:18,fontWeight:"600"}}>Wishlist is Empty !</Text></View>
        }
        </>
    );
}
export default FavUi;
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        marginHorizontal:40,
        borderRadius:10,
        paddingBottom:20
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        // alignItems: 'center',
        backgroundColor: '#FFF',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        borderColor:'#03ba55',
        justifyContent: 'center',
        // borderRadius:10
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        // borderRadius:10
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        // borderRadius:10,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
