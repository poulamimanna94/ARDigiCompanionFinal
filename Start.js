import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, connect,  useDispatch } from 'react-redux';
import Login from './Pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import WelcomePage from './components/WelcomeFolder/WelcomePage';

const Stack = createNativeStackNavigator();

function Start() {
  const userLoggedIn = useSelector(state => state.isUserLoggedIn);

  return userLoggedIn ? (
    <NavigationContainer>
      <WelcomePage />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Start);
