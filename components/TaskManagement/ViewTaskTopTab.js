/*
 * @author : Poulami Manna
 * @description : Top Tab for View and Edit task
*/

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import Attachments from '../Attachments/Attachments';
import Actions from '../Actions/Actions';
import ViewTask from './ViewTask';
import EditTask from '../TaskManagement/EditTask';
import SVGEditIcon from '../../assets/edit.svg';
import {  useSelector } from 'react-redux';
import { LoginCommonCss } from '../../css/CommonCss';
import { View, Text, TouchableOpacity } from 'react-native';
import { width, height } from '../../utils/Constants';



const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  tabBarShowIcon: true,
  tabBarShowLabel: true,
  headerShown: false,
  tabBarIndicatorStyle: {
    backgroundColor: LoginCommonCss.buttonBackground(),
    marginLeft: 35,
    width: 100,
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
            style={{ color: 'rgba(27, 21, 52, 0.8)', paddingVertical: 7, flex: 1, position: 'absolute', left: index == 0 ? width * 0.25 : index == 1 ? width * 0.4 : width * 0.65, bottom: isFocused ? 5 : 8, borderBottomWidth: isFocused ? 4 : 0, borderBottomColor: isFocused ? LoginCommonCss.buttonBackground() : null }}
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

function ViewTaskTopTab(props) {

  const { route } = props;
  const [toggleEdit, setToggleEdit] = useState(true);
  const [taskId, setTaskId] = useState(route?.params?.taskId);
  const [topTabToViewData, setTopTabToViewData] = useState();
  const [toModify, setToModify] = useState(false);
  const statusCompletionForTask = useSelector(state => state.setStatusCompletionForTask);
  const getTaskId = useSelector(state => state.setTaskId);




  const editToView = (toggleEdit, taskId, allData) => {

    setToggleEdit(true)
    setTaskId(taskId);
    setTopTabToViewData(allData);
    setToModify(toggleEdit);
  }

  return (
    <>
      {statusCompletionForTask && toggleEdit && <TouchableOpacity style={{
        position: "absolute", 
        zIndex: 1, 
        marginHorizontal: 2,
        left:'4%',
        top:'2.5%',
      }} onPress={() => setToggleEdit(false)}>
        <SVGEditIcon height={25} width={25} />
      </TouchableOpacity>}
      <Tab.Navigator screenOptions={screenOptions} tabBar={prop => <MyTabBar {...prop} />}>
        <>
          <Tab.Screen
          
            name="Details"
            options={{
              tabBarStyle: { borderEndColor: 'red', },
              tabBarLabelStyle: {
                fontFamily: 'SiemensSans-Bold',
                left: 25,
                borderBottomColor: 'hsla(376, 100%, 45%, 1)'
              },
            }}

          >
            {() => toggleEdit ? <ViewTask {...props} isEditable={statusCompletionForTask} taskId={taskId || getTaskId} topTabToViewData={topTabToViewData} toModify={toModify} /> : <EditTask {...props} setToggleEdit={editToView} />}
          </Tab.Screen>
          <Tab.Screen
            name="Attachments"
            options={{

              tabBarLabelStyle: {
                fontFamily: 'SiemensSans-Bold',
                right: 8,
                //   top: -2,
                left: 15,
              },
              tabBarLabel: 'Attachments',


            }}

          >
            {() => <Attachments taskIdForAttachment={taskId} toggleEdit={toggleEdit} />}

          </Tab.Screen>
          <Tab.Screen

            name="Actions"
            options={{
              tabBarLabelStyle: {
                fontFamily: 'SiemensSans-Bold',
                right: -10
              },
              tabBarLabel: 'Actions',
            }}
            initialParams={{ taskIdForAction: taskId }}
            component={Actions}

          />
        </>

      </Tab.Navigator>
    </>
  );

}

export default ViewTaskTopTab;
