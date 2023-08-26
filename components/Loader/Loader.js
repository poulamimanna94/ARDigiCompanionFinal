import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import React from 'react';

const height = Dimensions.get('screen').height - 160;
const width = Dimensions.get('screen').width;
const Loader = ({visible}) => {
    return (
        
        <View style={{ width: width, height: height, position: 'absolute', backgroundColor:'rgba(0,0,0,0.3)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator style={{ marginBottom: 10 }} size="large" color="#0000ff" />
            <Text style={{ fontSize: 20 }} >loading . . . </Text>
        </View>
    );
};
export default Loader;
const styles = StyleSheet.create({});