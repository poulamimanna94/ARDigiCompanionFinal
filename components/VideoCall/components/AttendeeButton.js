/*
 * @author : Chahat chugh
 * @description : To check Attendee List
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from '../Styles';
import AttendeeList from '../assets/attendee.svg';

export const AttendeeButton = ({disabled, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        onPress();
      }}>
      <AttendeeList />
    </TouchableOpacity>
  );
};
