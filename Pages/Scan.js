/*
 * @author : Poulami Manna
 * @description : QR Scanner starting point
 */

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScanCss from '../css/ScanCss';
import OcrScanner from './OcrScanner';
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch } from 'react-redux';
import AllActions from '../redux/AllActions';
import { useNavigation } from '@react-navigation/native';
import { LoginCommonCss } from '../css/CommonCss';
import SVGCheckMark from '../assets/Success_check_mark.svg';
import SVGCheckMarkTeal from '../assets/Success_check_mark_teal.svg';




const Scan = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [toggleState, setToggleState] = useState(false);
  const [activate, setActivate] = useState(true);
  let reference = useRef()

  function onSuccess(e) {
    setData(e.data);
    setActivate(true);
    setTimeout(() => {
      setActivate(true);
    }, 500)
  }



  const Bar = () => {
    return <>
      <View style={ScanCss.bar}></View>
    </>
  }

  React.useEffect(() => {
    setData(null)
  }, [])
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setActivate(true);
    })

    return (() =>
      navigation.removeListener('focus')
    )
}, [])



const ToggleButton = () => {
  return (
    <View style={ScanCss.toggleView}>
      <TouchableOpacity>
        <View style={ScanCss.switchContainer}>
          <ToggleSwitch
            isOn={toggleState}
            thumbOffStyle={{ borderColor: '#CDD9E1', borderWidth: 1 }}
            thumbOnStyle={{ borderColor: '#CDD9E1', borderWidth: 1 }}
            trackOnStyle={{ borderColor: '#CDD9E1', borderWidth: 1 }}
            trackOffStyle={{ borderColor: '#CDD9E1', borderWidth: 1 }}
            onColor={LoginCommonCss.buttonBackground()}
            offColor="#CDD9E1"
            label={toggleState ? 'OCR' : 'QR'}
            labelStyle={{ color: 'black', fontSize: 18, fontFamily: 'Arial', fontWeight: "bold" }}
            onToggle={() => {
              setToggleState(!toggleState)
              setData(null)
            }
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

return (
  <View style={ScanCss.container}>
    <ToggleButton />
    <View>
      {toggleState &&
        <OcrScanner ocrData={setData} />
      }
      {!toggleState &&

        <QRCodeScanner
          reactivate={activate}
          ref={(node) => { reference.current = node }}
          showMarker={true} onRead={onSuccess} />

      }
      {(data != null) && <View style={ScanCss.subContainer}>
        <Bar />
        <Text style={{ fontWeight: 'bold', marginBottom: 25 }}>Edited scanned string manually</Text>
        <Text>Scanned string</Text>
        <View style={{ flexDirection: 'row', width: '100%' }}>

          <TextInput
            label="Scanned string"
            value={data}
            theme={{ colors: { primary: '#7C919D' } }}
            placeholderTextColor="#000"
            autoCapitalize='none'
            style={ScanCss.inputStyle}
            onChangeText={changedText => setData(changedText || '')}

          />

          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {

              dispatch(AllActions.setKksTag(data));
              navigation.navigate('KksSelection');
              setData(null);
            }}>
            {/* <Image
              style={ScanCss.logo}
              source={require('../assets/Success_blue_check_mark.png')}
            /> */}
          {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGCheckMark height= {50} width= {50} />}
          {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGCheckMarkTeal />}

          </TouchableOpacity>

        </View>

      </View>
      }
    </View>
  </View>
);
}

export default Scan;
