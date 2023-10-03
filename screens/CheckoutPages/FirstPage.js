import React, { useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { View, Text, StyleSheet, SafeAreaView,TextInput, ScrollView,KeyboardAvoidingView,Platform} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {Feather,Ionicons} from '@expo/vector-icons'
import { STRIPE_PUBLISHABLE_KEY,Secret_key } from '../keys/keys';
import TestPageCheckout from './TestPageCheckout';
import PhoneInput from 'react-native-phone-number-input';
import { Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { CreditCardInput,LiteCreditCardInput } from "react-native-credit-card-input";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import {shareAsync} from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { downloadFile } from 'expo-filedownload'



// ----------------------------------- First Page -----------------------------------//
function FirstStep ({inp1, onInputChange1 ,email , handleEmailChange, value , handleValueChange, phoneRef, formattedValue , handleFormattedValue,countryCode,handleCountryCode,country,handleCountry,city,handleCity,state,handleState,ad1,handlead1,ad2,handlead2,postalCode,handlePostalCode,inp1Validation,emailValidation,phoneNbValidation,valid,handleisValid}) {
    
    return(
        <>
        <Text style={{fontSize:24,fontWeight:"600"}}>Personal Information</Text>
        
        <View style={{gap:20}}>
            <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                <View style={{width:"50%"}}>
                   <TextInput 
                placeholder='Name(Required)'
                style={styles.name}
                value={inp1}
                onChangeText={(text)=>onInputChange1(text)}
                />
                {
                inp1Validation !== '' ? <Text style={{color:"red"}}>{inp1Validation}</Text> : null
                }
                </View>
                <View style={{width:"48%"}}>
                   <TextInput 
                placeholder='Email(Required)'
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.email}
                value={email}
                onChangeText={(text)=>handleEmailChange(text)}
                /> 
                {
                emailValidation !== '' ? <Text style={{color:"red"}}>{emailValidation}</Text> : null
                }
                </View>
                
                
            </View>
            <View>
            <PhoneInput
            ref={phoneRef}
            defaultValue={value}
            defaultCode="LB"
            layout="first"
            placeholder='Phone Number(Required)'
            textContainerStyle={{borderTopRightRadius:8,borderBottomRightRadius:8}}
            containerStyle={{borderRadius:8,borderWidth:1,width:"100%"}}
            onChangeText={(text) => {
              handleValueChange(text);
              console.log('helloooo')
              const checkValid = phoneRef.current?.isValidNumber(text);
              handleisValid(checkValid ? checkValid : false);
              console.log('test',checkValid)
            }}
            onChangeFormattedText={(text) => {
              handleFormattedValue(text); 
              handleCountryCode(phoneRef.current?.getCountryCode() || '');
              
            }}
            // onChangeCountry={(country)=>{
            //   handleCountry(country)
            //   const checkValid = phoneRef.current?.isValidNumber(value);
            //   handleisValid(checkValid);
            //   console.log('checkvalid',checkValid)
            // }}
            countryPickerProps={{withAlphaFilter:true}}
            // disabled={disabled}
            
            // withShadow
            // autoFocus
          />
            {
                phoneNbValidation !== '' ? <Text style={{color:"red"}}>{phoneNbValidation}</Text> : null
            }
            </View>
            
          <TextInput 
            placeholder='Country'
            style={{borderRadius:8,width:"100%",borderWidth:1,padding:15}}
            value={countryCode}
            editable={false}
            onChangeText={(text)=>handleCountry(text)}
            />
            {/* <Text>{country}</Text> */}
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            
            <TextInput 
            placeholder='City'
            style={[styles.email,{width:"48%"}]}
            value={city}
            onChangeText={(text)=>{handleCity(text)}}
            />
            <TextInput 
            placeholder='State'
            style={[styles.email,{width:"48%"}]}
            value={state}
            onChangeText={(text)=>handleState(text)}
            />
          </View>
          {/* <Text>{formattedValue}</Text> */}
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            <TextInput 
            placeholder='Address Line 1'
            style={[styles.email,{width:"48%"}]}
            value={ad1}
            onChangeText={(text)=>handlead1(text)}
            />
            <TextInput 
            placeholder='Address Line 2'
            style={[styles.email,{width:"48%"}]}
            value={ad2}
            onChangeText={(text)=>handlead2(text)}
            />
          </View>
          <TextInput 
            placeholder='Postal Code'
            keyboardType="numeric"
            style={{borderRadius:8,width:"100%",borderWidth:1,padding:15}}
            value={postalCode}
            onChangeText={(text)=>handlePostalCode(text)}
            />
          
        </View>
        {/* <Text>{ad1}</Text> */}
        </>
    )
  }
//-----------------------------------Second Page + everything related-----------------------------------//

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

const PageTwo = ({mail,charges,onSubmit,_onChange,custId,promocode,handlePromoCode,inp1,email,country,countrycode,ad1,ad2,postalCode,city, state,promocodeValidity,handlePromoCodeValidity,value,percent,handlePercent}) => {
    



    // const onSubmit = async () => {

    //     if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
    //       alert('Invalid Credit Card');
    //       return false;
    //     }
    
    //     let creditCardToken;
    //     try {
    //       // Create a credit card token
    //       creditCardToken = await getCreditCardToken(CardInput);
    //       // console.log("creditCardToken", creditCardToken)
    //       if (creditCardToken.error) {
    //         alert("creditCardToken error");
    //         return;
    //       }
    //     } catch (e) {
    //       console.log("e",e);
    //       return;
    //     }
    //     // Send a request to your server with the received credit card token
    //     const { error } = await subscribeUser(creditCardToken);
    //     // Handle any errors from your server
    //     if (error) {
    //       alert(error)
    //     } else {
         
    //       let payment_data = await charges();
    //       console.log('payment_data', payment_data);
    //       if(payment_data.status == 'succeeded')
    //       {
    //         alert("Payment Successful !");
    //         // CheckoutFct()
    //         Keyboard.dismiss()
            
    //       }
    //       else{
    //         alert('Payment failed');
    //       }
          
    //     }
        
    //   };
    
    
    
    //   const charges = async () => {
    
    //     const card = {
    //         'amount': 5 * 100, 
    //         'currency': CURRENCY,
    //         'source': CARD_TOKEN,
    //         'description': "Cesar Abboud",
    //         // 'customer': {
    //         //   'name': 'John Doe',
    //         //   'email': 'john.doe@example.com',
    //         //   'address': {
    //         //     'line1': '123 Main St',
    //         //     'line2': 'Apt 4B',
    //         //     'city': 'Anytown',
    //         //     'state': 'CA',
    //         //     'postal_code': '12345',
    //         //     'country': 'US'
    //         //   }
    //         // }
    //       };
    
    //       return fetch('https://api.stripe.com/v1/charges', {
    //         headers: {
    //           // Use the correct MIME type for your server
    //           Accept: 'application/json',
    //           // Use the correct Content Type to send data to Stripe
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //           // Use the Stripe publishable key as Bearer
    //           Authorization: `Bearer ${Secret_key}`
    //         },
    //         // Use a proper HTTP method
    //         method: 'post',
    //         // Format the credit card data to a string of key-value pairs
    //         // divided by &
    //         body: Object.keys(card)
    //           .map(key => key + '=' + card[key])
    //           .join('&')
    //       }).then(response => response.json());
    //   };
      
    
    
    //   const _onChange =(data) => {
    //     console.log(data)
    //     setCardInput(data)
    //   }
      const checkPromoCode = async () => {
        // const prom =`promo_1NshYIJMGaffol5uPF3QL4kv`
        const res=await fetch(`https://api.stripe.com/v1/promotion_codes/${promocode}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${Secret_key}`
            }
        })
        const resData = await res.json()
        console.log(resData.active ? "found" : "not found")
        if(!resData.active){
            handlePromoCodeValidity(false)
            return
        }
        
        const res2 = await fetch('https://api.stripe.com/v1/customers/'+custId,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${Secret_key}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        const res2Data = await res2.json()
        console.log(res2Data)
    
        if(res2Data.id && resData.active){
            handlePromoCodeValidity(true)
            handlePercent(resData.coupon.percent_off)
            console.log('%',resData.coupon.percent_off)
            const cust = {
                email:email,
                name:inp1,
                'address[city]': city,
                'address[state]' : state ,
                'address[postal_code]':postalCode,
                'address[country]':country,
                "phone":value,
                'address[line1]':ad1,
                'address[line2]': ad2,
                //"coupon":"uaLIvj3B",
                // "promotion_code":"promo_1NshYIJMGaffol5ugSHZiXl4"
                "promotion_code":promocode
              }
            const formData = new URLSearchParams(cust).toString()
            const res3 = await fetch('https://api.stripe.com/v1/customers/'+custId,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${Secret_key}`
                },
                body:formData
            })
            const res3Data = await res3.json()
            console.log(res3Data)
        }
      }
      
      return (
    <ScrollView style={styles.container}>
            {/* <StatusBar barStyle={'light-content'} /> */}
            <CreditCardInput 
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            validColor="#000"
            placeholderColor="#ccc"
            onChange={_onChange}
            />
            <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
            <TextInput 
            placeholder={'Enter Discount Code(Optional)'}
            style={{backgroundColor:"#dee2e6",padding:15,borderTopLeftRadius:8,borderBottomLeftRadius:8,width:"75%",height:50,}}
            value={promocode}
            onChangeText={(text)=>handlePromoCode(text)}
            editable={promocodeValidity === true ? false : true}
            />
            <TouchableOpacity disabled={promocode==='' || promocodeValidity === true} onPress={checkPromoCode} activeOpacity={0.7} style={{justifyContent:'center',alignItems:'center',width:"25%",height:50,backgroundColor:"#03ba55",borderTopRightRadius:8,borderBottomRightRadius:8}}>
                <Text style={{color:"white",fontWeight:"600"}}>Apply</Text>
            </TouchableOpacity>
            
            </View>
            <Text style={{color:"red"}}>{promocodeValidity === true ? <Ionicons name="checkmark" size={25} color={"green"} /> : promocodeValidity===false ? `Invalid Promo Code` : null }</Text>
            {/* <Text>{promocode}</Text> */}
            
    
            
          {/* <TouchableOpacity 
          onPress={onSubmit}
          style={styles.button}>
            <Text
              style={styles.buttonText}>
              Pay Now
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
        
      );






}


//---------------------------------------------

const StepIndicatorComponent = ({navigation,route}) => {
  const [currentStep, setCurrentStep] = useState(0);
//   const route = useRoute()
    const {cartitems,total} = route.params
    console.log(cartitems)
    console.log('total',total)
    const [email2,setEmail2] = useState("")
    const [promocode,setPromocode] = useState("")
    const handlePromoCode = (text) => {
        setPromocode(text)
    }
    const[promocodeValidity,setPromoCodeValidity] = useState(null)
    const handlePromoCodeValidity = (flag) => {
        setPromoCodeValidity(flag)
    }
    //------
  const stepLabels = ["information-circle-outline", "card-outline", "clipboard-outline"];
 const stepLabels2 = ["1", "2", "3"];
  const renderStepIndicator = params => (
      <Ionicons name={stepLabels[params.position]} style={{alignSelf:'center',marginLeft:.5}} size={16}/>
  );

    const [data,setData] = useState(null)
  
  const SearchCustomerInStripe = async () => {
    setData(null)
    try{
        const response = await fetch(`https://api.stripe.com/v1/customers?email=${email2}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${Secret_key}`
            }
            
        })
        const resData = await response.json()
        console.log( resData.data.length > 0 ? resData.data[0].id : 'no user')
        setData(resData.data.length > 0 ? resData.data[0].id : null)
        // return resData.data.length > 0 ? <Ionicons name="checkbox" /> : <Text>Incorrect email</Text>
    }
    catch(err){
        console.log(err)
    }
  }
  
  useEffect(()=>{
    SearchCustomerInStripe()
  },[email2])
  const [pdfUri,setPdfUri] = useState(null)
  const generateAndSavePDF = async (htmlContent) =>{
    try {
      // Generate PDF from HTML
      
      const pdf = await Print.printToFileAsync({ html: htmlContent });
      
      // Move the PDF to a permanent location using expo-file-system
      const permanentUri = `${FileSystem.documentDirectory}receipt.pdf`;
      await FileSystem.moveAsync({ from: pdf.uri, to: permanentUri });

      // Set the PDF URI in the state
      setPdfUri(permanentUri);
    } catch (error) {
      console.error('Error generating and saving PDF:', error);
    }
  };
  const toSave =`
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue;background-color:red; font-weight: normal;">Hello Expo!</h1>
      <p style="background-color:#ba1629"></p>
    </body>
  </html>`

  useEffect(()=>{
    generateAndSavePDF(toSave)
  })
  const openPdf = async () => {
    
    if (pdfUri) {
      // Use any method to open or display the saved PDF (e.g., Expo Document Viewer)
      // Replace the following line with your preferred method for displaying PDFs.
      
      console.log('PDF URI:', pdfUri);
    } else {
      console.log('PDF not generated yet.');
    }
  };
  const [loading,setIsLoading] = useState(false)
  const sharePdf = async () => {
    
    const handleDownloadPPT = (uri) => {
        setIsLoading(true);
        // Replace 'downloadFile' with your actual download function.
        console.log('okkkkkkkkkk')
        downloadFile(uri)
          .then(() => setIsLoading(false))
          .catch((error) => {
            console.error('Error:', error);
            setIsLoading(false);
          });
      };
    let string=``
    if(percent !== 0){
        string=`<div style="display:flex;justify-content:space-between">
        <p style="margin:0">Discount(${percent}%)</p>
        <p style="margin:0">-$${(total*percent)/100}</p>
        </div>
        <hr />
        <div style="display:flex;justify-content:space-between">
        <p style="font-weight:bold;margin:0">Total After Discount</p>
        <p style="font-weight:bold;margin:0">-$${total-((total*percent)/100)}</p>
        </div>
        `
        
    }
    const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 30px; font-family: Helvetica Neue;background-color:red; font-weight: normal;">Receipt</h1>
      <div style="display:flex;flex-direction:column;background-color:#ba1629">
        ${cartitems.map((item, idx) => `<div style="display:flex;justify-content:space-between" key=${idx.toString()}><p style="margin:0">${idx+1}) ${item.title}</p><p style="margin:0">$${item.price}.00</p></div>`).join('')}
      </div>
      <hr />
      
      <div style="display:flex;justify-content:space-between"><p style="font-weight:bold;margin:0">Total</p><p style="font-weight:bold;margin:0">$${total}.00</p></div>
        ${string}
      </body>
  </html>
`;
    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf'});
    //   handleDownloadPPT(uri)
    //   await Linking.openURL(uri)
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('An error occurred while creating the PDF.');
    }
  };

const arr = [1,2,3]
const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue;background-color:red; font-weight: normal;">Hello Expo!</h1>
      <p style="background-color:#ba1629">hi</p>
    </body>
  </html>
`;

const createPDF = async () => {
  try {
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  } catch (error) {
    console.error('Error creating PDF:', error);
    alert('An error occurred while creating the PDF.');
  }
};

//------------------
const [inp1, setInp1] = useState("");
const handleInputChange1 = (text) => {
    setInp1(text)
}
    const [email,setEmail] = useState("")
    const handleEmailChange = (text) => {
        setEmail(text)
    }
  const [value, setValue] = useState('');
  const handleValueChange = (text) => {
    setValue(text)
  }
  const [countryCode, setCountryCode] = useState('LB');
  const handleCountryCode = (text) => {
    setCountryCode(text)
  }
  const [formattedValue, setFormattedValue] = useState('');
  const handleFormattedValue = (text) => {
    setFormattedValue(text)
  }
  const [valid, setValid] = useState(false);
  const handleisValid = (Valid) => {
    setValid(Valid)
  }
//   const [disabled,setDisabled] = useState(false)
    const[phoneNb,setPhoneNb] = useState("")
    const handlePhoneNB = (text) => {
        setPhoneNb(text)
      }
    const [country,setCountry] = useState("")
    const handleCountry = (text) => {
        setCountry(text)
      }
    const [city,setCity] = useState("")
    const handleCity = (text) => {
        setCity(text)
      }
    const [state,setState] = useState("")
    const handleState = (text) => {
        setState(text)
    }
    const [ad1,setad1] = useState("")
    const handlead1 = (text) => {
        setad1(text)
    }
    const [ad2,setad2] = useState("")
    const handlead2 = (text) => {
        setad2(text)
    }
    const [postalCode,setpostalCode] = useState("")
    const handlePostalCode = (text) => {
        setpostalCode(text)
    }
  const phoneRef = useRef(null);
  const [validationMessages, setValidationMessages] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [canEdit,setCanEdit] = useState(false)
  const[lastEmail,setLastEmail] = useState("")
  const [percent,setPercent] = useState(0)
  const handlePercent = (val) => {
    setPercent(val)
  }
//--------------
const fetchIfEmailExists = async (userMail) => {
    try{
        const response = await fetch(`https://api.stripe.com/v1/customers?email=${userMail}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${Secret_key}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },

        })
        const resData = await response.json()
        console.log(resData.data.length === 0 ? 'machi' : resData.data[0].id)
        if(resData.data.length === 0){
            // return 'User not found'
            console.log('hi from length 0')
            return false
        }
        // return 'User exists'
        return true
    }
    catch(err){
        console.log('err',err)
    }
}
const fetchIfEmailIsTaken = async (userMail) => {
    try{
        const response = await fetch(`https://api.stripe.com/v1/customers?email=${userMail}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${Secret_key}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },

        })
        const resData = await response.json()
        console.log(resData.data.length === 0 ? 'machi' : resData.data[0].id)
        if( resData.data.length !== 0 && resData.data[0].email === userMail){
            return 'Emails Match'
        }
        return ''
    }
    catch(err){
        console.log('err',err)
    }
}
const addCustomer = async (inp1,email,value,country,city,state,ad1,ad2,postalCode) => {
      
    
        const cust = {
            email:email,
            name:inp1,
            'address[city]': city,
            'address[state]' : state ,
            'address[postal_code]':postalCode,
            'address[country]':country,
            "phone":value,
            //"coupon":"uaLIvj3B",
            //"promotion_code":"promo_1NshYIJMGaffol5ugSHZiXl4"
          }
          const formData = new URLSearchParams(cust).toString()
          const Secret_key=`sk_test_51NkkCgJMGaffol5u2rLmtWBo3OylS6NDtIR5dtAuyPYtU0Z5ikcBRPuQks3liQsRX40mPN1rFUmmzQqzY1Vcqm5y009706cEjD`
          const res = await fetch('https://api.stripe.com/v1/customers',{
            method:"POST",
            headers:{
              "Authorization":`Bearer ${Secret_key}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body:formData
          })
          const data = await res.json();
          console.log(data);
          setCustId(data.id)
    /*yi.textContent = data.discount.coupon.id + ' ' + data.email ;
    console.log(data.discount.coupon);
    console.log(data.discount.coupon.id === 'uaLIvj3Bsdsadsadsad');*/
  }
const editCustomer = async (inp1,email,value,country,city,state,ad1,ad2,postalCode) => {
    const cust = {
        email:email,
        name:inp1,
        'address[city]': city,
        'address[state]' : state ,
        'address[postal_code]':postalCode,
        'address[country]':country,
        "phone":value,
        'address[line1]':ad1,
        'address[line2]': ad2
        //"coupon":"uaLIvj3B",
        //"promotion_code":"promo_1NshYIJMGaffol5ugSHZiXl4"
      }
      const formData = new URLSearchParams(cust).toString()
      const Secret_key=`sk_test_51NkkCgJMGaffol5u2rLmtWBo3OylS6NDtIR5dtAuyPYtU0Z5ikcBRPuQks3liQsRX40mPN1rFUmmzQqzY1Vcqm5y009706cEjD`
      const res = await fetch('https://api.stripe.com/v1/customers/'+custId,{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${Secret_key}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:formData
      })
      const data = await res.json();
      console.log(data);
}

 const handleNextBtn = async () => {
    const pattern = /.+\.com$/;
    let ends = false
    if (pattern.test(email)) {
        ends = true
    }

    console.log(ends)
    const updatedValidationMessages = {}

    if(currentStep === 0){
        if(inp1.trim()  === '' ){
            updatedValidationMessages.name = 'Name is required';
            //return
        }
        if(email.trim() === '' || ends===false){

            updatedValidationMessages.email = email!=='' ? 'Invalid Email' : 'Email is required';
            // console.log('email is')
            // return
        }
        const checkIfExists = await fetchIfEmailIsTaken(email)
        // console.log('ch',checkIfExists)
        if(email.trim() !== '' && checkIfExists==='Emails Match' && email !==lastEmail ){
            console.log('yi')
            updatedValidationMessages.email = 'Email already exists!';
        }
        if(value.trim() === ''){
            updatedValidationMessages.phoneNumber = 'Phone Number is required';
        }
        console.log('valid',valid)
        if(value !== '' && valid === false){
            updatedValidationMessages.phoneNumber = 'Wrong phone Number';
        }
        const emailcheck = await fetchIfEmailExists(email)
        if(Object.keys(updatedValidationMessages).length === 0){
            // console.log('hello')
            console.log('can edit:',canEdit)
            console.log('fetching res:',emailcheck)
            if(emailcheck === false && canEdit === false){
                if(canEdit === false){
                    addCustomer(inp1,email,value,countryCode,city,state,ad1,ad2,postalCode)
                    setLastEmail(email)
                    setCanEdit(true)
                }
                
                
            }
            else if(canEdit===true){
                editCustomer(inp1,email,value,countryCode,city,state,ad1,ad2,postalCode)
                // console.warn('hiiiiiiiiiiiiiiii')
                // return
            }
            setCurrentStep(currentStep+1)
            console.log('hi')
        }
        
        setValidationMessages(updatedValidationMessages)
    }
    else if(currentStep === 1){
        const action = await onSubmit()

        if(action !== false){
            setTimeout(()=>{
                setCurrentStep(currentStep + 1)
            },2000)
            
        }
    }
 }

 const [content,setContent] = useState([])
 useEffect(()=>{
    
 },[])
 //----------------------- step 2 functionalities ------------------------------//
 const [CardInput, setCardInput] = React.useState({})
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
      return false
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
      console.log('url',payment_data.receipt_url)
      console.log('payment_data', payment_data);
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
    let orderNb = 0;
      try{
        const response = await fetch('http://192.168.0.107:8000/api/countOrders',{
          method:"GET"
        })
        const resData = await response.json()
        console.log(resData)
        orderNb=resData.nborders.id + 1
      }
      catch(err){
        console.log(err)
      }
    
    const card = {
        'amount': percent !== 0 ? (total*100 - (percent/100)*total*100) : total * 100, 
        'currency': CURRENCY,
        'source': CARD_TOKEN,
        'description': orderNb,
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
    console.log(data)
    setCardInput(data)
  }
  const [custId,setCustId] = useState("")
  //----------------------------------------------------------//
  const ThirdStep = ({arr}) => {
    console.log('arr',arr)
    return(
        <>
        <Text style={{fontSize:22,fontWeight:"600"}}>Order Summary</Text>
        <View style={{gap:3}}>
            {
                arr.map((elt,idx)=>{
                    return (
                        <View key={idx.toString()} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text>{idx+1}){elt.title}</Text>
                            <Text>${elt.price}.00</Text>
                        </View>
                    )
                    
                })
            }
            <View style={{height:1,backgroundColor:'#000',marginVertical:5}} />
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                <Text style={{fontWeight:"600"}}>Total</Text>
                <Text style={{fontWeight:"600"}}>${total}.00</Text>
            </View>
            {
                promocodeValidity === true ?<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                <Text>Discount({percent}%)</Text>
                <Text>-${(total*percent)/100}</Text>
            </View> : null
            }
            {
                promocodeValidity === true ? <><View style={{height:1,backgroundColor:'#000',marginVertical:5}} />
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                    <Text style={{fontWeight:"600"}}>Total After Discount</Text>
                    <Text style={{fontWeight:"600"}}>${total-((total*percent)/100)}</Text>
                </View></> : null
            }
            
            <TouchableOpacity onPress={sharePdf} style={{backgroundColor:"#ccc",alignSelf:"flex-end",justifyContent:'center',alignItems:'center',padding:10,borderRadius:5,marginTop:15}}>
                <Text style={{fontSize:16,fontWeight:"600"}}>Print/Share Receipt</Text>
            </TouchableOpacity>
        </View>
        </>
    )
  }
  const handleGoBackBtn = () => {

  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.fixedView}>
        <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        stepCount={3}
        renderStepIndicator={renderStepIndicator}
        style={{ width: '100%' }}
        labels={stepLabels2}
            />
        </View>
      <ScrollView contentContainerStyle={{marginTop:90,padding:15,gap:15}}>
        
      {
  currentStep === 0 ? <FirstStep 
            inp1={inp1} onInputChange1={handleInputChange1} 
            email={email} handleEmailChange={handleEmailChange} 
            //phone
            value={value} handleValueChange={handleValueChange} phoneRef={phoneRef} formattedValue={formattedValue} handleFormattedValue={handleFormattedValue} countryCode={countryCode} handleCountryCode={handleCountryCode}
            country={country} handleCountry={handleCountry}
            city={city} handleCity={handleCity}
            state={state} handleState={handleState}
            ad1={ad1} handlead1={handlead1}
            ad2={ad2} handlead2={handlead2}
            postalCode={postalCode} handlePostalCode={handlePostalCode}
            inp1Validation={validationMessages.name}
            emailValidation={validationMessages.email}
            phoneNbValidation={validationMessages.phoneNumber}
            valid={valid} handleisValid={handleisValid}

            />  : currentStep === 1 ? <PageTwo mail={inp1} charges={charges} onSubmit={onSubmit} _onChange={_onChange} custId={custId} promocode={promocode} handlePromoCode={handlePromoCode} inp1={inp1} email={email} country={country} countryCode={countryCode} ad1={ad1} ad2={ad2} postalCode={postalCode} city={city} state={state} promocodeValidity={promocodeValidity} handlePromoCodeValidity={handlePromoCodeValidity} value={value} percent={percent} handlePercent={handlePercent} />: currentStep === 2 ? <ThirdStep arr={cartitems} />
    
    : null}
        {/* <StepToRender /> */}
        
            {/* <FirstStep 
            inp1={inp1} onInputChange1={handleInputChange1} 
            email={email} handleEmailChange={handleEmailChange} 
            //phone
            value={value} handleValueChange={handleValueChange} phoneRef={phoneRef} formattedValue={formattedValue} handleFormattedValue={handleFormattedValue} countryCode={countryCode} handleCountryCode={handleCountryCode}
            country={country} handleCountry={handleCountry}
            city={city} handleCity={handleCity}
            state={state} handleState={handleState}
            ad1={ad1} handlead1={handlead1}
            ad2={ad2} handlead2={handlead2}
            postalCode={postalCode} handlePostalCode={handlePostalCode}
            />  */}
        
        
        {/* <TestPageCheckout /> */}
        {/* <Text>{email}</Text> */}
      </ScrollView>
      {
        currentStep <= 1 ? <View style={{flexDirection:'row',justifyContent:'space-around',margin:15}}>
        <TouchableOpacity onPress={()=>currentStep !== 0 ? setCurrentStep((curr)=>curr - 1) : navigation.goBack()} style={{width:"45%",justifyContent:'center',alignItems:'center',padding:20,backgroundColor: "#0094cf"}}>
            <Text style={{color:"#f5f5f5",fontSize:16,fontWeight:"600"}}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextBtn} activeOpacity={1} style={{width:"45%",justifyContent:'center',alignItems:'center',padding:20,backgroundColor:"#0094cf"}}>
            <Text style={{color:"#f5f5f5",fontSize:16,fontWeight:"600"}}>{currentStep === 1 ? `Pay then Review` : `Next`}</Text>
        </TouchableOpacity>
      </View> : <TouchableOpacity onPress={()=>navigation.replace("BottomTab",{screen:"ShoppingCart"})} style={{backgroundColor:"#0094CF",alignSelf:"center",justifyContent:'center',alignItems:'center',width:"90%",margin:15,padding:20}}><Text style={{color:"#f5f5f5",fontSize:18,fontWeight:"600"}}>Finish</Text></TouchableOpacity>
      }
      
    </SafeAreaView>
  );
};

const customStyles = {
  // Your custom styles as before
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  stepText: {
    color: '#000', // Customize the text color
    fontSize: 12,   // Customize the text size
  },
  fixedView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop:40,
    backgroundColor: 'white', // Set your desired background color
    zIndex: 1,
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#ccc'
  },
  name:{
    borderWidth:1,
    borderColor:"#131313",
    borderRadius:8,
    padding:15,
  },
  email:{
    borderWidth:1,
    borderColor:"#131313",
    borderRadius:8,
    padding:15,
    // width:"48%"
  },
  inputContainerStyle : {
    backgroundColor:'#fff',
    borderRadius:5,
  },
  inputStyle : {
    backgroundColor:'#f5f5f5',
    paddingLeft:15,
    borderRadius:5,
    color:'#000',
    // borderWidth:1,
    borderColor:"#131313"
  },
  labelStyle : {
    marginBottom:5,
    fontSize:12
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
});

export default StepIndicatorComponent;
