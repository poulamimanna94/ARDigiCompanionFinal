/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Start from './Start';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import AllActions from './redux/AllActions';

const App = () => {



  const dispatch = useDispatch();
  React.useEffect(() => {
    getData();
    return () =>{
      dispatch(AllActions.showMeetingRoomAction(false))
    }
  }, [])

  const getData = async () => {
    try {
      const key = await AsyncStorage.getItem('@Key')
      const username = await AsyncStorage.getItem('@username');
      const hostname = await AsyncStorage.getItem('@hostname');
      const port = await AsyncStorage.getItem('@port');
      const protocol = await AsyncStorage.getItem('@protocol');
      const tenantId = await AsyncStorage.getItem('@tenantId');

      console.log(tenantId);
      if (tenantId !== null && key !== null && username !== null && hostname !== null && port !== null && protocol !== null) {
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }

  React.useEffect(async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
    // Get the token
    const token = await messaging().getToken();
    dispatch(AllActions.setDeviceToken(token));
    console.log("Unique token ", token);
  }, [])


  return (
    <Start />
  );
};


export default App;