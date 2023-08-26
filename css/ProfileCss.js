
import { StyleSheet} from 'react-native';
import { height , width } from '../utils/Constants';
import { LoginCommonCss } from './CommonCss';



const ProfileCss = StyleSheet.create({
    container: {
        width: '100%',
        height: height,
    },
    child: {
        height: height * 0.2,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: LoginCommonCss.hamburgerBackground(),
    },
    avatar: {
        marginLeft: 20,
        backgroundColor: '#1B1534',
        // borderColor: '#8A00E5',
        // borderWidth: 1,
        // borderRadius: 50,
        height: height * 0.2,
        width: width,
    },
    bttomItems: {
        flex: 0.43,

    },
    taskIcon: {
        height: 15,
        width: 15,
    },
    logoutIcon: {
        height: 15,
        width: 15,
    },
    btnText: {
        position: 'absolute',
        marginLeft: 30,
        fontSize: 14,
        fontFamily: 'SiemensSans-Roman',
    },
    profiles: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#BECDD7',
        width: '100%',
        height: height * 0.1,
        fontSize: 17,
    },
    name: {
        fontFamily: 'SiemensSans-Bold',
        textTransform: 'uppercase',
    },
    titleText: {
        marginTop: 5,
    },
    fontStyles: {
        fontFamily: 'SiemensSans-Roman',
    },
    button: {
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    drawerBorder: {
        padding: 12,
        width: '100%',
        height: height * 0.07,
    },
    drawerBorder1: {
        borderColor: '#BECDD7',
        borderBottomWidth: 1,
        padding: 12,
        width: '100%',
        height: height * 0.05,
    },
    items: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#BECDD7',
        width: '100%',
        height: height * 0.06,
    },
    img: {
        marginRight: 25,
    },
    logoutText: {
        position: 'absolute',
        marginLeft: 30,
        fontSize: 14,
        fontFamily: 'SiemensSans-Roman',
    },

    buttonContainer: {
        padding: 8,
        marginLeft: width * 0.02,
    },
    bottomText: {
        padding: 5,
        marginLeft: width * 0.02,
    }

});

export default ProfileCss