
import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useDispatch, connect, useSelector } from 'react-redux';
import { LoginCommonCss } from "../../css/CommonCss";
import AllActions from "../../redux/AllActions";
import { height, width } from "../../utils/Constants";
import { Utils } from "../Common/Utils";

const Consent = (props) => {

  const dispatch = useDispatch();
  const ipPortData = props.ipPortData;
  const accessToken = props.accessToken;
  const userDetail = props.userDetail;
  const [modalVisible, setModalVisible] = useState(false);
  const [consent, setConsent] = useState(false);
  const tenantId = useSelector(state => state.tenantId);

  React.useEffect(() => {
    Utils.getAllConsents(ipPortData, accessToken, dispatch, tenantId)
      .then(res => {
        const userConsented = res?.filter(item => item.userName === userDetail.login);
        let checkUserConsent = false;
        if (userConsented) {
          for (let eachConsent of userConsented) {
            if (eachConsent.applicationType === 'mobile'){
             
            checkUserConsent = true;
            }
          }

          if (checkUserConsent) {
            props.sentConsent();
          }
          else {
            setModalVisible(true);
          }
        }
        else {
          setModalVisible(true);
        }

      })
      .catch(err => {
        console.log('consent ->', err);
      });


  }, [])

  function sendConsent() {
    const bodyData = {
      userName: userDetail.login,
      applicationType: "mobile",
      acceptance: "true"
    }
    Utils.sendConsent(ipPortData, accessToken, bodyData, dispatch, tenantId)
      .then(res => {
        props.sentConsent();
      })
      .catch(err => {
        console.log('consent', err);
      })
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                color={LoginCommonCss.buttonBackground()}
                status={consent ? 'checked' : 'unchecked'}
                onPress={() => {
                  setConsent(oldValue => setConsent(!oldValue));
                }}

              />
              <Text style={styles.modalText}>The processing of my personal data is described in the <Text style={{ color: LoginCommonCss.buttonBackground(), fontFamily: 'SiemensSans-Bold' }}>Privacy policy</Text>. I hereby agree to the collection,processing and use of my personal data as described therein.</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                if (!consent) {
                  dispatch(AllActions.errorPopup('Please Select the check box'));
                  return;
                }
                sendConsent();
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Accept</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {

    margin: 10,
    width: width * 0.8,
    height: height * 0.3,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: '100%',
    borderRadius: LoginCommonCss.buttonBorderRadiusForConsent(),
    padding: 10,
    elevation: 2
  },

  buttonClose: {
    backgroundColor: LoginCommonCss.buttonBackground(),
  },
  textStyle: {
    fontFamily: 'SiemensSans-Bold',
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "justify",
    lineHeight: 20,
    fontFamily: 'SiemensSans-Roman',
  }
});


const mapStateToProps = state => {
  return {
    ipPortData: state.ipPortData,
    accessToken: state.accessToken,
    userConsent: state.userConsent,
    userDetail: state.userDetail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sentConsent: () => {
      dispatch(AllActions.setUserAlreadyHaveConsent());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Consent);