import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AllActions from '../../redux/AllActions';
import SVGCheckMarkIcon from '../../assets/check-mark.svg';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { width, height } from '../../utils/Constants';
import { LoginCommonCss } from '../../css/CommonCss';

const GroupTrend = (props) => {

    const navigation = useNavigation();
    const [groupName, setGroupName] = React.useState([]);
    const [loader, setLoader] = React.useState(true);

    React.useEffect(() => {
        let timeout;
        if (loader) {
            timeout = setTimeout(() => {
                setLoader(false);
            }, 400)
        }

        return (() => timeout ? clearTimeout(timeout) : null)
    }, [loader])

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            props.changeViewOnFocus();
        })

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

            setGroupName(localGroupName);
        }

    }, [props.graphGroupData])

    return (

        <View style={{ backgroundColor: '#fff', height: "99%", width: '100%', padding: 8, }}>
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
                                        groupNameAndTag.tags.map((tagName, index) => (
                                            <List.Item style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderTopWidth: index === 0 ? 1 : 0, borderBottomColor: '#D7D7D7', borderTopColor: '#D7D7D7' }} titleStyle={{ fontSize: 10, fontFamily: 'SiemensSans-Roman', }} right={() => props.groupNameToShowOnView === groupNameAndTag.groupName ? <SVGCheckMarkIcon style={{ marginRight: 15 }} /> : null} title={tagName} key={tagName + index} />
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
                <View style={{ padding: 15, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => { props.toggleGroupAndTagView() }} style={{ borderRadius: width * LoginCommonCss.buttonBorderRadiusForTrends(), backgroundColor: LoginCommonCss.buttonBackground(), paddingHorizontal: width * 0.05, paddingVertical: height * 0.01, }} >
                        <Text style={{ color: '#FFFFFF', fontSize: 12, }}>View Trends</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        ipPortData: state.ipPortData,
        accessToken: state.accessToken,
        tagList: state.tagList,
        selectedTrendTagList: state.selectedTrendTagList,
        toggleTrendsPopup: state.toggleTrendsPopup,
        graphGroupData: state.graphGroupData,
        toggleOrientation: state.toggleOrientation,
        groupNameToShowOnView: state.groupNameToShowOnView,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSelectedGroupOnView: (name) => {
            dispatch(AllActions.setSelectedGroupToShowOnView(name));
        },
        changeViewOnFocus: () => {
            dispatch(AllActions.toggleBetweenGroupAndTagView('GroupView'));

        },
        toggleGroupAndTagView: () => {
            dispatch(AllActions.toggleBetweenGroupAndTagView('GroupView'));
            dispatch(AllActions.toggleTrendsPopup());
        }

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(GroupTrend);