/*
 * @author : Poulami Manna
 * @description : Splash Screen with logo
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import DrawerNavigator from '../../navigation/DrawerNavigator';
import { Utils } from '../Common/Utils';
import { useDispatch, useSelector } from 'react-redux';
import PushNotification from "react-native-push-notification";
import { ActivityIndicator } from 'react-native-paper';
import Orientation from 'react-native-orientation';
import { height, width } from '../../utils/Constants';
import { LoginCommonCss } from '../../css/CommonCss';
import VideoCallNotification from '../VideoCall/components/VideoCallNotification';
import ResumeCall from '../VideoCall/components/ResumeCall';
import VideoCall from '../VideoCall/VideoCall';


const WelcomePage = () => {
  const [pageDisplay, setPageDisplay] = useState(false);
  const [companyLogoName, setCompanyLogoName] = useState();
  const ipPortData = useSelector(state => state.ipPortData);
  const accessToken = useSelector(state => state.accessToken);
  const timeout = React.useRef(null);
  const dispatch = useDispatch();
  const tenantId = useSelector(state => state.tenantId);
  const showMeetingRoom = useSelector(state => state.showMeetingRoom);

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, [])

  useEffect(() => {
    Utils.getCompanyLogoNameData(ipPortData, accessToken, dispatch,tenantId)
      .then(response => {
        setCompanyLogoName(response?.result)
      })
  }, [])

  useEffect(() => {

    timeout.current = setTimeout(() => {
      setPageDisplay(true)
    }, 6000);
    return () => clearTimeout(timeout.current);
  }, [])

  //please don't remove it used for creating the channel for the notification
  const notification = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test channel',
    })
  }



  return (
    !pageDisplay ?
      (
        <View style={{ flex: 1, backgroundColor: "#190D35" }}>
          <ImageBackground source={LoginCommonCss.svgPlusButtonBackground() === "ArDigi" ? require("../../assets/Gradient-background-app-icon_original.png") : require("../../assets/background_app_icon_newUI_Screen.png")} resizeMode="cover" style={styles.image}>
            {LoginCommonCss.buttonSortByBackground() === true && <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: width, height: height * 0.25, }}>
              <Image style={{ marginTop: height * 0.07, }} source={require('../../assets/SE_Logo_White_RGB_L.png')} />
            </View>}

            {LoginCommonCss.buttonSortByBackground() === false && <View style={{ justifyContent: 'flex-start', width: width, height: height * 0.25, marginLeft: 40,  flexDirection: "row"}}>
              <Text style={{ marginTop: height * 0.07, color: "#FFFFFF", fontSize: 32, fontFamily: 'SiemensSans-Bold', borderLeftColor: "#00FFB9", borderLeftWidth: 4, height: height * 0.06}}>{'   '}AR Digi</Text>
            </View>}

            <View style={LoginCommonCss.appLogoIconUI()}>
              <Image style={{ height: height * LoginCommonCss.appLogoHeightBackground(), width: width * LoginCommonCss.appLogoWidthBackground() }} source={LoginCommonCss.svgPlusButtonBackground() === "ArDigi" ? require('../../assets/AR_Digi_app_icon_v2.png') : require('../../assets/AR_Power_app_icon.png')} />

              <Text style={{ fontSize: 32, fontFamily: 'SiemensSans-Bold', color: '#FFFFFF', marginLeft: LoginCommonCss.appLogoTextBackgroundCenterPosition()}} >{LoginCommonCss.appLogoTextBackground()}</Text>
            </View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', width: width, height: height * 0.4, }}>
              {
                companyLogoName?.companyLogo ? (
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.45, height: height * 0.19 }}>
                    <Image
                      style={{ borderWidth: 2, borderColor: 'white', width: width * 0.37, height: height * 0.18 }}
                      source={{ uri: 'data:image/png;base64,' + companyLogoName?.companyLogo }}
                    />
                  </View>

                ) : (
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.45, height: height * 0.19 }} >
                    <ActivityIndicator color='#fff' size='large' />
                  </View>

                )
              }
              <Image style={{ marginRight: width * 0.055, marginTop: height * 0.01, marginBottom: 10 }} source={require('../../assets/divider_line.png')} />
              <View style={{ marginRight: width * 0.1, justifyContent: 'flex-start', marginTop: -20, marginBottom: 8 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontFamily: 'SiemensSans-Bold', marginTop: height * 0.02, }}>Unit Name: {companyLogoName?.unitName ? companyLogoName?.unitName : '...'}</Text>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontFamily: 'SiemensSans-Bold', marginTop: height * 0.005, }}>Site Location: {companyLogoName?.siteLocation ? companyLogoName?.siteLocation : '...'}</Text>
              </View>
            </View>

          </ImageBackground>
        </View>
      ) : (
        <>
          <DrawerNavigator />
          <VideoCallNotification />
          <ResumeCall />
          <View style={{height: showMeetingRoom?'100%':0, width: showMeetingRoom? '100%':0, overflow:'hidden'}}><VideoCall /></View>
        </>

      )
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-start"
  },
  text: {
    color: "white",
    fontSize: (width / height),
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

export default WelcomePage;