import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import Orientation from 'react-native-orientation';
import { height } from '../../utils/Constants';





const CallLogs = () => {

    React.useEffect(() => {
        Orientation.lockToPortrait();
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: height * 0.85, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 18, }}>Call logs are currently not enabled</Text>
            </View>

        </ScrollView>
    )
}

export default CallLogs;