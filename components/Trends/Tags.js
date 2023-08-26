import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ChipButton from './ChipButton';
import SVGCheckMarkIcon from '../../assets/check-mark.svg';
import { connect } from 'react-redux';
import AllActions from '../../redux/AllActions';
import { useNavigation } from '@react-navigation/native';
import { width, height } from '../../utils/Constants';
import { LoginCommonCss } from '../../css/CommonCss';



const Tags = (props) => {

  let tagList = props.tagList;
  const navigation = useNavigation();

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (props.tagList) {
        props.onFocus(props.tagList)
      }
    })

    if (props.tagList) {
      props.onFocus(props.tagList)
    }

  }, [props.tagList]);

  return (
    <View
      style={{ height:  '100%', width: '100%', backgroundColor: '#fff' }}>
      <View style={{ height: '15%', }}>
        <ScrollView nestedScrollEnabled={true} style={{ height: 5, padding: 5, }} >
          {
            tagList?.length > 0 ? (
              <ScrollView style={{ minHeight: height * 0.03, paddingVertical: 15, }} horizontal={true}>
                {
                  tagList?.map((item, index) => (
                    item.isSelected ? <ChipButton key={index} index={index} forceUpdate={forceUpdate} tagList={tagList} remove={props.toggleItem} text={item.tagName} /> : null
                  ))
                }
              </ScrollView>
            ) : (
              null
            )
          }
        </ScrollView>
      </View>

      <View style={{ height: '85%' }}>
        <ScrollView>
        {
          tagList?.length > 0 ? (
            tagList.map((item, index) => (
              <TouchableOpacity onPress={() => { props.toggleItem(index, tagList, forceUpdate) }} style={{ width: '100%', padding: 15, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: index === 0 ? 1 : 0, borderBottomColor: '#D7D7D7', borderTopColor: '#D7D7D7', }} key={index}>
              <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Roman', }}>{item.tagName}</Text>
              {
                item.isSelected ?
      
                  <SVGCheckMarkIcon />
                  :
                  null
              }
            </TouchableOpacity>
            )

            )
          ) : (null)
            }
          <View style={{ height: '100%', }}>
            <View style={{ padding: 25, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
              <TouchableOpacity activeOpacity={1} onPress={() => { props.viewTrends(tagList) }} style={{ borderRadius: width * LoginCommonCss.buttonBorderRadiusForTrends(), backgroundColor: LoginCommonCss.buttonBackground(), paddingHorizontal: width * 0.05, paddingVertical: height * 0.01, }} >
                <Text style={{ color: '#FFFFFF', fontSize: 12, }}>View Trends</Text>
              </TouchableOpacity>
            </View>


          </View>

          </ScrollView>
      </View>

    </View >
  )
}

const mapStateToProps = state => {
  return {
    ipPortData: state.ipPortData,
    accessToken: state.accessToken,
    tagList: state.tagList,
    selectedTrendTagList: state.selectedTrendTagList,
    toggleTrendsPopup: state.toggleTrendsPopup,
    toggleOrientation: state.toggleOrientation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleItem: (index, tagList, forceUpdate) => {
      tagList[index].isSelected = !tagList[index].isSelected;
      dispatch(AllActions.tagsByDefaultSelected(tagList));
      forceUpdate();
    },
    onFocus: (tagList) => {
      const arr = tagList.filter(item => item.isSelected);
      dispatch(AllActions.toggleBetweenGroupAndTagView('TagView'))
      dispatch(AllActions.setTagsTrendsData(arr));
    },
    viewTrends: (tagList) => {
      const arr = tagList.filter(item => item.isSelected);
      dispatch(AllActions.toggleBetweenGroupAndTagView('TagView'))
      dispatch(AllActions.setTagsTrendsData(arr));
      dispatch(AllActions.toggleTrendsPopup());
    },

  }

};


export default connect(mapStateToProps, mapDispatchToProps)(Tags);