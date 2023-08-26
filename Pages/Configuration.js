import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import AllActions from '../redux/AllActions';
import {useDispatch, useSelector} from 'react-redux';
import { height , width } from '../utils/Constants';

import IpUserConfig from '../components/IpUserConfig';


const Configuration = () => {
  const dispatch = useDispatch();
  const configurationModal = useSelector(state => state.configurationModal);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={configurationModal}
      onRequestClose={() => {
        dispatch(AllActions.closeConfigurationModal());
      }}>
      <View style={styles.centeredView}>
          <IpUserConfig />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop: '35%',
    height:height/1.8,
    width:width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Configuration;
