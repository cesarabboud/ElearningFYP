import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image } from 'react-native';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

export default function Basic({repliesData,idOfUser}) {
    const [repliesAfterDeletion,setrepliesAfterDeletion] = useState([])
    const [listData, setListData] = useState(
        repliesData.map((item, index) => ({ 
            key: `${index}`,
            id:item.id,
            resp:item.response,
            picture:item.get_user.profilepicture,
            uName:item.get_user.name,
            userId:item.get_user.id,
            test:true
        }))
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey, replyId) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
        const token = await AsyncStorage.getItem('token')
        if(token !== null){
            try{
                const response = await fetch('http://192.168.0.107:8000/api/deleteReply/'+replyId,{
                    method:"POST"
                })
                const resData = await response.json()
                console.log(resData)
                setrepliesAfterDeletion(resData.repliesArr)
                console.log(resData.repliesArr)
                setListData(resData.repliesArr.map((item, index) => ({ 
                    key: `${index}`,
                    id:item.id,
                    resp:item.response,
                    picture:item.get_user.profilepicture,
                    uName:item.get_user.name,
                    userId:item.get_user.id,
                    test:true
                })))
            }
            catch(err){
                console.log(err)
            }
        }
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={{padding:10,overflow:"hidden",flexDirection:'row',alignItems:'center',marginLeft:40,gap:5}}>
                    <View>
                        <Image 
                        style={{width:20,height:20,overflow:"hidden"}}
                        source={{uri:'http://192.168.0.107:8000/'+data.item.picture}}
                        />
                    </View>
                    <View>
                    <Text>{data.item.uName}</Text>
                    <Text>{data.item.resp}</Text>
                    </View>
                    
                
                
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => {
        if(data.item.userId === idOfUser){
            return (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={() => closeRow(rowMap, data.item.key)}
                    >
                        <Text style={styles.backTextWhite}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={() => deleteRow(rowMap, data.item.key ,data.item.id)}
                    >
                        <Text style={styles.backTextWhite}>Delete</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    } 

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        // alignItems: 'center',
        backgroundColor: '#f5f5f5',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        // justifyContent: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
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
