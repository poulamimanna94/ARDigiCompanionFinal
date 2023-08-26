/*
 * @author : Chahat chugh
 * @description : Video call common styling
 */

import {StyleSheet} from 'react-native';
import { LoginCommonCss } from '../../css/CommonCss';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#1B1534',
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  subtitle: {
    marginBottom: 25,
    marginTop: 10,
  },
  videoContainer: {
    // alignItems:'center',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // width: '100%',
    // This is an existing React Native issue:
    // When you create a native android component
    // that use GLSurfaceView (We use this internally), the entire screen will
    // black out
    // overflow: 'hidden'
  },
  video: {
    width: '100%',
    // margin: '1%',
    // aspectRatio: 16 / 9,
  },
  screenShare: {
    width: '90%',
    margin: '1%',
    aspectRatio: 16 / 9,
  },
  attendeeList: {
    flex: 1,
  },
  attendeeContainer: {
    margin: 10,
    padding: 5,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems:'center',
  },
  attendeeMuteImage: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  inputBox: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    width: '50%',
    padding: 10,
    color: 'black',
  },
  meetingButton: {
    resizeMode: 'contain',
    margin: 10,
    width: 30,
    height: 30,
  },
  icon: {
    alignSelf: 'center',
    marginRight: 15,
  },
  joinButton: {
    backgroundColor: LoginCommonCss.swipeButtonBackground(), 
    alignItems:'center', 
    justifyContent:'center', 
    width: '100%', 
    // flex: 0.5, 
    paddingVertical: 20,
  },

  videoTileComtainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',

  }

  
});

export default styles;
