import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MyStack from './routes/MyStack';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <NavigationContainer>
    <MyStack />
    </NavigationContainer>
  );
}