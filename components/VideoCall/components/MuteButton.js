/*
 * @author : Chahat chugh
 * @description : To Mute/Unmute
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import PhoneDisabled from '../assets/microphone-muted.svg';
import Phone from '../assets/microphone.svg';
import styles from '../Styles';

export const MuteButton = ({muted, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        onPress();
      }}>
      {muted ? <PhoneDisabled /> : <Phone />}
    </TouchableOpacity>
  );
};
