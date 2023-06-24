import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [currentTimeHours, setCurrentTimeHours] = useState('');
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState('');
  const [currentTimeAMPM, setCurrentTimeAMPM] = useState('');
  const [currentSeconds, setCurrentSeconds] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      setCurrentTimeHours(formattedHours);
      setCurrentTimeMinutes(formattedMinutes);
      setCurrentTimeAMPM(ampm);
      setCurrentSeconds(seconds.toString().padStart(2, '0'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{currentTimeHours}:</Text>
      <Text style={styles.time}>{currentTimeMinutes}:</Text>
      <Text style={styles.time}>{currentSeconds}</Text>
      <Text style={styles.time}>{currentTimeAMPM}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '40%',
    left: '2%'
},
  time: {
    fontSize: 54,
    fontWeight: 'bold',
    color: 'rgb(185, 157, 89)'
  },
});

export default Clock;
