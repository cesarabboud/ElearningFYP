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
import { IconButton, DataTable, Provider, Button } from "react-native-paper";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import { Buffer as NodeBuffer } from "buffer";
import * as FileSystem from "expo-file-system";
import ExcelJS from "exceljs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgXml } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
const StudentsList = () => {
  const [searchText, setSearchText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [studentsList,setStudentList] = useState([])
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

      studentsList.forEach((i) => {
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
        fgColor: {argb :"FFFF01",}
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



  const getAllStudents = async () => {
    try{
      const response = await fetch('http://192.168.0.107:8000/api/getAllStudents',{
        method:'GET',
      })
      const resData = await response.json()
      // console.log(resData)
      setStudentList(resData.students)
      //alert(resData.studentscount)
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

  const DeleteStudent = async (id) =>{
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
      // console.log(resData.message)
      getAllStudents();
    }
    catch(err){
      console.log(err)
    }
  }

  const MyTable = () => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([1,2,5,studentsList.length]);
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
          <DataTable.Title>Username</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {studentsList.slice(from, to).map((item) => (
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
            <DataTable.Cell style={{alignItems:'center',justifyContent:'center'}}>
              <IconButton onPress={()=>DeleteStudent(item.id)} style={{margin:-3}} icon={"close"} iconColor="red" />
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
  const MyTableSearchRes = (props) => {
    const name = props.name
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([1,2,5,studentsList.length]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[1]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, studentsList.length);
    const filteredStudents = studentsList.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
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
              <DataTable.Cell style={{alignItems:'center',justifyContent:'center'}}>
                <IconButton onPress={()=>DeleteStudent(item.id)} style={{margin:-3}} icon={"close"} iconColor="red" />
              </DataTable.Cell>
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
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
  const svgTeachers = `<svg width="60" height="52" viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<mask id="mask0_266_81" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60">
<mask id="mask1_266_81" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60">
<rect width="60" height="60" fill="url(#pattern0)"/>
</mask>
<g mask="url(#mask1_266_81)">
<rect x="-10" y="-6" width="86" height="76" fill="#CCCCCC"/>
</g>
</mask>
<g mask="url(#mask0_266_81)">
<rect x="-6" y="-6" width="72" height="70" fill="#F0F0F5"/>
</g>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_266_81" transform="scale(0.00142857)"/>
</pattern>
<image id="image0_266_81" width="700" height="700" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAK8CAYAAAANumxDAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nO3dedhtZV038O8ZOZwDh1mZHEImB0ByNocg08g0zUpTXjUVyzAzy7C5fCtNzaFSy8z0dc63t1RyygHNCVNUQCYhERFEAplBOJzz/nGf5zqPeB7O8+xnrX2vde/P57p+F4czrP1b99rP3t+99r3ulQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPRn59oNAADjsKJ2A3A7DkhybJIfTXJ4kkOT7LG15ly3tc5Ncl6SM5N8Yut/t0yzWQAAWIxDkrw4yTkpgXXS+m6Sf0zy8PhgBwDAADwq5czsckLuQnVBkl9Lsm5qewMAAFs9JMkX0k/QvW1dkuRXkqycyp4BADDT9krypiSbM52wO79OTXJ0/7sIAMCsun+S/870g+78uiXJSTG/FwCAjv16StisGXbn13tiiTMAADpyUuoH3O3V51KmWAAAwMRenfrB9vbqy0l2623vAQBo2u+nfqBdTJ0SS5cBALBET0qdlRgmrbf1MwwAALTo4CRXp36IXWqd0MdgAADQltVJvpj64XWSuiHJYd0PCQAALXl+6gfX5dQpsUYvAAAL2C/jnMpw23pi1wMDAEAbXpn6YbWL+nqSVR2PDQAAI7dXkmtTP6w6ywsAQC/GsubuYuvUbocHAICxOyf1Q2rXdXinIwQATNXK2g3QlAemzeW8jq/dAAAwOYGXLj26dgM9aXW/AGAmCLx06ZjaDfTkqCR7124CAJiMwEtXdk5y/9pN9GRFkofVbgIAmIzAS1cOSbKmdhM9umftBqZsTZINtZsAgC4IvHSlxYvV5mt9/5LkiCR/m+S0JNdtrS1JvpnkLUl+Ll4zAIAZ9jupv3xYn/WZ7oZqcA5O8tEsbhzOS/KEOm0CANT1Z6kfSvusM7sbqkF5Via7M95bYsoDADBjXpP6obTPurCzkRqGVSnTF5YzJv+ZZNdpNw4AS2U+Hl1ZXbuBnq2t3UCHNib59yQnLnM7D0nyL/E6AsDAeaOiK9fXbqBn19ZuoCMHJDklyaM62t5PJjmpo20BQC8EXrrSSiBcSAv7d98k/5Xk6I63+6dJ7trxNgGgMwIvXbmsdgM9G/v+PS7JJ5Ps18O21yR5UQ/bBYBOCLx05dzaDfRszPv3gpS5tut7fIynptxtDwAGR+ClK2MOhIsxxv1bneR1Sf4q/f+s75zkmJ4fAwAmIvDSle8kuah2Ez06tXYDS7Rrkvclec4UH/NBU3wsAFg0gZcufbx2Az25IsnptZtYgv1T5useN+XH3XfKjwcAiyLw0qWP1m6gJx9Nsrl2E4t0n/SzEsNiuAkFAIMk8NKl9ya5rnYTPXhX7QYW6aeSfCLlDG8N3670uABwuwReunRdSuhtyRVJPlC7iUV4fpKTU/cs6wUVHxsAYGoemmRLQ/WKboenc6uS/G3qj9PmJHfqeV8BAAbjU6kfwLqoG9PPjRq6smuSf0/9cdqScpEcAMDMeGTqB7Au6m+6HpgOHZjkK6k/RluS3Jrkwf3uLgDA8Lw39YPYcuryJHt1PirdODrJxak/RnP1d/3uLgDAMN055SK22mFs0npm90PSiUcluTr1x2euPha3FAYAZtivpn4gm6ROTrKih/FYrl9Psin1x2euPpNkl173GABgBN6W+sFsKfWtJHv3MhKTW5XkNak/NvPrA3GjCQCAJCUUnZb6AW0xdW2S+/UzDBPbJcn7U39s5tcrYw1vAIAfsE+Sc1M/qN1e3Zxyp7Ih2T/JF1N/bOZqU5Ln9rrHANCDIc5TpE0/kuQjSQ6u3ch23JTkyUn+tXYj89w75czugbUb2eraJE9M8sHajXTokCT3SHJoksOS7JZk95Sz6iuTXJNygeA1KR/YzktydrZ9eGP69kpyRMrxOjTlZicbttYuSa5Kcn3KBbPfSDlW5yY5I2VdbaZvpyT3Sjlehye5W7Ydr91Tjsv1Ka8xl2bbMTszyWUV+gVYtjsk+VLqn6mcX1cleXifOz2Bn0558a89NnP1rSRH9brH07FPkhOSvDPJdzL5eFye5D1JnpNh35ikBWuSHJfk1Um+mnJHv0mO2U1JTknyx0nuO80dmFH3SvJ7Sf4jJcxO+rN2VpLXJnl8knVT3QOAZdqQ5C2pH+K2pNy44bB+d3fJTsywVmL4UsrUirFaneQJKetC35zux2dTygV8v5Rk7ZT2aRYcmRJyL0s/z+uzkrwoPrB0aa8kz09/12xcmbLm9wOntUMAXfjllLOrNULcrSlnDYa0fuyqJK9K/YA7v96X8S47tlOSX0lyQaY3XhelLB03pOfV2Dwk5QPEtI7ZTUlel+SuU9i3Vu2f5BWZ7rdSn0y5oyfAKOybsmzZpF9TTlKnZXhnCDZkeHeme01KCB+jJ6ZMw6g1dpcmeVpcI7EUh6XM8a91zG5OuZX47n3vaEPWJ3lJyoeGWsftMyl3ngQYhfunBL4+g+8ZKRemDS3EWYmhO4ekbmi6bX0qyT173ePxW5fkz1I3NM2vS5Mc3+set+GxSS5M/eM195r110k29rnDAF26V8oar5emmxfCG5O8O+UisCGebTsy5Wvw2m8Yc3Vtkp/pdY/7c3yGdaHf/Ofgs3vc7zE7NGUefe1jtL16Z9xYZXvWpcyjrX18tldfT/Kj/e06QPdWJzk25czPZ7P4sz+3JjknyeuT/ELKMlNDdVzKcle13yTm6uKUpdDGZqck/5j647ejekfK1BWKJ2VYz//t1XkpH0opDs5wP6DM1U0pq6cAjNKqJAel3Bji+CS/muSklAuEfjnJ41LW5typVoNL9Jwkt6T+m8NcfTnJAb3ucT82Jvl46o/fYutzKVeyz7oXZrrz9pdTVyX58V5GYVzuk/5WzOijXpZhfqsHMBNWJvmr1H8zmF8nZ5wrMdwx47ll9fw6K+VmCbNoRZKXp/4xWGrdlOTnehiPsfiJDP9s/PbqzSnfFgIwRRtS7uRW+01gfv19xvmGsDHjDLtzdX5KYJ81L039sZ+0NqV8kzRrHpBy17ra4z9pvTXO9AJMzX5JvpD6L/7z37xP6nWP+7MuZQ3O2mO43PqvjPPM+qROTP0xX27dkLJO8Ky4Z5IrUn/cl1sv6XpgAPhhRyT5Zuq/6M/VdSlLCo3V21N/DLuq92Y2zj49NuOZs7ujujyzMSVlrwzrdWu59Yxuh4cxmoUXW3bsTkkOTPnafY+UM09rqnbUhl2S/HGGsz7kJUkekzIdYIxOSPKG2k107LdSluJr1V1Snm971m6kQ59NuZDtlsp99GVFkvcneXTtRjp0Q8oNh86o3QgwPYekfL345pSv2a9O/U/fqv/6SsZ9ZuqIlDet2uPYdd2ccuOVFq1OWZmi9hj3US/tcJyG5rdTf3z7qLNS7g4HNGpFytmI1ye5IPVfdNT06wMZ9yL6K9NucNqS5PSM8+LBHfnN1B/bvmpT2ryl7d3S5gfLufqL7oYKGIrdUu7wdHrqv8ioevWGjH96yrNTfxz7rhd0NlrDsG/KGra1x7XP+kLKh7GWnJz649pnfT/J3TsbLaCquXmjQ7zNqppe3Zpyhm3sdksbV4rvqK5JcoeOxmwI3pb6YzqNenpH4zUEj0n98ZxGfbirAQPqWJVyB7JLU/8FRdWt69LOmqG/l/rjOa1qZfmkQ1K+8q89ntOor6e89rZgSEsn9l0P7GjMgCm7S9pYm1Qtvy5Jct+0YX2S76b+mE6rrk5ZJWXs/jH1x3Ka9eRuhq2qR6b+OE6z3tfNsAHT9L9ipQVV6vQkd047npP6YzrtGusNQebcMWWeZO1xnGaNdZm/+T6S+uM4zdocc3lhNFYkeVnqv3CoYdRHUua7tuTU1B/XaddZnYxcPS9I/TGsUUd2MXiVHJDZmYIyv6zYACOwU5J3pf4LhhpG/UPGvxLDbR2a+uNaq+7XwfjV8uXUH78a9fIuBq+S30398atRF6ed+dcsQmtLqsyC9Sln855YuxGq25zkhSl3IGvtrk8tzIuc1JNqNzChw5Pcu3YTlfxS7QaWYVbfSw5I8mO1m2B6BN5xWZXk7UkeVrsRqrspyVOSvKJ2Iz35idoNVHRs7QYmNMvH7ICUwD82+2Tc0zGWa6w/a0xA4B2PFSk3EWhluSkm952UDz3vqt1IT9an3dvtLsZRSfau3cQEjqndQGVjDE/HpLy3zKoxHjMmJPCOx0lJnlG7Cao7M2UNyf+q3UiPHpRkbe0mKlqR5KG1m5jArH/zNMb9H+PzrEsPSLKudhNMh8A7DvdP8uLaTVDdR5M8JMk3azfSs3vWbmAA7lG7gSW6Q8rX47NsjM/be9VuoLK1SQ6u3QTTIfAO3+5J3p32rsJnad6U5KdT1lxu3WG1GxiAsY3B2PrtwyEZ31X/jpsxmBkC7/C9KsldazdBNZtTprM8M+2txLCQQ2s3MABjexN2zMpykWO68cuuSfat3cQAjO1njQkJvMN23yRPrd0E1Xw/yfEpNxiZJbP+1XgyvovWHLNiTOOwd2b7grU5Y/tZY0KrazfAglYmeW18KJlV/5Pk8Uk+XbuRCnat3cAAbKzdwBI5ZsWYxmFMvfZpbD9rTEjgHa4nZ7aXZpplZyV5dJILK/dRyy61GxiAsYURx6wYU3ga23OsL2M6ZiyDs4fDtCLJi2o3QRUfS7n7z4WV+6hpbBf+9GFsJyPG1m9fxjQOfs4K4zAjBN5hekzGucQNy/NPSY5LclXtRiq7vnYDA3Bt7QaW6LraDQzENbUbWALHrBjbzxoTEniH6XdqN8BUbUnyuyk3FpmVlRhuz5hCQ1/G9iY8tn77MqZxGFOvfTIOM2JMX7/MikNSvtJmNtyU5GlJ/rl2IwMy62e4k+R7tRtYIsesGNM4jKnXPhmHGSHwDs/xlR73nCSfSHJ6ygoBO3oReG6Sn+27qQG7MskTO9jORUnO62A7Lbkg5Y5ys+yC2g0s0fm1GxiAzUm+UbuJJbg85UY2u9VupDLP3Rkh8A7LiiRPmeLjbUryliSvTnLmEv/tLIfdpKyR+9HaTTTq3NoNDMDYxmBs/fbhoiQ31m5iic5Lcr/aTVTmuTsjzOEdliOS3G1Kj3V6kvskeVaWHnahT96AyjcuY3JRyvScWTa2Y5aMs+eueb2ZEQLvsDxiSo9zcpIHpYReGJrPpVzIN8s+V7uBJbo1yam1m6hsbMcsST5fu4HKzsn45sszIYF3WKYReD+W5AlJbpjCY8EkLs1sn3n6dsY5r/sTtRuobIz7//HaDVQ26/s/UwTe4Vid5GE9P8alSZ6U5OaeHweWa4zhoStjfROe5WN2fcZ5hvuclPeFWTXLz9mZI/AOx6FJNvT8GM9LWYEBhu5fazdQ0Vj3/bNJLqvdRCUfyHhPJIz1+bZcNyT5cO0mmB6Bdzju1fP2v5TkX3p+DOjKx5NcXLuJCq5MCU9jtCnJO2s3Ucn/qd3AMry1dgOV/FvcdGKmCLzDcUTP239DXAjEeGxO8vbaTVTwrpQl78ZqFsPT5Rn3mcLPZzZXKhjzhxQmIPAOx2E9bvvWJO/tcfvQh7/LbN1qeXOS19VuYplOS/KZ2k1MWQvP09fWbmDKzo111GeOwDscd+xx27M8t47xujCz9RX5vyX5Wu0mOvDntRuYouuSvKZ2Ex14Y2brPeIlKSeCmCEC73D0GXi/2uO2oU+z8sa0Jclf1G6iIx9KOdM7C16f5IraTXTgxiSvqt3ElHwjyTtqN8H0CbzDsW+P2/7vHrcNfTonZf55696acmFpC7YkeX7av2bgiiR/WbuJDv11ZuO94oUZ/xQUJiDwDkefS5Jd2OO2oW+/n+S7tZvo0VVJfqd2Ex37zyRvq91Ez34rbZzdnXNjkt+o3UTPPhyrFc0sgXc4HAvYvu8leUHtJnr0u2lz/uQL01YgnO+UtHmV/8lpNxDekOS5tZugHiFrOPo8Fut73DZMw9uTvKV2Ez14f5K/r91ETy5L8tS0N7XhyiRPT3v7NeeEtPmt4IlJzq/dBPUIvMPR54vnrj1uG6blxCRn126iQ99Im4Fwvg8keUXtJjq0OcnxSb5Zu5EefS/Jk9PWPNe3JHlz7SaA4pqUN74+6tU99Ps3PfY7hrpk+UPIBA5LWei/9vFfbl2V5KiOx2ao1qQE39pj3kW9qOOxGbITUgJ+7TFfbn0uvuWEQfnv9PcD/9ke+hV4qeV+KbcErf0cmLS+n+QRnY/KsO2c5NOpP/bLqVm7OUOS/EHqj/ty6rwkd+h8VIBl+UL6+6G/McnajvsVeKnpJ5Ncn/rPg6XWTUke18N4jMFeSb6c+sdgknpzZncK4CtSf/wnqfOT3LmH8QCW6d/T7w//z3Xcr8BLbQ9M8j+p/1xYbF2d5NheRmI8dkvyidQ/FkuplydZ0cdgjMiLMq7pDael35s5AcvwqvT7AvDhjvsVeBmCu6ecyan9fNhRXZTk3j2NwdjslHLL6NrHZEd1S8oNNCienvJtYe3jsqP6YJKN/QwB0IUT0u+LwK1JDuqwX4GXodgtyXtS/zmxUJ2c8nU+P+jElCketY/P9upbSR7a366P1tEp82JrH5/t1aaUm9TM6tQTGI0Hp/8XhC7XMRV4GZpfTVn9oPZzY66uS/Kb8XX47Tk6yVdT/1jNr/+bZO8+d3rkNib5pwxrisPXkzysz50GurMx5RNqny8KtyZ5SEf9CrwM0X4pN6mo/fz4f0nu1PO+tmJ1ygeDPpdmXEydn+S4nve1JQ9NckbqHrMbkvxRknU97yvQsT5XapirC9LN/CaBlyF7cOqs/fqxJD/e/+41ab8kf5VyZnyax+yiJL8eoWkSa5I8M+UM6zSP2U1JXp/krr3vIdCLv8x0Xiw+mGTVMnsVeBmDH03y1vS7hNmNSd6d5EFT2qfW7Z3kT1LuZtbnz/AXkjwr3S/ZOItWpdyd7VPpd6rDpUleluSA6ewW0JefyvQC2zuyvNAr8DImuyZ5WsoFZF18dX5dkg+lBKbdp7gfs2Rlytnyf0g34ffWJF9J8udJDp/ebsycH0mZZvCFdDNN75KU60+Oy/JP1DDDXEwxLDsn+U6mt6TK+5M8JeWuVUv1N0me2207o3Jpkv1rN8FEVqfcre0hKcHn8CR3y8Lrdl6ecifEc7bWp1PezG/uvVPmu1tKAD4q5RbTh6ac6Vuznb97Y5ILU47XeUm+mOSUlHWbmZ7dUy4me0DK8Tos5Thu71a/t6aE2/OSnJsyP/iTSc6eSqfA1L050z1TeXbKm/9SOcNLi3ZJCb77pZwVZvh2Sln27a5J9oizgGOwIuVY3TnJPikne4AZ86hMP7zdkuQ1KS88iyXwAgCjYIHm4flYytfl07Q6yfNSVnD465jfBgA0ROAdnk1J/rbSY++asjzP2UlOT7m447i4SxQAMGIuWhumPVLWhtyldiPzXJFypfQVKXezOjrJwVU7qstFawAAy/Tq1J+nqszhBYDRc4Z3uPZPWZplSGd52cYZ3nE6OMk9sm1Zq91SvlHZkIVvQHBzkquTXJly+9mvJTlt66/p315Jjsy2Za0OTDleG7Lw6+OWlG+irk7yrSRnpSxz9cWUaWP0a22SI1KO2d2THJRtx2v3LJw9rktZJ/vylKl1Z6YsAXhlz/0Clf1e6p/JVM7wjtkeSX45ydtSjlmXz4FvJHlDysoqlsLqzqokj0zyypQbRdya7o7ZNUnem+SEuGFI1w5PclKSD6fbOxtuSnJqkhfHBdXQrHUpC97XDnfqh0vgHa4VSX46yT+n3IBgGs+Hi5P8RZz1X47DUm4b++1M55jdmOSdKTcgYTK7Jvm1JJ/P9F57P59yh8OdprB/wBT9TOqHO/XDJfAOz6okT0756rrW8+KmJH+XcntVFufoJO9Jt2dyl1qfTDlTz+LsmeRPU6Ya1DpmFyf5zWz/rm3ASL0+9QOe+sESeIfl2JQ5f7WfF3N1U8qyfhv63OmROyDJu5NsTv3jNVcfiq/Nb8+aJL+VMjWk9rGaq28m+cU+dxqYnvUpF13UfmFR20rgHYY7JnlH6j8fFqpvpXxLwzYrkzw/wwpN8+vmlOkpC13EOKsenLI+e+3js1B9PL5ZgSbcO91eCKCWVwJvfcemrJZR+7mwo9qc5LVJdu5nGEbljkn+I/WPyWLqS3G2NykfUP4g5eKx2sdkR3V1kuP7GQZgmh6bcbzozEIJvPWsSPKHGd/PwpmZ7TNQD804PqDMr+uTPLGPwRiJPZN8JPWPw1LrTXGGHkbv2an/YqIE3lpWpSwFVvv4T1r/kxL8Zs1jk9yQ+uM/SW1O8iedj8jw7Zfkq6k//pPWp5Ps3fmoAFP1v1P/xWTWS+Cdvp2S/FvqH/vl1g2ZrXm9z8z4zsZvr/4+s3OzpkNTLgarPebLrbNTLo4ERuw3Mqyrm2etBN7pWplyRX/t495VfT/JozsdoWF6UuouN9Z1vTHth94DklyY+mPdVZ2XcrYaGLFnpY0zJ2MsgXe6Xpf6x7zruiHJMV0O0sD8ZEqwrz3OXderuhykgdkzZa557THuus5IuUU1MGKPTpkXWPsFZdZK4J2e56b+8e6rvpfkkO6GajDulnLFfO3x7atO7G6oBmNlxnmB2mLrE0lWdzZaQBUHpkzQr/2CMksl8E7HkRnvxU6LrbOTbOxqwAZgpyRfTP1x7bNuTvLwrgZsIP4g9ce173p1Z6MFVLMmyUuT3JL6LyqzUAJv/9Yn+XrqH+tp1D93NGZD8KrUH89p1HeS7NvRmNX2Y5md6XG/1NGYAZUdlra/lhpKCbz9e0nqH+dpVgu3R71PZic4bUnyvm6GrarVSb6S+mM5rfperNwAzViR5MlJLkr9F5dWS+Dt193T5gVPt1eXZdwX1qxMcmrqj+O06wldDF5Fv536Yzjtek8nIwcMxtokT0+bV93WLoG3Xyen/jGuUW/qYvAqeWrqj1+NujTjnYO9V5JrUn8Ma9RjOxg/YGBWpCx0/8GY49tVCbz9OTqzu8b0piT3WP4QTt3KlIvvao9frfqj5Q9hFX+a+mNXq85Ied4Cjdoj5UzM+yP8LqcE3v68J/WPb80a4wVsv5D641azrkpZw3ZMNia5MvXHrma5gA1mxD5JHp/klUk+HwF4KSXw9uOAzNZFT9urzUmOWu5ATtmnUn/catefLXsUp+vE1B+z2nVuklXLHUjGofVbJLI0G5LcK8lBKQvHH7S1Dkiybuufb4wXiKTM29u/dhMNOilleb1Z94Ykv1K7iUU6KMn58X5yecqa6DfXbmSRTk1y/9pNDMBxST5UuwlgmNamvCHX/nRes5zh7cfXUv/YDqGuTvmAOQZ/kvrjNZQay4oNh6f+WA2lrNgwI0zYZhI3J7mpdhM057CM84KtPmxM8vO1m1ikx9VuYECeUbuBRXp87QYG5LEp0/tonMALDMUxtRsYmKfUbmAR9k5yRO0mBuRRKWMydH7Wtlmb8ZyZZxkEXmAojq3dwMA8NMnOtZvYgWPifWS+VRn+83htkgfXbmJgHlm7AfrnhQoYigfUbmBg1qWE3iFz0dMPG3p4OjLjmR8+Lcek3GKZhgm8wBBsSHKn2k0M0CNqN7ADh9duYICGfswOq93AAO2e5H61m6BfAi8wBIfEslbbM/Sz3sLTD7tLkn1rN3E7HLPtG/rPGssk8AJD8CO1Gxiou9duYAfuWruBgRrycfOztn2+rWicwAsMwW61GxiofZLsVbuJBaxPsqZ2EwM15PDkZ237hnzM6IDACwzBrrUbGLChvhE7Zgsb6jFLkl1qNzBQQz4rTwcEXmAIXDW+sANrN7AAx2xhQz1micC7kDvENxZNE3iBIVhVu4EBG+qZVMdsYUM9Zon3/dsz5OPGMnniAwybN+HxcczGyXFrmMALMGzehMfHMRsnx61hAi/AsJkrOz7razfARATehgm8ANAtN1EZJ5moYQ4uAABNW127AWBUjknyLz1sd10P22zF85KcULuJ7XDCZGF3TnJl7SYWsLF2AwP2wSSbetjuvklu7mG7LIHACyzFmiR71G5ixqyLDwRjszJ+TsbIHN6G+YQOAEDTBF4AAJom8AIA0DSBFwCApgm8AAA0TeAFAKBpAi8AAE0TeAEAaJrACwBA0wReAACaJvACANA0gRcAgKatrt0ALOD1Sa5Z5jaelmTfDnoBAEZM4GWoXprkomVu4yci8ALAzDOlAQCApgm8AAA0TeAFAKBpAi8AAE0TeAEAaJrACwBA0wReAACaJvACANA0gRcAgKYJvAAANE3gBQCgaQIvAABNE3gBAGiawAsAQNMEXgAAmibwAgDQNIEXAICmCbwAADRN4AUAoGkCLwAATRN4AQBomsALAEDTBF4AAJom8AIA0DSBFwCApgm8AAA0TeAFAKBpAi8AAE0TeAEAaJrACwBA0wReAACaJvACANA0gRcAgKYJvAAANE3gBQCgaQIvAABNE3gBAGiawAsAQNMEXgAAmibwAgDQNIEXAICmCbwAADRN4AUAoGkCLwAATRN4AQBomsALAEDTBF4AAJom8AIA0DSBFwCApgm8AAA0TeAFAKBpAi8AAE0TeAEAaJWFNmIAAAcISURBVJrACwBA0wReAACaJvACANA0gRcAgKYJvAAANE3gBQCgaQIvAABNE3gBAGiawAsAQNMEXgAAmibwAgDQNIEXAICmCbwAADRN4AUAoGkCLwAATRN4AQBomsALAEDTBF4AAJom8AIA0DSBFwCApgm8AAA0TeAFAKBpAi8AAE0TeAEAaJrACwBA0wReAACaJvACANA0gRcAgKYJvAAANE3gBQCgaQIvAABNE3gBAGiawAsAQNMEXgAAmibwAgDQNIEXAICmCbwAADRN4AUAoGkCLwAATRN4AQBomsALAEDTBF4AAJom8AIA0DSBFwCApgm8AAA0TeAFAKBpAi8AAE0TeAEAaJrACwBA0wReAACaJvACANA0gRcAgKYJvAAANE3gBQCgaQIvAABNE3gBAGiawAsAQNMEXgAAmibwAgDQNIEXAICmCbwAADRN4AUAoGkCL5O6ZQTb77PHvvcfAOiIwMukvtvjtm/taPuXdbCNhXynx20DAB1aXbsBRuvSHrd9eUroXa4+Q2mf+z9k1yT5Uu0mAEZkS+0GEHiZ3Fd73PZXOtpOnz32ue0h+3yS+9ZuAgBgWs5P+eTadT27o/7umHKmuI8ej+qoRwAABuzF6T5IXp/kDh32+B899Hhmh/0BADBguya5JN2GyT/suMd7J9nUcY8/1XGPAAAM2C8m2ZxuguQZSXbuocdXdtTfliRv76E/AAAG7rlZfpC8KMmde+pvZZJ3ddDjx5Os66lHAAAG7hlJrs1kQfKT6S/szlmb5OWZ/CK2NybZ0HOPAAAM3CFJ3p3Fz5m9KMnzkqyaYo8/nuQ/F9nfliSnJXnMFPsDADq2onYDNOmgJD+f5JgkRybZJ8malDPA30zymSQfTfLe1LtF7wNSguwxSQ5OsnfK1IfLk3wj5azzB5KcUqk/AABGZk3tBnZgZdyIBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA8Vl5O3+2fgnbWezfXb/Ar5ez7Z0XuR0AgNG6vdA2y+6SMja7J1mVZM+t/79TkhVb/85BSfbe+v97Z9tYrkgJmiuSHLj132frn++59fd3n/f3NyR54222vfu8X6/b+ufr5/3e3K93mre9uT9bkeSf5v29uR7n9iFJ9pr37/e8zb8FAGiKwLt9VyXZkmT11v/OBcz9sy3AXpwSRueC4/zAO+eSJJu3/nrzvO2svs3fu2zrtue2sXben+2f5Ltbf33b4zX3b1bf5s9umPf/m7fuw/yzufP7WBMAAGbOYj8IzP297U0dWJtt4ThJfvZ2trN2gd9faMqBDyoAACzLQdn2Vf/cdIX50xBWpEwzOHjr7+2dH5z6kCR7zNvenkm+ljKVYP6fr9jO390926Yc7JEfnAoxt/2D84NTJQAAWICwtH3fzraxmZu2sL1pCBdl+1MWcpu/uz7Jh5Nsmvd788/+zrc6Pzz1Ye7/d97a10Up0xTmHhcAAEbpfkl2jYvJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAW6f8D5FDe+QC4tcQAAAAASUVORK5CYII="/>
</defs>
</svg>
`
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
