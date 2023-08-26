import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect, useDispatch, } from 'react-redux';
import { TextInput } from 'react-native-paper';
import AllActions from '../redux/AllActions';
import IpUserConfigCss from '../css/IpUserConfigCss';
import { writeFiles } from '../utils/ReadWriteFunc';
import SVGLeftArrowIcon from '../assets/arrowhead_left_new.svg'
import envs from '../components/config/env'

const IpUserConfig = props => {


  const saveIpPortData = () => {

    const ipPortToWrite = {
      ip: ipPortValues.ip,
      port: ipPortValues.port,
      protocol: ipPortValues.protocol,
    };

    writeFiles(JSON.stringify(ipPortToWrite), offlineOnlineMode, dispatch);
  };



  useEffect(() => {

    if (props.ipPortData?.ip && props.ipPortData?.protocol && props.ipPortData?.port) {
      setIpPortValues({ ...props.ipPortData })
    }

  }, [props.ipPortData])

  const [ipPortValues, setIpPortValues] = useState({
    ip: envs.HOSTNAME,
    port: envs.PORT,
    protocol: envs.PROTOCOL,
  });


  const dispatch = useDispatch();
  const offlineOnlineMode = props.offlineOnlineMode;
  const isIpConfigured = props.isIpConfigured;

  return (
    <View style={IpUserConfigCss.modalView}>
      <View style={IpUserConfigCss.titleContainer}>
        <TouchableOpacity
          style={IpUserConfigCss.rightArrowIcon}
          onPress={() => {
            dispatch(AllActions.closeConfigurationModal());
          }}>
          <SVGLeftArrowIcon />
        </TouchableOpacity>
        <Text style={IpUserConfigCss.titleText}>Configure Server</Text>
      </View>
      <View style={IpUserConfigCss.textBoxContainer}>
        <TextInput
          underlineColor="#fff"
          placeholder="host name"
          keyboardType="default"
          autoCapitalize="none"
          theme={{ colors: { primary: '#7C919D' } }}
          style={IpUserConfigCss.inputStyle}
          label="URL"
          value={ipPortValues.ip}
          onChangeText={text => setIpPortValues({ ...ipPortValues, ip: text })}
        />
        <TextInput
          underlineColor="#fff"
          placeholder="Port"
          keyboardType="numeric"
          theme={{ colors: { primary: '#7C919D' } }}
          style={IpUserConfigCss.inputStyle}
          label="Port"
          value={ipPortValues.port}
          onChangeText={text => setIpPortValues({ ...ipPortValues, port: text })}
        />
        {!isIpConfigured && (
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 17,
              color: '#c43a31',
              fontSize: 16,
              fontFamily: 'SiemensSans-Bold',
            }}>
            Configure URL and Port !
          </Text>
        )}
      </View>
      <View style={IpUserConfigCss.buttonContainer}>
        <TouchableOpacity
          onPress={() => saveIpPortData()}
          style={IpUserConfigCss.button}>
          <Text style={IpUserConfigCss.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const mapPropsToState = state => {
  return {
    offlineOnlineMode: state.offlineOnlineMode,
    isIpConfigured: state.isIpConfigured,
    ipPortData: state.ipPortData,
    offlineUserData: state.offlineUserData,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapPropsToState, mapDispatchToProps)(IpUserConfig);