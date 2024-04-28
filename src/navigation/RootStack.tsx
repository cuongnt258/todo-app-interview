import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import type {RootStackParamList} from '../constants/Navigation';

import SplashScreen from '../screens/SplashScreen';
import MainStack from './MainStack';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
