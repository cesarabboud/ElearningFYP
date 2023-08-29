import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  useColorScheme,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton } from "react-native-paper";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
const ShoppingCart = () => {
  const [cartitems, setCartItems] = useState([]);
  const [total,setTotal] = useState(0)
  const isFocused = useIsFocused()
  const getCartContent = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      try {
        const response = await fetch(
          "http://192.168.0.101:8000/api/displayCart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resData = await response.json();
        setCartItems(resData.cartCourses);
        if(resData.prixtotal !== undefined ){
          console.log('prix diff de 0 :',resData.prixtotal)
          setTotal(resData.prixtotal)
          
        }
        else{
          setTotal(0)
          //console.log('tot =',total)
        }
        
        // console.log(cartitems.length)
        // console.log('cart items :', resData.cartitems)
      } catch (e) {
        console.log(e);
      }
    }
  };
  const deleteItemFromCart = async (id) => {
    //console.log('hello from delete')
    const token = await AsyncStorage.getItem('token')
    if(token!==null){
      try{
        const response = await fetch('http://192.168.0.101:8000/api/removeItemFromCart/'+id,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log(resData.message)
        if(cartitems.length > 0 ){
          getCartContent()
        }
        setTotal(0)
        console.log('total from remove :',total)
      }
      catch(err){
        console.log(err)
      }
    }
  }
  const clearCart = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !==null){
      try{
        const response = await fetch('http://192.168.0.101:8000/api/removeAll',{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log(resData.message)
        getCartContent()
        setTotal(0)
      }
      catch(err){
        console.log(err)
      }
    }
  }
  useEffect(() => {
    if(isFocused){
      getCartContent();
    }
  }, [isFocused]);
  const emptycartsvg = `<svg xmlns="http://www.w3.org/2000/svg" width="244" height="204" viewBox="0 0 244 204" fill="none">
  <g clip-path="url(#clip0_128_368)">
  <path d="M11.3378 194.391C14.7223 200.677 21.9055 203.375 21.9055 203.375C21.9055 203.375 23.6013 195.882 20.2168 189.596C16.8322 183.309 9.64907 180.611 9.64907 180.611C9.64907 180.611 7.95329 188.104 11.3378 194.391Z" fill="#2F2E41"/>
  <path d="M13.6641 192.322C19.7746 196.004 22.1279 203.317 22.1279 203.317C22.1279 203.317 14.5743 204.661 8.46379 200.979C2.35333 197.297 0 189.984 0 189.984C0 189.984 7.55368 188.64 13.6641 192.322Z" fill="#11B741"/>
  <path d="M150.661 9.79346H112.536V10.3389H150.661V9.79346Z" fill="#F2F2F2"/>
  <path d="M140.313 10.2026H139.769V15.2483H140.313V10.2026Z" fill="#F2F2F2"/>
  <path d="M123.702 10.2026H123.157V15.2483H123.702V10.2026Z" fill="#F2F2F2"/>
  <path d="M169.996 35.9763H131.871V36.5218H169.996V35.9763Z" fill="#F2F2F2"/>
  <path d="M142.764 31.0669H142.219V36.1125H142.764V31.0669Z" fill="#F2F2F2"/>
  <path d="M159.376 31.0669H158.831V36.1125H159.376V31.0669Z" fill="#F2F2F2"/>
  <path d="M220.648 48.2495H182.523V48.795H220.648V48.2495Z" fill="#F2F2F2"/>
  <path d="M193.416 43.3401H192.871V48.3857H193.416V43.3401Z" fill="#F2F2F2"/>
  <path d="M210.027 43.3401H209.483V48.3857H210.027V43.3401Z" fill="#F2F2F2"/>
  <path d="M216.836 174.8H178.711V175.345H216.836V174.8Z" fill="#F2F2F2"/>
  <path d="M189.603 169.89H189.059V174.936H189.603V169.89Z" fill="#F2F2F2"/>
  <path d="M206.215 169.89H205.67V174.936H206.215V169.89Z" fill="#F2F2F2"/>
  <path d="M151.751 87.251H113.626V87.7965H151.751V87.251Z" fill="#F2F2F2"/>
  <path d="M124.519 82.3416H123.974V87.3872H124.519V82.3416Z" fill="#F2F2F2"/>
  <path d="M141.13 82.3416H140.586V87.3872H141.13V82.3416Z" fill="#F2F2F2"/>
  <path d="M163.733 152.981H125.608V153.526H163.733V152.981Z" fill="#F2F2F2"/>
  <path d="M136.501 148.071H135.956V153.117H136.501V148.071Z" fill="#F2F2F2"/>
  <path d="M153.112 148.071H152.568V153.117H153.112V148.071Z" fill="#F2F2F2"/>
  <path d="M224.733 133.071H186.608V133.616H224.733V133.071Z" fill="#F2F2F2"/>
  <path d="M197.501 128.162H196.956V133.207H197.501V128.162Z" fill="#F2F2F2"/>
  <path d="M214.112 128.162H213.568V133.207H214.112V128.162Z" fill="#F2F2F2"/>
  <path d="M98.5967 191.512H34.1148V191.048H98.1327V168.514H39.5356L36.6891 162.575L37.1073 162.374L39.8276 168.049H98.5967V191.512Z" fill="#2F2E41"/>
  <path d="M42.6969 202.895C45.387 202.895 47.5678 200.711 47.5678 198.017C47.5678 195.322 45.387 193.138 42.6969 193.138C40.0067 193.138 37.8259 195.322 37.8259 198.017C37.8259 200.711 40.0067 202.895 42.6969 202.895Z" fill="#3F3D56"/>
  <path d="M90.7104 202.895C93.4006 202.895 95.5814 200.711 95.5814 198.017C95.5814 195.322 93.4006 193.138 90.7104 193.138C88.0203 193.138 85.8395 195.322 85.8395 198.017C85.8395 200.711 88.0203 202.895 90.7104 202.895Z" fill="#3F3D56"/>
  <path d="M147.306 97.4288C148.971 97.4288 150.321 96.0767 150.321 94.4089C150.321 92.741 148.971 91.3889 147.306 91.3889C145.641 91.3889 144.291 92.741 144.291 94.4089C144.291 96.0767 145.641 97.4288 147.306 97.4288Z" fill="#3F3D56"/>
  <path d="M105.493 160.848H33.0153L17.3328 109.509H121.644L121.549 109.811L105.493 160.848ZM33.3585 160.383H105.153L121.012 109.973H17.9598L33.3585 160.383Z" fill="#2F2E41"/>
  <path d="M99.8358 158.176H36.1757L22.4012 112.645H114.021L113.938 112.913L99.8358 158.176Z" fill="#F2F2F2"/>
  <path d="M122.944 104.922L122.495 104.803L125.556 93.2473H143.363V93.7121H125.913L122.944 104.922Z" fill="#2F2E41"/>
  <path d="M116.431 125.073H22.4008V125.538H116.431V125.073Z" fill="#2F2E41"/>
  <path d="M111.047 142.19H27.6295V142.655H111.047V142.19Z" fill="#2F2E41"/>
  <path d="M69.719 109.741H69.2551V160.616H69.719V109.741Z" fill="#2F2E41"/>
  <path d="M90.4886 109.727L87.1585 160.6L87.6215 160.63L90.9515 109.757L90.4886 109.727Z" fill="#2F2E41"/>
  <path d="M48.4952 109.726L48.0322 109.756L51.3429 160.631L51.8059 160.6L48.4952 109.726Z" fill="#2F2E41"/>
  <path d="M244 203.19H0V203.735H244V203.19Z" fill="#2F2E41"/>
  <path d="M162.143 16.876C162.143 16.876 166.124 28.2236 163.674 29.9694C161.224 31.7152 171.942 45.9724 171.942 45.9724L184.804 42.4808L177.76 30.5513C177.76 30.5513 176.842 18.6218 176.842 16.876C176.842 15.1302 162.143 16.876 162.143 16.876Z" fill="#A0616A"/>
  <path opacity="0.1" d="M162.143 16.876C162.143 16.876 166.124 28.2236 163.674 29.9694C161.224 31.7152 171.942 45.9724 171.942 45.9724L184.804 42.4808L177.76 30.5513C177.76 30.5513 176.842 18.6218 176.842 16.876C176.842 15.1302 162.143 16.876 162.143 16.876Z" fill="black"/>
  <path d="M155.461 97.764C155.461 97.764 154.299 112.312 155.461 119.877C156.623 127.442 158.366 148.392 158.366 148.392C158.366 148.392 158.366 187.963 164.758 188.545C171.149 189.127 175.798 189.709 176.379 187.381C176.96 185.053 173.473 183.889 175.216 182.726C176.96 181.562 177.541 177.488 175.216 172.833C172.892 168.177 175.216 121.041 175.216 121.041L186.256 150.719C186.256 150.719 187.418 175.16 188.58 178.652C189.742 182.144 187.418 188.545 191.486 189.127C195.553 189.709 200.201 186.217 202.525 185.053C204.85 183.889 199.039 183.889 200.201 183.307C201.363 182.726 204.85 180.98 203.687 180.398C202.525 179.816 201.363 151.883 201.363 151.883C201.363 151.883 198.168 92.2357 194.1 89.908C190.033 87.5803 187.418 91.5896 187.418 91.5896L155.461 97.764Z" fill="#2F2E41"/>
  <path d="M165.92 186.217V190.872C165.92 190.872 160.691 203.527 165.92 203.527C171.149 203.527 175.217 204.839 175.217 203.093V187.381L165.92 186.217Z" fill="#2F2E41"/>
  <path d="M200.201 186.209V190.864C200.201 190.864 205.431 203.519 200.201 203.519C194.972 203.519 190.905 204.83 190.905 203.085V187.373L200.201 186.209Z" fill="#2F2E41"/>
  <path d="M170.278 25.3139C176.054 25.3139 180.736 20.6242 180.736 14.8392C180.736 9.05419 176.054 4.3645 170.278 4.3645C164.501 4.3645 159.819 9.05419 159.819 14.8392C159.819 20.6242 164.501 25.3139 170.278 25.3139Z" fill="#A0616A"/>
  <path d="M167.082 34.3337C167.082 34.3337 169.987 43.0627 174.635 41.3169L179.284 39.5711L187.418 95.4362C187.418 95.4362 181.027 104.747 171.73 98.9278C162.434 93.1085 167.082 34.3337 167.082 34.3337Z" fill="#11B741"/>
  <path d="M175.216 32.5879L177.831 27.0596C177.831 27.0596 193.229 34.3337 195.553 36.6614C197.877 38.9891 197.877 42.4807 197.877 42.4807L193.81 57.0289C193.81 57.0289 194.972 89.0349 194.972 90.1988C194.972 91.3626 199.039 97.7638 196.134 95.4361C193.229 93.1084 192.648 90.7807 190.324 94.2723C187.999 97.7638 182.77 101.837 182.77 101.837L175.216 32.5879Z" fill="#3F3D56"/>
  <path d="M195.553 74.4868L193.81 90.7808C193.81 90.7808 183.351 100.092 185.675 100.674C187.999 101.256 189.161 98.9278 189.161 98.9278C189.161 98.9278 193.229 103.001 195.553 100.674C197.877 98.3459 203.687 76.2326 203.687 76.2326L195.553 74.4868Z" fill="#A0616A"/>
  <path d="M170.5 0.0354207C168.182 -0.0475924 165.701 -0.0886561 163.746 1.1627C162.846 1.79071 162.057 2.56415 161.411 3.45139C159.507 5.86197 157.862 8.89503 158.57 11.8859L159.391 11.5651C159.391 12.3634 159.214 13.1518 158.872 13.8731C158.988 13.5363 159.375 14.0808 159.271 14.4216L158.367 17.3946C159.854 16.8485 161.704 17.9542 161.931 19.5246C162.034 16.0714 162.392 12.1117 165.189 10.0897C166.599 9.07 168.384 8.75873 170.102 8.48231C171.686 8.2273 173.347 7.98413 174.865 8.50654C176.383 9.02896 177.675 10.5834 177.331 12.1533C178.031 11.9119 178.813 12.4003 179.159 13.0557C179.505 13.711 179.523 14.4841 179.534 15.2253C180.28 15.7533 181.128 14.7049 181.432 13.8422C182.146 11.8173 182.78 9.66187 182.396 7.54935C182.012 5.43683 180.293 3.41799 178.149 3.41083C178.409 3.12454 178.548 2.7481 178.536 2.36113L176.769 2.21159C177.217 2.14797 177.63 1.93011 177.936 1.59532C177.226 2.37724 171.648 0.0764978 170.5 0.0354207Z" fill="#2F2E41"/>
  <path d="M169.987 30.8421C169.987 30.8421 165.257 26.1999 163.555 26.4842C161.853 26.7686 159.528 30.8421 159.528 30.8421C159.528 30.8421 145.583 35.4975 146.165 40.1529C146.746 44.8084 153.137 67.5036 153.137 67.5036C153.137 67.5036 158.366 94.8542 153.718 97.7638C149.07 100.673 175.798 108.239 176.379 104.747C176.96 101.255 178.122 66.3397 176.379 61.1024C174.635 55.865 169.987 30.8421 169.987 30.8421Z" fill="#3F3D56"/>
  <path d="M190.323 40.1531H197.508C197.508 40.1531 202.525 62.2663 203.106 64.5941C203.687 66.9218 204.849 77.9784 204.268 77.9784C203.687 77.9784 192.067 75.6507 192.067 77.3965L190.323 40.1531Z" fill="#3F3D56"/>
  <path d="M190.08 94.9127H162.576C159.892 82.5468 159.668 70.5991 162.576 59.1841H190.08C185.642 70.3938 185.364 82.2596 190.08 94.9127Z" fill="#F2F2F2"/>
  <path d="M151.394 79.7241L159.528 83.2157C159.528 83.2157 175.216 85.5434 175.216 79.1421C175.216 72.7409 159.528 76.2325 159.528 76.2325L154.299 74.5579L151.394 79.7241Z" fill="#A0616A"/>
  <path d="M153.137 36.6614L146.164 38.4072L140.935 69.2493C140.935 69.2493 139.192 77.3963 142.097 77.9783C145.002 78.5602 153.137 83.2156 153.137 83.2156C153.137 83.2156 154.299 74.4867 156.623 74.4867L150.813 69.8313L154.299 49.4638L153.137 36.6614Z" fill="#3F3D56"/>
  <path d="M54.532 96.2512H16.407V96.7967H54.532V96.2512Z" fill="#F2F2F2"/>
  <path d="M27.2998 91.342H26.7552V96.3877H27.2998V91.342Z" fill="#F2F2F2"/>
  <path d="M43.9114 91.342H43.3668V96.3877H43.9114V91.342Z" fill="#F2F2F2"/>
  <path d="M67.8757 15.521H29.7507V16.0665H67.8757V15.521Z" fill="#F2F2F2"/>
  <path d="M57.5275 15.9299H56.9828V20.9756H57.5275V15.9299Z" fill="#F2F2F2"/>
  <path d="M40.9159 15.9299H40.3712V20.9756H40.9159V15.9299Z" fill="#F2F2F2"/>
  <path d="M106.273 69.2502H68.148V69.7957H106.273V69.2502Z" fill="#F2F2F2"/>
  <path d="M95.9248 69.6594H95.3802V74.7051H95.9248V69.6594Z" fill="#F2F2F2"/>
  <path d="M79.3132 69.6594H78.7686V74.7051H79.3132V69.6594Z" fill="#F2F2F2"/>
  <path d="M41.4605 68.9775H3.33551V69.523H41.4605V68.9775Z" fill="#F2F2F2"/>
  <path d="M31.1123 69.3865H30.5677V74.4321H31.1123V69.3865Z" fill="#F2F2F2"/>
  <path d="M14.5007 69.3865H13.9561V74.4321H14.5007V69.3865Z" fill="#F2F2F2"/>
  <path d="M87.2105 41.7036H49.0855V42.2491H87.2105V41.7036Z" fill="#F2F2F2"/>
  <path d="M59.9784 36.7944H59.4337V41.8401H59.9784V36.7944Z" fill="#F2F2F2"/>
  <path d="M76.59 36.7944H76.0453V41.8401H76.59V36.7944Z" fill="#F2F2F2"/>
  </g>
  <defs>
  <clipPath id="clip0_128_368">
  <rect width="244" height="204" fill="white"/>
  </clipPath>
  </defs>
  </svg>`;
  if (cartitems.length === 0 || cartitems.length === undefined ) {
    return (
      //if the cart is empty
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 20,
          backgroundColor: "#fff",
        }}
      >
        <StatusBar style="dark" />
        <SvgXml xml={emptycartsvg} height={180} />
        <Text style={{ fontSize: 30, color: "#11b741", fontWeight: "500" }}>
          Your Cart Is Empty !
        </Text>
        <Text
          style={{
            fontSize: 16,
            width: Dimensions.get("window").width - 200,
            textAlign: "center",
            color: "#bababa",
          }}
        >
          Looks like you haven’t added anything to your cart yet.
        </Text>
        <TouchableOpacity
          style={{
            borderColor: "#02ba5d",
            borderWidth: 1,
            borderRadius: 10,
            padding: 15,
            width: Dimensions.get("window").width - 150,
            justifyContent: "center",
            alignItems: "center",
            height: 55,
          }}
        >
          <Text style={{ fontWeight: "500", color: "#02ba5d" }}>
            Check Wishlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#02ba5d",
            borderRadius: 10,
            padding: 15,
            width: Dimensions.get("window").width - 150,
            justifyContent: "center",
            alignItems: "center",
            height: 55,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "500" }}>
            Start Browsing
          </Text>
        </TouchableOpacity>

        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{gap:5,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',backgroundColor:"#dcdcdc",marginVertical:20,padding:10,paddingRight:20}}>
          <Text style={{textAlign:"right",fontSize:18,fontWeight:"600",}}>Clear All</Text>
          <Ionicons onPress={clearCart} name="trash" size={16}/>
        </View>
        <ScrollView>
        <View style={styles.cartContent}>
          {cartitems.map((c, idx) => {
            return (
            <>
              <View key={idx}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding:10,
                    
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 15, justifyContent:'center' }}>
                    <View
                      style={{ borderRadius: 15, overflow: "hidden", width: 80 ,justifyContent:'center' }}
                    >
                      <Image
                        // source={{uri: user.profilepicture}}
                        source={require("../images/jsyellow.png")}
                        style={{
                          width: 80,
                          height: 80,
                          backgroundColor: "#ccc",
                        }}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{ justifyContent: "center" }}>
                      <Text style={styles.text}>{c.title}</Text>
                      <Text style={[styles.text,{color:"#02ba5d"}]}>${c.price}.00</Text>
                    </View>
                  </View>
                  <Feather
                  onPress={()=>deleteItemFromCart(c.id)}
                    name="trash-2"
                    style={{ margin:0, alignSelf: "center" }}
                    size={20}
                    color={'red'}
                  />
                </View>
              
              </View>
              {idx !== cartitems.length - 1 ? <View style={{height:3,backgroundColor:"#ececec"}} /> : null}
              </>
            );
          })}
        </View>
        <View style={{alignSelf:'center',marginBottom:30}}>
        <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#0AB072", "#02BA5D", "#11B741"]}
                  style={{
                    width: Dimensions.get('window').width-40,
                    justifyContent: "center",
                    borderRadius: 20,
                    marginTop:20,
                    gap:20,
                    paddingVertical:25
                  }}
                >
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
                    <Text style={styles.textOperationsStyle}>In-Cart Items</Text>
                    <Text style={styles.textOperationsStyle}>{cartitems.length}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
                    <Text style={styles.textOperationsStyle}>Subtotal</Text>
                    <Text style={styles.textOperationsStyle}>${total}.00</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
                    <Text style={styles.textOperationsStyle}>Fees</Text>
                    <Text style={styles.textOperationsStyle}>$3.00</Text>
                  </View>
                  <View style={{height:3,backgroundColor:"#fff"}} />
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
                    <Text style={styles.textOperationsStyle}>Total</Text>
                    <Text style={styles.textOperationsStyle}>${total + 3 }.00</Text>
                  </View>
                </LinearGradient>
        </View>
        <TouchableOpacity style={styles.checkoutbtn}>
            <Text style={styles.checkouttext}>Checkout</Text>
        </TouchableOpacity>
        </ScrollView>
        
        
      </View>
    );
  }
  
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartContent: {
    borderColor: "#ececec",
    borderWidth: 3,
    marginHorizontal:20,
    borderRadius: 10,
    
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    // shadowColor: "#171717",
  },
  text:{
    fontSize:18,
    fontWeight:"600"
  },
  textOperationsStyle:{
    fontSize:18,
    color:"#fff",
    fontWeight:"600"
    
  },
  checkoutbtn:{
    backgroundColor:"#02BA5D",
    marginHorizontal:20,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    borderRadius:10,
    marginBottom:25,
    height:50
  },
  checkouttext:{
    fontSize:18,
    color:"#fff",
    fontWeight:"500",
    
  }
});
