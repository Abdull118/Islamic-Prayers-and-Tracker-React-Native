import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const window = Dimensions.get('window');
const windowHeight = window.height;
const windowWidth = window.width;

const PrayerCountdown = ({ fajrAthan, dhurAthan, asrAthan, maghribAthan, ishaAthan, prayerColor, countDownColor }) => {
  const [countdown, setCountdown] = useState('Calculating prayer time...');
  const [prayerName, setPrayerName] = useState('');
  
  const topPosition = windowHeight <= 700 ? '40%' : windowWidth > 650 ? '25%' : '55%';
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = new Date();
      const currentTime = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
      
      const athanTimes = [fajrAthan, dhurAthan, asrAthan, maghribAthan, ishaAthan, fajrAthan].map(time => {
        const [hourMinute, period] = time.split(' ');
        const [hour, minute] = hourMinute.split(':').map(Number);
        const convertedTime = (hour % 12 + 12 * (period.toUpperCase() === 'PM' ? 1 : 0)) * 60 + minute;
        return convertedTime;
      });

      for (let i = 0; i < athanTimes.length; i++) {
        if (currentTime < athanTimes[i] || (i === athanTimes.length - 1 && currentTime > athanTimes[i - 1])) {
          const minutesUntil = (athanTimes[i] >= currentTime ? athanTimes[i] : athanTimes[i] + 24 * 60) - currentTime;
          const hours = Math.floor(minutesUntil / 60);
          const minutes = minutesUntil % 60;
          
          const prayer = i === 0 ? 'Fajr' : i === 1 ? 'Dhur' : i === 2 ? 'Asr' : i === 3 ? 'Maghrib' : i === 4 ? 'Isha' : 'Fajr';
          const currentPrayer = i === 0 ? 'Isha' : i === 1 ? 'Fajr' : i === 2 ? 'Dhur' : i === 3 ? 'Asr' : i === 4 ? 'Maghrib' : 'Isha';
          
          setPrayerName(currentPrayer);
          setCountdown(`-${hours}:${minutes} mins until ${prayer}`);
          break;
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [fajrAthan, dhurAthan, asrAthan, maghribAthan, ishaAthan]);

  return (
  <View style={[styles.container, { top: topPosition }]}>
    <Text style={[styles.prayerName, {color: prayerColor}]}>{prayerName}</Text>

    <View  style={styles.countDownView}>
    <Text  style={[styles.countDown, {color: countDownColor}]}>{countdown}</Text>
    </View>
  </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        left: '2%'
    },
    countDown:{
        color:'white',
        fontSize: 25,
        width: 115,
        textAlign: 'center',
    },
    countDownView:{
        padding:5,
        marginTop: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20
    },
    prayerName:{
        color:'rgb(226, 214, 165)',
        fontSize: 37,
        fontWeight: 'bold'
    }
})

export default PrayerCountdown;
