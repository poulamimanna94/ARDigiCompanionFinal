import React from 'react'
import { FlatList, Text, View, } from 'react-native';
import ChipButton from './ChipButton';


const Item = ({ name }) => (
    <ChipButton text={name} />
);

const ChipButtonList = ({ arr }) => {
    const renderItem = ({ item }) => (
        <Item name={item.tagName} />
    );
    const listEmptyComponent = () => {
        <View style={{ height: '100%', width: '100%', }}>
            <Text>No Tags Selected</Text>
        </View>
    }
    return (
        <FlatList
            listEmptyComponent={listEmptyComponent}
            horizontal={true}
            data={arr}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

export default ChipButtonList;