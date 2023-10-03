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
  
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState,useEffect } from "react";
import {
  IconButton,
  DataTable,
  Provider,
  FAB,
  Button,
  AnimatedFAB,
} from "react-native-paper";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import { Buffer as NodeBuffer } from "buffer";
import * as FileSystem from "expo-file-system";
import ExcelJS from "exceljs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
const StudentsList = () => {

  const getmyStd = async () =>{
    const val = await AsyncStorage.getItem('token')
    if(val !== null){
      try{
        const response = await fetch('http://192.168.0.107:8000/api/getInstructorProfileInfo',{
          method: 'GET',
          headers:{
            "Accept": 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${val}`,
          }
        })
        const resData = await response.json()
        console.log(resData.mystudents)
        setmyStudents(resData.mystudents)
        //console.log(myStudents.length)
      }
      catch(err){
        console.log(err)
      }
    }
    
  }
  const [myStudents,setmyStudents] = useState([])
  const isFocused = useIsFocused()
  useEffect(() =>{
    if(isFocused)
    getmyStd()
  },[isFocused])
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
        { header: "Id", key: "id", width: 10 },
        { header: "Name", key: "name", width: 32 },
        { header: "Email", key: "email", width: 10 },
      ];
      // Add some test dat
      myStudents.forEach((i) => {
        worksheet.addRow({
          id: i.id,
          name: i.name,
          email: i.email,
        });
      });
      // Test styling

      // Style first row
      worksheet.getRow(1).font = {
        name: "Comic Sans MS",
        family: 4,
        size: 16,
        underline: "double",
        bold: true,
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

  const [searchText, setSearchText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

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
  const MyTableSearchRes = (props) => {
    const name = props.name
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([1,2,5]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[1]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, myStudents.length);
    const filteredStudents = myStudents.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
    const navigation = useNavigation()
    if(filteredStudents.length !== 0){
      return (
        <>
        <Text style={{margin:15,fontSize:22,fontWeight:"600"}}>{filteredStudents.length} Result{filteredStudents.length !== 1 ? `s` : null} Found.</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{}}>#</DataTable.Title>
            <DataTable.Title><Text>Image</Text></DataTable.Title>
            <DataTable.Title>Username</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title></DataTable.Title>
          </DataTable.Header>
  
          {filteredStudents.slice(from, to).map((item) => (
            <DataTable.Row  key={item.id}>
              <DataTable.Cell 
              onPress={()=>navigation.navigate("StudentDetails",{
                studId:item.id,
                fullName:item.name,
                email:item.email,
                pp:item.pp
              })}
              >{item.id}</DataTable.Cell>
              <DataTable.Cell>
                <View style={{ borderRadius: "100", overflow: "hidden",justifyContent:'center',alignItems:'center',backgroundColor:"#ccc" }}>
                  <Image
                    source={{uri:'http://192.168.0.107:8000/'+item.profilepicture}}
                    resizeMode='stretch'
                    style={{ width: 35, height: 35 ,}}
                  />
                </View>
              </DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.email}</DataTable.Cell>
            </DataTable.Row>
          ))}
          
          <DataTable.Pagination
            
            page={page}
            numberOfPages={Math.ceil(filteredStudents.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${filteredStudents.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
        </>
      );
    }
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontWeight:"600",fontSize:24}}>No results found.</Text>
      </View>
    )
  };
  const MyTable = () => {
    if(myStudents.length > 0){
      const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([1, 2, 5, myStudents.length]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[1]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, myStudents.length);

    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
    const navigation = useNavigation();
    return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{}}>#</DataTable.Title>
          <DataTable.Title>Image</DataTable.Title>
          <DataTable.Title> UserName</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
        </DataTable.Header>

        {myStudents.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>
              {item.id}
            </DataTable.Cell>
            <DataTable.Cell>
              <View
                style={{
                  borderRadius: "100",
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{uri:'http://192.168.0.107:8000/'+item.profilepicture}}
                  style={{ width: 35, height: 35 }}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>
              {item.email}
            </DataTable.Cell>
            {/* <DataTable.Cell
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <IconButton
                style={{ margin: -3 }}
                icon={"close"}
                iconColor="red"
              />
            </DataTable.Cell> */}
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(myStudents.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${myStudents.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <View
      style={{ width: "30%", alignSelf: "flex-end", marginRight: 10 }}
    >
      {/* <FAB
        style={{ borderRadius: 10, backgroundColor: "#03ba55" }}
        color="#000"
        icon="export"
        onPress={ShareExcel}
        label="Export"
        customSize={40}
        mode="flat"
      /> */}
    </View>
    </>
    );
    }
    return <></>
  };
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  if(myStudents.length !== 0){
    return (
      <Provider>
        <TouchableWithoutFeedback onPress={handleScreenPress}>
          <View style={styles.container}>
          <View
          style={{
            backgroundColor: "#03ba55",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
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
            Students({myStudents.length})
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
              <Ionicons
                name="search"
                size={20}
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
              ) : null}
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
  
            {
          searchText === '' ? <>
          
          <MyTable />
          <Button mode='elevated' style={{width:'25%',alignSelf:'flex-end',borderRadius:5,marginRight:10}} buttonColor="#6366f1" textColor="#fff" icon={'share-variant'} onPress={ShareExcel}>Export</Button>
          </> : <MyTableSearchRes name={searchText} />
        }
            {/* <View style={{width:'40%',alignSelf:'flex-end',marginRight:10}}>
          <Button icon="share" mode='contained' buttonColor="#03ba55" onPress={() => console.log('Pressed')}>
      Export Table
    </Button>
          </View> */}
            
          </View>
        </TouchableWithoutFeedback>
      </Provider>
    );
  }
  return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><StatusBar barStyle={'dark-content'} /><Text>No students !</Text></View>
};

export default StudentsList;

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
});
