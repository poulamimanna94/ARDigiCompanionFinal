import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DocumentationStackNavigator,
  ParameterStackNavigator,
  TrendsStackNavigator
} from './StackNavigator';
import {
  BottomBellIcon,
  BottomNavigateIcon,
  BottomScanIcon,
} from '../components/Icons';
import { connect } from 'react-redux';


const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: 90,

  },
};
const colors = {
  tabBarActiveBackgroundColor: '#F2F2F2',
  tabBarInactiveBackgroundColor: '#F2F2F2',
};
const Tab = createBottomTabNavigator();

function BottomTabs(props) {

  React.useEffect(() => {
    if (props.toggleOrientation) {
      screenOptions.tabBarStyle.display = 'none';
    }
    else {
      screenOptions.tabBarStyle.display = 'flex';
    }
  }, [props])



  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Parameter"
        component={ParameterStackNavigator}
        options={{
          ...colors,
          tabBarIcon: ({ focused }) => <BottomBellIcon isFocused={focused} />,
        }}
      />
      <Tab.Screen
        name="Navigation"
        component={TrendsStackNavigator}
        options={{
          ...colors,
          tabBarIcon: ({ focused }) => (<BottomNavigateIcon isFocused={focused} />),
        }}
      />
      <Tab.Screen
        name="BottomScan"
        component={DocumentationStackNavigator}
        options={{
          ...colors,
          tabBarIcon: ({ focused }) => <BottomScanIcon isFocused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
const mapStateToProps = state => {
  return {
    toggleOrientation: state.toggleOrientation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabs);