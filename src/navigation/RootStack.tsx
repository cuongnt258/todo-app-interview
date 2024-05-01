import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import type { RootStackParamList } from "@constants/Navigation";

import SplashScreen from "@screens/splash/SplashScreen";

import MainStack from "./MainStack";

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        presentation: "transparentModal",
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0],
              extrapolate: "clamp",
            }),
          },
        }),
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
