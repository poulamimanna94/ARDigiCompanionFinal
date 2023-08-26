import React from 'react';
import { View, Modal } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {  useSelector } from 'react-redux';

import LoaderCss from '../css/LoaderCss';

const Loader = () => {
 
  const loading = useSelector((state) => state.loading);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={loading}
    >
      <View style={LoaderCss.centeredView}>
        <View style={LoaderCss.modalView}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
};


export default Loader;
