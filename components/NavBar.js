import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  const [isMaghrib, setIsMaghrib] = useState(false);
  const [fajrAthan ,setFajrAthan] = useState()
  const [dhurAthan, setDhurAthan] = useState()
  const [asrAthan, setAsrAthan] = useState()
  const [maghribAthan, setMaghribAthan] = useState()
  const [ishaAthan, setIshaAthan] = useState()

  const [currentHijriDay, setCurrentHijriDay] = useState()
  const [currentHijriMonth, setCurrentHijriMonth] = useState()
  const [currentHijriYear, setCurrentHijriYear] = useState()
  const [currentDate, setCurrentDate] = useState()
  const getAthan = async () => {
      try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Guelph&country=Canada&method=2`);
      const json = await response.json();
      setFajrAthan(convertTo12Hour(json.data.timings.Fajr))
      setDhurAthan(convertTo12Hour(json.data.timings.Dhuhr))
      setAsrAthan(convertTo12Hour(json.data.timings.Asr))
      setMaghribAthan(convertTo12Hour(json.data.timings.Maghrib))
      setIshaAthan(convertTo12Hour(json.data.timings.Isha))
    } catch (error) {
      // console.log(error);
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

  useEffect(() => {
    getAthan()
    getDate()
    getHijriDate()
}, []);


useEffect(() => {
  const interval = setInterval(() => {
    const currentDateTime = new Date();
    const currentTime = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
    
    const [hourMinuteMaghrib, periodMaghrib] = maghribAthan.split(' ');
    const [hourMaghrib, minuteMaghrib] = hourMinuteMaghrib.split(':').map(Number);
    const maghribTime = (hourMaghrib % 12 + 12 * (periodMaghrib.toUpperCase() === 'PM' ? 1 : 0)) * 60 + minuteMaghrib;

    const [hourMinuteFajr, periodFajr] = fajrAthan.split(' ');
    const [hourFajr, minuteFajr] = hourMinuteFajr.split(':').map(Number);
    const fajrTime = (hourFajr % 12 + 12 * (periodFajr.toUpperCase() === 'PM' ? 1 : 0)) * 60 + minuteFajr;

    if (currentTime >= maghribTime) {
      setIsMaghrib(true);
    } else {
      setIsMaghrib(false);
    }
  }, 1000);
  
    return () => clearInterval(interval);
  }, [maghribAthan, fajrAthan]);

  const backgroundImage = isMaghrib
    ? require('../assets/islamicGraphic.jpg')
    : require('../assets/islamicGraphicDay.webp');


  const linearGradient = isMaghrib
  ? ['rgb(226, 214, 165)', 'rgb(157, 117, 32)']
  : ['rgb(177, 115, 97)', 'rgb(133, 66, 54)']

  const textColor = isMaghrib
  ? 'rgb(19, 43, 76)'
  : 'rgb(193, 157, 119)'

  const countDownColor = isMaghrib
  ? 'white'
  : 'rgb(193, 157, 119)'

  const prayerColor = isMaghrib
  ? 'rgb(226, 214, 165)'
  : 'rgb(133, 66, 54)'

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Screen1') {
          iconName = 'ios-home';
        } else if (route.name === 'Screen2') {
          iconName = 'ios-list';
        } else if (route.name === 'Screen3') {
          iconName = 'ios-star';
        } else if (route.name === 'Screen4') {
          iconName = 'ios-settings';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarStyle: styles.tabBar,
    tabStyle: styles.tab,
    })
}
    
  >
        <Tab.Screen name="Screen1" options={{ title: '' }}
          children={() => <Screen1 
            backgroundImage={backgroundImage} 
            linearGradient={linearGradient} 
            textColor={textColor} 
            countDownColor={countDownColor} 
            prayerColor={prayerColor} 
          />} 
        />
        <Tab.Screen name="Screen2" options={{ title: '' }}
        children={() => <Screen2
          backgroundImage={backgroundImage} 
          linearGradient={linearGradient} 
          textColor={textColor} 
          countDownColor={countDownColor} 
          prayerColor={prayerColor} 
          currentHijriDay={currentHijriDay}
          currentHijriMonth={currentHijriMonth}
          currentHijriYear={currentHijriYear}
          currentDate={currentDate}
          fajrAthan={fajrAthan}
          dhurAthan={dhurAthan}
          asrAthan={asrAthan}
          maghribAthan={maghribAthan}
          ishaAthan={ishaAthan}
        />} />
        <Tab.Screen name="Screen3" options={{ title: '' }}
        children={() => <Screen3
          backgroundImage={backgroundImage} 
          linearGradient={linearGradient} 
          textColor={textColor} 
          countDownColor={countDownColor} 
          prayerColor={prayerColor} 
          currentHijriDay={currentHijriDay}
          currentHijriMonth={currentHijriMonth}
          currentHijriYear={currentHijriYear}
          currentDate={currentDate}
          fajrAthan={fajrAthan}
          dhurAthan={dhurAthan}
          asrAthan={asrAthan}
          maghribAthan={maghribAthan}
          ishaAthan={ishaAthan}
        />}/>
        <Tab.Screen name="Screen4" component={Screen4} options={{ title: '' }}/>
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: '#000',
      paddingTop: 20,
      paddingBottom: 10,
      height: 70,
    },
    tab: {
   
    },
  });
  

export default NavBar