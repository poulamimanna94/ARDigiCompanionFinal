import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import LoginCss from '../../css/LoginCss';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import {brandName} from '../../utils/BrandName';
import SVGWhiteIcon from '../../assets/white.svg';
import { LoginCommonCss } from '../../css/CommonCss';


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const TopView = () => {
  return (
    <View style={LoginCss.topView}>
      {/* <Image
        style={LoginCss.logo}
        source={require('../../assets/SE_Logo_White_RGB_L.png')}
      /> */}

        {LoginCommonCss.buttonSortByBackground() === true && <View style={{ justifyContent: 'flex-start', width: width, height: height * 0.25, marginLeft: 40}}>
              <Image style={{ marginTop: height * 0.07, }} source={require('../../assets/SE_Logo_White_RGB_L.png')} />
            </View>}

            {LoginCommonCss.buttonSortByBackground() === false && 
              <SVGWhiteIcon style={{justifyContent: 'flex-start',  marginLeft: 40,  flexDirection: "row", marginTop: 40}} />
            }
    </View>
  );
};

const MiddleView = props => {
  return (
    <View>
      <View style={{ padding: 5, height: height * 0.15 }}>
        <Text style={LoginCss.title}>{brandName == "AR Power" ? "AR Power" : "AR Digi"} </Text>
        {
          props.headerLoginError && <Text style={LoginCss.errorMessage}>{`You have reached maximum login attempts. Please try after ${props.timerDuration} seconds`}</Text>
        }
      </View>
      <View style={{ width: '100%', }}>
        <TextInput
          label="Username"
          placeholder="username"
          theme={{ colors: { primary: '#7C919D' } }}
          placeholderTextColor="#000"
          autoCapitalize='none'
          style={LoginCss.inputTextBox}
          onFocus={props.onFocusTextBox}
          onChangeText={val => props.handleUsername(val)}
        />
        <TextInput
          secureTextEntry={props.showPassword}
          label="Password"
          theme={{ colors: { primary: '#7C919D' } }}
          placeholderTextColor="#000"
          style={LoginCss.inputPassword}
          onFocus={props.onFocusTextBox}
          autoCapitalize='none'
          onSubmitEditing={() => {
            props.validate()
          }}
          placeholder="password"
          onChangeText={val => {
            props.handlePassword(val);
          }}
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => props.setShowPassword(!props.showPassword)}
            />
          }
        />
        <TextInput
          label="Tenant ID"
          placeholder="Tenant ID"
          value={props.tenantId}
          onChangeText={val => props.setTenantId(val)}
          theme={{ colors: { primary: '#7C919D' } }}
          placeholderTextColor="#000"
          autoCapitalize='none'
          style={LoginCss.inputTextBox}
          onFocus={props.onFocusTextBox}
        />

        <View style={{ justifyContent: 'space-around', height: height * 0.12, }}>
          {
            props.error && <Text
              style={{
                color: '#DC0000',
                textAlign: 'center',
                fontFamily: 'SiemensSans-Bold',
                fontSize: 18,
              }}>
              Invalid Username and Password or Tenant is missing
            </Text>
          }
        </View>
        <LoginButton props={props} />
        <ConfigIPUserButton props={props} />
      </View>
    </View>
  );
};

const LoginButton = ({ props }) => {

  return (
    <View style={LoginCss.buttonContainerView}>
      <TouchableOpacity
        style={LoginCss.button}
        onPress={() => {
          props.validate()
        }}
        disabled={props.loginLoader}
      >

        {
          props.loginLoader ? <ActivityIndicator size={'small'} color={'#fff'} /> :
            (
              <>
                <Text style={LoginCss.btnText}>Log in</Text>
                < Image
                  style={LoginCss.rightArrow}
                  source={require('../../assets/arrowLeft.png')}
                />
              </>
            )

        }
      </TouchableOpacity>
    </View>
  );
};

const ConfigIPUserButton = ({ props }) => {
  return (
    <View
      style={{
        width: '80%',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', marginTop: height * 0.02, }}
        onPress={() => {
          props.dispatch(props.AllActions.openConfigurationModal(''));
        }}
      >
        <Image source={require('../../assets/setting.png')} />
        <Text
          style={{
            fontFamily: 'SiemensSans-Roman',
            fontSize: 18,
            marginLeft: 5,
            color: 'white',
          }}>
          Configure Server
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export { TopView, MiddleView, LoginButton, ConfigIPUserButton };
