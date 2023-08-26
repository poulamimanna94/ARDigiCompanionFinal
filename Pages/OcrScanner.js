/*
 * @author : Poulami Manna
 * @description : OCR Scanner
 */

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import Orientation from 'react-native-orientation';
import RNTextDetector from "rn-text-detector";
import { LoginCommonCss } from '../css/CommonCss';


export default function OcrScanner({ocrData}) {

    const [{ cameraRef }, { takePicture }] = useCamera(null);

    React.useEffect(() => {
        Orientation.lockToPortrait();
      }, [])

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            const visionResp = await RNTextDetector.detectFromUri(data.uri);
            ocrData(visionResp[0].text);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={[styles.body,{width: Dimensions.get('window').width, height: '100%'}]}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
            <TouchableOpacity
            onPress={() => {
                    captureHandle();
                  }} style={styles.capture}
            >
            <Text style={{color: "white", fontFamily: "SiemensSans-Bold", fontSize: 14}}>Click</Text>
            </TouchableOpacity>
          </RNCamera>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    capture: {
      height: 50,
      width: 300,
      backgroundColor: LoginCommonCss.buttonBackground(),
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 26,
      marginBottom: 5
    }
});