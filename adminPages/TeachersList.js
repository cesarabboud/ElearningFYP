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
import React, { useState } from "react";
import { IconButton, DataTable, Provider } from "react-native-paper";
import Modal from "react-native-modal";
import Constants from "expo-constants";
const TeachersList = () => {
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
  const [items] = React.useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 6,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);
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

  const MyTable = () => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 5,items.length]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{}}>#</DataTable.Title>
          <DataTable.Title>Image</DataTable.Title>
          <DataTable.Title>Full Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.key}</DataTable.Cell>
            <DataTable.Cell>
              <View style={{ borderRadius: "100", overflow: "hidden" }}>
                <Image
                  source={require("../images/profilepic.jpg")}
                  style={{ width: 35, height: 35 }}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>Cesar Ab</DataTable.Cell>
            <DataTable.Cell>cesar@gmail.com</DataTable.Cell>
            <DataTable.Cell style={{alignItems:'center',justifyContent:'center'}}>
              <IconButton style={{margin:-3}} icon={"close"} iconColor="red" />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        
        <DataTable.Pagination
          theme={'red'}
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    );
  };

  return (
    <Provider>
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
            Teachers({items.length})
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
});
