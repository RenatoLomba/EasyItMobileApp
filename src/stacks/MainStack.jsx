import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';

import ExpertInfo from '../screens/ExpertInfo';
import Camera from '../components/Camera'

const Stack = createStackNavigator();

const MainStack = () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainTab" component={MainTab} />

        <Stack.Screen name="ExpertInfo" component={ExpertInfo} />
        <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
);
export default MainStack;
