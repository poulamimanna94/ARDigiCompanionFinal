/*
 * @author : Poulami Manna
 * @description : Asset Hirerchy page after OCR Scanner
 */

import React, { useEffect, useState, } from 'react';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    ScrollView,
    LogBox,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Utils } from '../components/Common/Utils';
import SVGLeftArrowIcon from '../assets/arrow-left-small.svg';
import AllActions from '../redux/AllActions';

import { height } from '../utils/Constants';


const KksSelection = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const [unitList, setUnitList] = React.useState([]);
    const [loader, setLoader] = new useState(true);
    const tenantId = useSelector(state => state.tenantId);

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [props.assetId]);

    useEffect(() => {
        Utils.getAssetHierachyData(ipPortData, accessToken, props.kksTag?.trim().toUpperCase(), dispatch,tenantId)
            .finally(() => { setLoader(false) })
            .then(response => {
                prepareData(response);
            })
            .catch(err => console.log(err));
    }, [props.kksTag])


    const prepareData = (response) => {
        const localUnitList = [];
        let found = false;
        for (let data of response) {
            let obj;
            found = false;
            if (localUnitList.length == 0) {
                obj = {
                    unitName: data.unitName,
                    data: [{ ...data }],
                }
            }
            else {
                for (let item of localUnitList) {
                    if (item.unitName === data.unitName) {
                        item.data.push({ ...data });
                        found = true;
                    }
                }
                if (!found) {
                    obj = {
                        unitName: data.unitName,
                        data: [{ ...data }],
                    }
                }
            }

            if (obj) {
                localUnitList.push(obj);
            }
        }
        if(localUnitList.length === 1) {
            setPath(localUnitList[0]?.unitName, localUnitList[0]?.data[0]?.headerName, localUnitList[0]?.data[0]?.subHeaderName,  localUnitList[0]?.data[0]?.kksTag, localUnitList[0]?.data[0]?.assetId)
        }
        else {
        setUnitList(localUnitList);
        }

    }

    function setPath(indexOne, indexTow, indexThree, indexFour, assetId) {
        let path = `${indexOne} | ${indexTow} | ${indexThree} | ${indexFour}`
        dispatch(AllActions.setMenuHeaderName(path));
        dispatch(AllActions.setAssetId(assetId))
        navigation.navigate("CameraScreen", { kksTag: assetId, menuHeaderName: path })
    }


    return (
        <View style={{ flex: 1, height: height, width: '100%', backgroundColor: "#fff" }}>
            <View style={{ height: height * 0.08, backgroundColor: '#F2F2F2', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ padding: 5, marginLeft: 10, }}><SVGLeftArrowIcon /></TouchableOpacity>
                <Text style={{ position: 'absolute', left: '40%', alignSelf: 'center', fontFamily: 'SiemensSans-Bold', fontSize: 24, }}>Assets</Text>
            </View>
            {
                unitList?.length > 0 ? (
                    <ScrollView >
                        {unitList?.map((data, root) => (
                            <List.Accordion
                                key={root}
                                style={styles.unitContainer}
                                title={(data.unitName)}
                                titleStyle={{ color: "#000000", fontSize: 14, fontFamily: 'SiemensSans-Bold' }}
                            >
                                {
                                    data.data.map((item, index) => (
                                        <List.Accordion key={item.headerId} style={styles.sectionContainer} titleStyle={{ color: "#000000", marginLeft: 15, fontSize: 14, fontFamily: 'SiemensSans-Roman' }} title={item.headerName} >
                                            {
                                                <List.Accordion key={item.subHeaderId} style={styles.sectionContainer} titleStyle={{ color: "#000000", marginLeft: 30, fontSize: 14, fontFamily: 'SiemensSans-Roman' }} title={item.subHeaderName} >
                                                    {
                                                        <List.Item key={item.assetId} style={styles.assetsContainer} titleStyle={{ color: "#000000", marginLeft: 65, fontSize: 14, fontFamily: 'SiemensSans-Roman' }} onPress={() => { setPath(item.unitName, item.headerName, item.subHeaderName, item.kksTag, item.assetId) }} title={item.kksTag} />
                                                    }
                                                </List.Accordion>

                                            }
                                        </List.Accordion>
                                    ))
                                }
                            </List.Accordion>
                        ))}

                    </ScrollView>
                )

                    :
                    (
                        <View style={{ width: '100%', height: height * 0.8, backgroundColor: '#fff', justifyContent: "center", alignItems: 'center', }}>
                            <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 24, }}> {loader ? 'loading ...' : 'No Asset Found'}</Text>
                        </View>
                    )
            }

        </View >
    );
};

const mapStateToProps = state => {
    return {
        ipPortData: state.ipPortData,
        accessToken: state.accessToken,
        tagList: state.tagList,
        selectedTrendTagList: state.selectedTrendTagList,
        assetId: state.assetId,
        menuHeaderName: state.menuHeaderName,
        kksTag: state.kksTag,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KksSelection);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0',

    },
    unitContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#BECDD7',
        borderTopColor: '#BECDD7',
    },
    sectionContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        borderTopColor: '#F0F0F0',
        backgroundColor: '#EAEAEA',
    },
    assetsContainer: {
        backgroundColor: '#EAEAEA',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',

    },
});
