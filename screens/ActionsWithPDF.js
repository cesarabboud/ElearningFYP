import { downloadFile } from 'expo-filedownload'
import {Button,ActivityIndicator,SafeAreaView} from 'react-native'
import  {useState} from 'react'
import { StatusBar } from 'react-native'
export default function App() {

    const [isLoading, setIsLoading] = useState(false)

    const JPG_URL = { url: "https://eloquentjavascript.net/Eloquent_JavaScript_small.pdf" }

    const handleDownload = () => {
        setIsLoading(true)
        downloadFile(JPG_URL.url)
            .then(() => setIsLoading(false))
    }

    

    return (
        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
             {isLoading ? <ActivityIndicator /> : <Button title='Download/Print' onPress={handleDownload} />}   
            </SafeAreaView>
        
    )
}