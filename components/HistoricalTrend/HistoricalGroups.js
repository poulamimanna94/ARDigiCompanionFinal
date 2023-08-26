
import React from 'react'
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../../utils/Constants';
import AllActions from '../../redux/AllActions';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import SVGCheckMarkIcon from '../../assets/check-mark.svg';
import { LoginCommonCss } from '../../css/CommonCss';

const HistoricalGroups = (props) => {

  const navigation = useNavigation();
  const [groupName, setGroupName] = React.useState([]);

  React.useEffect(() => {

    navigation.addListener('focus', () => {
      // props.onFocusHistoricalGroupView();
    })

    return () => {
      navigation.removeListener('focus');
      navigation.removeListener('blur');
    }
  }, [])

  React.useEffect(() => {
    if (props.graphGroupData) {
      let localGroupName = [];
      for (let i = 0; i < props.graphGroupData?.length; i++) {
        let tempGroupNameWithTagName = {
          groupName: '',
          tags: [],
        }
        tempGroupNameWithTagName.groupName = props.graphGroupData[i].groupName;
        for (let j = 0; j < props.graphGroupData[i].tags.length; j++) {
          tempGroupNameWithTagName.tags.push(props.graphGroupData[i].tags[j].tagName)
        }
        localGroupName.push(tempGroupNameWithTagName);
      }
      props.setAssetSelectedToView();
      setGroupName(localGroupName);

    }

  }, [props.graphGroupData])

  return (
    <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
      <View style={{ height: "75%", width: '100%', padding: 8, }}>
        <ScrollView contentContainerStyle={{ width: '100%', minHeight: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', }} style={{ backgroundColor: '#fff', width: '100%' }}>
          {
            groupName.length > 0 ?
              (
                groupName.map((groupNameAndTag, index) => (
                  <List.Accordion
                    key={index}
                    onPress={() => { props.setSelectedGroupOnView(groupNameAndTag.groupName) }}
                    style={{ backgroundColor: '#fff', height: 50, width: width * 0.8, borderBottomWidth: 1, borderTopWidth: index === 0 ? 1 : 0, borderBottomColor: '#D7D7D7', borderTopColor: '#D7D7D7' }}
                    titleStyle={{ textTransform: 'capitalize', fontSize: 12, fontFamily: 'SiemensSans-Bold', }}
                    title={groupNameAndTag.groupName}
                    right={() => props.groupNameToShowOnView === groupNameAndTag.groupName ? <SVGCheckMarkIcon style={{ marginRight: 10, }} /> : null}
                  >
                    {
                      groupNameAndTag.tags.map((tagName, i) => (
                        <List.Item style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderTopWidth: i === 0 ? 1 : 0, borderBottomColor: '#D7D7D7', borderTopColor: '#D7D7D7' }} titleStyle={{ fontSize: 10, fontFamily: 'SiemensSans-Roman', }} right={() => props.groupNameToShowOnView === groupNameAndTag.groupName ? <SVGCheckMarkIcon style={{ marginRight: 15 }} /> : null} title={tagName} key={tagName + i} />
                      ))
                    }

                  </List.Accordion>
                ))
              )
              :
              (
                <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No Group Found</Text>
                </View>
              )


          }

        </ScrollView>
      </View>

      <View style={{ height: '25%', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
        <TouchableOpacity activeOpacity={1} onPress={() => props.toggleTopBarModal()} style={{ borderRadius: width * LoginCommonCss.buttonBorderRadiusForTrends(), backgroundColor: LoginCommonCss.buttonBackground(), paddingHorizontal: width * 0.05, paddingVertical: height * 0.01, }} >
          <Text style={{ color: '#FFFFFF', fontSize: 12, }}>View Trends</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    ipPortData: state.ipPortData,
    accessToken: state.accessToken,
    tagList: state.tagList,
    selectedTrendTagList: state.selectedTrendTagList,
    assetId: state.assetId,
    menuHeaderName: state.menuHeaderName,
    toggleOrientation: state.toggleOrientation,
    toggleHistoricalTopBar: state.toggleHistoricalTopBar,
    graphGroupData: state.graphGroupData,
    groupNameToShowOnView: state.groupNameToShowOnView,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedGroupOnView: (name) => {
      dispatch(AllActions.setSelectedGroupToShowOnView(name));
    },
    toggleTopBarModal: () => {
      dispatch(AllActions.toggleHistoricalTopBar());
    },
    onFocusHistoricalGroupView: () => {
      dispatch(AllActions.toggleBetweenGroupAndTagsInHistorical('Groups'))
    }, setAssetSelectedToView: () => {
      dispatch(AllActions.setTrueIsAssetSelectedToView());
    },
    resetAssetSelectedToView: () => {
      dispatch(AllActions.setFalseIsAssetSelectedToView());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalGroups);