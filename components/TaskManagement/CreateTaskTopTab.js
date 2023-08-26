/*
 * @author : Poulami Manna
 * @description : Top Tab for Create Task
*/

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import CreateTask from '../TaskManagement/CreateTask';
import Attachments from '../Attachments/Attachments';
import Actions from '../Actions/Actions';
import { useSelector } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { LoginCommonCss } from '../../css/CommonCss';
import { width, height } from '../../utils/Constants';




const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  tabBarShowIcon: true,
  tabBarShowLabel: true,
  headerShown: false,


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
            style={{  color: 'rgba(27, 21, 52, 0.8)', paddingVertical: 7, flex: 1, position: 'absolute', left: index == 0 ? width * 0.25 : index == 1 ? width * 0.4 : width * 0.65, bottom: isFocused ? 5 : 8, borderBottomWidth: isFocused ? 4 : 0, borderBottomColor: isFocused ? LoginCommonCss.buttonBackground() : null }}
          >
            <Text style={{fontFamily: isFocused ? 'SiemensSans-Bold' : 'SiemensSans-Roman', fontSize: 14}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function CreateTaskTopTab() {
  const createdAssignedTaskId = useSelector(state => state.setCreatedAssignedTaskId);


  return (
    
    <Tab.Navigator screenOptions={screenOptions} tabBar={prop => <MyTabBar {...prop} />}>
      <>
        <Tab.Screen
          name="Details"
          options={{
            swipeEnabled: false,
            tabBarStyle: { borderEndColor: 'red', },
            tabBarLabelStyle: {
              fontFamily: 'SiemensSans-Bold',
              borderBottomColor: 'hsla(276, 100%, 45%, 1)'
            },
          }}
          component={CreateTask}
        />
        <Tab.Screen
          name="Attachments"
          options={{

            tabBarLabelStyle: {
              fontFamily: 'SiemensSans-Bold',
            },
            tabBarLabel: 'Attachments',

          }}
        >
            {() =>createdAssignedTaskId ? <Attachments /> :  <Text style={{alignItems: "center",justifyContent: "center", marginLeft: 120, marginTop: 300, color: "#000000", fontFamily: 'SiemensSans-Bold', fontSize: 16,}}>First Create The Task ! </Text> }
        </Tab.Screen>
        <Tab.Screen

          name="Actions"
          options={{

            tabBarLabelStyle: {

              fontFamily: 'SiemensSans-Bold',
            },
            tabBarLabel: 'Actions',


          }}
          component={Actions}
        />
      </>

    </Tab.Navigator>
  );
}

export default CreateTaskTopTab;
