import React, { useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AllActions from '../redux/AllActions';
import {useDispatch, connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Button, Divider} from 'react-native-paper';
import axios from 'axios';
import { width } from '../utils/Constants';
import { Utils } from '../components/Common/Utils';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

const Header = props => {
  const {clearData} = props;  
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
      }}>
      <Text style={{fontFamily: 'SiemensSans-Bold', fontSize: 17}}>
        Notifications
      </Text>
      <TouchableOpacity
        >
        <Text
          style={{
            fontFamily: 'SiemensSans-Roman',
            color: '#004669',
            fontSize: 15,
          }}
           onPress={() => {
            // alert('clear all')
            clearData()
           }}
        >
          Clear all
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NotificationData = ({item}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Image
            style={{
              tintColor: '#004669',
              height: 20,
              width: 20,
              transform: [{rotateZ: '180deg'}],
            }}
            source={require('../assets/level-up.png')}></Image>
          <Text
            style={{
              marginLeft: 5,
              fontFamily: 'SiemensSans-Bold',
              fontSize: 12,
            }}>
            New Tag Shared
          </Text>
        </View>
        <View style={{padding: 5}}>
          <Text style={{fontFamily: 'SiemensSans-Roman', fontSize: 12}}>
            23 minutes ago
          </Text>
        </View>
      </View>
      <View style={{marginBottom: 5}}>
        <TouchableOpacity>
          <Text
            style={{
              paddingLeft: 25,
              fontFamily: 'SiemensSans-Roman',
              fontSize: 14,
              color: '#004669',
            }}>
            A new asset with kks id: {item?.id} has been shared with you.
          </Text>
        </TouchableOpacity>
      </View>
      <Divider />
    </View>
  );
};

const Notification = props => {
  const notificationPanel = props.notificationPanel;
  const notificationData = props.allNotificationData;
  const userDetail = props.userDetail;
  const accessToken = props.accessToken;
  const ipPortData = props.ipPortData;
  const navigation = useNavigation();
  const hideModal = () => props.showVideoCallNotificationAction('');
  const dispatch = useDispatch();

  const clearAll = () => {
    dispatch(AllActions.setNotificationData([]))
  }
  const join = () => {
    const callsData = {
        "userId":  userDetail.id,
        "startTime": new Date(),
        "endTime": "",
        "videoCallSession": props.showVideoCallNotification,
        "callStatus": "join-Call"
    }
    Utils.postSaveCalls(ipPortData, accessToken, callsData, props.tenantId)
        .then(response => {
            console.log(response, "JOIN DATA|| GUEST || BELL ICON")
        })
    props.closeNotificationPanel()
    props.showRoomNameAction(props.showVideoCallNotification)
    props.showMeetingRoomAction(true)
    }
  React.useEffect(() => {
    console.log(notificationData, "allNotificationData", "hello")
  
  },[notificationData])
  

  PushNotification.configure({
    onNotification: function (notification) {
        if (!notification?.data) {
            return;
           }
           console.log(notification,"NNNNNN--------222222222")
        notification.userInteraction = true;
        onMessageReceived(notification)
    },

    requestPermissions: Platform.OS === 'android',
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

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

  useEffect(() => {
    // alert(notificationData.length)

    const unsubscribeOnMessage = messaging().onMessage(onMessageReceived);
    const unsubscribesetBackgroundMessageHandler =
      messaging().setBackgroundMessageHandler(onMessageReceived);
    return () => {
      unsubscribeOnMessage, unsubscribesetBackgroundMessageHandler;
    };
  }, []);
  async function onMessageReceived(message) {
    console.log(message.data, "message notification")
    if ( message.data["Notification-type"] === "task") {
      
      console.log(message, "task notification message")
      dispatch(AllActions.setNotificationData([{
        id: message.data.taskId,
        desc: message.data.body

    }]))
    }
  }

  const getNotificationData = (value) => {
    const result =  value.filter((data) => data?.desc != null )
    let resultData = new Set();
    let resultArr = [];
    for(let res of result) {
      console.log(JSON.stringify(res), "JSON.stringify(res)")
      if(!resultArr.includes(JSON.stringify(res))) {
        resultArr.push(JSON.stringify(res)) 
        resultData.add(res)
      }
           
    }
    console.log(resultData, "result")
    return [...resultData];

  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={notificationPanel}
        onRequestClose={() => {
          props.closeNotificationPanel();
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => {
              props.closeNotificationPanel();
            }}
            style={{
              height: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              width: width,
              backgroundColor: 'rgb(255,255,255,0.5)',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: '60%',
                  width: '85%',
                  backgroundColor: '#fff',
                  marginRight: 10,
                  marginTop: 60,
                  borderWidth: 1
                }}>
                <View
                  style={[
                    styles.triangle,
                    {position: 'absolute', top: -25, right: 2},
                  ]}></View>
                <Header data={props} clearData={clearAll} />
                <View style={{width: '100%'}}>
                  <Divider />
                </View>
                {props.showVideoCallNotification || notificationData ? (
                  <SafeAreaView style={{flex: 1}}>
                    {props.showVideoCallNotification ? (
                      <View style={{padding: 10}}>
                        <Text>{props.showVideoCallNotification}</Text>
                        <Divider
                          style={{width: '100%', height: 1, marginTop: 10}}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}>
                          <Button
                            style={{
                              fontSize: 14,
                              fontFamily: 'SiemensSans-Roman',
                            }}
                            onPress={() => {
                              hideModal()
                              props.showMeetingRoomAction(false)
                              props.showVideoCallNotificationAction('')
                              props.doNotShowVideoCallAgainAction(false)
                            }}>
                            Cancel
                          </Button>
                          <Button
                            style={{
                              fontSize: 14,
                              fontFamily: 'SiemensSans-Roman',
                            }}
                            onPress={join}>
                            Join Meeting
                          </Button>
                        </View>
                      </View>
                    ) : null}
                   
                    {notificationData?.length > 0 ? (
                      <FlatList
                        data={getNotificationData(notificationData)}
                        renderItem={item => (
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
                                  justifyContent: 'flex-end',
                              }}>
                              <View style={{flexDirection: 'row', padding: 5}}>
                                {/* <Image
                                  style={{
                                    tintColor: '#004669',
                                    height: 20,
                                    width: 20,
                                    transform: [{rotateZ: '180deg'}],
                                  }}
                                  source={require('../assets/level-up.png')}></Image> */}
                                {/* <Text
                                  style={{
                                    marginLeft: 5,
                                    fontFamily: 'SiemensSans-Bold',
                                    fontSize: 12,
                                  }}>
                                  {item?.item?.id}
                                </Text> */}
                              </View>
                              <View
                                style={{
                                  // flexDirection: 'row',
                                  // justifyContent: 'flex-end',
                                  // marginLeft: 200,
                                  // padding: 5,
                                  
                                }}>                  
                                <Text
                                  style={{
                                    fontFamily: 'SiemensSans-Roman',
                                    fontSize: 12,
                                  }}>
                                  {item?.item?.taskName}
                                </Text>
                              </View>
                            </View>
                            <View style={{marginBottom: 5}}>
                              <TouchableOpacity
                                onPress={() => {
                                  props.onSearchTermChange(item?.item?.assetId);
                                  props.closeNotificationPanel();
                                  props.readOneNotification(
                                    item?.item?.id,
                                    item?.item?.assetKksTag,
                                    userDetail.login,
                                    accessToken,
                                    ipPortData,
                                    notificationData,
                                  );
                                  navigation.push('Tabs')
                                }}>
                                <Text
                                  style={{
                                    paddingLeft: 25,
                                    fontFamily: 'SiemensSans-Roman',
                                    fontSize: 14,
                                    color: '#004669',
                                    padding: 5
                                  }}>
                                  {item?.item?.desc}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <Divider />
                          </View>
                        )}
                        keyExtractor={item => item?.id}
                      />
                    ) : null}
                    {/* (
                    <Text
                      style={{
                        fontFamily: 'SiemensSans-Bold',
                        padding: 15,
                        fontSize: 15,
                      }}>
                      {' '}
                      No New Notification Found{' '}
                    </Text>
                  )  */}
                  </SafeAreaView>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'SiemensSans-Bold',
                      padding: 15,
                      fontSize: 15,
                    }}>
                    {' '}
                    No New Notification Found{' '}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    marginLeft: 5,
    marginTop: 2.3,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 23,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
  },
});

const mapPropsToState = state => {
  return {
    notificationPanel: state.notificationPanel,
    allNotificationData: state.allNotificationData,
    userDetail: state.userDetail,
    accessToken: state.accessToken,
    ipPortData: state.ipPortData,
    showVideoCallNotification: state.showVideoCallNotification,
    showRoomName: state.showRoomName,
    tenantId: state.tenantId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchTermChange: value => {
      dispatch(AllActions.setSelectedSharedAsset(value));
    },
    closeNotificationPanel: () => {
      dispatch(AllActions.closeNotificationPanel());
    },
    readOneNotification: (
      id,
      assetKksTagName,
      loggedInUser,
      accessToken,
      ipPortData,
      allNotificationData,
    ) => {
      const headers = {
        Authorization: accessToken,
      };
      axios
        .post(
          `http://${ipPortData.ip}:${ipPortData.port}/api/asset/shared-tags/mark-one-read?id=${id}&userNameTo=${loggedInUser}`,
          {},
          {headers},
        )
        .then(response => {
          dispatch(
            AllActions.setSelectedKksTagFromNotification(assetKksTagName),
          );
        })
        .catch(err => {
          console.log('mark one as read error', err);
        });
    },
    showVideoCallNotificationAction: meeting => {
      dispatch(AllActions.showVideoCallNotificationAction(meeting));
    },
    showRoomNameAction: meeting => {
      dispatch(AllActions.showRoomNameAction(meeting));
    },
    showMeetingRoomAction: meeting => {
      dispatch(AllActions.showMeetingRoomAction(meeting));
    },
    doNotShowVideoCallAgainAction: meeting => {
      dispatch(AllActions.doNotShowVideoCallAgainAction(meeting));
    }
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Notification);
