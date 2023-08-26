import { View, ActivityIndicator, Dimensions } from 'react-native';
import React from 'react';
import {color} from '../../utils/Constants';
import { LoginCommonCss } from '../../css/CommonCss';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const FullLoader = () => {
    return (
        <View style={{ width: width, height: height * 0.8, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator  size={55} color={LoginCommonCss.buttonBackground()} />
        </View>
    );
};
export default FullLoader;
