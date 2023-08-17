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
import { IconButton, DataTable, Provider } from "react-native-paper";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { useNavigation,useIsFocused } from "@react-navigation/native";

const StudentsList = () => {
  const [searchText, setSearchText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [studentsList,setStudentList] = useState([])
  const isFocused = useIsFocused()

  const getAllStudents = async () => {
    try{
      const response = await fetch('http://192.168.0.108:8000/api/getAllStudents',{
        method:'GET',
      })
      const resData = await response.json()
      // console.log(resData)
      setStudentList(resData.students)
      alert(resData.studentscount)
    }
    //   console.log(resData);
    //   alert('testing')
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(isFocused){
      getAllStudents()
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

  

  const MyTable = () => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([1,2,studentsList.length]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[1]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, studentsList.length);

    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
    const navigation = useNavigation()
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{}}>#</DataTable.Title>
          <DataTable.Title><Text>Image</Text></DataTable.Title>
          <DataTable.Title>Full Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {studentsList.slice(from, to).map((item) => (
          <DataTable.Row  key={item.key}>
            <DataTable.Cell onPress={()=>navigation.navigate("StudentDetails")}>{item.id}</DataTable.Cell>
            <DataTable.Cell>
              <View style={{ borderRadius: "100", overflow: "hidden",justifyContent:'center',alignItems:'center' }}>
                <Image
                  source={{uri:item.profilepicture}}
                  resizeMode='stretch'
                  style={{ width: 35, height: 35 ,}}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.email}</DataTable.Cell>
            <DataTable.Cell style={{alignItems:'center',justifyContent:'center'}}>
              <IconButton style={{margin:-3}} icon={"close"} iconColor="red" />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        
        <DataTable.Pagination
          
          page={page}
          numberOfPages={Math.ceil(studentsList.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${studentsList.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    );
  };
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  return (
    
    <Provider><TouchableWithoutFeedback onPress={handleScreenPress}>
        
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
            Students({studentsList.length})
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              height: 70,
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
        <MyTable />
      </View>
        
      </TouchableWithoutFeedback>
    </Provider>
    
  );
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
