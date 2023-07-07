import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SurahList from '../components/Quran/SurahList';
import SurahScreen from '../components/Quran/SurahScreen';
// import AyahList from '../components/AyahList';

const QuranStack = createStackNavigator();

const QuranStackScreen = () => (
  <QuranStack.Navigator>
    <QuranStack.Screen name="SurahList" component={SurahList} />
    <QuranStack.Screen name="SurahScreen" component={SurahScreen} />
    {/* <QuranStack.Screen name="AyahList" component={AyahList} /> */}
  </QuranStack.Navigator>
);

export default QuranStackScreen;
