import React from 'react'
import { Text, TouchableOpacity, View, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../../utils/Constants';
import AllActions from '../../redux/AllActions';
import SectionAccordion from '../Trends/SectionAccordion';
import { Utils } from '../Common/Utils';
import ChipButton from '../Trends/ChipButton';
import SVGCheckMarkIcon from '../../assets/check-mark.svg';
import { LoginCommonCss } from '../../css/CommonCss';


const HistoricalTags = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [unitExpended, setUnitExpanded] = React.useState(false);
    const [headerExpended, setHeaderExpanded] = React.useState(false);
    const [subHeaderExpended, setSubheaderExpanded] = React.useState(false);
    const [assetExpended, setAssetExpanded] = React.useState(false);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const [unitData, setUnitData] = React.useState([]);
    const [headerData, setHeaderData] = React.useState([]);
    const [subHeaderData, setSubHeaderData] = React.useState([]);
    const [assetData, setAssetData] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [, updateState] = React.useState();
    const tenantId = useSelector(state => state.tenantId);
    const forceUpdate = React.useCallback(() => updateState({}), []);


    const handlePress = (name, value) => {
        switch (name) {
            case 'unit':
                setUnitExpanded(!value);
                break;
            case 'header':
                setHeaderExpanded(!value);
                break;
            case 'subheader':
                setSubheaderExpanded(!value);
                break;
            case 'asset':
                setAssetExpanded(!value);
                break;
        }
    };

    React.useEffect(() => {
        if (props.tagList) {
            const filteredTags = props.tagList.filter(item => item.isSelected);
            dispatch(AllActions.setTagsTrendsData(filteredTags));
            setTags(props.tagList);
        }
    }, [props.tagList])

    //getting Asset data if unit , header ,subheader is already selected 
    React.useEffect(() => {
        if (props.selectedUnitIdInHisTagView != 0) {
            getHeaderData(props.selectedUnitIdInHisTagView);
            if (props.selectedHeaderIdInHisTagView != 0) {
                getSubHeaderData(props.selectedHeaderIdInHisTagView);
                if (props.selectedSubHeaderInHisTagView != 0) {
                    getAssetData(props.selectedSubHeaderInHisTagView);
                }
            }
        }
    }, [])

    //call to get unit
    React.useEffect(() => {
        Utils.getUnitData(ipPortData, accessToken,dispatch,tenantId)
            .then(response => {
                setUnitData([...response]);
                props.resetAssetSelectedToView();
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function openHeaderAccordion() {
        setUnitExpanded(false);
        setHeaderExpanded(true);
        setSubheaderExpanded(false);
        setAssetExpanded(false);
    }
    function openSubheaderAccordion() {
        setUnitExpanded(false);
        setHeaderExpanded(false);
        setSubheaderExpanded(true);
        setAssetExpanded(false);
    }
    function openAssetAccordion() {
        setUnitExpanded(false);
        setHeaderExpanded(false);
        setSubheaderExpanded(false);
        setAssetExpanded(true);
    }


    //getting header data
    function getHeaderData(unitId) {
        Utils.getHeaderData(ipPortData, accessToken, unitId,dispatch,tenantId)
            .then(response => {
                setHeaderData([...response]);
                props.resetAssetSelectedToView();
            })
            .catch(err => {
                console.log(err);
            });
    }

    //gettting subheader data
    function getSubHeaderData(headerId) {

        Utils.getSubHeaderData(ipPortData, accessToken, headerId,dispatch,tenantId)
            .then(response => {
                setSubHeaderData([...response]);
                props.resetAssetSelectedToView();
            })
            .catch(err => {
                console.log(err);
            });
    }

    //gettting asset data
    function getAssetData(subHeaderId) {

        Utils.getAssetData(ipPortData, accessToken, subHeaderId,dispatch,tenantId)
            .then(response => {
                setAssetData([...response]);
                props.setAssetSelectedToView();
            })
            .catch(err => {
                console.log(err);
            });
    }

    //gettting tags data
    function getTags(subHeaderId) {
        Utils.getTagsData(ipPortData, accessToken, subHeaderId,dispatch,tenantId)
            .then(async (response) => {
                let tag = await setTagsWithProperty(response);
                setTags([...tag]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function setTagsWithProperty(tag) {
        const funTags = tag.map((item, index) => {
            let new_name = item.name;
            if (index < 10) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
            return ({ ...item, new_name });
        });
        dispatch(AllActions.tagsByDefaultSelected(tag));
        return funTags;
    }

    const getChildData = (hName, id) => {

        switch (hName) {
            case 'unit':
                props.setUnitId(id);
                getHeaderData(id);
                setHeaderData([]);
                setSubHeaderData([]);
                setAssetData([]);
                setTags([]);
                openHeaderAccordion();
                break;
            case 'header':
                props.setHeaderId(id);
                getSubHeaderData(id);
                setAssetData([]);
                setTags([]);
                openSubheaderAccordion();
                break;
            case 'subheader':
                props.setSubHeaderId(id);
                getAssetData(id);
                setTags([]);
                openAssetAccordion();
                break;
            case 'asset':
                props.setAssetId(id);
                getTags(id);
                break;
        }
    };

    React.useEffect(() => {

        navigation.addListener('focus', () => {
            props.onFocusHistoricalTagView();
        })

        return () => {
            navigation.removeListener('focus');
            navigation.removeListener('blur');
        }
    }, [])

    return (

        <View
            style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>
            <ScrollView persistentScrollbar={true} endFillColor={'#00000020'} showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true} nestedScrollEnabled={true} style={{ minHeight: '35%' }}>
                <SectionAccordion
                    expanded={unitExpended}
                    getChildData={getChildData}
                    unitData={unitData}
                    name={'unit'}
                    handlePress={handlePress}
                />
                <SectionAccordion
                    expanded={headerExpended}
                    getChildData={getChildData}
                    headerData={headerData}
                    name={'header'}
                    handlePress={handlePress}
                />
                <SectionAccordion
                    expanded={subHeaderExpended}
                    getChildData={getChildData}
                    subHeaderData={subHeaderData}
                    name={'subheader'}
                    handlePress={handlePress}
                />
                <SectionAccordion
                    expanded={assetExpended}
                    getChildData={getChildData}
                    assetData={assetData}
                    name={'asset'}
                    handlePress={handlePress}
                />
            </ScrollView>
            <View style={{ height: '45%' }}>
                {
                    tags?.length > 0 ? (

                        <SafeAreaView >
                            <FlatList
                                data={tags}
                                renderItem={(item, index) => item.isSelected ? <ChipButton key={index} index={index} forceUpdate={forceUpdate} tagList={props.tagList} remove={props.toggleItem} text={item.tagName} /> : null}
                                keyExtractor={item => item.id}
                            />
                        </SafeAreaView>
                    ) : (
                        null
                    )
                }

                {assetData?.length === 0 ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'SiemensSans-Bold',
                            minHeight: height * 0.2,
                        }}>
                        <Text>Please Select Asset To View</Text>
                    </View>
                ) : tags?.length === 0 ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'SiemensSans-Bold',
                            minHeight: height * 0.2,
                        }}>
                        <Text>No Tags Found</Text>
                    </View>
                ) : (
                    <ScrollView nestedScrollEnabled={true} style={{ padding: 10, }} >
                        {
                            tags?.map((item, index) => (
                                <TouchableOpacity onPress={() => { props.toggleItem(index, props.tagList, forceUpdate) }} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 15, borderBottomWidth: 1, borderTopWidth: index === 0 ? 1 : 0, borderBottomColor: '#D7D7D7', borderTopColor: '#D7D7D7', }} key={index}>
                                    <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Roman', }}>{item.tagName}</Text>
                                    {
                                        item.isSelected && <SVGCheckMarkIcon />
                                    }
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                )
                }
            </View>

            <View style={{ height: '17%', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => props.toggleTopBarModal()} style={{ borderRadius: width * LoginCommonCss.buttonBorderRadiusForTrends(), backgroundColor: LoginCommonCss.buttonBackground(), paddingHorizontal: width * 0.05, paddingVertical: height * 0.01, }} >
                    <Text style={{ color: '#FFFFFF', fontSize: 12, }}>View Trends</Text>
                </TouchableOpacity>
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
        assetId: state.assetId,
        menuHeaderName: state.menuHeaderName,
        toggleOrientation: state.toggleOrientation,
        toggleHistoricalTopBar: state.toggleHistoricalTopBar,
        selectedUnitIdInHisTagView: state.selectedUnitIdInHisTagView,
        selectedHeaderIdInHisTagView: state.selectedHeaderIdInHisTagView,
        selectedSubHeaderInHisTagView: state.selectedSubHeaderInHisTagView,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleItem: (index, tagList, forceUpdate) => {
            tagList[index].isSelected = !tagList[index].isSelected;
            dispatch(AllActions.tagsByDefaultSelected([...tagList]));
            forceUpdate();
        },
        toggleTopBarModal: () => {
            dispatch(AllActions.toggleHistoricalTopBar());
        },
        onFocusHistoricalTagView: () => {
            dispatch(AllActions.toggleBetweenGroupAndTagsInHistorical('Tags'))
        },
        setUnitId: (id) => {
            dispatch(AllActions.setAlreadySelectedUnitIdInHistorical(id));
        },
        setHeaderId: (id) => {
            dispatch(AllActions.setAlreadySelectedHeaderIdInHistorical(id));
        },
        setSubHeaderId: (id) => {

            dispatch(AllActions.setAlreadySelectedSubHeaderIdInHistorical(id));
        },
        setAssetId: (id) => {
            dispatch(AllActions.setAssetId(id));
        },
        setAssetSelectedToView: () => {
            dispatch(AllActions.setTrueIsAssetSelectedToView());
        },
        resetAssetSelectedToView: () => {
            dispatch(AllActions.setFalseIsAssetSelectedToView());
        }




    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalTags)