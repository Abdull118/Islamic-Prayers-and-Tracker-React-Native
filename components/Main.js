import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NavBar from './NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -105,
    backgroundColor: 'rgb(7, 20, 39)'
  },
});


export default Main