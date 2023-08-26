
import {StyleSheet} from 'react-native';
import { height , width } from '../utils/Constants';
import {LoginCommonCss} from './CommonCss';


const IpUserConfigCss = StyleSheet.create({
    modalView: {
        flex: 0.85,
        width: '80%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      rightArrowIcon:{padding: 15},
      titleContainer:{flexDirection: 'row'},
      titleText:{
        alignSelf:'flex-start',
         marginTop: 13,
        fontFamily: 'SiemensSans-Bold',
        fontSize: 18,
      },
      inputStyle: {
        margin:6,
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        fontFamily: 'SiemensSans-Bold',
      },
      textBoxContainer: {
        alignItems: 'center',
        flex: 0.7,
        width: '100%',
      },
      buttonContainer: {
        flex: 0.2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    
      button: {
        alignItems: 'center',
        backgroundColor: LoginCommonCss.buttonBackground(),
        width: '90%',
        padding: 15,
        borderRadius: width * LoginCommonCss.buttonBorderRadius()
      },
      btnText: {
        color: '#fff',
        fontFamily: 'SiemensSans-Roman',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})


export default IpUserConfigCss