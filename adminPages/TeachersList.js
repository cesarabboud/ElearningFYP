import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  SafeAreaView,
  Image,
  

} from "react-native";
import React, { useState,useEffect } from "react";
import { IconButton, DataTable, Provider ,Button} from "react-native-paper";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";
import { Buffer as NodeBuffer } from "buffer";
import * as FileSystem from "expo-file-system";
import ExcelJS from "exceljs";
const TeachersList = () => {
  const [searchText, setSearchText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);


  const isFocused = useIsFocused()



  const generateShareableExcel = async () => {
    const now = new Date();
    const fileName = `${now.getTime()}.xlsx`;
    const fileUri = FileSystem.cacheDirectory + fileName;
    return new Promise((resolve, reject) => {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Me";
      workbook.created = now;
      workbook.modified = now;
      // Add a sheet to work on
      const worksheet = workbook.addWorksheet("My Sheet", {});
      // Just some columns as used on ExcelJS Readme

      worksheet.columns = [
        { header: "Id", key: "id", width: 5 },
        { header: "Name", key: "name", width: 32 },
        { header: "Email", key: "email", width: 30 },
      ];
      // Add some test dat
      teachersList.forEach((i) => {
        worksheet.addRow({
          id: i.id,
          name: i.name,
          email: i.email,
        });
      });
      // Test styling

      // Style first row
      worksheet.getRow(1).fill = {
        type:"pattern",
        pattern:"solid",
        fgColor: {argb :"FFFF01"}
      }
      worksheet.getRow(1).font = {
        name: "Comic Sans MS",
        family: 4,
        size: 12,
        underline: "double",
        bold:true,
        
      };
      
      // Style second column
      worksheet.eachRow((row, rowNumber) => {
        row.getCell(2).font = {
          name: "Arial Black",
          //  color: { argb: 'FF00FF00' },
          family: 2,
          size: 14,
          bold: true,
        };
      });

      // Write to file
      workbook.xlsx.writeBuffer().then((buffer) => {
        // Do this to use base64 encoding
        const nodeBuffer = NodeBuffer.from(buffer);
        const bufferStr = nodeBuffer.toString("base64");
        FileSystem.writeAsStringAsync(fileUri, bufferStr, {
          encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
          resolve(fileUri);
        });
      });
    });
  };

  //-------

  const ShareExcel = async () => {
    const shareableExcelUri = await generateShareableExcel();
    Sharing.shareAsync(shareableExcelUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
      dialogTitle: "Your dialog title here", // Android and Web
      UTI: "com.microsoft.excel.xlsx", // iOS
    })
      .catch((error) => {
        console.error("Error", error);
      })
      .then(() => {
        console.log("Return from sharing dialog");
      });
  };


  const [teachersList,setTeachersList] = useState([])
  const getAllTeachers= async () => {
    try{
      const response = await fetch('http://192.168.0.107:8000/api/getAllTeachers',{
        method:'GET',
      })
      const resData = await response.json()
      // console.log(resData)
      if(!resData.message){
        setTeachersList(resData.instructors)
        return
      }
      alert(resData.message)

    }
    //   console.log(resData);
    //   alert('testing')
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(isFocused){
      getAllTeachers()
    }
  },[isFocused])








  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setShowCancelButton(text.length > 0);
  };

  const handleCancelPress = () => {
    setSearchText("");
    setShowCancelButton(false);
    Keyboard.dismiss();
  };

  const handleFilterPress = () => {
    setShowSortModal(true);
  };
  
  const handleSortOptionSelect = (option) => {
    // Handle sort option selection here
    console.log("Selected sort option:", option);
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowSortModal(false);
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const DeleteTeacher = async (id) =>{
    const token = await AsyncStorage.getItem('token')
    try{
      const response = await fetch('http://192.168.0.107:8000/api/deleteAccUser/'+id,
      {
        method:'GET',
        headers:{
          'Accept':'applciation/json',
          'Content-Type':'application/json' ,
          'Authorization' : `Bearer ${token}`
        },
      })
      const resData = response.json()
      console.log(resData.message)
      getAllTeachers();
    }
    catch(err){
      console.log(err)
    }
  }

  const MyTable = () => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([1, 2, 5 , 10]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[1]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, teachersList.length);

    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    return (
      <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{}}>#</DataTable.Title>
          <DataTable.Title>Image</DataTable.Title>
          <DataTable.Title>Full Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {teachersList.slice(from, to).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell>
              <View style={{ borderRadius: "100", overflow: "hidden" }}>
                <Image
                  source={{uri:'http://192.168.0.107:8000/'+item.profilepicture}}
                  style={{ width: 35, height: 35 }}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.email}</DataTable.Cell>
            <DataTable.Cell  style={{alignItems:'center',justifyContent:'center'}}>
              <IconButton onPress={()=>DeleteTeacher(item.id)} style={{margin:-3}} icon={"close"} iconColor="red" />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        
        <DataTable.Pagination
          theme={'red'}
          page={page}
          numberOfPages={Math.ceil(teachersList.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${teachersList.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <Button mode='elevated' style={{width:'25%',alignSelf:'flex-end',borderRadius:5,marginRight:10}} buttonColor="#6366f1" textColor="#fff" icon={'share-variant'} onPress={ShareExcel}>Export</Button>
          </>
    );
  };
  const NoTutors = () =>{
    return(<ActivityIndicator style={styles.activityIndicatorStyle} />)
    
  }
  return (
    <Provider>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#03ba55",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            gap:10,
            padding:10
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Teachers({teachersList.length})
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              height: 45,
              borderRadius: 10,
              backgroundColor: "white",
              marginHorizontal: 15,
              marginVertical: Constants.statusBarHeight,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "75%",
              }}
            >
              <IconButton
                icon="magnify"
                iconColor="#000"
                size={28}
                style={{ margin: 0 }}
              />
              <TextInput
                style={{ padding: 10, fontSize: 20, width: "80%" }}
                placeholder="Search"
                value={searchText}
                onChangeText={handleSearchTextChange}
              />
            </View>

            <View style={{}}>
              {showCancelButton ? (
                <TouchableOpacity onPress={handleCancelPress}>
                  <Text style={{ color: "#008BD9", fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleFilterPress}>
                  <IconButton
                    icon="filter-variant"
                    iconColor="#000"
                    size={28}
                    style={{ margin: 0 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Modal
              isVisible={showSortModal}
              onBackdropPress={handleModalClose}
              animationIn={"fadeIn"}
              animationOut={"fadeOut"}
              backdropColor="rgba(0,0,0,.5)"
              useNativeDriver={true}
            >
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.sortOption}
                  onPress={() => handleSortOptionSelect("A-Z")}
                >
                  <Text>A-Z</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sortOption}
                  onPress={() => handleSortOptionSelect("Z-A")}
                >
                  <Text>Z-A</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
        {/* */}
        

        
        {teachersList.length > 0 ? <MyTable /> : <NoTutors />}
      </View>
    </Provider>
  );
};

export default TeachersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    alignItems: "center",
    top: 20, // Adjust the top position as needed
    right: 20, // Adjust the right position as needed
    width: 100,
  },
  sortOption: {
    paddingVertical: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
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
