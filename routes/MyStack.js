import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home'

import React from 'react';
import Main from '../components/Main';

const Stack = createStackNavigator();

const MyStack = () =>{
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    )
}

export default MyStack