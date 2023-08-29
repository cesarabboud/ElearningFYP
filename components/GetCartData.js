import AsyncStorage from "@react-native-async-storage/async-storage"
export default getCartItemsnbr = async () =>{
    const token= await AsyncStorage.getItem('token')
    if(token!==null){
      try{
        const response = await fetch('http://192.168.0.101:8000/api/getCartItemsNbr',{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const resData = await response.json()
        return resData.nbr
      }
      catch(e){
        console.log(e)
      }
    }
  }