import React from 'react';
import { createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from "./Reducer";

const persistConfig = {
  key: 'authType',//any unique key to identify your storage data
  storage: AsyncStorage,
  blacklist : ['showMeetingRoom']
};
const pReducer = persistReducer(persistConfig, reducer);
const store = createStore(pReducer);
const persistor = persistStore(store);

export  {persistor,store}; 