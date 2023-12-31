/**
 * @format
 */
 import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-reanimated'
import { Provider } from 'react-redux';
import {store,persistor} from './redux/PresistedStore';
import { PersistGate } from 'redux-persist/integration/react'
  
const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App/>
        </PersistGate>
    </Provider>
)


AppRegistry.registerComponent(appName, () => Root);
