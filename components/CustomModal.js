import React from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AllActions from '../redux/AllActions';
import {Divider} from 'react-native-paper';

const CustomModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.showModal);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalState}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        dispatch(AllActions.closePopup());
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style ={{flex:1.5,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.modalText}>Invalid Username and password</Text>
          </View>
          <View>
              <Divider />
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            
            <Pressable
              style={styles.modalButton}
              onPress={() => dispatch(AllActions.closePopup())}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  modalView: {
    flex:0.2,
    backgroundColor: 'white',
  },
  modalButton: {
    fontFamily: 'SiemensSans-Roman',
    backgroundColor: '#8A00E5',
  },
  textStyle: {
    padding: 5,
    width:60,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'SiemensSans-Roman',
  },
  modalText: {
    marginTop: 15,
    padding:10,
    textAlign: 'center',
    fontFamily: 'SiemensSans-Bold',
  },
});

export default CustomModal;
