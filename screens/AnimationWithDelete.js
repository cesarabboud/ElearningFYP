import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Basic = ({answers}) => {
  const customArray = [
    {
      id:1,
      msg:"hi"
    },
    {
      id:2,
      msg:"how are you"
    }
  ];
    const [listData, setListData] = useState(
        answers.map((item, index) => ({ 
            key: `${index}`,
            id:item.id,
            answer: item.answer,
            uname:item.get_user.name,
            picture:item.get_user.profilepicture,
            answered:item.answered
        }))
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = async (rowMap, rowKey ,answerId) => {
        closeRow(rowMap, rowKey);
        // const newData = [...listData];
        // const prevIndex = listData.findIndex(item => item.key === rowKey);
        // newData.splice(prevIndex, 1);
        // setListData(newData);
        const token = await AsyncStorage.getItem('token')
        if(token !== null){
            try{
                const response=await fetch(`http://192.168.0.105:8000/api/deleteAnswer/${answerId}`,{
                    method:"GET",
                })
                const resData = await response.json()
                console.log(resData)
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
            onPress={() => console.log('You touched me :'+data.item.text)}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                {/* <Text>{data.item.id}</Text> */}
                <View style={{flexDirection:'row',gap:10}}>
                    <View style={{ borderRadius: "100",width:60, overflow: "hidden" }}>
                        <Image
                        source={{uri: 'http://192.168.0.105:8000/'+data.item.picture}}
                            //source={require("../images/profilepic.jpg")}
                            style={{ width: 60, height: 60,backgroundColor:'#ccc' }}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={{gap:10}}>
                    <Text>{data.item.uname} {data.item.id}</Text>
                    <Text>{data.item.answer} {data.item.answered ? <Ionicons name="checkbox" color={'#03ba55'} size={20}/> : null}</Text>
                    </View>
                    
                    
                    
                </View>
                
            </View>
        </TouchableHighlight>
    );
    
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            {/* <Text>Left</Text> */}
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key,data.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                // leftOpenValue={75}
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
        backgroundColor: '#CCC',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 70,
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
export default Basic;