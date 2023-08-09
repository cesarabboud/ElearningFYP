import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const CustomHeader = ({ scene, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../images/reviewsbckgrnd2.png")}
        style={styles.headerBackground}
        resizeMode="cover"
      />
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      <Text style={styles.headerText}>Reviews</Text>
    </View>
  )
}

export default CustomHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        
      },
      headerBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
      },
      //   backButton: {
      //     marginBottom: 70,
      //   },
      backButtonText: {
        fontSize: 16,
        color: "#000",
      },
      headerText: {
        fontSize: 18,
        color: "#000",
        marginBottom: 70,
        fontWeight: "600",
      },
      starIcon: {
        margin: 0,
        marginRight: -15,
      },
})