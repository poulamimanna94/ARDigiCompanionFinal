import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import Orientation from 'react-native-orientation';
import { height } from '../utils/Constants';



const Help = () => {

    React.useEffect(() => {
        Orientation.lockToPortrait();
    }, [])

    return (
        <ScrollView>
            <View style={{ height: height * 0.85, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 18, }}>Help In Progress</Text>
            </View>

        </ScrollView>
    )
}

export default Help;