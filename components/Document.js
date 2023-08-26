import React, {useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  Linking,
  View,
  ScrollView
} from 'react-native';
import {Divider} from 'react-native-paper';
import AllActions from '../redux/AllActions';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const Document = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const headers = {
      Authorization: tokenValue,
    };
    axios
      .get(`http://${ip}:8008/api/asset/1/documents`, {headers})
      .then((response) => {
        dispatch(AllActions.documentData(response.data));
      })
      .catch((error) => {
        console.log(error); 
      });
     
  },[]);
  const ip = useSelector((state) => state.ip);
  const documentPopup = useSelector((state) => state.documentPopup);
  const documentData = useSelector((state) => state.documentData);
  const tokenValue = useSelector(state => state.accessToken)
  

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={documentPopup}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Document</Text>
            <View>
              <Divider />
            </View>
            <ScrollView style={styles.middleView} showsVerticalScrollIndicator={false}>
              {documentData.length > 0 ? (
                documentData.map((item, i) => (
                  <Text
                    key={i}
                    style={styles.text}
                    onPress={() => Linking.openURL(`${item.docLink}`)}>
                    {item.docName}
                  </Text>
                ))
              ) : (
                <Text style={{fontFamily:'SiemensSans-Roman' , fontSize:18,}}>No item found</Text>
              )}
            </ScrollView>
            <View>
              <Divider />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
              }}>
              <Pressable
                style={styles.pressableBtn1}
                onPress={() => {
                  dispatch(AllActions.closeDocument());
                }}>
                <Text style={styles.pressableText}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  modalView: {
    backgroundColor: 'white',
    width: '75%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressableText: {
    fontFamily: 'SiemensSans-Bold',
    color: '#ffff',
  },
  pressableBtn1: {
    backgroundColor: '#8A00E5',
    width: 60,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginLeft: 5,
    padding: 15,
    fontFamily: 'SiemensSans-Bold',
    color: 'black',
  },
  text: {
    fontFamily: 'SiemensSans-Roman',
    color: 'black',
    marginTop: 10,
  },
  middleView: {
    marginTop:10,
    height: 80,
    paddingHorizontal: 25,
  },
});

export default Document;
