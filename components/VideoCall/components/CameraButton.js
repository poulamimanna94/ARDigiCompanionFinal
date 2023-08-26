/*
 * @author : Chahat chugh
 * @description : To open/close camera
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import VideoDisabled from '../assets/video-disabled.svg';
import Video from '../assets/video.svg';
import styles from '../Styles';

export const CameraButton = ({disabled, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        onPress();
      }}>
      {disabled ? <Video /> : <VideoDisabled />}
    </TouchableOpacity>
  );
};
