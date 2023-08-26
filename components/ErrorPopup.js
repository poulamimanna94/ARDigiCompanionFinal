import React from 'react';
import {
  Modal,
  Text,
  Pressable,
  View,
} from 'react-native';
import AllActions from '../redux/AllActions';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import ErrorPopupCss from '../css/ErrorPopupCss';


const ErrorPopup = () => {
  const dispatch = useDispatch();
  const errorPopup = useSelector(state => state.showErrorPopup);
  const message = useSelector(state => state.message);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={errorPopup}
      onRequestClose={() => {
        dispatch(AllActions.errorPopup());
      }}>
      <View style={ErrorPopupCss.centeredView}>
        <View style={ErrorPopupCss.modalView}>
          {/* <View style={ErrorPopupCss.titleContainer} >
            <Text style={{ color: '#1B1534', fontFamily: 'SiemensSans-Bold', fontSize: 16 }}></Text>
          </View> */}
          <View style={{ width: '100%' }}>
            <Divider />
          </View>
          <View
            style={ErrorPopupCss.messageContainer}>
            <Text style={{ textAlign: 'center', color: '#1B1534', fontFamily: 'SiemensSans-Roman', fontSize: 14 }}>{message}</Text>
          </View>

          <View style={{ width: '100%' }}>
            <Divider />
          </View>
          <View
            style={ErrorPopupCss.buttonContainer}>
            <Pressable
              style={ErrorPopupCss.pressableBtn1}
              onPress={() => {
                dispatch(AllActions.errorPopup());
              }}>
              <Text style={ErrorPopupCss.pressableText}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default ErrorPopup;
