/*
 * @author : Anurag Chhaperwal
 * @description : Top Tab for DashBoard and TaskList Page
*/

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MyTaskList from '../components/TaskManagement/MyTaskList';
import Dashboard from '../components/Dashboard/DashBoard';
import CallLogs from '../components/CallLogs/CallLogs';
import { LoginCommonCss } from '../css/CommonCss';
import { width, height } from '../utils/Constants';



const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  tabBarShowIcon: true,
  tabBarShowLabel: true,
  headerShown: false,
  swipeEnabled: false,
  tabBarIndicatorStyle: {
    backgroundColor: LoginCommonCss.buttonBackground(),
  },
  tabBarLabelStyle: {
    fontSize: 24,
  },

};

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ height: height * 0.06, flexDirection: 'row', position: 'relative', backgroundColor: "#FFFFFF" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{color: 'rgba(27, 21, 52, 0.8)', paddingVertical: 7, flex: 1, position: 'absolute', left: index == 0 ? width * 0.2 : index == 1 ? width * 0.55 : width * 0.6, bottom: isFocused ? 5 : 8, borderBottomWidth: isFocused ? 4 : 0, borderBottomColor: isFocused ? LoginCommonCss.buttonBackground() : null }}
          >
            <Text style={{fontSize: 14, fontFamily: isFocused ? 'SiemensSans-Bold' : 'SiemensSans-Roman'}} >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TopTab() {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBar={prop => <MyTabBar {...prop} />} initialRouteName="Task List">
      <>
        <Tab.Screen
          name="DashBoard"

          options={{
            tabBarLabelStyle: {
              fontFamily: 'SiemensSans-Bold',
            },
            tabBarLabel: 'Dashboard',
          }}
          component={Dashboard}
        />

        <Tab.Screen
          name="Task List"
          options={{
            tabBarLabelStyle: {
              borderBottomColor: 'hsla(276, 100%, 45%, 1)',
              fontFamily: 'SiemensSans-Bold',
            },
            tabBarLabel: 'Task List',
          }}
          component={MyTaskList}
        />
      </>

    </Tab.Navigator>
  );
}

export default TopTab;
