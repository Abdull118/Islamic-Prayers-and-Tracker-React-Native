import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Screen2 = ({ backgroundImage, prayerColor, textColor, currentHijriDay, currentHijriMonth, currentHijriYear, currentDate, fajrAthan, dhurAthan, asrAthan, maghribAthan, ishaAthan, }) => {
  const defaultPrayers = {
    Fajr: false,
    FajrSunnah: false,
    FajrAdhkar: false,
    MorningAdhkar: false,
    Dhuhr: false,
    DhuhrSunnah: false,
    DhuhrAdhkar: false,
    Asr: false,
    AsrSunnah: false,
    AsrAdhkar: false,
    EveningAdhkar: false,
    Maghrib: false,
    MaghribSunnah: false,
    MaghribAdhkar: false,
    Isha: false,
    IshaSunnah: false,
    IshaAdhkar: false,
    Witr: false,
  };

  const [prayers, setPrayers] = useState(defaultPrayers);
  const [date, setDate] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getDateAndPrayers = async () => {
      try {
        const currentDate = new Date().toISOString().split('T')[0];
        // // console.log('Current date:', currentDate);
        const storedDate = await AsyncStorage.getItem('@date');
        // // console.log('Stored date:', storedDate);
        if (storedDate !== currentDate) {
          // // console.log('Dates do not match. Updating date and resetting prayers.');
          setDate(currentDate);
          setPrayers(defaultPrayers);
          const storedHistory = JSON.parse(await AsyncStorage.getItem('@history')) || [];
          setHistory([defaultPrayers, ...storedHistory].slice(0, 7));
          // // console.log('New Date: Resetting Prayers and Storing History.');
        } else {
          // // console.log('Dates match. Retrieving prayers from AsyncStorage.');
          const storedPrayers = JSON.parse(await AsyncStorage.getItem('@prayers')) || defaultPrayers;
          setPrayers(storedPrayers);
          setDate(storedDate);
        }
      } catch (e) {
        // console.log(e);
      }
    };
    getDateAndPrayers();
  }, []);
  
  

  useEffect(() => {
    if (date) {
      const storeData = async () => {
        try {
          // // console.log('Storing Prayers to AsyncStorage: ', prayers);
          // // console.log('Storing Date to AsyncStorage: ', date);
          // // console.log('Storing History to AsyncStorage: ', history);
          await AsyncStorage.setItem('@prayers', JSON.stringify(prayers));
          // // console.log('Stored Prayers to AsyncStorage.');
          await AsyncStorage.setItem('@date', date);
          // // console.log('Stored Date to AsyncStorage.');
          await AsyncStorage.setItem('@history', JSON.stringify(history));
          // console.log('Stored History to AsyncStorage.');
        } catch (e) {
          // console.log(e);
        }
      };
      storeData();
    }
  }, [prayers, date]);
  
  const setPrayer = (prayer, value) => {
    // // console.log('Setting prayer: ', prayer, ' to ', value);
    setPrayers(prevPrayers => {
      const updatedPrayers = { ...prevPrayers, [prayer]: value };
      // // console.log('Updated prayers state: ', updatedPrayers);
      return updatedPrayers;
    });
    // update the history every time a prayer is updated

    setHistory(prevHistory => {
      const currentDateIndex = prevHistory.findIndex(record => record.date === date);

      // If the date is already in the history, replace that record.
      if (currentDateIndex > -1) {
        const newHistory = [...prevHistory];
        newHistory[currentDateIndex] = {date, prayers};
        return newHistory;
      } else {
        // If the date is not in the history, add it.
        return [{date, prayers}, ...prevHistory].slice(0, 7);
      }
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedHistory = JSON.parse(await AsyncStorage.getItem('@history')) || [];
        // console.log('Prayer History: ', storedHistory);
      } catch (e) {
        // console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={[styles.today, {borderColor: prayerColor}, {color: prayerColor}, {backgroundColor: textColor}]}>
      <Text style={[styles.currentDate, {color: prayerColor}]}>
        {moment().format('dddd MMMM D YYYY')}
        </Text>
      <Text style={[styles.currentDate, {color: prayerColor}]}>
      {currentHijriMonth} {currentHijriDay} {currentHijriYear}
        </Text>
      </View>
      
      <ScrollView style={[styles.tracker, {borderColor: prayerColor}, {backgroundColor: textColor}]}>

{/* FAJR */}

      <View style={styles.prayerTracker}>

        <View style={styles.prayerNameAndTime}>
        
          <Text style={[styles.prayerName, styles.fardh, {color: prayerColor}]}>Fajr</Text>
          
          <Text style={[styles.prayerTime, {color: prayerColor}]}>{fajrAthan}</Text>
        </View>

        <TouchableOpacity
          style={[styles.circle, prayers['Fajr'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('Fajr', !prayers['Fajr'])}
        />
        </View>

          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Fajr Sunnah</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['FajrSunnah'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('FajrSunnah', !prayers['FajrSunnah'])}
          />
          </View>

          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Fajr Adhkar</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['FajrAdhkar'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('FajrAdhkar', !prayers['FajrAdhkar'])}
          />
          </View>

        <View style={styles.prayerTracker}>
        <Text style={[styles.prayerName, styles.fardh, {color: prayerColor}]}>Morning Adhkar</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['MorningAdhkar'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('MorningAdhkar', !prayers['MorningAdhkar'])}
        />
        </View>

{/* DHUHR */}

        <View style={styles.prayerTracker}>

        <View style={styles.prayerNameAndTime}>

        <Text style={[styles.prayerName, styles.fardh, {color: prayerColor}]}>Dhuhr</Text>

        <Text style={[styles.prayerTime, {color: prayerColor}]}>{dhurAthan}</Text>
        </View>
        <TouchableOpacity
          style={[styles.circle, prayers['Dhuhr'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('Dhuhr', !prayers['Dhuhr'])}
        />
        </View>
          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Dhuhr Sunnah</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['DhuhrSunnah'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('DhuhrSunnah', !prayers['DhuhrSunnah'])}
          />
          </View>
          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Dhuhr Adhkar</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['DhuhrAdhkar'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('DhuhrAdhkar', !prayers['DhuhrAdhkar'])}
          />
          </View>

{/* ASR */}

        <View style={styles.prayerTracker}>

        <View style={styles.prayerNameAndTime}>
        <Text style={[styles.prayerName, styles.fardh, {color: prayerColor}]}>Asr</Text>

        <Text style={[styles.prayerTime, {color: prayerColor}]}>{asrAthan}</Text>
        </View>
        <TouchableOpacity
          style={[styles.circle, prayers['Asr'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('Asr', !prayers['Asr'])}
        />
        </View>

          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Asr Sunnah</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['Asr'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('Asr', !prayers['Asr'])}
          />
          </View>

          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Asr Adhkar</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['AsrAdhkar'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('AsrAdhkar', !prayers['AsrAdhkar'])}
          />
        </View>


        <View style={styles.prayerTracker}>
        <Text style={[styles.prayerName, styles.fardh, {color: prayerColor}]}>Evening Adhkar</Text>

        <TouchableOpacity
          style={[styles.circle, prayers['EveningAdhkar'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('EveningAdhkar', !prayers['EveningAdhkar'])}
        />
        </View>

{/* MAGHRIB */}
        <View style={styles.prayerTracker}>

        <View style={styles.prayerNameAndTime}>
        <Text style={[styles.prayerName, styles.fardh, {color: prayerColor}]}>Maghrib</Text>
        <Text style={[styles.prayerTime, {color: prayerColor}]}>{maghribAthan}</Text>
        </View>

        <TouchableOpacity
          style={[styles.circle, prayers['Maghrib'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('Maghrib', !prayers['Maghrib'])}
        />
        </View>


          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Maghrib Sunnah</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['MaghribSunnah'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('MaghribSunnah', !prayers['MaghribSunnah'])}
          />
          </View>

          <View style={[styles.prayerTracker, styles.sunnah]}>
          <Text style={[styles.prayerName, {color: prayerColor}]}>Maghrib Adhkar</Text>
          <TouchableOpacity
            style={[styles.circle, prayers['MaghribAdhkar'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
            onPress={() => setPrayer('MaghribAdhkar', !prayers['MaghribAdhkar'])}
          />
          </View>

{/* ISHA */}

        <View style={styles.prayerTracker}>

        <View style={styles.prayerNameAndTime}>
        <Text style={[styles.prayerName, styles.fardh, {color: prayerColor}]}>Isha</Text>

        <Text style={[styles.prayerTime, {color: prayerColor}]}>{ishaAthan}</Text>
        </View>

        <TouchableOpacity
          style={[styles.circle, prayers['Isha'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('Isha', !prayers['Isha'])}
        />
        </View>
        <View style={[styles.prayerTracker, styles.sunnah]}>
        <Text style={[styles.prayerName, {color: prayerColor}]}>Isha Sunnah</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['IshaSunnah'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('IshaSunnah', !prayers['IshaSunnah'])}
        />
        </View>
        <View style={[styles.prayerTracker, styles.sunnah]}>
        <Text style={[styles.prayerName, {color: prayerColor}]}>Isha Adhkar</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['IshaAdhkar'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('IshaAdhkar', !prayers['IshaAdhkar'])}
        />
        </View>
        
        <View style={[styles.prayerTracker, styles.sunnah]}>
        <Text style={[styles.prayerName, {color: prayerColor}]}>Witr</Text>
        <TouchableOpacity
          style={[styles.circle, prayers['Witr'] ? styles.filled : styles.empty, {borderColor: prayerColor}]}
          onPress={() => setPrayer('Witr', !prayers['Witr'])}
        />
        </View>
       
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Add this line
    alignItems: 'center', // Add this line
  },
  tracker:{
    width: '80%', // increase the width so it's not too narrow
    padding: 20, // add padding for better appearance
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2
  },
  prayerNameAndTime:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  prayerTime:{
    marginRight: 30,
    fontSize: 16
  },
  prayerName:{
    fontSize: 25,
    marginLeft: 20,
  },
  prayerTracker:{
    flexDirection: 'row-reverse',
    justifyContent:'flex-end', // change to 'space-between' for better appearance
    marginBottom: 15, // add some bottom margin for better appearance
  },
  fardh:{
    fontWeight: 700,
  },
  sunnah: {
    marginRight: 45,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  filled: {
    backgroundColor: '#000',
    borderWidth: 5
  },
  empty: {
    backgroundColor: '#fff',
  },
  today:{
    padding: 5,
    marginTop: 70,
    borderWidth: 2,
    borderRadius: 5,
   
  },
  currentDate:{
    fontSize: 20,
    textAlign: 'center'
  }
});

export default Screen2;
