import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AllActions from '../redux/AllActions';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/ProfileCss';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import SVGNotificationIcon from '../assets/notification.svg';
import SVGHomeIcon from '../assets/Home.svg';
import SVGDocumentIcon from '../assets/document.svg';
import SVGDocumentSelectedIcon from '../assets/documentSelected.svg';
import SVGTaskManagerIcon from '../assets/task-manager.svg';
import SVGRightArrow from '../assets/About-arrow.svg';
import SVGLogoutIcon from '../assets/logout.svg';
import SVGBackIcon from '../assets/arrow-left-small.svg';
import SVGParametersIcon from '../assets/parameters.svg';
import SVGParametersSelectedIcon from '../assets/parametersSelected.svg';
import SVGNext from '../assets/Next.svg';
import SVGAnalyze from '../assets/analyze.svg';
import SVGClose from '../assets/close_white.svg';
import SVGVideoCall from '../assets/videocallsvg.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteFile } from '../utils/ReadWriteFunc';
import { Utils } from './Common/Utils';
import { LoginCommonCss } from '../css/CommonCss';
import SVGParametersSelectedTealIcon from '../assets/parametersSelectedTeal.svg';
import SVGParametersGreyIcon from '../assets/parameters_normal_grey.svg';
import SVGDocumentSelectedTealIcon from '../assets/document_selected_teal.svg';
import SVGDocumentGreyIcon from '../assets/document_grey.svg';
import SVGTrendsSelectedIcon from '../assets/trends_selected.svg';
import SVGTrendsTealIcon from '../assets/trends_selected_teal.svg';
import SVGTrendsIcon from '../assets/trends.svg';
import SVGTrendsGreyIcon from '../assets/trends_grey.svg';
import { NativeFunction } from './VideoCall/utils/Bridge';


//start of share , locate  , document and navigate icons
const DocumentIcon = props => {
  const path = require('../assets/file.png');
  const dispatch = useDispatch();
  const offlineOnlineMode = useSelector(state => state.offlineOnlineMode);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (offlineOnlineMode) dispatch(AllActions.openDocument());
        }}>
        <Image style={{ height: 20, width: 20 }} source={path} />
      </TouchableOpacity>
    </>
  );
};

const ShareIcon = props => {
  const path = require('../assets/share-newton-android.png');
  const dispatch = useDispatch();
  const offlineOnlineMode = useSelector(state => state.offlineOnlineMode);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (offlineOnlineMode) {
            dispatch(AllActions.openShareToModal(props.id));
          }
        }}>
        <Image style={{ height: 20, width: 20 }} source={path} />
      </TouchableOpacity>
    </>
  );
};

const LocateIcon = ({ imageSource, focused }) => {
  const path = require('../assets/location-pin.png');
  return (
    <>
      <TouchableOpacity>
        <Image style={{ height: 20, width: 20 }} source={path} />
      </TouchableOpacity>
    </>
  );
};

const NavigateIcon = ({ imageSource, focused }) => {
  const path = require('../assets/Arrowupwards.png');
  return (
    <>
      <TouchableOpacity>
        <Image style={{ transform: [{ rotateZ: '45deg' }] }} source={path} />
      </TouchableOpacity>
    </>
  );
};
//End of share ,navigate , locate , document icon

//start of bottom icons

const BottomBellIcon = props => {
  const navigation = useNavigation();
  return (
    <>
      {props.isFocused ? (
        <TouchableOpacity
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Parameter');
          }}>
          {/* <Image
            resizeMode="contain"
            source={require('../assets/parametersHigh.png')}
          /> */}
          {/* <SVGParametersSelectedIcon height={30} width={30} /> */}
          {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGParametersSelectedIcon height={30} width={30} />}
          {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGParametersSelectedTealIcon height={30} width={30} />}
          <Text style={{ color: LoginCommonCss.buttonBackground(), marginTop: 5, fontSize: 12, }}>Parameter</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Parameter');
          }}>
          {/* <Image style={{ tintColor: '#000028' }} resizeMode="contain" source={require('../assets/parameters.png')} /> */}
          {/* <SVGParametersIcon height={30} width={30} /> */}
          {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGParametersIcon height={30} width={30} />}
          {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGParametersGreyIcon height={30} width={30} />}
          <Text style={{ color: LoginCommonCss.parameterScreenBottomTabs(), marginTop: 5, fontSize: 12, }}>Parameter</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const BottomNavigateIcon = props => {
  const navigation = useNavigation();
  return (
    <>
      {props.isFocused ? (
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Navigation');
          }}>
          {/* <Image
            style={{ tintColor: LoginCommonCss.buttonBackground() }}
            resizeMode="contain"
            source={require('../assets/trends.png')}
          /> */}
          {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGTrendsSelectedIcon height={30} width={30} />}
          {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGTrendsTealIcon height={30} width={30} />}
          <Text style={{ color: LoginCommonCss.buttonBackground(), marginTop: 5, fontSize: 12, }}>Trends</Text>
        </TouchableOpacity>

      ) : (
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Navigation');
          }}>
          {/* <Image
            style={{ tintColor: '#000028' }}
            resizeMode="contain"
            source={require('../assets/trends.png')}
          /> */}
          {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGTrendsIcon height={30} width={30} />}
          {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGTrendsGreyIcon height={30} width={30} />}
          <Text style={{ color: LoginCommonCss.parameterScreenBottomTabs(), marginTop: 5, fontSize: 12, }} >Trends</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const BottomScanIcon = props => {
  const navigation = useNavigation();
  return (
    <>
      {props.isFocused ? (
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('BottomScan');
          }}>
          {/* <SVGDocumentSelectedIcon height={20} width={20} /> */}
          {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGDocumentSelectedIcon height={20} width={20} />}
          {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGDocumentSelectedTealIcon height={20} width={20} />}
          <Text style={{ color: LoginCommonCss.buttonBackground(), marginTop: 5, fontSize: 12, }}>Documents</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('BottomScan');
          }}>
          {/* <SVGDocumentIcon height={20} width={20} /> */}
          {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGDocumentIcon height={20} width={20} />}
          {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGDocumentGreyIcon height={20} width={20} />}
          <Text style={{ color: LoginCommonCss.parameterScreenBottomTabs(), marginTop: 5, fontSize: 12, }}>Documents</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
//end of bottom icons

//start of drawer icon
const DrawerIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Image resizeMode="contain" source={require('../assets/menu.png')} />
    </TouchableOpacity>
  );
};
//end of drawer  icon


//notification Icon
const NotificationIcon1 = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => {
      dispatch(AllActions.openNotificationPanel());
    }}>
      <SVGNotificationIcon />
    </TouchableOpacity>
  );
};


const BackIconPass = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ padding: 12, }} onPress={() => navigation.goBack()}>
      <SVGBackIcon />
    </TouchableOpacity>
  );
};


const BackIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.goBack()}>
      <SVGBackIcon />
    </TouchableOpacity>
  );
};

//start of notification bell icon
const NotificationIcon = () => {

  const dispatch = useDispatch();
  const notificationData = useSelector(state => state.allNotificationData);
  const showVideoCallNotification = useSelector(state => state.showVideoCallNotification)
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(AllActions.openNotificationPanel());
      }}>
      <Image
        resizeMode="contain"
        source={require('../assets/NotifyBell.png')}
      />
      {notificationData?.length > 0 || showVideoCallNotification ? (
        <View
          style={{
            position: 'absolute',
            height: 15,
            width: 15,
            top: 1,
            right: -3,
            backgroundColor: '#F6E600',
            borderRadius: 20,
            borderWidth: 2,
          }}>
          <Text
            style={{
              position: 'relative',
              left: 2.5,
              bottom: 1,
              fontSize: 9,
            }}>
            {notificationData.length + showVideoCallNotification.length}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
//end of Notification bell icon

//start of Drawer icon such as home terms and condition and my tasks
const DrawerHomeIcon = ({ nav, title, navigation }) => {
  return (
    <View style={styles.items}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate(nav)
      }}>
        <SVGHomeIcon width={16} height={20} />
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const DrawerTaskIcon = ({ nav, title, navigation }) => {
  return (
    <View style={styles.items}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate(nav)
      }}>
        <SVGTaskManagerIcon width={15} height={20} />
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const DrawerDocumentIcon = ({ nav, title, navigation }) => {
  return (
    <View style={styles.items}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate(nav)
      }}>
        <SVGDocumentIcon width={15} height={20} />
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}
const DrawerAnalyzeIcon = ({ nav, title, navigation }) => {
  return (
    <View style={styles.items}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate(nav)
      }}>
        <SVGAnalyze width={20} height={30} />
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const DrawerVideoCallIcon = ({ nav, title, navigation }) => {
  return (
    <View style={styles.items}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate(nav, {videoCall:"Video Call"})
      }}>
        <SVGVideoCall width={20} height={30} />
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}


const DrawerIcons = props => {
  const navigation = useNavigation();
  return (
    <>
      {
        props.icon === 'Home' && <DrawerHomeIcon navigation={navigation} nav={'Assets'} title={props.text} />
      }
      {
        props.icon === 'Tasks' && <DrawerTaskIcon navigation={navigation} nav={'Tabs'} title={props.text} />
      }
      {
        props.icon === 'DocumentRepository' && <DrawerDocumentIcon navigation={navigation} nav={'DocumentRepository'} title={props.text} />
      }
      {
        props.icon === 'Analyze' && <DrawerAnalyzeIcon navigation={navigation} nav={'Analyze'} title={props.text} />
      }
      {
        props.icon === 'VideoCall' && <DrawerVideoCallIcon navigation={navigation} nav={'Assets'} title={props.text} />
      }

    </>
  )
};

//end of Drawer icon such as home terms and condition and my tasks

//start of logout icon

const loggedOutUser = (accessToken, loggedInUser, ipPortData, dispatch, tenantId, deviceToken) => {
  const headers = {
    Authorization: accessToken,
    'Content-Type': 'application/json',
  };

  console.log(`${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/i/users/logout`);
  
  const json = JSON.stringify({
    login: loggedInUser.login,
    keyCloakId: loggedInUser.keyCloakId,
  });
  console.log(json);
  axios
    .post(
      `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/i/users/logout`,
      json,
      { headers },
    )
    .then(async (response) => {
      console.log(response.data, "log out message");
      if (response.data.status === 200) {
        await AsyncStorage.removeItem('@Key')
        await AsyncStorage.removeItem('@username');
        await AsyncStorage.removeItem('@hostname');
        await AsyncStorage.removeItem('@port');
        await AsyncStorage.removeItem('@protocol');
        await AsyncStorage.removeItem('@tenantId');
        Utils.deleteDeviceTokenOnLogin(ipPortData, accessToken, deviceToken, dispatch, tenantId)
          .then((res) => {
            console.log("response ->",res)
          })
          .catch((err) => {
            console.log('error while deleting token ->', err);
          })
        dispatch(AllActions.userLoggedOut(''));
        deleteFile(JSON.stringify({}))
          .then(() => {
            console.log('file deleted successfully....')
          })
          .catch(err => {
            console.log(err);
          });

      }
    })
    .catch(err => {
      console.log('logout error', err);
    });
};

const LogoutIcon = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accessToken = useSelector(state => state.accessToken);
  const loggedUser = useSelector(state => state.userDetail);
  const ipPortData = useSelector(state => state.ipPortData);
  const offlineOnlineMode = useSelector(state => state.offlineOnlineMode);
  const tenantId = useSelector(state => state.tenantId);
  const deviceToken = useSelector(state => state.deviceToken);
  
  return (
    <View style={styles.drawerBorder}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          if (offlineOnlineMode) {
            loggedOutUser(accessToken, loggedUser, ipPortData, dispatch, tenantId, deviceToken);
            dispatch(AllActions.showMeetingRoomAction(false));
            dispatch(AllActions.showResumeCallAction(false));
            NativeFunction.setScreenSharing(false);
            NativeFunction.stopMeeting();
          } else {
            dispatch(AllActions.userLoggedOut(''));
            dispatch(AllActions.getUserDetails({}));
            dispatch(AllActions.showMeetingRoomAction(false));
            dispatch(AllActions.showResumeCallAction(false));
            NativeFunction.setScreenSharing(false);
            NativeFunction.stopMeeting();
          }
        }}>
        <SVGLogoutIcon height={15} width={20} />
        <Text style={styles.logoutText}>Logout</Text>
        
      </TouchableOpacity>

    </View>
  );
};


//Help
const HelpIcon = () => {
  return (
    <View style={styles.drawerBorder1}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert('you clicked About');
        }}>
        <Image
          style={styles.logoutIcon}
          source={require('../assets/question.png')}
        />
        <Text style={styles.logoutText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

//About
const AboutIcon = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonContainer} >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TermsOfUse')
        }}>
        <SVGRightArrow height={15} width={15} />
        <Text style={styles.logoutText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
//Legal And Imprints
const LegalImprintIcon = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CorporateInformation');
        }}>
        <Image
          source={require('../assets/Legal_pos.png')}
        />
        <Text style={styles.logoutText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

//siemensenergy


//EyeIcon
const EyeIcon = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={{ height: 20, window20 }}
        onPress={() => {
          alert('you clicked LegalImprintIcon');
        }}>
        <Image
          source={require('../assets/show.png')}
        />
      </TouchableOpacity>
    </View>
  );
};


//start of check mark for shared asset
const CheckMarkIcon = props => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.userDetail);
  const accessToken = useSelector(state => state.accessToken);
  const ipPortData = useSelector(state => state.ipPortData);
  const allNotificationData = useSelector(state => state.allNotificationData);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          dispatch(AllActions.markAsReadId(props.id));
          dispatch(AllActions.loading());
          allNotificationData?.map((val, i) => {
            props.id = val.assetId ? allNotificationData.splice(i, 1) : null;
          });
          const headers = {
            Authorization: accessToken,
          };
          axios
            .post(
              `http://${ipPortData.ip}:${ipPortData.port}/api/asset/shared-tags/mark-complete?assetId=${props.id}&userNameTo=${loggedInUser.login}`,
              {},
              { headers },
            )
            .then(response => {
              axios
                .get(
                  `http://${ipPortData.ip}:${ipPortData.port}/api/asset/shared-tags/user-notifications?userNameTo=${loggedInUser.login}`,
                  { headers },
                )
                .then(res => {
                  if (
                    res.data.message == 'Successfully fetched record(s).'
                  ) {
                    console.warn(res.data.result, "notification data result")
                    dispatch(
                      AllActions.setNotificationData(res.data.result),
                    );
                  } else {
                    dispatch(AllActions.setNotificationData());
                  }
                })
                .catch(err => {
                  dispatch(AllActions.loading());

                });
            })
            .catch(err => {
              dispatch(AllActions.loading());
              console.log(err);
            });

          dispatch(AllActions.loading());
        }}>
        <Image source={require('../assets/check-mark.png')} />
      </TouchableOpacity>
    </>
  );
};


const ParameterIcon = ({ kksTag, path }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Parameter', { kksTag: kksTag, menuHeadername: path });
        }}>
        <SVGNext />
      </TouchableOpacity>
    </View>
  );
};

const CrossIcon = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Assets');
        }}>
        <SVGClose />
      </TouchableOpacity>
    </View>
  );
};

const VideoCallIcon = (nav) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Assets', {videoCall:"Video Call"})
        }}>
        <SVGVideoCall />
      </TouchableOpacity>
    </View>
  );
};


const AlertDataIcon = (props) => {
  const { data } = props;
  const [showAlertCircle, setShowAlertCircle] = useState(true);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowAlertCircle(showAlertCircle => !showAlertCircle);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (<>{data.item.color == '#FF0000' ? (
    <Icon
      size={20}
      style={[{ display: showAlertCircle ? 'none' : 'flex' }]}
      name="alert-circle"
      type="ionicon"
      color="red"
    />
  ) : (
    <></>
  )}</>)
}


export {
  BottomBellIcon,
  BottomNavigateIcon,
  BottomScanIcon,
  DrawerIcon,
  NotificationIcon,
  DrawerIcons,
  LogoutIcon,
  CheckMarkIcon,
  BackIcon,
  HelpIcon,
  AboutIcon,
  LegalImprintIcon,
  NotificationIcon1,
  BackIconPass,
  ParameterIcon,
  VideoCallIcon,
  CrossIcon,
  AlertDataIcon,
  EyeIcon,
};
