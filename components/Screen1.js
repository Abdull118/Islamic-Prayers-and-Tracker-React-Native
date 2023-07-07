import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState,  } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import PrayerCountdown from './PrayerCountDown';
import moment from 'moment/moment';
import * as WebBrowser from 'expo-web-browser';

const window = Dimensions.get('window');
const windowHeight = window.height;
const windowWidth = window.width;

const Screen1 = ({backgroundImage, linearGradient, textColor, countDownColor, prayerColor}) => {
  const topPosition = windowHeight <= 700 ? '40%' : windowWidth > 650 ? '25%' : '55%';

  const [fajrAthan ,setFajrAthan] = useState()
  const [dhurAthan, setDhurAthan] = useState()
  const [asrAthan, setAsrAthan] = useState()
  const [maghribAthan, setMaghribAthan] = useState()
  const [ishaAthan, setIshaAthan] = useState()
  const [shuruq, setShuruq] = useState()

  const [fajrPrayer ,setFajrPrayer] = useState()
  const [dhurPrayer, setDhurPrayer] = useState()
  const [asrPrayer, setAsrPrayer] = useState()
  const [maghribPrayer, setMaghribPrayer] = useState()
  const [ishaPrayer, setIshaPrayer] = useState()

  const [currentHijriDay, setCurrentHijriDay] = useState()
  const [currentHijriMonth, setCurrentHijriMonth] = useState()
  const [currentHijriYear, setCurrentHijriYear] = useState()
  const [currentDate, setCurrentDate] = useState()


  const getDate = () => {
    var today = new Date(),
    date = (today.getMonth() + 1)  + '-' + today.getDate() + '-' + today.getFullYear();
    setCurrentDate(date)
  };
  
  const getHijriDate = async () => {
    try {
     const response = await fetch(`https://api.aladhan.com/v1/gToH?=${currentDate}`);
     const json = await response.json();
     setCurrentHijriDay(json.data.hijri.day)
     setCurrentHijriMonth(json.data.hijri.month.ar)
     setCurrentHijriYear(json.data.hijri.year)
   } catch (error) {
     // console.log(error)
   }
 }

  const getAthan = async () => {
    try {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Guelph&country=Canada&method=2`);
    const json = await response.json();
    setFajrAthan(convertTo12Hour(json.data.timings.Fajr))
    setDhurAthan(convertTo12Hour(json.data.timings.Dhuhr))
    setAsrAthan(convertTo12Hour(json.data.timings.Asr))
    setMaghribAthan(convertTo12Hour(json.data.timings.Maghrib))
    setIshaAthan(convertTo12Hour(json.data.timings.Isha))
    convertTo12Hour2(json.data.timings.Sunrise)
  } catch (error) {
    // console.log(error);
  }
}

  const getPrayerTimes = async () =>{
    try{
      const response = await fetch(`https://sparkling-jade-cowboy-boots.cyclic.app/prayers`);
      const json = await response.json()
      setFajrPrayer(json.fajr)
      setDhurPrayer(json.dhuhr)
      setAsrPrayer(json.asr)
      setMaghribPrayer(json.maghrib)
      setIshaPrayer(json.isha)
      // console.log(json)
    }catch(e){
      // console.log(e)
    }
  }

  function convertTo12Hour(oldFormatTime) {
    // console.log("oldFormatTime: " + oldFormatTime);
    var oldFormatTimeArray = oldFormatTime.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if (HH === 0) {
      hours = "00";
    } else if (HH < 10 && HH > 0) {
      hours = "0" + HH;
    } else if (HH >= 12 && HH < 22) {
      hours = "0" + (HH - 12);
    } else if (HH >= 22) {
      hours = HH - 12;
    } else {
      hours = HH;
    }

    var newFormatTime = hours + ":" + min + " " + AMPM;
    return newFormatTime;
  }

  function convertTo12Hour2(oldFormatTime) {
    
    var oldFormatTimeArray = oldFormatTime.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if(HH == 0){
      hours = HH + 12;
    } else if (HH > 12) {
      hours = HH - 12;
    } else {
      hours = HH;
    }
    var newFormatTime = hours + ":" + min + " " + AMPM;
    setShuruq(newFormatTime)
  }
  const openBrowser = async () => {
    // Replace 'https://example.com' with your desired link
    await WebBrowser.openBrowserAsync('https://quran.com');
  };

  const quranLogo = require('../assets/quran.png');

  useEffect(() => {
    getDate()
    getHijriDate()
    getAthan()
    getPrayerTimes()

    setInterval(()=>{
      getPrayerTimes()
    }, 3600000) 
}, []);

  return (
    <ImageBackground
      source={backgroundImage} 
      style={styles.container}
    >

      <LinearGradient colors={linearGradient} style={styles.date}>
        <Text style={[styles.currentDate, {color: textColor}]}>{moment().format('dddd MMMM D YYYY')}</Text>
        <Text style={[styles.currentDate, {color: textColor}]}>{currentHijriMonth} {currentHijriDay} {currentHijriYear}</Text>
      </LinearGradient>

    <View style={styles.background}>

    <PrayerCountdown 
    fajrAthan={fajrAthan}
    dhurAthan={dhurAthan}
    asrAthan={asrAthan}
    maghribAthan={maghribAthan}
    ishaAthan={ishaAthan}
    countDownColor={countDownColor}
    prayerColor={prayerColor}
    />
    <LinearGradient colors={linearGradient} style={[styles.roundedLinearGradient, { top: topPosition }]}>
    <View style={{display: 'flex', flexDirection: 'row'}}>
        <View>
          <Text style= {[styles.athan, {color: textColor}]}>الفجر</Text>
          <Text style= {[styles.athan2, {color: textColor}]}>{fajrAthan}</Text>
        </View>
      </View>

      <View  style={{display: 'flex', flexDirection: 'row'}}>
        <View>
              <Text style= {[styles.athanDhuhr, {color: textColor}]}>الظهر</Text>
              <Text style= {[styles.athanDhuhr, {color: textColor}]}>{dhurAthan}</Text>
        </View>
      </View>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View>
          <Text style= {[styles.athanAsr, {color: textColor}]}>العصر</Text>
            <Text style= {[styles.athanAsr, {color: textColor}]}>{asrAthan}</Text>
          </View>
      </View>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View>
          <Text style= {[styles.athanMaghrib, {color: textColor}]}>المغرب</Text>
            <Text style= {[styles.athanMaghrib, {color: textColor}]}>{maghribAthan}</Text>
        </View>
      </View>

      <View style={{display: 'flex', flexDirection: 'row'}}>
          <View>
            <Text style= {[styles.athan, {color: textColor}]}>العشاء</Text>
            <Text style= {[styles.athan2, {color: textColor}]}>{ishaAthan}</Text>
          </View>
      </View>
    </LinearGradient>

    </View>
</ImageBackground>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  date:{
    position: 'absolute',
    top: 70,
    padding:5, 
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    right: 0,
    paddingLeft: 20,
    paddingTop: 8,
    marginBottom: 20,
  },
  currentDate: {
    opacity: 1,
    fontSize: 18
  },
  background:{
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row-reverse'
  },  
  athan: {
  fontWeight: 500,
  textAlign: 'center',
  fontSize: 25
  },
  athan2: {
    fontWeight: 500,
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 5
  },
  athanDhuhr: {
    fontWeight: 500,
    textAlign: 'center',
    fontSize: 22,
    marginRight: -55,
    marginBottom: 5
  },
  athanAsr: {
    fontWeight: 500,
    textAlign: 'center',
    fontSize: 22,
    marginRight: -66,
    marginBottom: 5
  },
  athanMaghrib: {
    fontWeight: 500,
    textAlign: 'center',
    fontSize: 22,
    marginRight: -48
  },

  roundedLinearGradient: {
    zIndex:2, 
    opacity:1, 
    display: 'flex',
    width: 200,
    height: 400,
    alignItems:'flex-end',
    justifyContent: 'center',
    position: 'relative',
    top: '40%',
    left: 0,
    borderTopRightRadius: 250,
    borderBottomRightRadius: 250,
    paddingRight: 70
  },
  button:{
    position: 'absolute',
    bottom: -200,
    left: 55,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  quranLogo:{
    width: 100,
    height: 100
  }
});


export default Screen1