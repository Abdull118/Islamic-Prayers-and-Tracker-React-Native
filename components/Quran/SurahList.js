import { View, Text, FlatList, ImageBackground, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'


const SurahList = ({backgroundImage, navigation}) => {

  const [quranBySurah, setQuranBySurah] = useState()

  const getQuranBySurah = async () => {
    try {
     const response = await fetch(`http://api.alquran.cloud/v1/meta`);
     const json = await response.json();
     setQuranBySurah(json.data.surahs.references);
   } catch (error) {
     // console.log(error)
   }
 }

 useEffect(()=>{
  getQuranBySurah()
 })

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View>
      <FlatList
        data={quranBySurah}
        keyExtractor={item => item.number}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SurahScreen', { surahNumber: item.number })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
  
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

export default SurahList