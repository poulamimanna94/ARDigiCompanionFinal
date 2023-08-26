/*
 * @author : Chahat chugh
 * @description : Components with video call view
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {Modal} from 'react-native-paper';
import styles from '../Styles';
import {
  NativeFunction,
  getSDKEventEmitter,
  MobileSDKEvent,
  MeetingError,
} from '../utils/Bridge';
import {RNVideoRenderView} from '../components/RNVideoRenderView';
import {MuteButton} from '../components/MuteButton';
import {CameraButton} from '../components/CameraButton';
import {HangOffButton} from '../components/HangOffButton';
import {AttendeeItem} from '../components/AttendeeItem';
import {AttendeeButton} from '../components/AttendeeButton';
import {ShareScreenButton} from '../components/ShareScreenButton';
import {StopScreenShare} from '../components/StopScreenShare';
import {RotateCameraButton} from '../components/RotateCameraButton';
import Contact from '../assets/contacts.svg';
import Close from '../assets/close.svg';
import {endMeetingRequest} from '../utils/Api';
import AllActions from '../../../redux/AllActions';
import {Utils} from '../../Common/Utils';

// Maps attendee Id to attendee Name
const attendeeNameMap = {};
const toDisplayVideoTile = {};

class Meeting extends React.Component {
  constructor() {
    super();
    this.state = {
      attendees: [],
      videoTiles: [],
      mutedAttendee: [],
      selfVideoEnabled: false,
      meetingTitle: '',
      screenShareTile: 0,
      modalVisible: false,
      cameraType: false,
      meetingTime: 0,
      endCallVisible: false,
      endTime: 0,
      join: [],
      screenShareButton: false,
      meetingAboutToEnd: false,
      isScreenShareTile: false,
      attendeesName: []
    };
  }

  componentDidMount() {
    /**
     * Attendee Join and Leave handler
     */
    this.onAttendeesJoinSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesJoin,
      ({attendeeId, externalUserId}) => {
        if (!(attendeeId in attendeeNameMap)) {
          // The externalUserId will be a format such as c19587e7#Alice
          attendeeNameMap[attendeeId] = externalUserId.split('#')[1];
        }
        this.setState(oldState => ({
          ...oldState,
          attendees: oldState.attendees.concat([attendeeId]),
        }));
        this.state.attendees.map(item => {
          console.log(attendeeNameMap[item],"attendeeNameMap[item]", item )
          const name = attendeeNameMap[item] ? attendeeNameMap[item] : item;
          if(!this.state.attendeesName.includes(name)){
          this.setState({attendeesName:[ ...this.state.attendeesName, name.toLowerCase()]})
        }
        return true;
      });
          var array1 =  this.props?.list.filter(x => this.state.attendeesName.indexOf(x.user.toLowerCase()) === -1);
          console.log(array1,"AAAAA", this.state.attendeesName)
          this.setState({join: array1});
      },
    );

    this.onAttendeesLeaveSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesLeave,
      ({attendeeId}) => {
        console.log(attendeeId, 'attendeeId');
        this.setState(oldState => ({
          ...oldState,
          attendees: oldState.attendees.filter(
            attendeeToCompare => attendeeId != attendeeToCompare,
          ),
        }));
        this.setState(oldState => ({
          ...oldState,
          attendeesName: oldState.attendeesName.filter(
            attendeeToCompare => attendeeNameMap[attendeeId] != attendeeToCompare,
          )
        }))
        var array1 =  this.props?.list.filter(x => this.state.attendeesName.indexOf(x.user.toLowerCase()) === -1);
          console.log(array1,"AAAAA", this.state.attendeesName)
        this.setState({join: array1});
      },
    );

    /**
     * Attendee Mute & Unmute handler
     */
    this.onAttendeesMuteSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesMute,
      attendeeId => {
        this.setState(oldState => ({
          ...oldState,
          mutedAttendee: oldState.mutedAttendee.concat([attendeeId]),
        }));
      },
    );

    this.onAttendeesUnmuteSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAttendeesUnmute,
      attendeeId => {
        this.setState(oldState => ({
          ...oldState,
          mutedAttendee: oldState.mutedAttendee.filter(
            attendeeToCompare => attendeeId != attendeeToCompare,
          ),
        }));
      },
    );

    /**
     * Video tile Add & Remove Handler
     */
    this.onAddVideoTileSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnAddVideoTile,
      tileState => {
        console.log(tileState, 'TILE');
        if (tileState.isScreenShare) {
          this.setState(oldState => ({
            ...oldState,
            screenShareTile: tileState.tileId,
          }));
          console.log(this.state.screenShareTile, 'SCREEN');
        } else {
          toDisplayVideoTile[tileState.attendeeId] = tileState.tileId;
          this.setState(oldState => ({
            ...oldState,
            videoTiles: oldState.videoTiles.includes(tileState.tileId)
              ? [...oldState.videoTiles]
              : [...oldState.videoTiles, tileState.tileId],
            selfVideoEnabled: tileState.isLocal
              ? true
              : oldState.selfVideoEnabled,
          }));
        }
      },
    );

    this.onRemoveVideoTileSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnRemoveVideoTile,
      tileState => {
        console.log(tileState, 'tileState');
        if (tileState.isScreenShare) {
          this.setState(oldState => ({
            ...oldState,
            screenShareTile: null,
          }));
        } else {
          this.setState(oldState => ({
            ...oldState,
            videoTiles: oldState.videoTiles.filter(
              tileIdToCompare => tileIdToCompare != tileState.tileId,
            ),
            selfVideoEnabled: tileState.isLocal
              ? false
              : oldState.selfVideoEnabled,
          }));
        }
      },
    );

    /**
     * Data message handler
     */
    this.onDataMessageReceivedSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnDataMessageReceive,
      dataMessage => {
        const str = `Received Data message (topic: ${dataMessage.topic}) ${dataMessage.data} from ${dataMessage.senderAttendeeId}:${dataMessage.senderExternalUserId} at ${dataMessage.timestampMs} throttled: ${dataMessage.throttled}`;
        console.log(str);
        NativeFunction.sendDataMessage(dataMessage.topic, str, 1000);
      },
    );

    /**
     * General Error handler
     */
    this.onErrorSubscription = getSDKEventEmitter().addListener(
      MobileSDKEvent.OnError,
      errorType => {
        switch (errorType) {
          case MeetingError.OnMaximumConcurrentVideoReached:
            Alert.alert(
              'Failed to enable video',
              'maximum number of concurrent videos reached!',
            );
            break;
          default:
            Alert.alert('Error', errorType);
            break;
        }
      },
    );
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState({meetingTime: this.state.meetingTime + 1});
      if (this.state.attendees.length > 1 && this.state.endTime != 0) {
        this.setState({endTime: 0});
      }
      if (this.state.attendees.length <= 1) {
        this.setState({endTime: this.state.endTime + 1});
        if (this.state.endTime == 300) {
          if (this.props.showResumeCall) {
            this.props.showResumeCallAction(false);
          }
          endMeetingRequest(this.props.meetingTitle);
          NativeFunction.stopMeeting();
        }
      }
      if (this.callDuration() >= 25) {
        this.setState({meetingAboutToEnd: true});
      }
      if (this.callDuration() >= 30) {
        endMeetingRequest(this.props.meetingTitle);
        NativeFunction.stopMeeting();
        this.props.showResumeCallAction(false);
      }
    }, 1000);
  }

  callDuration() {
    let currentTime = new Date().getTime();
    let meetingStartTime = this.props.meetingTitle.split(' ')[5];
    let meetingStartMonth = this.props.meetingTitle.split(' ')[2];
    let meetingStartDate = this.props.meetingTitle.split(' ')[3];
    let meetingStartYear = this.props.meetingTitle.split(' ')[4];
    const monthObject = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    let meetingDate =
      monthObject[meetingStartMonth] +
      '/' +
      meetingStartDate +
      '/' +
      meetingStartYear;
    let dateString = `${meetingDate} ${meetingStartTime}`;
    let date = new Date(dateString);
    let milliseconds = date.getTime();
    let difference = currentTime - milliseconds;
    let resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes;
  }

  toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.log('screen sharing off');
    NativeFunction.setScreenSharing(false);
    NativeFunction.stopMeeting();
    if (this.onAttendeesJoinSubscription) {
      this.onAttendeesJoinSubscription.remove();
    }
    if (this.onAttendeesLeaveSubscription) {
      this.onAttendeesLeaveSubscription.remove();
    }
    if (this.onAttendeesMuteSubscription) {
      this.onAttendeesMuteSubscription.remove();
    }
    if (this.onAttendeesUnmuteSubscription) {
      this.onAttendeesUnmuteSubscription.remove();
    }
    if (this.onAddVideoTileSubscription) {
      this.onAddVideoTileSubscription.remove();
    }
    if (this.onRemoveVideoTileSubscription) {
      this.onRemoveVideoTileSubscription.remove();
    }
    if (this.onDataMessageReceivedSubscription) {
      this.onDataMessageReceivedSubscription.remove();
    }
    if (this.onErrorSubscription) {
      this.onErrorSubscription.remove();
    }
  }

  setHeight() {
    if (this.state.attendees.length <= 4) {
      return Dimensions.get('window').height / this.state.attendees.length;
    } else {
      return 200;
    }
  }

  setMarginBotton() {
    if (this.state.attendees.length < 4) {
      return 10;
    } else {
      return 50;
    }
  }
  render() {
    const leaveCallsData = {
      userId: this.props.userDetail.id,
      startTime: '',
      endTime: new Date(),
      videoCallSession: this.props.meetingTitle,
      callStatus: 'leave-Call',
    };
    const endCallsData = {
      userId: this.props.userDetail.id,
      startTime: '',
      endTime: new Date(),
      videoCallSession: this.props.meetingTitle,
      callStatus: 'end-Call',
    };
    const currentMuted = this.state.mutedAttendee.includes(
      this.props.selfAttendeeId,
    );

    return (
      <View
        style={
          this.state.screenShareButton
            ? {
                borderWidth: 4,
                marginBottom: this.state.meetingAboutToEnd ? 175 : 150,
                borderColor: 'yellow',
                backgroundColor: '#1B1534',
              }
            : {
                backgroundColor: '#1B1534',
                marginBottom: this.state.meetingAboutToEnd ? 175 : 150,
              }
        }>
        <TouchableOpacity
          style={{
            backgroundColor: '#1B1534',
            width: '100%',
            height: 30,
            justifyContent: 'center',
          }}
          onPress={() => {
            NativeFunction.setCameraOn(false)
            this.props.showMeetingRoomAction(false)
            this.props.showResumeCallAction(true)
          }}>
          <Text style={{color: 'white', marginLeft: 10}}>
            Click here to go back
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <View style={{flex: 0.5, flexDirection: 'row'}}>
            <HangOffButton
              onPress={() => this.setState({endCallVisible: true})}
            />
            <Text style={[styles.title, {color: 'white'}]}>
              {this.toHHMMSS(this.state.meetingTime)}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <MuteButton
              muted={currentMuted}
              onPress={() => NativeFunction.setMute(!currentMuted)}
            />
            <CameraButton
              onPress={() =>
                NativeFunction.setCameraOn(!this.state.selfVideoEnabled)
              }
              disabled={this.state.selfVideoEnabled}
            />
            {this.state.selfVideoEnabled && (
              <RotateCameraButton
                onPress={() => NativeFunction.rotateCamera()}
              />
            )}
            <AttendeeButton
              onPress={() => this.setState({modalVisible: true})}
            />
            {!this.state.screenShareButton ? (
              <ShareScreenButton
                onPress={() => {
                  if (this.state.screenShareTile) {
                    Alert.alert(
                      'Screen sharing: ',
                      'Already screen has been shared by one of the participant.',
                    );
                  } else {
                    this.setState({
                      screenShareButton: true,
                    });
                    NativeFunction.setScreenSharing(true);
                  }
                }}
              />
            ) : (
              <StopScreenShare
                onPress={() => {
                  this.setState({
                    screenShareButton: false,
                  });
                  console.log('screen sharing off');
                  NativeFunction.setScreenSharing(false);
                }}
              />
            )}
          </View>
        </View>
        {this.state.attendees.length > 1 ? null : (
          <Text style={{backgroundColor: 'yellow', padding: 10}}>
            If no one joins in {this.toHHMMSS(300 - this.state.endTime)} minutes
            , Meeting will be ended automatically.
          </Text>
        )}
        {this.state.meetingAboutToEnd ? (
          <Text style={{backgroundColor: 'yellow', padding: 10}}>
            The call will be automatically ended in 5 mins.
          </Text>
        ) : null}
        {!!this.state.screenShareTile ? (
          <ScrollView style={{height: Dimensions.get('window').height}}>
            <RNVideoRenderView
              style={{
                width: '100%',
                height: Dimensions.get('window').height - 100,
              }}
              key={this.state.screenShareTile}
              tileId={this.state.screenShareTile}
            />
          </ScrollView>
        ) : (
          <ScrollView>
            {this.state.attendees.length > 0 && (
              <View style={{flex: 1}}>
                {this.state.attendees.map(attendeeIdForTile => {
                  if (
                    attendeeNameMap[attendeeIdForTile] &&
                    toDisplayVideoTile[attendeeIdForTile] != null &&
                    this.state.videoTiles?.length > 0 &&
                    this.state.videoTiles.includes(
                      toDisplayVideoTile[attendeeIdForTile],
                    )
                  ) {
                    return (
                      <View
                        style={{
                          width: '100%',
                          backgroundColor: '#1B1534',
                          borderWidth: 2,
                          borderColor: '#FFFFFF',
                        }}>
                        <RNVideoRenderView
                          style={[
                            styles.video,
                            {
                              width: '100%',
                              height: this.setHeight(),
                            },
                          ]}
                          key={parseInt(toDisplayVideoTile[attendeeIdForTile])}
                          tileId={parseInt(
                            toDisplayVideoTile[attendeeIdForTile],
                          )}
                        />
                        <Text style={{color: '#FFFFFF', marginLeft: 10}}>
                          {attendeeNameMap[attendeeIdForTile]}
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          backgroundColor: '#1B1534',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: Dimensions.get('window').width,
                          height: this.setHeight(),
                          borderWidth: 2,
                          borderColor: '#FFFFFF',
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontFamily: 'SiemensSans-Bold',
                            fontSize: 20,
                            textAlign: 'center',
                          }}>
                          {attendeeNameMap[attendeeIdForTile]}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
            )}
          </ScrollView>
        )}
        <Modal
          onDismiss={() => this.setState({endCallVisible: false})}
          contentContainerStyle={{
            alignSelf: 'center',
            backgroundColor: 'white',
            padding: 20,
            width: '60%',
            borderRadius: 20,
          }}
          visible={this.state.endCallVisible}>
          {this.state.attendees.length > 1 ? (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                borderBottomWidth: this.state.attendees.length > 1 ? 0 : 1,
                borderBottomColor: '#eee',
                paddingBottom: this.state.attendees.length > 1 ? 0 : 10,
              }}
              onPress={() => {
                this.setState({
                  screenShareButton: false,
                });
                console.log('screen sharing off');
                NativeFunction.setScreenSharing(false);
                NativeFunction.stopMeeting();
                Utils.postSaveCalls(
                  this.props.ipPortData,
                  this.props.accessToken,
                  leaveCallsData,
                  this.props.tenantId,
                ).then(response => {
                  console.log(response, 'SAVE LEAVE CALLS');
                });
              }}>
              <Text>Leave the call</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                paddingTop: this.state.attendees.length > 1 ? 10 : 0,
              }}
              onPress={() => {
                this.setState({
                  screenShareButton: false,
                });
                console.log('screen sharing off');
                NativeFunction.setScreenSharing(false);
                endMeetingRequest(this.props.meetingTitle);
                NativeFunction.stopMeeting();
                this.props.showVideoCallNotificationAction('');
                this.props.doNotShowVideoCallAgainAction(false);
                Utils.postSaveCalls(
                  this.props.ipPortData,
                  this.props.accessToken,
                  endCallsData,
                  this.props.tenantId,
                ).then(response => {
                  console.log(response, 'SAVE END CALLS');
                });
              }}>
              <Text> End the call</Text>
            </TouchableOpacity>
          )}
        </Modal>
        <Modal
          visible={this.state.modalVisible}
          onDismiss={() => {
            this.setState({modalVisible: !this.state.modalVisible});
          }}>
          <View
            style={{
              height: '60%',
              marginTop: '120%',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: 500,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                margin: 10,
              }}>
              <View style={{flex: 0.95, flexDirection: 'row'}}>
                <Contact style={{margin: 10}} />
                <Text style={styles.title}>Contacts</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: !this.state.modalVisible});
                }}>
                <Close style={{marginTop: 10}} height={20} width={20} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={this.state.attendees}
                renderItem={({item}) => (
                  <AttendeeItem
                    meetingTitle={this.props.meetingTitle}
                    attendeeName={
                      attendeeNameMap[item] ? attendeeNameMap[item] : item
                    }
                    muted={this.state.mutedAttendee.includes(item)}
                    mutedList={true}
                  />
                )}
                keyExtractor={item => item}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontFamily: 'SiemensSans-Bold',
                }}>
                Others
              </Text>
              <FlatList
                data={this.state.join}
                renderItem={({item}) => (
                  <AttendeeItem
                    meetingTitle={this.props.meetingTitle}
                    attendeeName={
                      item.firstName && item.lastName
                        ? `${item.firstName} ${item.lastName}`
                        : item.firstName
                    }
                    department={item.department}
                    listJoin={true}
                    listItem={item}
                    maxLimit={this.state.attendees.length >= 8 ? true : false}
                    userDetail={this.props.userDetail}
                  />
                )}
              />
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    showResumeCall: state.showResumeCall,
    showRoomName: state.showRoomName,
    showMeetingRoom: state.showMeetingRoom,
    ipPortData: state.ipPortData,
    accessToken: state.accessToken,
    tenantId: state.tenantId,
    userDetail: state.userDetail,
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
    showVideoCallNotificationAction: meeting => {
      dispatch(AllActions.showVideoCallNotificationAction(meeting));
    },
    doNotShowVideoCallAgainAction: meeting => {
      dispatch(AllActions.doNotShowVideoCallAgainAction(meeting));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
