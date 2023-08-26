import { StyleSheet } from 'react-native';
import { height , width } from '../utils/Constants';
import {LoginCommonCss} from './CommonCss';

const LoginCss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LoginCommonCss.loginPageBackground(),
  },
  topView: {
    height: height * 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftView: {
    padding: 10,
    justifyContent: 'space-between',
    width: '25%',
    flexDirection: 'row',
  },

  switchButton: {
    padding: 5,
    width: '30%',
    height: '15%',
  },
  settingIcon: {
    width: '35%',
    height: height * 0.3,
  },
  title: {
    padding: 5,
    fontSize: 28,
    color: '#fff',
    fontFamily: 'SiemensSans-Roman',
    fontWeight: "bold"
  },
  errorMessage: {
    padding: 5,
    fontSize: 18,
    textAlign:'center',
    color: '#DC0000',
    marginBottom: 15,
    fontFamily: 'SiemensSans-Roman',
  },
  button: {
    height: 45,
    width: '100%',
    borderRadius:  width * LoginCommonCss.buttonBorderRadius(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LoginCommonCss.buttonBackground() ,
    marginTop: -25
  },
  rightArrow: {
    marginLeft: 10,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'SiemensSans-Bold',
  },
  middleView: {
    alignSelf: 'center',
    height: height * 0.65,
    width: '80%',
    justifyContent: 'flex-start',
  },
  inputTextBox: {
    marginHorizontal: 7,
    height: 55,
    width: '95%',
    color: 'black',
    backgroundColor: '#fff',
    fontFamily: 'SiemensSans-Roman',
  },
  inputPassword: {
    margin: 7,
    height: 55,
    width: '95%',
    color: 'black',
    backgroundColor: '#fff',
    fontFamily: 'SiemensSans-Roman',
  },
  logo: {
    margin: 25,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainerView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default LoginCss