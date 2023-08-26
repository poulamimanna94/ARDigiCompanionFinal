import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { height } from '../../utils/Constants';






const GraphErrorMessage = ({toggleOrientation}) => {

    return (
        <View style={{ height: height * 0.7, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ marginBottom: toggleOrientation ? '35%' : 0, fontFamily: 'SiemensSans-Bold' }}>No Data Found !</Text>
        </View>
    )
}

export default GraphErrorMessage;