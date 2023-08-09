import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, Button,StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const Browser = () => {
  const [link, setLink] = useState('');
  const [result, setResult] = useState(null);

  const handlePressButtonAsync = async () => {
    const modifiedLink = `http://${link}`;
    let result = await WebBrowser.openBrowserAsync(modifiedLink);
    setResult(result);
  };
  
  const handleChangeText = (text) => {
    // Automatically add "http://" to the input value
    setLink(text)
  };

  return (
    <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
      <TextInput
        style={styles.input}
        placeholder="Enter the link"
        value={link}
        onChangeText={handleChangeText}
      />
      <Button title="Open Web Browser" onPress={handlePressButtonAsync} />
      {result && (
        <Text>{`Web Browser result: ${JSON.stringify(result)}`}</Text>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 1
  },
};

export default Browser;
