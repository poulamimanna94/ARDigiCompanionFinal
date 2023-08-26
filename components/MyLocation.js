import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';

const MyLocation = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      titleStyle={{
        fontFamily: 'SiemensSans-Roman',
        fontSize: 15,
        color: expanded ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.4)',
      }}
      expanded={expanded}
      onPress={handlePress}
      title="My Location">
      <List.Item left={() => <SearchAsset />} />
    </List.Accordion>
  );
};

const SearchAsset = () => {
  return (
    <View
      style={{
        marginLeft: '5%',
        width: '60%',
        borderWidth: 1,
        borderColor: '#EBF0F5',
        backgroundColor: '#EBF0F5',
      }}>
      <TouchableOpacity
        style={{padding: 15, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontFamily: 'SiemensSans-Roman'}}>
          Scan Nearest Asset
        </Text>
        <Image
          style={{marginLeft: 7}}
          source={require('../assets/scan_grey.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MyLocation;
