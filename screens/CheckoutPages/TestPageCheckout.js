import { StyleSheet, Text, View,TextInput,SafeAreaView } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import PhoneInput from 'react-native-phone-number-input'
const FirstStep = () => {
    const [fn,setFn] = useState("")
    const [email,setEmail] = useState("")
    const[phoneNb,setPhoneNb] = useState("")
    const [country,setCountry] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [ad1,setad1] = useState("")
    const [ad2,setad2] = useState("")
    const [value, setValue] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [formattedValue, setFormattedValue] = useState('');
    const [valid, setValid] = useState(false);
    const [disabled,setDisabled] = useState(false)
    const [postalCode,setpostalCode] = useState("")
    const phoneInput = useRef(null);
    return(
        <>
        <Text style={{fontSize:24,fontWeight:"600"}}>Personal Information</Text>
        
        <View style={{gap:20}}>
            <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                <TextInput 
                placeholder='Name'
                style={styles.name}
                value={fn}
                onChangeText={(text)=>setFn(text)}
                />
                <TextInput 
                placeholder='Email Address'
                style={styles.email}
                value={email}
                onChangeText={(text)=>setEmail(text)}
                />
            </View>
            <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="LB"
            layout="first"
            textContainerStyle={{borderTopRightRadius:8,borderBottomRightRadius:8}}
            containerStyle={{borderRadius:8,borderWidth:1,width:"100%"}}
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            countryPickerProps={{withAlphaFilter:true}}
            disabled={disabled}
            
            // disableArrowIcon
            // withShadow
            // autoFocus
          />
          {/* <Text>{formattedValue}</Text> */}
          {/* <Text>{email}</Text> */}
          <TextInput 
            placeholder='Country'
            style={{borderRadius:8,width:"100%",borderWidth:1,padding:15}}
            value={country}
            onChangeText={(text)=>setCountry(text)}
            />
            {/* <Text>{country}</Text> */}
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            
            <TextInput 
            placeholder='City'
            style={styles.email}
            value={city}
            onChangeText={(text)=>setCity(text)}
            />
            {/* <Text>{city}</Text> */}
            <TextInput 
            placeholder='State'
            style={styles.name}
            value={state}
            onChangeText={(text)=>setState(text)}
            />
            {/* <Text>{state}</Text> */}
          </View>
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            <TextInput 
            placeholder='Address Line 1'
            style={styles.name}
            value={ad1}
            onChangeText={(text)=>setad1(text)}
            />
            <Text>{ad1}</Text>
            <TextInput 
            placeholder='Address Line 2'
            style={styles.email}
            value={ad2}
            onChangeText={(text)=>setad2(text)}
            />
          </View>
          <TextInput 
            placeholder='Postal Code'
            style={{borderRadius:8,width:"100%",borderWidth:1,padding:15}}
            onChangeText={(text)=>setpostalCode(text)}
            />
          <Text>{postalCode}</Text>
        </View>
        </>
    )
  }

export default FirstStep;

const styles = StyleSheet.create({
    name:{
        borderWidth:1,
        borderColor:"#131313",
        borderRadius:8,
        padding:15,
        width:"48%"
      },
      email:{
        borderWidth:1,
        borderColor:"#131313",
        borderRadius:8,
        padding:15,
        width:"48%"
      },
})