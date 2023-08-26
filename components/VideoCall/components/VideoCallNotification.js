/*
 * @author : Chahat chugh
 * @description : Video Call notification
 */

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {connect, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import SoundPlayer from 'react-native-sound-player';
import {Modal, Button, Divider} from 'react-native-paper';
import AllActions from '../../../redux/AllActions';
import PushNotification from "react-native-push-notification";
import { Utils } from '../../Common/Utils';

const VideoCallNotification = ({
  showVideoCallNotificationAction,
  showVideoCallNotification,
  showMeetingRoomAction,
  showRoomNameAction,
  showRoomName,
  storeNotification,
  doNotShowVideoCallAgainAction,
  doNotShowVideoCallAgain
}) => {

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function (token) {
    //     console.log("TOKEN:", token);
    // },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        if (!notification?.data) {
            return;
           }
           console.log(notification,"NNNNNN")
        notification.userInteraction = true;
        onMessageReceived(notification)
        // const dispatch = useDispatch();
        // dispatch(AllActions.showVideoCallNotification(notification.data.message))
        // onOpenNotification(notification.data);
    // process the notification
    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    requestPermissions: Platform.OS === 'ios',

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    // onAction: function (notification) {
    //     console.log("ACTION:", notification.action);
    //     console.log("NOTIFICATION:", notification);

    //     // process the action
    // },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    // onRegistrationError: function (err) {
    //     console.error(err.message, err);
    // },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    //requestPermissions: true,
});

  const containerStyle = {backgroundColor: 'white'};
  const [modal, setModal] = useState(false);
  const userDetail = useSelector(state => state.userDetail)
  const ipPortData = useSelector(state => state.ipPortData)
  const accessToken = useSelector(state => state.accessToken)
  const tenantId = useSelector(state => state.tenantId)
  const hideModal = () => {
    setModal(false);
  };
  useEffect(() => {
    showVideoCallNotification && !doNotShowVideoCallAgain? setModal(true): setModal(false)
    if (showVideoCallNotification && !doNotShowVideoCallAgain) {
      SoundPlayer.playSoundFile('telephone_ring', 'wav');
    } else {
      SoundPlayer.stop();
    }
  }, [showVideoCallNotification]);
  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(onMessageReceived);
    const unsubscribesetBackgroundMessageHandler =
      messaging().setBackgroundMessageHandler(onMessageReceived);
    return () => {
      unsubscribeOnMessage, unsubscribesetBackgroundMessageHandler;
    };
  }, []);
  async function onMessageReceived(message) {
    console.log(message.data, "message notification", message.data.MeetingName!= showVideoCallNotification)
    if (message.data.MeetingName!= showVideoCallNotification && message.data["Notification-type"] == "videoCall") {
      doNotShowVideoCallAgainAction(false)
      showVideoCallNotificationAction(message.data.MeetingName);
    }
    else {
      const tempNotificationArr = [];
      tempNotificationArr.push(message.data.MeetingName)
      storeNotification(tempNotificationArr)
    }
  }
  const join = () => {
    SoundPlayer.stop();
    const callsData = {
        "userId":  userDetail.id,
        "startTime": new Date(),
        "endTime": "",
        "videoCallSession": showVideoCallNotification,
        "callStatus": "join-Call"
    }
    Utils.postSaveCalls(ipPortData, accessToken, callsData, tenantId)
        .then(response => {
            console.log(response, "JOIN DATA|| GUEST")
        })
    showRoomNameAction(showVideoCallNotification)
    hideModal()
    showMeetingRoomAction(true)
    doNotShowVideoCallAgainAction(true)
}
  return (
    <Modal
      visible={modal && showVideoCallNotification ? true : false}
      onDismiss={hideModal}
      style={{width: '80%', marginHorizontal: '10%'}}
      contentContainerStyle={containerStyle}>
      <View style={{width: '100%'}}>
        <View style={{padding: 15}}>
          <Text style={{fontSize: 16, fontFamily: 'SiemensSans-Bold'}}>
            AR-Power
          </Text>
        </View>
        <Divider style={{width: '100%', height: 1}} />
        <View
          style={{padding: 15, fontSize: 14, fontFamily: 'SiemensSans-Roman'}}>
          <Text>Join the Meeting. By clicking on join button.</Text>
          <Text style={{marginTop: 10}}>
            To Join later, you can cancel it and find it in Notification Bell
            icon.
          </Text>
        </View>
        <Divider style={{width: '100%', height: 1}} />
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <Button
            style={{fontSize: 14, fontFamily: 'SiemensSans-Roman'}}
            onPress={() => {
            SoundPlayer.stop()
            hideModal()
            showMeetingRoomAction(false)
            doNotShowVideoCallAgainAction(true)
            }
            }
            >
            Cancel
          </Button>
          <Button
            style={{fontSize: 14, fontFamily: 'SiemensSans-Roman'}}
            onPress={join}
          >
            Join Meeting
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    showVideoCallNotification: state.showVideoCallNotification,
    showRoomName: state.showRoomName,
    doNotShowVideoCallAgain: state.doNotShowVideoCallAgain
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showVideoCallNotificationAction: meeting => {
      dispatch(AllActions.showVideoCallNotificationAction(meeting));
    },
    showMeetingRoomAction: meeting => {
      dispatch(AllActions.showMeetingRoomAction(meeting));
    },
    showRoomNameAction: meeting => {
      dispatch(AllActions.showRoomNameAction(meeting));
    },
    storeNotification: data => {
      console.log(data, "data storeNotificationData------202")
      console.log(data?.length, "line 203-------")
      dispatch(AllActions.setNotificationData(data));
    },
    doNotShowVideoCallAgainAction: data => {
      dispatch(AllActions.doNotShowVideoCallAgainAction(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoCallNotification);
