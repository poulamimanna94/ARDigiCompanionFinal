import React from 'react'
import { TouchableOpacity, FlatList, Text, View, Image,} from 'react-native';
import { width ,height} from '../../utils/Constants';

const Item = ({ name, isSelected }) => (
    <TouchableOpacity style={{ height: height * 0.05, padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D7D7D7', borderTopColor: '#D7D7D7', }}>
        <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Roman' }}>{name}</Text>
        {
            isSelected ?
                <Image style={{ width: width * 0.04, height: height * 0.015, }} source={require('../../assets/check-mark.png')} />
                :
                null
        }
    </TouchableOpacity>
);

const TagList = ({ arr }) => {
    const renderItem = ({ item }) => (
        <Item name={item.tagName} isSelected={item.isSelected} />
    );
    const listEmptyComponent = () => {
        return (
            <View style={{ height: '100%', width: '100', justifyContent: 'center', alignItems: 'center', }}>
                <Text>No Tags Selected</Text>
            </View>
        )
    }
    return (
        <FlatList
            data={arr}
            listEmptyComponent={listEmptyComponent}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

export default TagList