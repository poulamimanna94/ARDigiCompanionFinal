/*
 * @author : Poulami Manna
 * @description : Asset Selection Page for creating or edit task
*/

import React, { useState, useEffect } from 'react';
import { Searchbar, List } from 'react-native-paper';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Utils } from '../Common/Utils';
import { useDispatch, useSelector } from 'react-redux';
import AllActions from '../../redux/AllActions';
import { height, width } from '../../utils/Constants';

const SelectAssets = ({ navigation, route }) => {
    const [unit, setUnit] = useState();
    const [expandForUnit, setExpandForUnit] = useState(false);
    const [header, setHeader] = useState();
    const [expandForHeader, setExpandForHeader] = useState(false);
    const [subHeader, setSubHeader] = useState();
    const [expandForSubHeader, setExpandForSubHeader] = useState(false);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const dispatch = useDispatch();
    const [unitData, setUnitData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [subHeaderData, setSubHeaderData] = useState([]);
    const [assetData, setAssetData] = useState([]);
    const tenantId = useSelector(state => state.tenantId);


    // const onFilterChange = (type, value) => {
    //     let filterDatas = [...data]
    //     if (type === "UNIT" || unit) {
    //         let val = type === "UNIT" ? value : unit
    //         filterDatas = filterDatas.filter(data => data.unit === val)
    //     }
    //     if (type === "HEADER" || header) {
    //         let val = type === "HEADER" ? value : header
    //         filterDatas = filterDatas.filter(data => data.header === val)
    //     }
    //     if (type === "SUBHEADER" || subHeader) {
    //         let val = type === "SUBHEADER" ? value : subHeader
    //         filterDatas = filterDatas.filter(data => data.subHeader === val)
    //     }
    //     setFilterData(filterDatas)
    // }
    

    const onChangeSearch = (query) => {
        setUnit("");
        setHeader("");
        setSubHeader("");
        filterKksOrDescription(query, data)
    }
    const filterKksOrDescription = (query, data) => {
        console.log(query, data, "query and data")
        let filterKksOrDescriptionData = [];
        data.forEach((val) => {
            if ((val.kksTag && (val.kksTag.toLowerCase()).includes(query)) || (val.desc && (val.desc.toLowerCase()).includes(query)) || (val.title && (val.title.toLowerCase()).includes(query))) {
                filterKksOrDescriptionData.push(val)
            }

        })
        if(query == undefined || query == '') {
            console.log('hello')
            setFilterData(data)
        }
        else {
        setFilterData(filterKksOrDescriptionData);
        }
    }

    useEffect(() => {
        Utils.getUnitHierachyData(ipPortData, accessToken,dispatch,tenantId)

            .then(response => {
                setUnitData(response)
            })

        Utils.getAllAssetDetails(ipPortData, accessToken,dispatch,tenantId)

            .then(response => {
                setFilterData(response)
                setData(response)

            })

    }, [])

    const getHeaderData = (unitId) => {
        Utils.getHeaderData(ipPortData, accessToken, unitId,dispatch,tenantId)
            .then(response => {
                setHeaderData(response)
            })
    }

    const getSubHeaderData = (headerId) => {
        Utils.getSubHeaderDataForTask(ipPortData, accessToken, headerId,dispatch,tenantId)
            .then(response => {
                setSubHeaderData(response)
            })
    }

    const getAssetData = (subHeaderId) => {
        Utils.getAssetDataForTask(ipPortData, accessToken, subHeaderId,dispatch,tenantId)
            .then(response => {
                setAssetData(response)
                setFilterData(response)
            })
    }
    console.log(filterData, "filterData")
    return (
        <View style={{ flex: 1, width: '100%', padding: 10, backgroundColor: "white" }}>
            <Searchbar
                style={{ height: height * 0.052, fontSize: 8, backgroundColor: "#FFFFFF", justifyContent: "center", borderWidth: 1, borderColor: '#1A1A1B', }}
                placeholder="Search by KKS or description"
                placeholderTextColor="rgba(0,0,0,0.4)"
                onChangeText={onChangeSearch}
            
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}>
                <View>
                    <Text style={{ color: '#1B1534', fontSize: 14, fontFamily: 'SiemensSans-Roman' }}>
                        <List.Accordion title="Unit" description={unit} expanded={expandForUnit} onPress={() => {
                            setExpandForUnit(!expandForUnit)
                        }
                        }
                            style={{ backgroundColor: "white" }}
                            titleStyle={{ color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12 }}

                        >
                            
                            {unitData?.map((data, i) => (
                                <List.Item titleStyle={{ color: '#000000', fontSize: 14, fontFamily: 'SiemensSans-Roman' }} title={data.unitName} onPress={() => {
                                    setUnit(data.unitName)
                                    setExpandForUnit(false)
                                    getHeaderData(data.id)

                                }} />
                            ))}
                        </List.Accordion>

                    </Text>
                </View>
                <View>
                    <Text>
                        <List.Accordion title="Header" description={header} expanded={expandForHeader} onPress={() => setExpandForHeader(!expandForHeader)}
                            style={{ backgroundColor: "white" }}
                            titleStyle={{ color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}

                        >
                           
                            {headerData?.map((data, i) => (
                                <List.Item titleStyle={{ color: '#000000', fontSize: 14, fontFamily: 'SiemensSans-Roman' }} title={data.headerName} onPress={() => {
                                    setHeader(data.headerName)
                                    setExpandForHeader(false)
                                    getSubHeaderData(data.id)
                                }} />
                            ))}

                        </List.Accordion>
                    </Text>
                </View>
                <View>
                    <Text>
                        <List.Accordion title="SubHeader" description={subHeader} expanded={expandForSubHeader} onPress={() => setExpandForSubHeader(!expandForSubHeader)}
                            style={{ backgroundColor: "white" }}
                            titleStyle={{ color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12 }}

                        >
                            

                            {subHeaderData?.map((data, i) => (
                                <List.Item titleStyle={{ color: '#000000', fontSize: 14, fontFamily: 'SiemensSans-Roman' }} title={data.subHeaderName} onPress={() => {
                                    setSubHeader(data.subHeaderName)
                                    setExpandForSubHeader(false)
                                    getAssetData(data.id)

                                }} />
                            ))}
                        </List.Accordion>
                    </Text>
                </View>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
               
                {filterData && filterData?.length > 0 ? (filterData?.map((data) => {
                    return (
                        <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: "#BECDD7", padding: 12, marginTop: 5, }}
                            onPress={() => {                               
                                console.log(data, "asset id data")
                                route?.params.setSelectText(data.unitName + " > " + data.headerName + " > " + data.subHeaderName + " > " + data.kksTag)
                                route?.params.setAssetDetailId(data?.assetId)
                                dispatch(AllActions.setAssetId(data?.assetId));
                                dispatch(AllActions.setSelectAssetEditToView(data?.unitName + " > " + data?.headerName + " > " + data?.subHeaderName + " > " + data?.kksTag + " > " + route?.params?.taskId))
                                dispatch(AllActions.setAssetIdSet(data?.assetId))
                                navigation.navigate(route.params && route.params.action ? "CreateTask" : "ViewTaskTopTab", {
                                    
                                })
                            }}>
                            <Text style={{ color: '#2D373C', fontFamily: 'SiemensSans-Bold', fontSize: 14, }} >
                                {data.kksTag}
                            </Text>
                            <Text style={{ color: '#2D373C', fontFamily: 'SiemensSans-Roman', fontSize: 14, }}>
                                {data.desc}
                            </Text>
                        </TouchableOpacity>
                    )
                })): <></>} 
            </ScrollView>
        </View>
    )
}

const MessageComponent = ({ message }) => {
    return (
        <View style={{ width: width, height: height * 0.7, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 18, color: '#2D373C' }}>{message}</Text>
        </View>
    )
}

export default SelectAssets;