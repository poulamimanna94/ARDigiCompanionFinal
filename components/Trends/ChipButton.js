import React from 'react'
import {Text,  TouchableOpacity, Image } from 'react-native';
import { width ,height} from '../../utils/Constants';


const ChipButton = ({ text, remove, index, forceUpdate, tagList }) => {
    return (
        <TouchableOpacity onPress={() => { remove(index, tagList, forceUpdate) }} style={{ marginHorizontal: width * 0.025, padding: width * 0.01, borderRadius: width * 0.05, flexDirection: 'row', backgroundColor: '#EAEAEA', justifyContent: 'space-between', alignItems: 'center', height: height * 0.03, minWidth: width * 0.2, }}>
            <Text style={{ fontSize: 13, color: '#2D373C', fontFamily: 'SiemensSans-Roman' }}>{text}</Text>
            <Image style={{ tintColor: '#1B1534', height: 10, width: 10, }} source={require('../../assets/close.png')} />
        </TouchableOpacity>
    )
}
export default ChipButton