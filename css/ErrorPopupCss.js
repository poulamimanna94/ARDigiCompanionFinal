
import { StyleSheet } from 'react-native';
import { LoginCommonCss } from './CommonCss';

const ErrorPopupCss = StyleSheet.create({
  message: { color: '#1B1534', fontFamily: 'SiemensSans-Roman' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 7,

  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '75%',
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
    borderWidth: 2,
    borderColor: '#EBF0F5',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressableText: {
    fontFamily: 'SiemensSans-Bold',
    color: LoginCommonCss.buttonBackground(),
  },
  pressableBtn1: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalText: {
    fontFamily: 'SiemensSans-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
});

export default ErrorPopupCss
