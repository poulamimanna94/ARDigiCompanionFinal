/*
 * @author : Chahat chugh
 * @description : Number of Attendee in a call
 */

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../Styles';
import {Checkbox} from 'react-native-paper';
import {Utils} from '../../Common/Utils';
import AttendeeList from '../assets/attendee.svg';
import PhoneDisabled from '../assets/microphone-muted.svg';
import Phone from '../assets/microphone.svg';
import {LoginCommonCss} from '../../../css/CommonCss';

export const AttendeeItem = ({
  attendeeName,
  selectOrDeselectAll,
  checkbox,
  onCheckboxSelect,
  onCheckboxUnSelect,
  item,
  itemIndex,
  department,
  listJoin,
  listItem,
  muted,
  mutedList,
  meetingTitle,
  maxLimit,
  userDetail
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(selectOrDeselectAll);
  }, [selectOrDeselectAll]);
  const ipPortData = useSelector(state => state.ipPortData);
  const accessToken = useSelector(state => state.accessToken);
  const dispatch = useDispatch();
  const tenantId = useSelector(state => state.tenantId);

  const join = () => {
    let dataToNotify = [
      {
        meetingName: meetingTitle,
        userName: userDetail.firstName,
        userId: listItem.id
      },
    ];
    console.log(dataToNotify, ' hi dataToNotify..................');
    Utils.postNotifyToJoin(
      ipPortData,
      accessToken,
      dataToNotify,
      dispatch,
      tenantId,
    ).then(response => {
      console.log(response, 'ASSET COMPONENT NOTIFY11......................');
      Alert.alert('Success:', 'Call notification has been sent' )
    });
  };
  return (
    <View style={styles.attendeeContainer}>
      {checkbox ? (
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          color={LoginCommonCss.swipeButtonBackground()}
          onPress={() => {
            // PARTICIPANT LIMIT || if limit removed then remove if statement
            if (maxLimit && !checked) {
              setChecked(false);
              Alert.alert(
                'Participant limit exceeded',
                'You can add a maximum of 8 participants in a call !',
              );
            } else {
              checked
                ? onCheckboxUnSelect(item, itemIndex)
                : onCheckboxSelect(item, itemIndex);
              setChecked(!checked);
            }
          }}
        />
      ) : null}
      <View style={{flex: 0.95, flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: LoginCommonCss.swipeButtonBackground(),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
          }}>
          <Text style={{color: 'white', fontSize: 21, fontWeight: '700'}}>
            S
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 18, fontFamily: 'SiemensSans-Bold'}}>
            {attendeeName}
          </Text>
          {department ? (
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'SiemensSans-Roman',
                marginTop: 4,
              }}>
              Remote Support
            </Text>
          ) : null}
        </View>
      </View>
      {listJoin ? (
        <TouchableOpacity
          style={{
            // PARTICIPANT LIMIT
            backgroundColor: maxLimit ? 'grey' : '#1B1534',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
          }}
          onPress={() => {
            // PARTICIPANT LIMIT || if limit removed then remove if statement
            if (maxLimit) {
              Alert.alert(
                'Participant Info :',
                'Max 8 participant can attend the call !!',
              );
            } else {
              join();
            }

          }}>
          <AttendeeList />
        </TouchableOpacity>
      ) : null}
      {mutedList ? (
        <View
          style={{
            backgroundColor: '#1B1534',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
          }}>
          {muted ? <PhoneDisabled /> : <Phone />}
        </View>
      ) : null}
    </View>
  );
};
