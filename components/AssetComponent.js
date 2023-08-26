import React, { useEffect, useState } from 'react';
import { ActivityIndicator, List, Searchbar, Modal } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    LogBox,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Platform,
    Alert
} from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Utils } from './Common/Utils';
import Plus from '../assets/plus.svg';
import Minus from '../assets/Rectangle.svg';
import SVGRightArrow from '../assets/About-arrow.svg';
import SVGScan from '../assets/Scan.svg';
import SVGVideoCall from '../assets/videocallsvg.svg';
import AllActions from '../redux/AllActions';
import Consent from './Consent/Consent';
import { height, width } from '../utils/Constants';
import ErrorPopup from './ErrorPopup';
import Notification from './Notification';
import {LoginCommonCss} from '../css/CommonCss';
import SVGVideoCallTeal from '../assets/videoCallTealSvgIcon.svg';
import SVGScanTeal from '../assets/scanTealSvgIcon.svg';
//Video Call Modal icon
import Contact from './VideoCall/assets/contacts.svg';
import Close from './VideoCall/assets/close.svg';
import modalStyles from './VideoCall/Styles';
import { AttendeeItem } from './VideoCall/components/AttendeeItem';
import LogoutPopUp from './VideoCall/components/LogoutPopUp';


const AssetComponent = ({ route, showContactsOfVideoCallAction, showContactsOfVideoCall, showMeetingRoom, showMeetingRoomAction, showResumeCall, showRoomNameAction }) => {
    const [unitListData, setUnitListData] = useState([]);
    const [assetsList] = useState([]);
    const [searchedAssetList, setSearchAssetList] = useState([]);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken)
    const [loader, setLoader] = useState(true);
    const [boldData, setBoldData] = useState({});
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tenantId = useSelector(state => state.tenantId);

    //For Video Call Modal
    const [modalVisible, setModalVisible] = useState(false)
    const [selectOrDeselectAll, setSelectOrDeselectAll] = useState(false)
    const [joinData, setJoinData] = useState([])
    const userDetail = useSelector(state => state.userDetail);
    const deviceToken = useSelector(state => state.deviceToken);

    // Side bar has remote support option . So, that a person can make a call from there also .
    useEffect(()=>{
        route?.params?.videoCall && !showResumeCall? setModalVisible(true): setModalVisible(false)
    }, [route])

    useEffect(() => {
        const deviceType = Platform.OS=== 'ios' ? 'ios': 'android'
        Utils.sendDeviceTokenOnLogin(ipPortData, accessToken, userDetail.id, deviceToken, dispatch, tenantId, deviceType)
            .then(() => { console.log("SUCCESS");})
            .catch((e) => { console.log("ERROR", e)})
    }, [])

    // useEffect(()=>{
    //     if(!showVideoCallModal && showMeetingRoom){
    //         showResumeCallAction(true)
    //     }
    // },[showVideoCallModal])


    const marginLeftFunc = (level) => {
        switch (level) {
            case 'header':
                return 15;
            case 'subheader':
                return 25;
            case 'asset':
                return 35;
            default:
                return 0;
        }
    }

    const LeftHeading = (props) => {
        return (
            !props.isOpened ? (
                <View style={[styles.leftContainer, { marginLeft: marginLeftFunc(props.level) }]}>
                    <Plus width={12} height={40} />
                    <Text style={{ marginLeft: 10, fontFamily: props.level === 'unit' ? 'SiemensSans-Bold' : 'SiemensSans-Roman', fontSize: 14, color: '#2D373C' }}>
                        {props.data}
                    </Text>
                </View>
            ) : (
                <View style={[styles.leftContainer, { marginLeft: props.level === 'header' ? 15 : props.level === 'subheader' ? 30 : props.level === 'asset' ? 55 : 0 }]}>
                    {
                        props.level !== 'asset' &&
                        <Minus width={12} height={40} />
                    }
                    <Text style={{ marginLeft: 10, fontFamily: props.level === 'unit' ? 'SiemensSans-Bold' : 'SiemensSans-Roman', fontSize: 14, color: '#2D373C' }}>
                        {props.data}
                    </Text>
                </View>
            )
        )
    }
    const RightHeading = (props) => {
        return (
            (props.level === 'asset') && (
                <View style={{ width: width * 0.2 }}>
                    <SVGRightArrow />
                </View>
            )
        )
    }


    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [route.params]);




    useEffect(() => {
        Utils.getUnitHierachyData(ipPortData, accessToken, dispatch, tenantId)
            .finally(() => { setLoader(false) })
            .then(response => {

                setUnitListData(response)
            })
        // Video call USer Contacts 
        Utils.getUserListWithDevice(ipPortData, accessToken, dispatch, tenantId, userDetail.id)
            .finally(() => { setLoader(false) })
            .then(response => {
                showContactsOfVideoCallAction(response)
            })
    }, [])

    useEffect(() => {
        if (unitListData?.length > 0 && assetsList?.length <= 0) {
            makeInitialTree();
        }
    }, [unitListData])


    function makeInitialTree() {
        unitListData.map((item, index) => {
            item.headers.map((item1, index1) => {
                item1.subHeaders.map((item2, index2) => {
                    item2.assets.map((asset, index3) => {
                        let newObj = {
                            unitIndex: index,
                            headerIndex: index1,
                            subHeaderIndex: index2,
                            kksTag: asset.kksTag,
                            id: asset.id,
                        }
                        assetsList.push(newObj);
                    })
                })

            })
        })


    }

    function setPath(indexOne, indexTow, indexThree, indexFour) {
        let path = unitListData[indexOne]?.unitName;
        path = path + " > " + unitListData[indexOne]?.headers[indexTow]?.headerName;
        path = path + " > " + unitListData[indexOne]?.headers[indexTow]?.subHeaders[indexThree]?.subHeaderName;
        path = path + " > " + unitListData[indexOne]?.headers[indexTow]?.subHeaders[indexThree]?.assets[indexFour]?.kksTag;
        let id = unitListData[indexOne]?.headers[indexTow]?.subHeaders[indexThree]?.assets[indexFour]?.id;

        navigation.navigate("Parameter", { kksTag: id, menuHeaderName: path });
        dispatch(AllActions.setMenuHeaderName(path));
        dispatch(AllActions.setAssetId(id))
    }


    const onChangeSearch = (query) => {
        let arr = [];
        let unitIndexInArr = 0;
        let unitIndex = [];


        let obj = {
            unitName: '',
            headers: [],
        }

        if (query == undefined || query.length === 0) {
            setSearchAssetList([]);
            return;
        }

        if (searchedAssetList.length > 0) {
        }
        else {
            for (let i = 0; i < assetsList.length; i++) {
                if (assetsList[i].kksTag.toLowerCase().search(query.toLowerCase()) >= 0) {
                    //if its first obj

                    if (arr.length == 0) {
                        obj.unitName = unitListData[assetsList[i].unitIndex].unitName;
                        let headersSingle = {
                            headerName: unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].headerName,
                            subHeaders: [],
                        }
                        let subHeadersSingle = {
                            subHeaderName: unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].subHeaders[assetsList[i].subHeaderIndex]?.subHeaderName,
                            assets: [],
                        }
                        let assetsSingle = {
                            kksTag: assetsList[i].kksTag,
                            id: assetsList[i].id,
                        }
                        subHeadersSingle.assets.push(assetsSingle);
                        headersSingle.subHeaders.push(subHeadersSingle);
                        obj.headers.push(headersSingle);

                        arr.push(obj);
                        unitIndex.push({
                            unitIndex: unitIndexInArr,
                            unitName: unitListData[assetsList[i].unitIndex].unitName,
                        })
                        unitIndexInArr++;
                    }
                    //if its 2nd ans so obj
                    else {
                        let foundUnitIndex = -1;
                        for (let j = 0; j < unitIndex.length; j++) {
                            let unitList = unitIndex[j];
                            if (unitList.unitName === unitListData[assetsList[i].unitIndex].unitName) {
                                foundUnitIndex = unitList.unitIndex;
                                break;
                            }
                        }
                        if (foundUnitIndex === -1) {
                            let obj1 = {
                                unitName: '',
                                headers: [],
                            }
                            obj1.unitName = unitListData[assetsList[i].unitIndex].unitName;
                            let headersSingle = {
                                headerName: unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].headerName,
                                subHeaders: [],
                            }
                            let subHeadersSingle = {
                                subHeaderName: unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].subHeaders[assetsList[i].subHeaderIndex]?.subHeaderName,
                                assets: [],
                            }
                            let assetsSingle = {
                                kksTag: assetsList[i].kksTag,
                                id: assetsList[i].id,
                            }
                            headersSingle.subHeaders.push(subHeadersSingle);
                            subHeadersSingle.assets.push(assetsSingle);
                            obj1.headers.push(headersSingle);
                            arr.push(obj1);
                            unitIndex.push({
                                unitIndex: unitIndexInArr,
                                unitName: unitListData[assetsList[i].unitIndex].unitName,
                            })
                            unitIndexInArr++;
                        }
                        else {
                            let unitValue = arr[foundUnitIndex];
                            let foundHeaderIndex = -1;
                            let foundSubHeaderIndex = -1;
                            for (let head = 0; head < unitValue.headers.length; head++) {
                                if (unitValue.headers[head].headerName === unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].headerName) {
                                    //header matched
                                    foundHeaderIndex = head;
                                    break;
                                }
                            }

                            if (foundHeaderIndex == -1) {
                                // header not found add header + subheader + asset
                                let tempHeader = {
                                    headerName: unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].headerName,
                                    subHeaders: [],
                                }
                                let tempSubHeader = {
                                    subHeaderName: unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].subHeaders[assetsList[i].subHeaderIndex]?.subHeaderName,
                                    assets: [],
                                }
                                let asset = {
                                    kksTag: assetsList[i].kksTag,
                                    id: assetsList[i].id,
                                }
                                tempSubHeader.assets.push(asset);
                                tempHeader.subHeaders.push(tempSubHeader);
                                unitValue.headers.push(tempHeader);
                            }
                            else {

                                //header found  checking for subheader
                                for (let subHead = 0; subHead < unitValue.headers[foundHeaderIndex].subHeaders.length; subHead++) {
                                    if (unitValue.headers[foundHeaderIndex].subHeaders[subHead]?.subHeaderName === unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].subHeaders[assetsList[i].subHeaderIndex]?.subHeaderName) {
                                        foundSubHeaderIndex = subHead;
                                        break;
                                    }


                                }
                                if (foundSubHeaderIndex === -1) {
                                    //sub header not found

                                    let rootHeaderArr = unitValue.headers[foundHeaderIndex];

                                    let asset = {
                                        kksTag: assetsList[i].kksTag,
                                        id: assetsList[i].id,
                                    }

                                    let subheader = {
                                        subHeaderName: unitListData[assetsList[i].unitIndex].headers[assetsList[i].headerIndex].subHeaders[assetsList[i].subHeaderIndex]?.subHeaderName,
                                        assets: [],
                                    }

                                    subheader.assets.push(asset);
                                    //rootSubHeaderArr.assets.push(asset);
                                    rootHeaderArr.subHeaders.push(subheader);
                                }
                            }
                        }
                    }

                }

                setSearchAssetList([...arr]);


            }
        }
    }
    const settingState = (input) => {
        let stateData = { ...boldData };
        stateData[input] = !stateData[input] || false;
        checkChildTree(input, stateData);
    }
    const checkChildTree = (input, stateData) => {

        if (stateData[input] == false) {
            let keys = Object.keys(stateData);
            for (let i = 0; i < keys.length; i++) {
                let inputArray = input.split("-");
                let stateDataArray = keys[i].split("-");
                if (inputArray[inputArray.length - 1] == stateDataArray[inputArray.length - 1]) {
                    stateData[keys[i]] = false;
                }
            }
        }
        setBoldData(stateData);
    }

    function showPath(unitName, headerName, subHeaderName, kksTag, id) {
        const path = unitName + " > " + headerName + " > " + subHeaderName + " > " + kksTag
        navigation.navigate("Parameter", { kksTag: id, menuHeaderName: path })
        dispatch(AllActions.setAssetId(id));
        dispatch(AllActions.setMenuHeaderName(path));
    }

    //Video call Join button click work
    const join = () => {
        const meetingName = `Siemens ${new Date()}`
        const dataToNotify = joinData.map(item => {
            item.meetingName =meetingName
            delete item.key
            return item
        })
        const callsData = {
            "userId":  userDetail.id,
            "startTime": new Date(),
            "endTime": "",
            "videoCallSession": meetingName,
            "callStatus": "create-Call"
        }
        console.log(callsData,"CALL DATA")
        Utils.postSaveCalls(ipPortData, accessToken, callsData, tenantId)
            .finally(() => { setLoader(false) })
            .then(response => {
                console.log(response, "JOIN DATA || SAVE CALLS || LICENSE")
                if(response.status == 200){
                    Utils.postNotifyToJoin(ipPortData, accessToken, dataToNotify, dispatch, tenantId)
                    .finally(() => { setLoader(false) })
                    .then(response => {
                        console.log(response, "ASSET COMPONENT NOTIFY")
                    })
                    showMeetingRoomAction(true)
                    showRoomNameAction(meetingName)
                    setSelectOrDeselectAll(false)
                    setModalVisible(!modalVisible)
                    setJoinData([])
                }
                else if(response.status == 500 && (response.message == 'License defined limit exceeds for VideoCallsPerMonthToSiemensAdmin' || response.message == 'License defined limit exceeds for VideoCallMinutesPerMonth')){
                    Alert.alert('LICENSE EXPIRED:', 'License expired. Renew the license to continue using all features')
                    setModalVisible(!modalVisible)
                }
            })
       
    }

    return (
        <View style={{ flex: 1, width: '100%', padding: 5, backgroundColor: "white", }}>
            <View style={{ padding: 5, }}>
                <Searchbar
                    style={{ height: height * 0.052, fontSize: 8, backgroundColor: modalVisible? "grey": "#FFFFFF", justifyContent: "center", borderWidth: 1, borderColor: '#1A1A1B', }}
                    placeholder="Search"
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    onChangeText={(e) => onChangeSearch(e)} />

            </View>

            {
                loader && <LocalLoaderComponent />
            }
            {
                searchedAssetList.length > 0 ?
                    (
                        <SafeAreaView style={styles.container} >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <List.Section >
                                    {
                                        searchedAssetList?.map((unit, unitIndex) => (
                                            <>
                                                <SearchUnitItem RightHeading={RightHeading} showPath={showPath} unit={unit} unitIndex={unitIndex} />
                                            </>
                                        ))
                                    }
                                </List.Section>
                            </ScrollView>
                        </SafeAreaView>
                    )
                    :
                    (
                        <><SafeAreaView style={styles.container}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View>
                                    {unitListData?.map((data, root) => (
                                        <UnitItem key={root + 1000} setPath={setPath} RightHeading={RightHeading} LeftHeading={LeftHeading} data={data} root={root} boldData={boldData} settingState={settingState} />
                                    ))}
                                </View>
                                <ErrorPopup />
                            </ScrollView>
                            <Consent />
                            <Notification />
                        </SafeAreaView><ActionButtonItem navigation={navigation} setModalVisible={setModalVisible} modalVisible={modalVisible} showResumeCall={showResumeCall} /></>

                    )
            }
        
            {/* Contact list for video call modal */}
            {
                <Modal
                    visible={modalVisible}
                    onDismiss={() => { setModalVisible(!modalVisible) }}
                >
                    <View
                        style={{
                            height: '70%',
                            margin: 'auto',
                            marginTop: '80%',
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderBottomColor: '#eee',
                                padding: 10,
                            }}
                        >
                            <View style={{ flex: 0.98, flexDirection: 'row' }}>
                                <Contact style={{ margin: 10 }} />
                                <Text style={modalStyles.title}>Contacts</Text>
                            </View>
                            <TouchableOpacity
                                style={{ alignSelf: 'center' }}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setSelectOrDeselectAll(false)
                                    setJoinData([])
                                }
                                }
                            >
                                <Close height={20} width={20} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={modalStyles.attendeeList}
                            data={showContactsOfVideoCall}
                            renderItem={({ item, index }) => (<AttendeeItem
                                attendeeName={
                                    item.firstName && item?.lastName ?`${item.firstName} ${item?.lastName}`: `${item.firstName}`
                                }
                                department={item.department}
                                // PARTICIPANT LIMIT
                                maxLimit={joinData.length>=8? true: false}
                                selectOrDeselectAll={selectOrDeselectAll}
                                checkbox
                                onCheckboxSelect={(item, itemIndex) =>
                                (
                                    showContactsOfVideoCall.length-1 === joinData.length? setSelectOrDeselectAll(true): setSelectOrDeselectAll(false),
                                    setJoinData(oldItem => [...oldItem, { key: itemIndex, userName: userDetail.firstName, userId: item.id }])
                                )}
                                onCheckboxUnSelect={(item, itemIndex) => (
                                    setJoinData(joinData.filter((i, index, arr) => { return itemIndex != arr[index].key }))
                                )}
                                item={item}
                                itemIndex={index}
                            />
                            )}
                            contentContainerStyle={{ paddingBottom: 130 }}
                            keyExtractor={(item, index) => index}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{ flexDirection: 'row', bottom: Dimensions.get('window').height / 10, position: 'absolute' }}>
                            {/* PARTICIPANT LIMIT  || Select all functionality configuration*/}
                            {/* <TouchableOpacity
                                activeOpacity={1}
                                style={[modalStyles.joinButton, { borderRighWidth: 1 }]}
                                onPress={() => (
                                    setSelectOrDeselectAll(!selectOrDeselectAll),
                                    !selectOrDeselectAll ? setJoinData(oldItems => {
                                        const finalItems = [];
                                        for (let i = 0; i < showContactsOfVideoCall.length; i++) {
                                            finalItems.push({ userName: `${showContactsOfVideoCall[i].firstName} ${showContactsOfVideoCall[i].lastName}`, key: i, deviceToken: showContactsOfVideoCall[i].tokens, aapKey: showContactsOfVideoCall[i].appKey })
                                        }
                                        return finalItems
                                    }) : setJoinData([])
                                )}
                            >
                                <Text style={{ color: 'white' }}>{selectOrDeselectAll && joinData.length ? "Deselect All" : "Select All"}</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                disabled={joinData.length === 0 ? true : false}
                                activeOpacity={1}
                                style={[modalStyles.joinButton, { borderLeftWidth: 1 }]}
                                onPress={join}
                            >
                                <Text style={{ color: 'white' }}>Join({joinData.length})</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
            <LogoutPopUp />
        </View>


    );
};

const ActionButtonItem = ({ navigation, setModalVisible, modalVisible, showResumeCall }) => {
    return (
        <ActionButton buttonColor= {LoginCommonCss.buttonBackground()} >
            <ActionButton.Item
                buttonColor= {LoginCommonCss.swipeButtonBackground()}
                onPress={() => {
                    //Open video call modal
                    showResumeCall ? Alert.alert('Please end the current call .'):setModalVisible(!modalVisible)
                }}>
                {/* <SVGVideoCall /> */}
                {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGVideoCall />}
                {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGVideoCallTeal />}
            </ActionButton.Item>
            <ActionButton.Item buttonColor={LoginCommonCss.swipeButtonBackground()}
                onPress={() => {
                    navigation.navigate('Scanner');
                }}>
                {/* <SVGScan /> */}
                {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGScan />}
                {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGScanTeal />}
            </ActionButton.Item>
        </ActionButton>

    )
}



const SearchUnitItem = ({ unit, unitIndex, RightHeading, showPath }) => {
    return (
        <>
            <List.Accordion right={() => <RightHeading />} key={unit.unitName + unitIndex} expanded={true} style={styles.unitContainer} titleStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, color: '#2D373C' }} title={unit.unitName} >
                {
                    unit?.headers?.map((header, headerIndex) => (
                        <SearchHeaderItem showPath={showPath} RightHeading={RightHeading} unit={unit} header={header} headerIndex={headerIndex} />
                    ))
                }
            </List.Accordion>
        </>
    )
}
const SearchHeaderItem = ({ showPath, unit, header, headerIndex, RightHeading }) => {
    return (
        <>
            <List.Accordion key={header.headerName + headerIndex} right={() => <RightHeading />} expanded={true} style={styles.sectionContainer} titleStyle={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, marginLeft: 20, color: '#2D373C' }} title={header.headerName}>
                {
                    header?.subHeaders?.map((subHeader, subHeaderIndex) => (
                        <SearchSubHeaderItem showPath={showPath} RightHeading={RightHeading} unit={unit} header={header} subHeader={subHeader} subHeaderIndex={subHeaderIndex} />
                    ))
                }
            </List.Accordion>
        </>
    )
}

const SearchSubHeaderItem = ({ showPath, unit, header, subHeader, subHeaderIndex, RightHeading }) => {
    return (
        <>
            <List.Accordion key={subHeader.subHeaderName + subHeaderIndex} right={() => <RightHeading />} expanded={true} style={styles.sectionContainer} titleStyle={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, marginLeft: 35, color: '#2D373C' }} title={subHeader.subHeaderName} >
                {
                    subHeader?.assets?.map((asset, assetItemIndex) =>
                        <SearchAssetItem showPath={showPath} unit={unit} header={header} subHeader={subHeader} asset={asset} assetItemIndex={assetItemIndex} />
                    )
                }
            </List.Accordion>
        </>
    )
}

const SearchAssetItem = ({ showPath, asset, unit, header, subHeader, assetItemIndex, }) => {
    return (
        <>
            <List.Accordion key={asset.id} onPress={() => { showPath(unit.unitName, header.headerName, subHeader.subHeaderName, asset.kksTag, asset.id) }} expanded={true} style={styles.sectionContainer} titleStyle={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, marginLeft: 60, color: '#2D373C' }} title={asset.kksTag} >
            </List.Accordion>
        </>
    )
}

const UnitItem = ({ setPath, data, root, boldData, settingState, LeftHeading, RightHeading }) => {
    console.log(data);
    return (
        <>
            <List.Accordion
                key={data.id + 10000}
                left={() => <LeftHeading data={data.unitName} level={"unit"} isOpened={boldData[root.toString()]} />}
                right={() => <RightHeading />}
                style={styles.unitContainer}
                // left= {props => boldData[root.toString()] == true ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" /> }
                onPress={() => {
                    settingState(root.toString())
                }}
            >
                {
                    data?.headers?.map((headerItem, childOne) => (
                        <HeaderItem key={headerItem + 15000} setPath={setPath} childOne={childOne} data={data} root={root} headerItem={headerItem} LeftHeading={LeftHeading} RightHeading={RightHeading} settingState={settingState} boldData={boldData} />
                    ))
                }

            </List.Accordion>
        </>
    )
}

const HeaderItem = ({ setPath, data, headerItem, root, childOne, LeftHeading, RightHeading, boldData, settingState }) => {
    return (
        <>
            <List.Accordion
                key={childOne + 20000}
                left={() => <LeftHeading data={headerItem.headerName} level={"header"} isOpened={boldData[root + "-" + childOne]} />}
                right={() => <RightHeading />}
                style={styles.sectionContainer}
                {...(boldData[root + "-" + childOne] == true && {
                    titleStyle: { color: "#2D373C", fontWeight: "bold", marginLeft: 35, fontSize: 17 }
                })}
                onPress={() => {
                    settingState(root + "-" + childOne)
                }}

            >
                {
                    headerItem?.subHeaders?.map((subHeaderItem, childTow) => (
                        <SubHeaderItem key={subHeaderItem.id + 25000} setPath={setPath} data={data} childOne={childOne} subHeaderItem={subHeaderItem} childTow={childTow} root={root} LeftHeading={LeftHeading} RightHeading={RightHeading} settingState={settingState} boldData={boldData} />
                    ))
                }
            </List.Accordion>
        </>
    )
}

const SubHeaderItem = ({ setPath, subHeaderItem, childTow, root, childOne, LeftHeading, RightHeading, boldData, settingState }) => {
    return (
        <>
            <List.Accordion style={styles.elevationContainer}
                key={childTow + 30000}
                left={() => <LeftHeading data={subHeaderItem.subHeaderName} level={"subheader"} isOpened={boldData[root + "-" + childOne + "-" + childTow]} />}
                right={() => <RightHeading />}

                {...(boldData[root + "-" + childOne + "-" + childTow] == true && {
                    titleStyle: { color: "#2D373C", fontWeight: "bold", marginLeft: 70, fontSize: 16 }
                })}
                onPress={() => {

                    settingState(root + "-" + childOne + "-" + childTow)
                }}
                {...(boldData[root + "-" + childOne + "-" + childTow] !== true && {
                    titleStyle: { color: "#2D373C", marginLeft: 70, fontSize: 16 }
                })} >

                {subHeaderItem?.assets?.map((assetItem, childThree) => (
                    <AssetItem key={childThree + 35000} setPath={setPath} childOne={childOne} childThree={childThree} assetItem={assetItem} subHeaderItem={subHeaderItem} childTow={childTow} root={root} LeftHeading={LeftHeading} RightHeading={RightHeading} settingState={settingState} boldData={boldData} />
                ))}
            </List.Accordion>
        </>
    )
}

const AssetItem = ({ setPath, childThree, assetItem, childTow, root, childOne, LeftHeading, RightHeading, boldData, settingState }) => {
    return (
        <>
            <List.Accordion
                key={assetItem.assetId + 40000}
                left={() => <LeftHeading data={assetItem.kksTag} level={"asset"} isOpened={boldData[root + "-" + childOne + "-" + childTow]} />}
                right={() => <RightHeading level={"asset"} />}
                style={styles.assetsContainer}
                onPress={() => {
                    setPath(root, childOne, childTow, childThree);
                }}
            >
            </List.Accordion>
        </>
    )
}

const LocalLoaderComponent = () => {
    return (
        <View style={{ height: height * 0.8, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={LoginCommonCss.buttonBackground()} />
        </View>
    )
}

const styles = StyleSheet.create({
    assetContainers: {
        borderTopWidth: 1,
        borderTopColor: '#DFE6ED',
    },
    container: {
        // flex: 1, //White box was coming
        backgroundColor: 'white',
    },
    unitContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#BECDD7',
    },
    sectionContainer: {
        borderBottomWidth: 1,
        backgroundColor: '#EAEAEA',
        borderBottomColor: '#F0F0F0',
    },
    elevationContainer: {
        borderBottomWidth: 1,
        backgroundColor: '#EAEAEA',
        borderBottomColor: '#F0F0F0',
    },
    assetsContainer: {
        borderBottomWidth: 1,
        backgroundColor: '#EAEAEA',
        borderBottomColor: '#F0F0F0',
    },
    actionButtonIcon: {
        fontSize: 50,
        height: 50,
        color: 'white',
    },
    leftContainer: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.6,
        flexDirection: 'row'
    }

});

const mapStateToProps = state => {
    return {
        showContactsOfVideoCall: state.showContactsOfVideoCall,
        showMeetingRoom: state.showMeetingRoom,
        showResumeCall: state.showResumeCall
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        showContactsOfVideoCallAction: meeting => {
        dispatch(AllActions.showContactsOfVideoCallAction(meeting));
      },
      showMeetingRoomAction: meeting => {
        dispatch(AllActions.showMeetingRoomAction(meeting));
      },
      showRoomNameAction: meeting => {
        dispatch(AllActions.showRoomNameAction(meeting));
      },
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AssetComponent);