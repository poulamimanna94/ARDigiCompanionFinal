import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import ProfileCss from '../css/ProfileCss';
import { useDispatch, useSelector } from 'react-redux';
import {
  DrawerIcons,
  LogoutIcon,
  AboutIcon,
  LegalImprintIcon,
} from '../components/Icons';
import { Utils } from '../components/Common/Utils';
import { height, width } from '../utils/Constants';
import { LoginCommonCss } from '../css/CommonCss';

const Profile = () => {
  const userDetail = useSelector(state => state.userDetail);
  const [companyLogoName, setCompanyLogoName] = useState();
  const ipPortData = useSelector(state => state.ipPortData);
  const accessToken = useSelector(state => state.accessToken);
  const dispatch = useDispatch();
  const tenantId = useSelector(state => state.tenantId);
  useEffect(() => {
    Utils.getCompanyLogoNameData(ipPortData, accessToken, dispatch,tenantId)
      .then(response => {
        setCompanyLogoName(response?.result)
      })
  }, [])

  return (
    <ScrollView style={ProfileCss.container}>
      <View style={ProfileCss.child}>
        {companyLogoName?.companyLogo ?
          (<Image
            style={{ width: width * 0.3, height: height * 0.1, resizeMode: "stretch", marginLeft: 10 }}
            source={{ uri: 'data:image/png;base64,' + companyLogoName?.companyLogo }} />) : (<Text style={{ color: "white", fontWeight: "bold", marginLeft: 35, fontSize: 20 }}>{companyLogoName?.companyName}</Text>)
        }

      </View>
      <View style={[ProfileCss.profiles, { justifyContent: 'space-between' }]}>
        <View style={{ height: height * 0.8, }}>
          <Text style={ProfileCss.name}>
            {userDetail?.firstName ? userDetail.firstName : 'Username'}
          </Text>
          <Text style={ProfileCss.titleText}>{LoginCommonCss.hamburgerTitleText()}</Text>
        </View>
      </View>
      <View style={{ height: height * 0.65, justifyContent: 'space-between', }}>
        <View style={{ justifyContent: 'flex-start', }}>
          <DrawerIcons icon={'Home'} text={'Home'} />
          <DrawerIcons icon={'Tasks'} text={'My Tasks'} />
          <DrawerIcons icon={'DocumentRepository'} text={'Document Repository'} />
          <DrawerIcons icon={'Analyze'} text={'Analyze'} />
          <DrawerIcons icon={'VideoCall'} text={'Remote Support'}/>
          <LogoutIcon />
        </View>
        <View style={{ marginBottom: height * 0.035, }}>
          <View style={{ marginBottom: height * 0.02, }}>
            <AboutIcon title={'Terms of Use'} />
            <LegalImprintIcon title={'Imprint'} />
          </View>
          <View>
            <Text style={ProfileCss.bottomText} >Version 1.0</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};
export default Profile;

