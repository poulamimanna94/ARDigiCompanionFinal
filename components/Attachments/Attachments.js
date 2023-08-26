/*
 * @author : Poulami Manna
 * @description : Attachment of Images in Task Management
*/

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid, 
  Image
} from 'react-native';
import { Utils } from '../Common/Utils';
import { useSelector, useDispatch } from 'react-redux';
import FileViewer from "react-native-file-viewer";
import Orientation from 'react-native-orientation';
import SVGCloseIcon from '../../assets/close.svg'
import { List } from 'react-native-paper';
import { height } from '../../utils/Constants'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SVGPlusIcon from '../../assets/plusvoilet.svg';
import ErrorPopup from '../ErrorPopup';
import AllActions from '../../redux/AllActions';
import FullLoader from '../Loader/FullLoader';
import {LoginCommonCss} from '../../css/CommonCss';
import SVGPlusTealIcon from '../../assets/plusTeal.svg';

const Attachments = ({ route, toggleEdit, taskIdForAttachment }) => {
  const [expandForImages, setExpandForImages] = useState(true);
  const ipPortData = useSelector(state => state.ipPortData);
  const accessToken = useSelector(state => state.accessToken);
  const [listOfImages, setListOfImages] = useState([]);
  const createdAssignedTaskId = useSelector(state => state.setCreatedAssignedTaskId);
  const userDetail = useSelector(state => state.userDetail);
  const attachmentIdForCreateAndView = createdAssignedTaskId ? createdAssignedTaskId : taskIdForAttachment
  const tenantId = useSelector(state => state.tenantId);
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();


  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, [route])



  const getUploadedImages = () => {
    setLoader(true);
    Utils.getUploadedImages(ipPortData, accessToken, attachmentIdForCreateAndView,dispatch,tenantId)
      .finally(() => setLoader(false))
      .then(response => {
        console.log(response, "get image response")
        if (response?.length > 0) {
          setError(false)
          setListOfImages(response)
        } else {
          setError(true)
          setListOfImages([]);
        }
      })
      .catch(() => {
        setError(true);
      })
  }

  const deleteImages = (id) => {
    setLoader(true);
    Utils.deleteUploadedImages(ipPortData, accessToken, attachmentIdForCreateAndView, id, userDetail,dispatch,tenantId)
      .finally(() => setLoader(false))
      .then(() => {
        dispatch(AllActions.errorPopup('File Deleted Successfully'));
        getUploadedImages()
      })
  }

  const downloadImages = (id) => {
    setLoader(true)
    Utils.getDownloadImages(ipPortData, accessToken, id,dispatch,tenantId)
      .finally(() => setLoader(false))
      .then(response => {
         OpenFile(response);
      })
  }
  function OpenFile(absoluteFilePath) {

    FileViewer.open(`${absoluteFilePath}`) // absolute-path-to-my-local-file.
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        dispatch(AllActions.errorPopup('Unable to Resolve File .Try Again !!!'));
        console.log('failure');
      });
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
      } else {
        dispatch(AllActions.errorPopup('Camera Access Denied....'));
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const openCamera = async () => {
    setLoader(true);
    const capturedImage = await launchCamera({
      maxWidth: 500,
      maxHeight: 500,
      cameraType: 'back',
      quality: 0.7,
      saveToPhotos: true,
    });
    Utils.putUploadImages(ipPortData, accessToken, capturedImage, attachmentIdForCreateAndView, userDetail, dispatch,tenantId)
      .finally(() => setLoader(false))
      .then(response => {
        if(response.status === 200) {
        dispatch(AllActions.errorPopup('Image Successfully Uploaded'));
        getUploadedImages();
        }
        else if(response.status === 500 && response.message === 'License defined limit exceeds for Document and Task Storage') {
          dispatch(AllActions.errorPopup('License expired. Renew the license to continue using all features'));
        }

      })
      .catch(err =>
        dispatch(AllActions.errorPopup('Something went wrong While Uploading Image. Try Again !'))
      );
  }


  const choosePhotoFromLibrary = async () => {
    const selectedImage = await launchImageLibrary({
      maxWidth: 500,
      maxHeight: 500,
      cameraType: 'back',
      quality: 0.7,
      saveToPhotos: true,
    });

    setLoader(true);
    Utils.putUploadImages(ipPortData, accessToken, selectedImage, attachmentIdForCreateAndView, userDetail, dispatch,tenantId)
      .finally(() => setLoader(false))
      .then(response => {
        console.log(response, "image response")
        if(response.status === 200) {
        dispatch(AllActions.errorPopup('Image Successfully Uploaded'));
        getUploadedImages();
        }
        else if(response.status === 500 && response.message === 'License defined limit exceeds for Document and Task Storage') {
          dispatch(AllActions.errorPopup('License expired. Renew the license to continue using all features'));
        }
      })
      .catch(err =>
        dispatch(AllActions.errorPopup('Something went wrong While Uploading Image. Try Again !'))
      );
  }

  React.useEffect(() => {
    getUploadedImages()
  }, [])
  return (
    <ScrollView>
    <View style={{ backgroundColor: '#fff' }}>

      <ErrorPopup />

      <List.Accordion title="Images" expanded={expandForImages} onPress={() => {
        setExpandForImages(!expandForImages)
      }}
        style={{ backgroundColor: "white", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
        titleStyle={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
      >
        {
          !toggleEdit &&
          <>
            <Buttons title={'From Camera'} action={requestCameraPermission} />
            <Buttons title={'From Gallery'} action={choosePhotoFromLibrary} />
          </>

        }

        {
          (error) &&
          <View style={{ minHeight: height * 0.15, width: '100%', backgroundColor: '#EAEAEA', paddingHorizontal: 15, paddingVertical: 5, flexDirection: "row", justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ marginLeft: 15, color: "#2D373C", justifyContent: "flex-end", fontFamily: 'SiemensSans-Bold' }}>No data found !</Text>
          </View>
        }
        {listOfImages?.map((data, i) => (
          // <ScrollView>
          <View style={{ width: '100%', backgroundColor: '#EAEAEA', paddingHorizontal: 15, paddingVertical: 5, flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center'}}>
             <TouchableOpacity onPress={() => downloadImages(data.id)}>
              <Image style={{height: 50, width: 50, marginRight: 10, borderRadius: 50}} source={{
                uri: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/downloadAttachment/tasks/attachments/${data.id}`,
                method: 'POST',
                headers: {
                  Authorization: `${accessToken}`
                },
                body: "image"
              }} />
                  
              </TouchableOpacity>
              
            {/* <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}> */}
              <TouchableOpacity onPress={() => downloadImages(data.id)} >
                <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Bold', color: "blue", textDecorationLine: "underline" }}>{'Photo ' + (i + 1)}</Text>
              </TouchableOpacity>
              {!toggleEdit && <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 120}} onPress={() => deleteImages(data.id)}>
                <SVGCloseIcon height={20} />
              </TouchableOpacity>}
            {/* </ScrollView> */}

          </View>
          // </ScrollView>

        ))}

      </List.Accordion>
      {
        loader && <FullLoader />
      }

    </View>
    </ScrollView>
  )
}

const Buttons = ({ title, action }) => {
  return (
    <View style={{ padding: 12, alignItems: 'flex-end', fontFamily: 'SiemensSans-Roman' }}>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', }} onPress={() => {
        action();
      }}>
        {/* <SVGPlusTealIcon height={20} width={20} /> */}
        {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGPlusIcon height={20} width={20} />}
        {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGPlusTealIcon height={20} width={20} />}
        <Text style={{ marginLeft: 5, color: LoginCommonCss.buttonBackground(), justifyContent: "flex-end", fontFamily: 'SiemensSans-Bold' }}>{title}</Text>
      </TouchableOpacity>
    </View >
  )
}

export default Attachments;

const styles = StyleSheet.create({
  container: {
    color: "#ffff",
    zIndex: 1
  },

  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8A00E5',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});