import { View, Text, ImageBackground, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';

const Screen3 = ({backgroundImage}) => {
  const openBrowser = async () => {
    // Replace 'https://example.com' with your desired link
    await WebBrowser.openBrowserAsync('https://quran.com');
  };
  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View>
      <TouchableOpacity style={styles.button} onPress={openBrowser}>
          <Text style={styles.buttonText}>Open Browser</Text>
        </TouchableOpacity>
  
      </View>
      </ImageBackground>
  )
}

const styles =StyleSheet.create({
  container:{
    flex: 1
  },
  button:{
    position: 'absolute',
    top: 100,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5
  }
})

export default Screen3