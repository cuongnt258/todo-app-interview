import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import type {MainStackParamList} from '../constants/Navigation';

import {DashboardScreen, TodoScreen} from '../screens';

const getTabBarIcon =
  (name: React.ComponentProps<typeof Icon>['name']) =>
  ({color, size}: {color: string; size: number}) =>
    <Icon name={name} color={color} size={size} />;

const Tab = createBottomTabNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
            // headerShown: false,
            tabBarIcon: getTabBarIcon('pie-chart'),
          }}
        />
        <Tab.Screen
          name="Todo"
          component={TodoScreen}
          options={{
            tabBarLabel: 'Todo',
            tabBarIcon: getTabBarIcon('clipboard'),
            tabBarBadge: 2,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainStack;
MainStack.title = 'Bottom Tabs';
