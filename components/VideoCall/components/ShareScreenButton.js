/*
 * @author : Chahat chugh
 * @description : To on/off share screen functionality
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import Share from '../assets/share.svg';
import styles from '../Styles';

export const ShareScreenButton = ({disabled, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        onPress();
      }}>
      <Share />
    </TouchableOpacity>
  );
};
