import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Typewriter from 'react-native-typewriter';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
export default function Home() {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingDone(true);

       // Fade out and navigate after 3 seconds
       setTimeout(() => {
        navigation.navigate('Main');
      }, 3000);

    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <View style={styles.container}>
      {!isTypingDone ? (
          <Typewriter
            style={styles.typewriterText}
            typing={1}
            maxDelay={50}
            onComplete={() => setIsTypingDone(true)}
          >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Typewriter>
        ) : (
          <Animatable.Text
          style={styles.normalText}
          animation="fadeOut"
          duration={1000}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Animatable.Text>
        )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typewriterContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  typewriterText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  normalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
