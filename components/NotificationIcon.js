/*
 * @author : Poulami Manna
 * @description : Notification Bell Icon Page
 */

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AllActions from '../redux/AllActions';
import { connect } from 'react-redux';


const NotificationIcon = props => {  
  const notificationData = props.allNotificationData;
  const showVideoCallNotificationData = props.showVideoCallNotification
  React.useEffect(() => {
    console.log(notificationData, "notification Data")
  }, [props])


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
    console.log(resultData.size, "result.size")
    if(showVideoCallNotificationData) {
      return resultData.size + 1
    }
    return resultData.size;

  }
  
  

  return (
    <TouchableOpacity
      onPress={() => {
        props.openNotificationPanel();
      }}>
      <Image
        resizeMode="contain"
        source={require('../assets/notification.png')}
      />
      {notificationData?.length > 0 ? (
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
              // bottom: 1,
              fontSize: 9,
              top: -1
            }}>
            {getNotificationData(notificationData)}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>

  );
};

const mapStateToProps = state => {
  return {
    allNotificationData: state.allNotificationData,
    showVideoCallNotification: state.showVideoCallNotification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openNotificationPanel: () => {
      dispatch(AllActions.openNotificationPanel());
    },
    closeNotificationPanel: () => {
      dispatch(AllActions.closeNotificationPanel());
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon);
