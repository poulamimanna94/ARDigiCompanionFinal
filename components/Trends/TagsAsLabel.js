import React from 'react';
import {ScrollView,View,Text,TouchableOpacity} from 'react-native';


const TagsAsLabel = ({ legends }) => {
    return (
      <ScrollView horizontal style={{ flexDirection: 'row', marginVertical: 5, }} >
        {
          legends.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', marginHorizontal: 5, alignItems: 'center' }}>
              <TouchableOpacity style={{ marginTop: 3, backgroundColor: item.color, height: 2, width: 20, }}></TouchableOpacity>
              <Text style={{ marginLeft: 3, fontSize: 14, color: '#5D596E', fontFamily: 'SiemensSans-Roman', }}>{item.tagName}</Text>
            </View>
          ))
        }
      </ScrollView>
    )
  }

  export default TagsAsLabel;