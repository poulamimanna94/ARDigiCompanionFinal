/*
 * @author : Chahat chugh
 * @description : Video Call integration starting point
 */

import React from 'react';
import {SafeAreaView, StatusBar, Alert, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import Meeting from './containers/Meeting';
import {createMeetingRequest} from './utils/Api';
import {
  getSDKEventEmitter,
  MobileSDKEvent,
  NativeFunction,
} from './utils/Bridge';
import {LoginCommonCss} from '../../css/CommonCss';
import AllActions from '../../redux/AllActions';


class VideoCall extends React.Component {
  constructor() {
    super();
    this.inProgress = false
    this.state = {
      isInMeeting: true,
      isLoading: true,
      meetingTitle: '',
      selfAttendeeId: '',
    };
  }

  meet() {
    this.getData()
    this.onMeetingStartSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnMeetingStart,
      () => {
        this.setState({isInMeeting: true, isLoading: false});
      },
    );

    this.onMeetingEndSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnMeetingEnd,
      () => {
        this.setState({isInMeeting: false, isLoading: false});
        this.inProgress = false;
        this.props.showMeetingRoomAction(false)
      },
    );

    this.onErrorSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnError,
      message => {
        this.inProgress = false;
        this.props.showMeetingRoomAction(false)
        Alert.alert('SDK Error', message);
      },
    );
  }

  componentDidUpdate(prevProps){
    console.log(this.props.showMeetingRoom,this.props.showRoomName,"SHOW MEETING NAMEEEEEEE", this.props.showMeetingRoom != prevProps.showMeetingRoom, this.props.showMeetingRoom ,prevProps.showMeetingRoom,"PP", this.inProgress)
    if(this.props.showMeetingRoom != prevProps.showMeetingRoom){
      if(this.props.showMeetingRoom && !this.inProgress){
        this.inProgress = true
        this.meet()
      }
      if(!this.props.showMeetingRoom && !this.inProgress){
        this.endMeet()
      }
      }
  }
  endMeet() {
    if (this.onMeetingEndSubscription) {
      this.onMeetingEndSubscription.remove();
    }
    if (this.onMeetingStartSubscription) {
      this.onMeetingStartSubscription.remove();
    }
    if (this.onErrorSubscription) {
      this.onErrorSubscription.remove();
    }
  }

  initializeMeetingSession = (meetingName, userName) => {
    this.setState({
      isLoading: true,
    });
    createMeetingRequest(meetingName, userName)
      .then(meetingResponse => {
        this.setState({
          meetingTitle: meetingName,
          selfAttendeeId: meetingResponse.JoinInfo.Attendee.Attendee.AttendeeId,
        });
        NativeFunction.startMeeting(
          meetingResponse?.JoinInfo?.Meeting?.Meeting,
          meetingResponse?.JoinInfo?.Attendee?.Attendee,
          //Might need to REMOVE_END_FUNCTIONALITY
          () => {
            this.setState({meetingTitle: '', isLoading: false});
            this.props.showMeetingRoomAction(false)
          },
        );
      })
      .catch(error => {
        this.props.showMeetingRoomAction(false)
        this.props.showVideoCallNotificationAction('')
        Alert.alert(
          "Sorry !! The Meeting has been ended.",
          "This meeting instance has been terminated. Please create a new meeting."
        );
        this.inProgress=false;
        this.setState({isLoading: false});
      });
  };

  renderRoute() {
    if (this.state.isInMeeting && this.state.meetingTitle) {
      return (
        <Meeting
          meetingTitle={this.state.meetingTitle}
          selfAttendeeId={this.state.selfAttendeeId}
          navigation= {this.props.navigation}
          list={this.props.showContactsOfVideoCall}
        />
      );
  }}   

  Loader = () => {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          color={LoginCommonCss.buttonBackground()}
          size="large"
        />
        <Text>Meeting Loading ...</Text>
      </View>
    );
  };

  async getData() {
    try {
      const data = await AsyncStorage.getItem('@username');
      if (data !== null) {
        {
          this.props.showRoomName
            ? this.initializeMeetingSession(
                this.props.showRoomName,
                data,
              )
            : alert('Meeting name not there');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar />
        <SafeAreaView>{this.state.isLoading ? this.Loader():this.renderRoute()}</SafeAreaView>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
      showContactsOfVideoCall: state.showContactsOfVideoCall,
      showMeetingRoom: state.showMeetingRoom,
      showRoomName: state.showRoomName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showMeetingRoomAction: meeting => {
      dispatch(AllActions.showMeetingRoomAction(meeting));
    },
    showVideoCallNotificationAction: meeting => {
      dispatch(AllActions.showVideoCallNotificationAction(meeting));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoCall);
