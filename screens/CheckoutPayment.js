import React ,{ useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import { CreditCardInput,LiteCreditCardInput } from "react-native-credit-card-input";
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from './keys/keys';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toEditorSettings } from 'typescript';

// create a component
const CURRENCY = 'USD';
var CARD_TOKEN = null;


function getCreditCardToken(creditCardData){
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
 function subscribeUser(creditCardToken){
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

const StripeGateway = ({route}) => {

    const {total} = route.params

  const [CardInput, setCardInput] = React.useState({})
  const [email,setEmail] = useState('')
  const [fullName,setFullName] = useState('')

  const CheckoutFct = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token !==null) {
      try{
        const response = await fetch('http://192.168.0.107:8000/api/checkoutCart',{
          method:"POST",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        console.log(resData)
      }
      catch(e){
        console.log(e)
      }
    }
  }
  const onSubmit = async () => {

    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert('Invalid Credit Card');
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e",e);
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error)
    } else {
     
      let payment_data = await charges();
      console.log('pament_data', payment_data);
      if(payment_data.status == 'succeeded')
      {
        alert("Payment Successful !");
        CheckoutFct()
        Keyboard.dismiss()
        
      }
      else{
        alert('Payment failed');
      }
      
    }
    
  };



  const charges = async () => {

    const card = {
        'amount': total * 100, 
        'currency': CURRENCY,
        'source': CARD_TOKEN,
        'description': "Cesar Abboud",
        // 'customer': {
        //   'name': 'John Doe',
        //   'email': 'john.doe@example.com',
        //   'address': {
        //     'line1': '123 Main St',
        //     'line2': 'Apt 4B',
        //     'city': 'Anytown',
        //     'state': 'CA',
        //     'postal_code': '12345',
        //     'country': 'US'
        //   }
        // }
      };

      return fetch('https://api.stripe.com/v1/charges', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data to Stripe
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          Authorization: `Bearer ${Secret_key}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json());
  };
  


  const _onChange =(data) => {
    setCardInput(data)
  }
  
  return (
<ScrollView style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <View style={{height:20}} />
        <CreditCardInput 
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#000"
        placeholderColor="#ccc"
        onChange={_onChange}
        />
        

        
      <TouchableOpacity 
      onPress={onSubmit}
      style={styles.button}>
        <Text
          style={styles.buttonText}>
          Pay Now
        </Text>
      </TouchableOpacity>
    </ScrollView>
    
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#1E2A23'
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button : {
    backgroundColor:'#2471A3',
    width:150,
    height:45,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5
  },
  buttonText : {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  inputContainerStyle : {
    //backgroundColor:'#fff',
    borderRadius:5,
    color:"green"
  },
  inputStyle : {
     //backgroundColor:'#222242',
    backgroundColor:'#fff',
    paddingLeft:15,
    borderRadius:5,
    color:'#000'
  },
  labelStyle : {
    paddingBottom:5,
    fontSize:12,
    backgroundColor:"#1E2A23",
    color:"#fff"
  }
 
});

//make this component available to the app
export default StripeGateway;