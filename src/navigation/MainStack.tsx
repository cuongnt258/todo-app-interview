import React from "react";

import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import type { MainStackParamList } from "@constants/Navigation";

import InboxScreen from "@screens/inbox/InboxScreen";
import ProjectFormScreen from "@screens/project/ProjectFormScreen";
import ProjectScreen from "@screens/project/ProjectScreen";
import TaskFormScreen from "@screens/task/TaskFormScreen";

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} />
      <Stack.Screen name="Project" component={ProjectScreen} />
      <Stack.Screen name="ProjectForm" component={ProjectFormScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
MainStack.title = "Bottom Tabs";
