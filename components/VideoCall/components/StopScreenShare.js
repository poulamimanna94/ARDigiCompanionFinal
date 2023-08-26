/*
 * @author : Chahat chugh
 * @description : To on/off share screen functionality
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from '../Styles';
import ShareDisabled from '../assets/unshare.svg';

export const StopScreenShare = ({disabled, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.icon, {backgroundColor:'red'}]}
      onPress={() => {
        onPress();
      }}>
      <ShareDisabled />
    </TouchableOpacity>
  );
};
