/*
 * @author : Poulami Manna
 * @description : View Task Page
*/

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, Modal, Divider, List } from 'react-native-paper';
import { Utils } from '../Common/Utils';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { height, width } from '../../utils/Constants';
import SVGCloseIcon from '../../assets/close.svg'
import ErrorPopup from '../ErrorPopup';
import AllActions from '../../redux/AllActions';
import Recording from './Recording';
import { LoginCommonCss } from '../../css/CommonCss'; 
import { LocaleDate } from '../Common/LocaleDate';



const ViewTask = ({ navigation, route, taskId, topTabToViewData, toModify, isEditable }) => {
    console.log(toModify, topTabToViewData, isEditable, "toModify in view")

    const dispatch = useDispatch();
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const selectedAsset = useSelector(state => state.selectAssetEditToViewData);
    const userDetail = useSelector(state => state.userDetail);
    const [taskObject, setTaskObject] = useState({
        taskName: '',
        kksTag: '',
        unitName: '',
        headerName: '',
        subHeaderName: '',
        categoryName: '',
        categoryId: 0,
        priorityCategoryName: '',
        priorityId: 0,
        dueDate: '',
        login: '',
        assignedTo: '',
        description: ''

    });
    const tenantId = useSelector(state => state.tenantId);
    const [visible, setVisible] = React.useState(false);
    const hideModal = () => setVisible(false);
    const showModal = () => setVisible(true);
    const containerStyle = { backgroundColor: 'white', borderRadius: 7, width: '85%', marginLeft: width * 0.08, marginBottom: height * 0.1, marginTop: 2, zIndex: 1, height: "80%" };
    const [taskComment, setTaskComment] = useState([]);
    const [currentComment, setCurrentComment] = useState('');
    const [visibleForComplete, setVisibleForComplete] = React.useState(false);
    const showModalForComplete = () => setVisibleForComplete(true);
    const hideModalForComplete = () => setVisibleForComplete(false);
    const [, setLoader] = useState(true);
    const containerStyleForComplete = { backgroundColor: 'white', borderRadius: 7, height: 180, width: '80%', marginLeft: width * 0.1, marginBottom: height * 0.1, zIndex: 1 };
    React.useEffect(() => {
        Utils.getTaskIdData(ipPortData, accessToken, taskId,dispatch,tenantId)
            .then(res => {
                console.log(res, "res viwewd");
                const obj = {
                    taskName: '',
                    kksTag: '',
                    unitName: '',
                    headerName: '',
                    subHeaderName: '',
                    categoryName: '',
                    categoryId: 0,
                    priorityCategoryName: '',
                    priorityId: 0,
                    dueDate: '',
                    login: '',
                    assignedTo: '',
                    description: '',
                    status: ''
                }
                if (res) {
                    if (toModify && selectedAsset) {
                        let kksTagDescription = selectedAsset.split(' > ')
                        obj.unitName = kksTagDescription[0]
                        obj.headerName = kksTagDescription[1]
                        obj.subHeaderName = kksTagDescription[2]
                        obj.kksTag = kksTagDescription[3]
                    }
                    else {
                        obj.unitName = res?.unitName
                        obj.headerName = res?.headerName
                        obj.subHeaderName = res?.subHeaderName
                        obj.kksTag = res?.kksTag
                        obj.assetId = res?.assetId
                    }
                    obj.taskName = res?.taskName
                    obj.categoryName = res?.taskCategory?.categoryName
                    obj.categoryId = res?.taskCategory?.id
                    obj.priorityCategoryName = res?.priority?.categoryName
                    obj.priorityId = res?.priority?.id
                    obj.dueDate = res?.dueDate
                    obj.login = res?.assignedTo?.login
                    obj.description = res?.description
                    obj.status = res?.status;

                    // if (toModify) {
                    //     obj.categoryName = topTabToViewData?.taskCategory?.name
                    //     obj.categoryId = topTabToViewData?.taskCategory?.id
                    //     obj.priorityCategoryName = topTabToViewData?.priority?.name
                    //     obj.priorityId = topTabToViewData?.priority?.id
                    //     obj.dueDate = topTabToViewData?.dueDate
                    //     obj.login = topTabToViewData?.assignedTo?.login


                    // }
                }
                setTaskObject(obj);

            })

    }, [])

    const getAllComments = () => {
        Utils.getTaskComments(ipPortData, accessToken, taskId,dispatch,tenantId)
            .then(res => {

                setTaskComment(res);

            })
    }

    const postTaskComments = () => {

        if (currentComment.length === 0) {
            dispatch(AllActions.errorPopup('please add comment !'))
            return;
        }

        Utils.postTaskComments(ipPortData, accessToken, taskId, currentComment, userDetail,dispatch,tenantId)
            .then(res => {
                dispatch(AllActions.errorPopup('Comment added successfully !'))
                getAllComments();
            })
        setCurrentComment('');

    }

    const taskNotification = (taskId) => {
        const dataToNotify = [{
            taskName: taskObject?.taskName,
            message: "Task Completed",
            taskId: taskId,
            // userId: userDetail?.id
        }]

        console.log(dataToNotify, "dataToNotify")
        Utils.postTaskNotification(ipPortData, accessToken, dataToNotify, dispatch, tenantId)
            .finally(() => { setLoader(false) })
            .then(response => {
                console.log(response, "Task Completed notification")
            })
    }

    const updateStatusTaskId = () => {
        const taskObjectForStatus =
        {
            "asset": {
                "id": taskObject?.assetId
            },
            "assignedTo": {
                "login": taskObject?.assignedTo?.login
            },
            "comments": "Task is completed",
            "createdBy": userDetail.login,
            "description": taskObject?.description,
            "dueDate": taskObject?.dueDate,
            "lastModifiedBy": userDetail.login,
            "priority": {
                "id": taskObject?.priorityId
            },
            "status": "Completed",
            "taskCategory": {
                "id": taskObject?.taskCategory?.categoryId
            },
            "taskName": taskObject?.taskName
        }

        Utils.updateStatusTaskId(ipPortData, accessToken, taskId, taskObjectForStatus,dispatch,tenantId)
            .then(res => {
                console.log(taskId, "res?.taskId")
                taskNotification(taskId)
                navigation.navigate('Tabs')
            })
    }


    return (
        <>
            <ScrollView>
                <View style={{ margin: 10 }}>
                    <ErrorPopup />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        label="Name"
                        editable={false}
                        value={taskObject?.taskName}
                    />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        label="Asset"
                        editable={false}
                        value={taskObject?.unitName + ">" + taskObject?.headerName + ">" + taskObject?.subHeaderName + ">" + taskObject?.kksTag}
                    />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        label="Category"
                        editable={false}
                        value={taskObject?.categoryName}
                    />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        label="Priority"
                        editable={false}
                        value={taskObject?.priorityCategoryName}
                    />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        label="Due Date"
                        editable={false}
                        value={LocaleDate(taskObject?.dueDate)}
                    />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        label="Assigned User"
                        editable={false}
                        value={taskObject?.login}
                    />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Bold", fontSize: 12, }}
                        label="Description"
                        editable={false}
                        value={taskObject?.description}
                    />
                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Bold", fontSize: 12 }}
                        label="Comments"
                        editable={false}
                        right={<TextInput.Icon onPress={() => {
                            showModal()
                            getAllComments()
                        }
                        } name={() => <Icon size={10}>
                            <Text style={{ color: LoginCommonCss.buttonBackground(), fontFamily: "SiemensSans-Bold", fontSize: 12, }}>View</Text>
                        </Icon>}
                        />}
                    />

                    <Button mode="contained" disabled={!isEditable} labelStyle={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, }} color={LoginCommonCss.buttonBackground()} style={{ fontFamily: 'SiemensSans-Bold', borderRadius: LoginCommonCss.buttonBorderRadiusForCreateTask(), height: 55, justifyContent: "center", marginLeft: 55, marginRight: 55, marginTop: 70 }} uppercase={false} onPress={() => {
                        if (taskObject?.status === 'Completed') {
                            dispatch(AllActions.errorPopup('Task is already marked as completed !!!'));
                            return;
                        }
                        showModalForComplete()
                    }
                    }>
                        Mark As Complete
                    </Button>



                </View>
            </ScrollView>
            <Modal visible={visibleForComplete} onDismiss={hideModalForComplete} contentContainerStyle={containerStyleForComplete}>
                <View style={{ flex: 2, marginLeft: 15, marginTop: 20 }}>
                    <Text style={{ color: '#000000', fontFamily: 'SiemensSans-Bold', fontSize: 16 }}>Mark as complete?</Text>
                </View>
                <View style={{ flex: 1.2, marginLeft: 15, marginTop: 8, }}>
                    <Text style={{ color: "#000000", fontFamily: "SiemensSans-Roman", fontSize: 14, }}>Task will be marked as completed.</Text>
                </View>
                <View style={{ flex: 3, marginLeft: 15, marginTop: 2 }}>
                    <Text style={{ color: "#000000", fontFamily: "SiemensSans-Roman", fontSize: 14, }}>Please confirm.</Text>
                </View>
                {/* <View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end", marginRight: 10, }}>
                    <Text style={{ padding: 10, fontFamily: 'SiemensSans-Roman', fontSize: 16, color: '#8A00E5', }} onPress={() => hideModalForComplete()} >No</Text>
                    <Text style={{ padding: 10, fontFamily: 'SiemensSans-Roman', fontSize: 16, color: '#8A00E5', }} onPress={() => updateStatusTaskId()}>Yes</Text>
                </View> */}
                {LoginCommonCss.buttonSortByBackground() === true &&<View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end", marginRight: 10, }}>
                        <Text style={{padding: 10, fontFamily: 'SiemensSans-Roman', fontSize: 16, color: LoginCommonCss.buttonBackground() }} onPress={() => hideModalForComplete()}>No</Text>
                        <Text style={{padding: 10, fontFamily: 'SiemensSans-Roman', fontSize: 16, color: LoginCommonCss.buttonBackground(), }} onPress={() => updateStatusTaskId()}>Yes</Text>
                        </View>} 
                    
                        {LoginCommonCss.buttonSortByBackground() === false &&<View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
                        <Button color={LoginCommonCss.buttonBackground()} borderColor={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11}} style={{ marginRight: 15, fontFamily: 'SiemensSans-Roman', fontSize: 5, borderWidth: 1, borderColor: LoginCommonCss.buttonBackground(), width: 80, height: 30 }} uppercase={false} onPress={() => hideModalForComplete()}>No</Button>
                        <Button mode="contained" color={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11, }} style={{ fontFamily: 'SiemensSans-Roman', fontSize: 5, color: "#007993"}} uppercase={false} onPress={() => updateStatusTaskId()}>Yes</Button>
                </View>}
            </Modal>

            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: 'center', }}>
                    <TouchableOpacity style={{ marginRight: 15, }} onPress={() => { hideModal() }}>
                        <SVGCloseIcon height={25} width={25} />
                    </TouchableOpacity>
                </View>
                <Divider style={{ height: 1, backgroundColor: "#D7D7D7", width: "100%" }} />
                <View style={{ flex: 9 }}>
                    <ScrollView>
                        <View style={{ flex: 5, marginVertical: 10, }}>
                            <View style={{ marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={{ color: "#1B1534", fontSize: 12, fontFamily: 'SiemensSans-Roman', marginLeft: 10, }}>Comments</Text>
                                <Recording setDescriptionData={setCurrentComment} />
                            </View>

                            <View style={{ borderWidth: 1, borderColor: "#E2E8ED", marginHorizontal: 10 }}>

                                <TextInput
                                    value={currentComment}
                                    placeholder="Please add text here"
                                    activeUnderlineColor='white'
                                    placeholderTextColor={'#707070'}
                                    multiline={true}
                                    numberOfLines={5}
                                    style={{ fontSize: 12, fontFamily: 'SiemensSans-Bold', color: "#E2E8ED", backgroundColor: "white", }}
                                    onChangeText={(data) => setCurrentComment(data)}
                                />


                            </View>

                            <View style={{ padding: 5, marginHorizontal: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => postTaskComments()}>
                                    <Text style={{ color: LoginCommonCss.buttonBackground(), fontFamily: "SiemensSans-Bold", fontSize: 16, }}>Save</Text>
                                </TouchableOpacity>
                                <Text style={{ color: "#004669", fontFamily: "SiemensSans-Roman", fontSize: 14, }}>{currentComment.length}/200</Text>
                            </View>
                        </View>
                        <View style={{ flex: 5 }}>
                            {
                                taskComment?.length === 0 && <View style={{ height: height * 0.25, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ padding: 5, color: "#1B1534", fontFamily: "SiemensSans-Bold", fontSize: 16, }}>No comments found !</Text>
                                </View>
                            }

                            {taskComment?.map((data, i) => {
                                let color = i % 2 == 0 ? "white" : "#EAEAEA"
                                return (
                                    <View key={i} style={{ paddingVertical: 15, paddingHorizontal: 15, backgroundColor: color }}>
                                        <View style={{ padding: 15, }}>
                                            <Text style={{ fontFamily: "SiemensSans-Bold", fontSize: 16, color: '#000000' }}>{data.comments}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text>
                                                <List.Item
                                                    title="Date"
                                                    titleStyle={{ fontSize: 14, color: "#00000060", fontFamily: 'SiemensSans-Roman' }}
                                                    description={data?.lastModifiedDate.substring(0, 10)}
                                                    descriptionStyle={{ fontSize: 14, color: "#000000", fontFamily: 'SiemensSans-Roman' }}
                                                />
                                            </Text>
                                            <Text>
                                                <List.Item
                                                    title="By"
                                                    titleStyle={{ fontSize: 14, color: "#00000060", fontFamily: 'SiemensSans-Roman' }}
                                                    description={data?.createdBy}
                                                    descriptionStyle={{ fontSize: 14, color: "#1B1534", fontFamily: 'SiemensSans-Roman' }}
                                                />
                                            </Text>
                                        </View>

                                    </View>
                                )
                            })}
                        </View>

                    </ScrollView>
                </View>

            </Modal>
        </>
    )
}

export default ViewTask;