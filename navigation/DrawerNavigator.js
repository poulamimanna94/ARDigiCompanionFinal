import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Profile from '../Pages/Profile';
import Scan from '../Pages/Scan';
import {
  DocumentationStackNavigator,
  HomeStackNavigator,
} from './StackNavigator';
import DocumentRepository from '../components/DocumentRepository';
import MyTaskList from '../components/TaskManagement/MyTaskList';
import TermsOfUse from '../Pages/TermsOfUse';
import CorporateInformation from '../Pages/CorporateInformation';
import Help from '../Pages/Help';
import Documentation from '../Pages/Documentation';


const Drawer = createDrawerNavigator();

function DrawerNavigator() {


  return (
    <Drawer.Navigator
    style={{zIndex: 1000}}
      drawerContent={() => <Profile />}
      screenOptions={{
        headerShown: false,
        zIndex: 1000
      }}>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Scanner" component={Scan} />
      <Drawer.Screen name="DocumentRepository" component={DocumentRepository} />
      <Drawer.Screen name="BottomScan" component={DocumentationStackNavigator} />
      <Drawer.Screen name="MyTaskList" component={MyTaskList} />
      <Drawer.Screen name="TermsOfUse" component={TermsOfUse} />
      <Drawer.Screen name="CorporateInformation" component={CorporateInformation} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
