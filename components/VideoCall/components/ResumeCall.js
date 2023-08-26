/*
 * @author : Chahat chugh
 * @description : To Resume Back to call
 * Resume Call, showResumeCall
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import MovableView from 'react-native-movable-view';
import SVGVideoCall from '../../../assets/videocallsvg.svg';
import AllActions from '../../../redux/AllActions';

const ResumeCall = ({
  showResumeCall,
  showResumeCallAction,
  showMeetingRoomAction,
}) => {
  return (
    showResumeCall && (
      <MovableView style={{position:'absolute', marginLeft: 50}}>
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            backgroundColor: 'yellow',
            alignItems:'center',
            justifyContent:'center',
            borderRadius: 30
          }}
          onPress={() => {
            showResumeCallAction(false);
            showMeetingRoomAction(true);
          }}>
          <SVGVideoCall height={45} width={45} />
        </TouchableOpacity>
      </MovableView>
    )
  );
};

const mapStateToProps = state => {
  return {
    showResumeCall: state.showResumeCall,
    showMeetingRoom: state.showMeetingRoom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showResumeCallAction: meeting => {
      dispatch(AllActions.showResumeCallAction(meeting));
    },
    showMeetingRoomAction: meeting => {
      dispatch(AllActions.showMeetingRoomAction(meeting));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResumeCall);
