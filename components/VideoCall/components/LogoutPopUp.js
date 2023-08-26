import React from 'react';
import { View, Text } from 'react-native';
import { Modal, Button } from 'react-native-paper';
import { LoginCommonCss } from '../../../css/CommonCss';
import { useDispatch, useSelector } from 'react-redux';
import AllActions from '../../../redux/AllActions';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const LogoutPopUp = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const accessToken = useSelector(state => state.accessToken);
    const loggedUser = useSelector(state => state.userDetail);
    const ipPortData = useSelector(state => state.ipPortData);
    const offlineOnlineMode = useSelector(state => state.offlineOnlineMode);
    const tenantId = useSelector(state => state.tenantId);
    const deviceToken = useSelector(state => state.deviceToken);
    const hideModal = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
    const containerStyleForComplete = { backgroundColor: 'white', borderRadius: 7, height: 150, width: 220, marginLeft: 160, marginBottom: 50, marginRight: -90, marginTop: -80, zIndex: 1, position: 'absolute' };
    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyleForComplete}>
            <View style={{ height: '40%', paddingHorizontal: 10 }}>
                <Text style={{ paddingVertical: 10, fontSize: 14, color: "#000", fontFamily: "SiemensSans-Roman" }}>Are you sure you want to log out?</Text>
            </View>
            {/* <View style={{ flex: 1.2, marginLeft: 15, marginTop: 8, }}>
                        <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, color: '#000', }}>Task will be marked as completed.</Text>
                    </View> */}
            {/* <View style={{flex: 0.9, marginLeft: 15, marginTop: 2, height: '30%', paddingVertical: 5, marginBottom: -10}}>
                        <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, color: '#000', }}>Please confirm.</Text>
                    </View> */}
            {LoginCommonCss.buttonSortByBackground() === true && <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", marginRight: 10, }}>
                <Text style={{ padding: 10, fontFamily: 'SiemensSans-Bold', fontSize: 14, color: LoginCommonCss.buttonBackground() }} 
                onPress={() => hideModal()}>No</Text>
                <Text style={{ padding: 10, fontFamily: 'SiemensSans-Bold', fontSize: 14, color: LoginCommonCss.buttonBackground(), }} onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer())
                    if (offlineOnlineMode) {
                        loggedOutUser(accessToken, loggedUser, ipPortData, dispatch, tenantId, deviceToken);
                    } else {
                        dispatch(AllActions.userLoggedOut(''));
                        dispatch(AllActions.getUserDetails({}));
                    }
                }}>Yes</Text>
            </View>}

            {LoginCommonCss.buttonSortByBackground() === false && <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 20, marginTop: 10 }}>
                <Button color={LoginCommonCss.buttonBackground()} borderColor={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11 }} style={{ marginRight: 15, fontFamily: 'SiemensSans-Roman', fontSize: 5, borderWidth: 1, borderColor: LoginCommonCss.buttonBackground(), width: 80, height: 30 }} uppercase={false}
                    onPress={() => hideModal()}>No</Button>
                <Button mode="contained" color={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11, }} style={{ fontFamily: 'SiemensSans-Roman', fontSize: 5, color: "#007993" }} uppercase={false}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer())
                        if (offlineOnlineMode) {
                            loggedOutUser(accessToken, loggedUser, ipPortData, dispatch, tenantId, deviceToken);
                        } else {
                            dispatch(AllActions.userLoggedOut(''));
                            dispatch(AllActions.getUserDetails({}));
                        }
                    }}>Yes</Button>
            </View>}
        </Modal>
    )
}
export default LogoutPopUp;
