import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen2 = ({ backgroundImage }) => {
  const defaultPrayers = {
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  };

  const [prayers, setPrayers] = useState(defaultPrayers);

  useEffect(() => {
    const getStoredPrayers = async () => {
      try {
        const storedPrayers = await AsyncStorage.getItem('@prayers');
        if (storedPrayers) {
          setPrayers(JSON.parse(storedPrayers));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getStoredPrayers();
  }, []);

  useEffect(() => {
    const storePrayers = async () => {
      try {
        const jsonPrayers = JSON.stringify(prayers);
        await AsyncStorage.setItem('@prayers', jsonPrayers);
      } catch (e) {
        console.log(e);
      }
    };
    storePrayers();
  }, [prayers]);

  const setPrayer = (name, value) => {
    setPrayers(prevPrayers => ({ ...prevPrayers, [name]: value }));
  };
  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.tracker}>

        <View style={styles.prayerTracker}>
        <Text>Fajr</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['Fajr'] ? styles.filled : styles.empty]}
          onPress={() => setPrayer('Fajr', !prayers['Fajr'])}
        />
        </View>

        <View style={styles.prayerTracker}>
        <Text>Dhuhr</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['Dhuhr'] ? styles.filled : styles.empty]}
          onPress={() => setPrayer('Dhuhr', !prayers['Dhuhr'])}
        />
        </View>

        <View style={styles.prayerTracker}>
        <Text>Asr</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['Asr'] ? styles.filled : styles.empty]}
          onPress={() => setPrayer('Asr', !prayers['Asr'])}
        />
        </View>

        <View style={styles.prayerTracker}>
        <Text>Maghrib</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['Maghrib'] ? styles.filled : styles.empty]}
          onPress={() => setPrayer('Maghrib', !prayers['Maghrib'])}
        />
        </View>

        <View style={styles.prayerTracker}>
        <Text>Isha</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['Isha'] ? styles.filled : styles.empty]}
          onPress={() => setPrayer('Isha', !prayers['Isha'])}
        />
        </View>
       
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tracker:{
    position: 'relative',
    top: '40%'
  },
  prayerTracker:{
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row-reverse',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15, 
    borderColor: 'rgb(133, 66, 54)',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  filled: {
    backgroundColor: '#000',
    borderWidth: 5
  },
  empty: {
    backgroundColor: '#fff',
  },
});

export default Screen2;
