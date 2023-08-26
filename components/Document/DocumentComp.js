import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import {  width } from '../../utils/Constants';



const DocumentComp = ({ index, readDocument, docName, description, size }) => {

    return (
        <TouchableOpacity key={index} style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#BECDD7", }}
            onPress={() => {
                readDocument(docName)
            }}
        >
            <View style={{ padding: 10, width: width * 0.75,}}>
                <Text style={{ fontSize: 14, color: '#4C5264', fontFamily: 'SiemensSans-Bold' }}>{docName}</Text>
                <Text style={{ fontSize: 14, color: '#4C5264', fontFamily: 'SiemensSans-Roman' }}>{description}</Text>
            </View>
            <View style={{ padding: 10, width: width * 0.2 }}>
                <Text style={{ fontSize: 14, color: '#4C5264', fontFamily: 'SiemensSans-Roman' }}>{size}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default DocumentComp;