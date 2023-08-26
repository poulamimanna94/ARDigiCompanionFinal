import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTab from './TopTab';
import Scan from '../Pages/Scan';
import { DrawerIcon, BackIconPass, } from '../components/Icons';
import AssetComponent from '../components/AssetComponent';
import SelectAssets from '../components/TaskManagement/SelectAssets';
import CameraScreen from '../Pages/CameraScreen';
import Parameter from '../Pages/Parameter';
import BottomTabs from '../navigation/BottomTabs';
import Trends from '../Pages/Trends';
import  Documentation  from '../Pages/Documentation';
import DocumentRepository from '../components/DocumentRepository';
import  KksSelection  from '../Pages/KksSelection';
import CreateTaskTopTab from '../components/TaskManagement/CreateTaskTopTab';
import EditTask from '../components/TaskManagement/EditTask';
import ViewTaskTopTab from '../components/TaskManagement/ViewTaskTopTab';
import Analyze from '../Pages/Analyze';
import VideoCallScreen from '../components/VideoCall/VideoCall';
import NotificationIcon from '../components/NotificationIcon';


const Stack = createNativeStackNavigator();

const centerHeader = {
  headerTitleAlign: 'center',
  headerTintColor: '#2D373C',
  headerTitleStyle: {
    fontFamily: 'SiemensSans-Bold',
    fontSize: 24,
  },
  headerStyle: {
    backgroundColor: '#F2F2F2',
  },
};

const HomeStackNavigator = () => {


  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...centerHeader,
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <NotificationIcon />
        }}
        name="Assets"
        component={AssetComponent}
      />

      <Stack.Screen
        options={{
          title: 'Task Manager',
          ...centerHeader,
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <NotificationIcon />
        }}
        name="Tabs"
        component={TopTab}
      />

      <Stack.Screen
        options={{
          title: 'Create New Task',
          ...centerHeader,
          headerRight: () => <NotificationIcon />
        }}
        name="CreateTask"
        component={CreateTaskTopTab}
      />

      <Stack.Screen
        options={{
          title: 'Task Name',
          ...centerHeader,
          headerRight: () => <NotificationIcon />
        }}
        name="ViewTaskTopTab"
        component={ViewTaskTopTab}
      />

      <Stack.Screen
        options={{
          title: 'Document Repository',
          ...centerHeader,
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <NotificationIcon />
        }}
        name="DocumentRepository"
        component={DocumentRepository}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="CameraScreen"
        component={CameraScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="KksSelection"
        component={KksSelection}
      />
      <Stack.Screen
        options={{
          ...centerHeader,
          headerLeft: () => <BackIconPass />,
          headerRight: () => <NotificationIcon />
        }}
        name="Analyze"
        component={Analyze}
      />


      <Stack.Screen name="Parameter" options={{
        headerShown: false,
        ...centerHeader,
        headerRight: () => <NotificationIcon />
      }} component={BottomTabs}
      />
      <Stack.Screen
        options={{
          title: 'Select Asset',
          ...centerHeader,
          headerRight: () => <NotificationIcon />
        }}
        name="SelectAssets"
        component={SelectAssets}
      />
      <Stack.Screen
        options={{
          title: 'Task Name',
          ...centerHeader,
          headerRight: () => <NotificationIcon />
        }}
        name="EditTask"
        component={EditTask}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="VideoCallScreen"
        component={VideoCallScreen}
      />

    </Stack.Navigator>

  );
};




const ParameterStackNavigator = ({ navigation, route }) => {
  console.log(route.params, "parameterStackNavigator");
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...centerHeader,
          headerLeft: () => <BackIconPass />,
          headerRight: () => <NotificationIcon />
        }}
        initialParams={route.params}
        name="Parameters"
        component={Parameter}
      />
    </Stack.Navigator>
  );
};

const TrendsStackNavigator = ({  route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...centerHeader,
          headerLeft: () => <BackIconPass />,
          headerRight: () => <NotificationIcon />
        }}
        initialParams={route.params}
        name="Trends"
        component={Trends}
      />
    </Stack.Navigator>
  );
};

const DocumentationStackNavigator = ({ route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...centerHeader,
          headerLeft: () => <BackIconPass />,
          headerRight: () => <NotificationIcon />
        }}
        initialParams={route.params}
        name="Documentation"
        component={Documentation}
      />
    </Stack.Navigator>
  );
};

const scanStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...centerHeader,
        }}
        name="Scan"
        component={Scan}
      />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  scanStackNavigator,
  DocumentationStackNavigator,
  ParameterStackNavigator,
  TrendsStackNavigator
};
