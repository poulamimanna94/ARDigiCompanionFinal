/*
 * @author : Chahat chugh
 * @description : To switch camera front and rera
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from '../Styles';
import Rotate from '../assets/rotate.svg';

export const RotateCameraButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        onPress();
      }}>
      <Rotate />
    </TouchableOpacity>
  );
};
