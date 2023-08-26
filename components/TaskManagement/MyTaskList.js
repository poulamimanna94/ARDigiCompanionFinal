/*
 * @author : Poulami Manna
 * @description : All Task List View
*/

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MyTaskListCss from '../../css/MyTaskListCss';
import { Modal, Portal, Provider, Divider, RadioButton, ActivityIndicator, Button } from 'react-native-paper';
import { Utils } from '../Common/Utils';
import SVGPlusIcon from '../../assets/plusvoilet.svg'
import SVGGreenCheck from '../../assets/Success_green checkbox.svg'
import SVGProgressRed from '../../assets/progress-red.svg'
import SVGProgressBlue from '../../assets/progress-blue.svg'
import SVGArrowLeft from '../../assets/arrow-left-small.svg'
import SVGRevoke from '../../assets/revoke.svg'
import SVGClose from '../../assets/close.svg'
import SVGCheckWhite from '../../assets/check-mark-white.svg'
import { useSelector, useDispatch } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Orientation from 'react-native-orientation';
import AllActions from '../../redux/AllActions';
import { height, width } from '../../utils/Constants';
import axios from "axios";
import ErrorPopup from '../ErrorPopup';
import { LoginCommonCss } from '../../css/CommonCss';
import SVGPlusTealIcon from '../../assets/plusTeal.svg';
import { LocaleDate } from '../Common/LocaleDate';
import LogoutPopUp from '../VideoCall/components/LogoutPopUp';


const MyTaskList = ({ navigation, route }) => {
    const [visible, setVisible] = React.useState(false);
    const dispatch = useDispatch();
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const userDetail = useSelector(state => state.userDetail);
    const containerStyle = { backgroundColor: 'white', height: 260, width: '80%', marginLeft: width * 0.1, marginBottom: height * 0.1, zIndex: 1 };
    const [value, setValue] = React.useState();
    const [data, setData] = React.useState([]);
    const [visibleForComplete, setVisibleForComplete] = React.useState(false);
    const [visibleForDelete, setVisibleForDelete] = React.useState(false);
    const showModalForComplete = () => setVisibleForComplete(true);
    const hideModalForComplete = () => setVisibleForComplete(false);
    const showModalForDelete = () => setVisibleForDelete(true);
    const hideModalForDelete = () => setVisibleForDelete(false);
    const containerStyleForComplete = { backgroundColor: 'white', borderRadius: 7, height: 180, width: '80%', marginLeft: width * 0.1, marginBottom: height * 0.1, zIndex: 1 };
    const [loading, IsLoading] = React.useState(true);
    const [idForTask, setIdForTask] = React.useState();
    const [taskObject, setTaskObject] = React.useState();
    const [error, setError] = React.useState(false);
    const [onPageLoad, setOnPageLoad] = useState(false);
    const [count, setCount] = useState(0);
    const tenantId = useSelector(state => state.tenantId);
    const [, setLoader] = useState(true);
    const [updatedTaskName, setUpdatedTaskName] = useState();

    React.useEffect(() => {
        Orientation.lockToPortrait();
    }, [])

    React.useEffect(() => {
        dispatch(AllActions.setCreatedAssignedTaskId(null));

        return (() => {
            IsLoading(true);
            setError(false);
        })
    }, [])

      useEffect(() => {

        navigation.addListener("focus", () => {
            setOnPageLoad(false);
            setData([]);
            updatedTaskList();
        })
        navigation.addListener("blur", () => {
            IsLoading(true);
            setError(false);
            setData([]);
        })
        return (() => {
            navigation.removeListener('focus');
            navigation.removeListener('blur');
            setData([])
        })


    }, [])

    const updatedTaskList = () => {

        setCount(0);
    }

    const deleteTaskId = async () => {

        Utils.deleteTaskId(ipPortData, accessToken, idForTask,dispatch,tenantId)
            .then(res => {
                dispatch(AllActions.errorPopup('Task deleted'));
                setData([]);

                setVisibleForDelete(false)
                setCount(0);
                setOnPageLoad(false);

            })
    }

    const updateStatusTaskId = async () => {
        Utils.updateStatusTaskId(ipPortData, accessToken, idForTask, taskObject,dispatch,tenantId)
            .then(res => {
                console.log(idForTask, "task completion res")
                taskNotification(idForTask)
                dispatch(AllActions.errorPopup('Task is Completed'));
                setTaskObject(taskObject)
                setData([]);
                setCount(0);
                setOnPageLoad(false);
                setVisibleForComplete(false)
            })

    }

    const handleClick = async () => {

        hideModal();
    }

    // call on page load
    React.useEffect(() => {
        if (count == 0 && data?.length == 0) {
            getTaskList(count)

        }

    }, [count, data])

    React.useEffect(() => {
        if (count > 0) {
            getTaskList(count)

        }

    }, [count])



    const getTaskList = async (page) => {
        console.log(page, "page")
        let tempPage = page != 0 ? page : 0
        const headers = {
            Authorization: accessToken
        };
        let url = ''

        if (value) {
            url = `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/allTaskPagDetails?pageNo=${tempPage}&pageSize=5&sortBy=${value}&sortType=ASC&login=${userDetail.login}`
        } else {
            url = `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/allTaskPagDetails?pageNo=${tempPage}&pageSize=5&sortType=DESC&login=${userDetail.login}`
        }
        await axios.get(url,
            { headers })
            .finally(() => IsLoading(false))
            .then(res => {
                
                if (res?.data?.result) {
                    setData([...data, ...res.data.result])
                }
                
                else if (res?.data?.result == null) {
                    setOnPageLoad(true)
                }


            })
            .catch(err => {
                Utils.logoutOnSessionTimeOut(err,dispatch);
                setError(true);
                IsLoading(false);
            }

            );


    };

    const enableSomeButton = () => {

        setCount(count + 1);
    }

    const onSelectedValueChange = (newValue) => {

        setValue(newValue)

        if (newValue != value) {
            setData([]);
            setError(false);
            IsLoading(true);
            setOnPageLoad(false);
        }
    }

    React.useEffect(() => {
        setCount(0)
    }, [value])

    function onClickFilterOption() {

        IsLoading(true)
        setError(false)
        setCount(0)
        setValue();
        setData([]);
        setOnPageLoad(false);
    }

    const taskNotification = (idForTask) => {
        const dataToNotify = [{
            taskName: updatedTaskName,
            message: "Task Completed",
            taskId: idForTask,
            // userId: userDetail?.id
        }]

        console.log(dataToNotify, "dataToNotify")
        Utils.postTaskNotification(ipPortData, accessToken, dataToNotify, dispatch, tenantId)
            .finally(() => { setLoader(false) })
            .then(response => {
                console.log(response, "Task Completed notification")
            })
    }



    const visibleItem = (data, rowMap) => {
        let color = parseInt(data.index) % 2 == 0 ? "#fff" : "#EAEAEA";
        return (
            <TouchableOpacity key={data.index} activeOpacity={1} style={{ backgroundColor: color }} onPress={() => {
                dispatch(AllActions.setSelectAssetEditToView(''))
                dispatch(AllActions.setCreatedAssignedTaskId(null));
                dispatch(AllActions.setStatusCompletionForTask(data?.item?.status === "Completed" ? false : true))
                dispatch(AllActions.setTaskId(data?.item?.id))
                navigation.navigate("ViewTaskTopTab", {
                    taskId: data?.item?.id,

                })
            }}
            >
                <View style={MyTaskListCss.card}>
                    <View style={{ paddingHorizontal: 15, }}>
                        <Text style={MyTaskListCss.taskName}>
                            {data?.item?.taskName}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 15, justifyContent: 'space-between' }}>

                        <ShowDataComp direction={'row'} title={'Assigned To:'} value={data?.item?.assignedTo?.login} />
                        <View style={{ justifyContent: 'center' }}>
                            {
                                data?.item?.status === "Completed" ?
                                    (
                                        <SVGGreenCheck />
                                    ) :
                                    data?.item?.status === "New / In Progress" ?
                                        (
                                            <SVGProgressBlue />
                                        ) :
                                        data?.item?.status === "Overdue" ?
                                            (
                                                <SVGProgressRed />
                                            )
                                            :
                                            null
                            }
                        </View>
                    </View>

                    <View style={MyTaskListCss.footerCard}>

                        <ShowDataComp direction={'column'} title={'Due Date'} value={LocaleDate(data?.item?.dueDate)} />
                        <ShowDataComp direction={'column'} title={'Priority'} value={data?.item?.priority?.categoryName} />
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    const renderHiddenItem = (data, rowMap) => {

        return (
            <View style={{ position: 'absolute', right: 0, width: width * 0.37, height: '100%', backgroundColor: LoginCommonCss.swipeButtonBackground() }}>
                <View style={{ height: "50%", }} >
                    <TouchableOpacity style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} activeOpacity={1} onPress={() => {

                        if (data?.item?.status === "Completed") {
                            dispatch(AllActions.errorPopup('Already Marked as Completed'));
                            return;
                        }
                        const taskObjectForStatus =
                        {
                            "asset": {
                                "id": data?.item?.asset?.id
                            },
                            "assignedTo": {
                                "login": data?.item?.assignedTo?.login
                            },
                            "comments": "Task is completed",
                            "description": data?.item?.description,
                            "dueDate": data?.item?.dueDate,
                            "priority": {
                                "id": data?.item?.priority?.id
                            },
                            "status": "Completed",
                            "taskCategory": {
                                "id": data?.item?.taskCategory?.id
                            },
                            "taskName": data?.item?.taskName,
                            "lastModifiedBy": userDetail?.login,
                            "createdBy": userDetail?.login
                        }
                        setTaskObject(taskObjectForStatus)
                        setIdForTask(data?.item?.id)
                        setUpdatedTaskName(data?.item?.taskName)
                        showModalForComplete()
                        
                    }}>

                        <SVGCheckWhite style={{ marginBottom: 3, }} />
                        <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Roman', color: '#fff', }}>Mark as Complete</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", borderColor: "#EAEAEA", borderWidth: 1 }} />
                <View style={{ height: "50%", }}>
                    <TouchableOpacity activeOpacity={1} style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                        setIdForTask(data?.item?.id)
                        showModalForDelete()
                    }}>
                        <View style={{ alignItems: "center" }}>
                            <SVGRevoke style={{ marginBottom: 3, }} />
                            <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Roman', color: '#fff', }}>Delete Task</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    return (
        <Provider>
            <Portal>

                <Modal visible={visibleForComplete} onDismiss={hideModalForComplete} contentContainerStyle={containerStyleForComplete}>
                    <View style={{ flex: 2, marginLeft: 15, marginTop: 20 }}>
                        <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 16, color: '#000', }}>Mark as complete?</Text>
                    </View>
                    <View style={{ flex: 1.2, marginLeft: 15, marginTop: 8, }}>
                        <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, color: '#000', }}>Task will be marked as completed.</Text>
                    </View>
                    <View style={{ flex: 3, marginLeft: 15, marginTop: 2 }}>
                        <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, color: '#000', }}>Please confirm.</Text>
                    </View>
                    {LoginCommonCss.buttonSortByBackground() === true &&<View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end", marginRight: 10, }}>
                        <Text style={{padding: 10, fontFamily: 'SiemensSans-Bold', fontSize: 16, color: LoginCommonCss.buttonBackground() }} onPress={() => hideModalForComplete()}>No</Text>
                        <Text style={{padding: 10, fontFamily: 'SiemensSans-Bold', fontSize: 16, color: LoginCommonCss.buttonBackground(), }} onPress={() => {
                            updateStatusTaskId()
                        }}>Yes</Text>
                        </View>} 
                    
                        {LoginCommonCss.buttonSortByBackground() === false &&<View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 20 }}>
                        <Button color={LoginCommonCss.buttonBackground()} borderColor={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11}} style={{ marginRight: 15, fontFamily: 'SiemensSans-Roman', fontSize: 5, borderWidth: 1, borderColor: LoginCommonCss.buttonBackground(), width: 80, height: 30 }} uppercase={false} onPress={() => hideModalForComplete()}>No</Button>
                        <Button mode="contained" color={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11, }} style={{ fontFamily: 'SiemensSans-Roman', fontSize: 5, color: "#007993"}} uppercase={false} onPress={() => {
                            updateStatusTaskId()
                        }}>Yes</Button>
                        </View>}
                </Modal>

                <Modal visible={visibleForDelete} onDismiss={hideModalForDelete} contentContainerStyle={containerStyleForComplete}>
                    <View style={{ flex: 1, marginLeft: 15, marginTop: 20 }}>
                        <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 16, color: '#000', }}>Delete Task?</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 15, marginTop: 10, }}>
                        <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, color: '#000', }}>Task will be marked as deleted.</Text>
                    </View>
                    <View style={{ flex: 3, marginLeft: 15, marginTop: 2 }}>
                        <Text style={{ fontFamily: 'SiemensSans-Roman', fontSize: 14, color: '#000', }}>Please confirm.</Text>
                    </View>
                    {LoginCommonCss.buttonSortByBackground() === true &&<View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end", marginRight: 10, }}>
                        <Text style={{padding: 10, fontFamily: 'SiemensSans-Bold', fontSize: 16, color: LoginCommonCss.buttonBackground() }} onPress={() => hideModalForDelete()}>No</Text>
                        <Text style={{padding: 10, fontFamily: 'SiemensSans-Bold', fontSize: 16, color: LoginCommonCss.buttonBackground(), }} onPress={() => {
                            deleteTaskId()
                        }}>Yes</Text>
                        </View>} 
                    
                        {LoginCommonCss.buttonSortByBackground() === false &&<View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 20 }}>
                        <Button color={LoginCommonCss.buttonBackground()} borderColor={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11}} style={{ marginRight: 15, fontFamily: 'SiemensSans-Roman', fontSize: 5, borderWidth: 1, borderColor: LoginCommonCss.buttonBackground(), width: 80, height: 30 }} uppercase={false} onPress={() => hideModalForDelete()}>No</Button>
                        <Button mode="contained" color={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 11, }} style={{ fontFamily: 'SiemensSans-Roman', fontSize: 5, color: "#007993"}} uppercase={false} onPress={() => {
                            deleteTaskId()
                        }}>Yes</Button>
                        </View>}


                </Modal>

                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ height: '100%' }}>
                        <View style={{ height: '20%', justifyContent: 'flex-end' }}>
                            <Text style={{ padding: 15, fontFamily: 'SiemensSans-Bold', fontSize: 16 }}>Sort by</Text>
                        </View>
                        <Divider style={{ height: 1, backgroundColor: "#D7D7D7", width: "100%" }} />
                        <View style={{ height: '55%', }}>
                            <RadioButton.Group onValueChange={selectedValue => { onSelectedValueChange(selectedValue) }} value={value}>
                                <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton uncheckedColor='#C0C0C0' value="assignedTo.login" color='#1B1534' />
                                    <Text style={{ fontSize: 14, color: '#1B1534', fontFamily: 'SiemensSans-Roman' }}>Assigned To</Text>
                                </View>
                                <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton uncheckedColor='#C0C0C0' value="dueDate" color='#1B1534' />
                                    <Text style={{ fontSize: 14, color: '#1B1534', fontFamily: 'SiemensSans-Roman' }}>Due Date</Text>
                                </View>
                                <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton uncheckedColor='#C0C0C0' value="priority.categoryName" color='#1B1534' />
                                    <Text style={{ fontSize: 14, color: '#1B1534', fontFamily: 'SiemensSans-Roman' }}>Priority</Text>
                                </View>
                            </RadioButton.Group>
                        </View>

                        <Divider style={{ height: 1, backgroundColor: "#D7D7D7", width: "100%" }} />

                        {LoginCommonCss.buttonSortByBackground() === true &&<View style={{ padding: 20, height: '25%', flexDirection: "row", justifyContent: "flex-end", }}>
                        <Text style={{ marginRight: 15, fontFamily: 'SiemensSans-Bold', fontSize: 14, color: "#8A00E5" }} onPress={() => hideModal()}>Cancel</Text>
                        <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, color: "#8A00E5" }} onPress={() => handleClick()}>Ok</Text>
                        </View>} 
                    
                        {LoginCommonCss.buttonSortByBackground() === false &&<View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 20 }}>
                        <Button color={LoginCommonCss.buttonBackground()} borderColor={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 14}} style={{ marginRight: 15, fontFamily: 'SiemensSans-Roman', fontSize: 5, borderWidth: 1, borderColor: LoginCommonCss.buttonBackground(), width: 85, height: 35 }} uppercase={false} onPress={() => hideModal()}>Cancel</Button>
                        <Button mode="contained" color={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 14 }} style={{ fontFamily: 'SiemensSans-Roman', fontSize: 5, color: "#007993"}} uppercase={false} onPress={() => handleClick()}>Ok</Button>
                        </View>}

                    </View>
                </Modal>
            </Portal>
            <View style={MyTaskListCss.header}>
                <View style={MyTaskListCss.subHeader}>
                    <ErrorPopup />
                    <View style={{ flexDirection: 'row', width: '50%', height: '100%', alignItems: 'center', marginLeft: 15 }}>
                        <TouchableOpacity style={{ marginHorizontal: 15, flexDirection: "row", justifyContent: 'center', alignItems: 'center', }} onPress={() => showModal()}>
                            <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, color: "#1B1534", }}>Sort By</Text>
                            <SVGArrowLeft style={{
                                marginLeft: 10,
                                transform: [{ rotateZ: '-90deg' }],
                            }} />
                        </TouchableOpacity>
                        {
                            value &&
                            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 2, justifyContent: 'center', alignItems: "center", backgroundColor: "#D7D7D7", borderRadius: 26, padding: value ? 5 : 0 }} onPress={() => {
                                onClickFilterOption()
                            }}>
                                {
                                    value === 'assignedTo.login' ? (
                                        <Text style={{ textTransform: 'capitalize', fontFamily: 'SiemensSans-Roman', fontSize: 14, color: "#2D373C", }} >Assigned To</Text>
                                    )
                                        :
                                        value === 'dueDate' ?
                                            <Text style={{ textTransform: 'capitalize', fontFamily: 'SiemensSans-Roman', fontSize: 14, color: "#2D373C", }} >Due Date</Text>
                                            :
                                            value === 'priority.categoryName' ?
                                                <Text style={{ textTransform: 'capitalize', fontFamily: 'SiemensSans-Roman', fontSize: 14, color: "#2D373C", }} >Priority</Text>
                                                :
                                                null

                                }
                                <SVGClose height={15} width={15} />
                            </TouchableOpacity>
                        }



                    </View>
                    <TouchableOpacity onPress={() => {
                        dispatch(AllActions.setCreatedAssignedTaskId(null));
                        dispatch(AllActions.setSelectAssetEditToView(null));
                        navigation.navigate("CreateTask")
                    }} style={{ flexDirection: 'row', width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        {LoginCommonCss.svgPlusButtonBackground() === "ArDigi" && <SVGPlusIcon />}
                        {LoginCommonCss.svgPlusButtonBackground() === "ArPower" && <SVGPlusTealIcon />}
                        <Text style={{ fontFamily: 'SiemensSans-Bold', color: LoginCommonCss.buttonBackground(), fontSize: 14, marginLeft: 10 }}>New Task</Text>
                    </TouchableOpacity>

                </View>


            </View>
            <SwipeListView
                ListEmptyComponent={() => <ListEmptyComponent loading={loading} error={error} />}
                onEndReached={() => { !onPageLoad && enableSomeButton(); }}
                ListFooterComponent={() => (
                    !onPageLoad && data.length >= 5 ? (<View style={{ padding: 5, }}>
                        <ActivityIndicator size={35} color={LoginCommonCss.buttonBackground()} />
                    </View>)
                        : (null)
                )}
                onEndReachedThreshold={0.2}
                data={data}
                initialNumToRender={5}
                renderItem={visibleItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-145}
                keyExtractor={(data, i) => i}
                showsVerticalScrollIndicator={false}
            />
                <LogoutPopUp />


        </Provider>
    )
}

const ListEmptyComponent = ({ loading, error }) => {
    return (
        loading ? (
            <View style={{ height: height * 0.75, width: width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'55'} color={LoginCommonCss.buttonBackground()} />
            </View>
        )
            : !loading && !error ?
                (<View style={{ height: height * 0.75, width: width, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, color: '#000' }}>No Task Found !!!</Text>
                </View>) : (
                    <View style={{ height: height * 0.75, width: width, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, color: '#000' }}>Something went wrong !!!</Text>
                    </View>)
    )
}

const ShowDataComp = ({ title, value, direction }) => {
    return (
        <View style={{ marginTop: 15, marginRight: title === 'Priority' ? '25%' : 0, flexDirection: direction === 'row' ? 'row' : 'column' }}>
            <Text style={{ color: "#00000060", fontFamily: 'SiemensSans-Roman', fontSize: 14 }}>{title}</Text>
            <Text style={{ marginTop: direction === 'column' ? 5 : 0, marginLeft: direction === 'row' ? 5 : 0, color: "#000000", fontFamily: 'SiemensSans-Roman', fontSize: 14 }}>{value}</Text>
        </View >
    )
}

export default MyTaskList; 