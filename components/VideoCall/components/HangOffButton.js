/*
 * @author : Chahat chugh
 * @description : To Leave call
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import HangOff from '../assets/hang-off.svg';
import styles from '../Styles';

export const HangOffButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.icon, {marginLeft: 15}]}
      onPress={() => {
        onPress();
      }}>
      <HangOff />
    </TouchableOpacity>
  );
};
