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
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  IconButton,
  DataTable,
  Provider,
  FAB,
  AnimatedFAB,
} from "react-native-paper";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import { Buffer as NodeBuffer } from "buffer";
import * as FileSystem from "expo-file-system";
import ExcelJS from "exceljs";

let json_data = [
  { id: 1, name: "John Doe", dob: new Date(1970, 1, 1) },
  { id: 2, name: "Jane Doe", dob: new Date(1969, 2, 3) },
  { id: 3, name: "Cesar Ab", dob: new Date(2002, 5, 7) },
];

const StudentsList = () => {
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
        { header: "D.O.B.", key: "dob", width: 10 },
      ];
      // Add some test dat
      json_data.forEach((i) => {
        worksheet.addRow({
          id: i.id,
          name: i.name,
          dob: i.dob,
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
    for (let i of json_data) {
      console.log(i.name);
    }
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
  const [items] = React.useState([
    { id: 1, name: "John Doe", dob: new Date(1970, 1, 1) },
    { id: 2, name: "Jane Doe", dob: new Date(1969, 2, 3) },
    { id: 3, name: "Cesar Ab", dob: new Date(2002, 5, 7) },
  ]);
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
    const [numberOfItemsPerPageList] = React.useState([1, 2, 5, items.length]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[1]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
    const navigation = useNavigation();
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{}}>#</DataTable.Title>
          <DataTable.Title>Image</DataTable.Title>
          <DataTable.Title>Full Name</DataTable.Title>
          <DataTable.Title>DOB</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {json_data.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell
              onPress={() => navigation.navigate("StudentDetails")}
            >
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
                  source={require("../images/profilepic.jpg")}
                  style={{ width: 35, height: 35 }}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>
              {item.dob.getDate()}-{item.dob.getMonth()}-
              {item.dob.getFullYear()}
            </DataTable.Cell>
            <DataTable.Cell
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <IconButton
                style={{ margin: -3 }}
                icon={"close"}
                iconColor="red"
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
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
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
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
              My Students({items.length})
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                height: 50,
                borderRadius: 10,
                backgroundColor: "white",
                margin: 15,
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
                  style={{
                    padding: 10,
                    fontSize: 20,
                    width: "80%",
                    fontWeight: "600",
                    height: 30,
                  }}
                  placeholder="Search"
                  value={searchText}
                  onChangeText={handleSearchTextChange}
                />
              </View>

              <View style={{}}>
                {showCancelButton ? (
                  <TouchableOpacity onPress={handleCancelPress}>
                    <Text style={{ color: "#008BD9", fontSize: 20 }}>
                      Cancel
                    </Text>
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
          {/* <View style={{width:'40%',alignSelf:'flex-end',marginRight:10}}>
        <Button icon="share" mode='contained' buttonColor="#03ba55" onPress={() => console.log('Pressed')}>
    Export Table
  </Button>
        </View> */}
          <View
            style={{ width: "30%", alignSelf: "flex-end", marginRight: 10 }}
          >
            <FAB
              style={{ borderRadius: 10, backgroundColor: "#03ba55" }}
              color="#000"
              icon="export"
              onPress={ShareExcel}
              label="Export"
              customSize={40}
              mode="flat"
            />
          </View>
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
