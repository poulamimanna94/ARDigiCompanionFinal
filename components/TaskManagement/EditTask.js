/*
 * @author : Poulami Manna
 * @description : Edit Task Page
*/

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, List, Button, Modal, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import { Utils } from '../Common/Utils';
import { useSelector, useDispatch } from 'react-redux';
import Recording from './Recording';
import SVGCloseIcon from '../../assets/close.svg';
import AllActions from '../../redux/AllActions';
import moment from 'moment';
import { height, width } from '../../utils/Constants';
import { LoginCommonCss } from '../../css/CommonCss';
import { LocaleDate } from '../Common/LocaleDate';

const EditTask = ({ navigation, route, setToggleEdit }) => {
    const [text, setText] = useState();
    const selectedAsset = useSelector(state => state.selectAssetEditToViewData);
    const userDetail = useSelector(state => state.userDetail);
    const assetIdSet = useSelector(state => state.setAssetIdSet);
    const dispatch = useDispatch();
    const [selectText, setSelectText] = useState();
    const [priority, setPriority] = useState();
    const [category, setCategory] = useState();
    const [assignUser, setAssignUser] = useState();
    const [expandForPriority, setExpandForPriority] = useState(false);
    const [expandForCategory, setExpandForCategory] = useState(false);
    const [expandForAssignUser, setExpandForAssignUser] = useState(false);
    const [description, setDescription] = useState();
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [buttonLabel,] = useState("Save");
    const [buttonLabel1,] = useState("Cancel");
    const [, setShowName] = useState(false);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const [categoryData, setCategoryData] = useState([]);
    const [, setCategoryId] = useState();
    const [, setTaskData] = useState([]);
    const [priorityData, setPriorityData] = useState([]);
    const [, setPriorityId] = useState();
    const [assignUserData, setAssignUserData] = useState([]);
    const [, setConfirmDate] = useState(date.getFullYear().toString() + "-" +
        parseInt(date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}` + "-" + parseInt(date.getDate()) > 9 ? date.getDate().toString() : `0${date.getDate().toString()}`);
    const [, setDateChange] = useState();
    const [, setAssetDetailId] = useState();
    const [visible, setVisible] = React.useState(false);
    const hideModal = () => setVisible(false);
    const showModal = () => setVisible(true);
    const [taskComment, setTaskComment] = useState([]);
    const containerStyle = { backgroundColor: 'white', borderRadius: 7, width: '85%', marginLeft: width * 0.08, marginBottom: height * 0.1, marginTop: 2, zIndex: 1, height: "80%" };
    const [currentComment, setCurrentComment] = useState('');
    const [confirmDateForDisplay, setConfirmDateDisplay] = useState();
    const getTaskId = useSelector(state => state.setTaskId);
    const [isConfirmDateSetted, setIsConfirmDateSetted] = useState(false);
    const [tempInitialDate, setTempInitialDate] = useState();
    const tenantId = useSelector(state => state.tenantId);
    const [, setLoader] = useState(true);
    const [allData, setAllData] = useState(
        {

            asset: {
                id: "",
                name: ""
            },
            assignedTo: {
                login: ""
            },

            dueDate: "",
            priority: {
                id: "",
                name: ""
            },

            taskCategory: {
                id: "",
                name: ""
            },

        }

    );

    const dueDateCompute = (confirmDate) => {
        const monthPicker = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December"
        }
        const dateAndTime = confirmDate.split(' ');
        const givenTime = dateAndTime[1]
        const givenDate = dateAndTime[0].split('-')
        const finalDate = givenDate[2] + " " + monthPicker[givenDate[1]] + " " + givenDate[0]
        const finalDateAndTime = finalDate + " " + (givenTime)
        var dateUtc = new Date(`${finalDateAndTime} UTC`)
        return dateUtc.toISOString();
    }

    const taskNotification = (getTaskId) => {
        const dataToNotify = [{
            taskName: text,
            message: "New Task assigned",
            taskId: getTaskId,
            // userId: userDetail?.id
        }]

        console.log(dataToNotify, "dataToNotify")
        Utils.postTaskNotification(ipPortData, accessToken, dataToNotify, dispatch, tenantId)
            .finally(() => { setLoader(false) })
            .then(response => {
                console.log(response, "New Task assigned notification")
            })
    }

    const editTaskData = (input) => {

        const allDataNew =
        {
            "asset": {

                "id": assetIdSet || allData?.asset?.id

            },
            "assignedTo": {
                "login": allData?.assignedTo.login
            },
            "comments": "Task is completed",
            "description": description,
            "dueDate": isConfirmDateSetted ? dueDateCompute(allData?.dueDate) : tempInitialDate,
            "priority": {
                "id": allData?.priority?.id
            },
            "status": "Pending",
            "taskCategory": {
                "id": allData?.taskCategory?.id
            },
            "taskName": text,
            "lastModifiedBy": userDetail.login,
            "createdBy": userDetail.login
        }
        console.log(dueDateCompute(allData?.dueDate), "onChanged date")

        if (input) {
            Utils.getEditTaskData(ipPortData, accessToken, getTaskId ? getTaskId : selectedAsset.split(' > ')[4].toString().trim(), allDataNew, dispatch, tenantId)
                .then(res => {
                    console.log(getTaskId, "res?.id")
                    taskNotification(getTaskId);
                    // dispatch(AllActions.setNotificationData([{
                    // id: res?.id,
                    // taskName: text,
                    // desc: description

                    // }]))
                    dispatch(AllActions.errorPopup('Task edited successfully !'));

                    dispatch(AllActions.setAssetIdSet(null));
                    navigation.navigate("ViewTaskTopTab")
                    setToggleEdit(input, getTaskId ? getTaskId : selectedAsset.split(' > ')[4].toString().trim(), getTaskId);

                })
        } else {
            dispatch(AllActions.setAssetIdSet(null));
            navigation.navigate("ViewTaskTopTab")
            setToggleEdit(input, getTaskId ? getTaskId : selectedAsset.split(' > ')[4].toString().trim(), getTaskId);
        }



    }

    const formatDate = (dateToFormat) => {
        const formatDate = dateToFormat.split(":")
        return formatDate[2] + ":" + formatDate[1] + ":" + formatDate[0]
    }

    React.useEffect(() => {
        Utils.getTaskIdData(ipPortData, accessToken, getTaskId, dispatch, tenantId)
            .then(res => {
                console.log(res?.dueDate, "editTaskId data coming from backend")
                let initialData = { ...allData }
                setText(res?.taskName)
                setSelectText(res?.unitName + ">" + res?.headerName + ">" + res?.subHeaderName + ">" + res?.kksTag)
                initialData.asset.id = res?.asset?.id
                setAssetDetailId(res?.asset?.id)
                setCategory(res?.taskCategory?.categoryName)
                initialData.taskCategory.id = res?.taskCategory?.id
                initialData.taskCategory.name = res?.taskCategory?.categoryName
                setPriority(res?.priority?.categoryName)
                initialData.priority.id = res?.priority?.id
                initialData.priority.name = res?.priority?.categoryName
                setDateChange(res?.dueDate)
                setTempInitialDate(res?.dueDate)
                setConfirmDateDisplay(formatDate((LocaleDate(res?.dueDate)).toString().replace('-', ':').replace('-', ':')))
                let initialDate = res?.dueDate?.split(':');
                initialDate[initialDate.length - 1] = "00.000Z";
                console.log(initialDate?.join(":"), new Date(initialDate?.join(":")), "initial date and new date");
                initialData.dueDate = updatedDate(new Date(initialDate?.join(":")));
                setAssignUser(res?.assignedTo?.login)
                initialData.assignedTo.login = res?.assignedTo?.login
                setDescription(res?.description)
                setAllData(initialData)


            })

    }, [])

    useEffect(() => {
        Utils.getCategoryTaskData(ipPortData, accessToken, "task", dispatch, tenantId)
            .then(res => {

                setCategoryData(res)
            })
    }, [])

    useEffect(() => {
        Utils.getCategoryTaskData(ipPortData, accessToken, "taskName", dispatch, tenantId)
            .then(res => {
                setTaskData(res)
            })
    }, [])

    useEffect(() => {
        Utils.getCategoryTaskData(ipPortData, accessToken, "priority", dispatch, tenantId)
            .then(res => {
                setPriorityData(res)
            })
    }, [])

    useEffect(() => {
        Utils.getAssignedUserData(ipPortData, accessToken, dispatch, tenantId)
            .then(res => {
                setAssignUserData(res)
            })
    }, [])

    const getAllComments = () => {
        Utils.getTaskComments(ipPortData, accessToken, getTaskId, dispatch, tenantId)
            .then(res => {
                console.log(res, "comment api calling")
                setTaskComment(res);

            })
    }

    const postTaskComments = () => {

        if (currentComment.length === 0) {
            dispatch(AllActions.errorPopup('please add comment !'))
            return;
        }

        Utils.postTaskComments(ipPortData, accessToken, getTaskId, currentComment, userDetail, dispatch, tenantId)
            .then(res => {
                dispatch(AllActions.errorPopup('Comment added successfully !'))
                getAllComments();
            })
        setCurrentComment('');

    }

    const updatedDate = (date) => {
        console.log(typeof (date), "edit date")
        let date1 = parseInt(date.getDate()) > 9 ? date.getDate().toString() : `0${date.getDate().toString()}`
        let month1 = parseInt(date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}`
        let year1 = date.getFullYear().toString()
        let hh1 = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
        let mm1 = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
        let ss1 = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`

        setOpen(false)
        setDate(date)
        setConfirmDate(year1 + "-" +
            month1 + "-" + date1)

        setDateChange(date1 + ":" + month1 + ":" + year1)
        setConfirmDateDisplay(date1 + ":" + month1 + ":" + year1)
        let dueDateData = { ...allData }
        dueDateData.dueDate = year1 + "-" + month1 + "-" + date1 + " " + hh1 + ":" + mm1 + ":" + ss1
        console.log(dueDateData, date, "dueDataData and date");
        setAllData(dueDateData)
        return dueDateData.dueDate;
    }

    return (
        <>
            <ScrollView style={{ backgroundColor: '#fff', }}>
                <View style={{ margin: 10 }}>

                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ paddingHorizontal: 15, backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        label="Name"
                        value={text}
                        editable={false}
                        onChangeText={text => setText(text)}
                        onFocus={() => {
                            setShowName(true)
                        }}
                    />


                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        editable={false}
                        style={{ paddingHorizontal: 15, backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, }}

                        right={<TextInput.Icon onPress={() => navigation.navigate("SelectAssets", {
                            setSelectText: setSelectText,
                            setAssetDetailId: setAssetDetailId,
                            taskId: getTaskId

                        })} name={() => selectText ? <Icon size={10}>
                            <Text style={{ color: LoginCommonCss.buttonBackground(), fontFamily: "SiemensSans-Roman", fontSize: 10, fontWeight: "bold" }}>Change</Text>
                        </Icon> : <Icon name="angle-right" size={25} />}
                        />}
                        label="Asset"
                        value={selectText}
                        onChangeText={selectText => {
                            setSelectText(selectText)
                        }}
                    />

                    <List.Accordion title="Category"
                        descriptionStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 14, }}
                        description={category}
                        expanded={expandForCategory}
                        onPress={() => setExpandForCategory(!expandForCategory)}
                        style={{ backgroundColor: "white", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                        titleStyle={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}

                    >
                        {categoryData.map((data, i) => (
                            <List.Item
                                style={{ backgroundColor: "#EAEAEA", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                                titleStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 12, }} title={data.categoryName}
                                onPress={() => {
                                    let categoryData = { ...allData }
                                    categoryData.taskCategory.id = data.id
                                    categoryData.taskCategory.name = data.categoryName
                                    setAllData(categoryData)
                                    setCategory(data.categoryName)
                                    setCategoryId(data.id)
                                    setExpandForCategory(false)
                                }} />
                        ))}

                    </List.Accordion>

                    <List.Accordion title="Priority"
                        titleStyle={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                        descriptionStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 14, }}
                        description={priority} expanded={expandForPriority} onPress={() => setExpandForPriority(!expandForPriority)}
                        style={{ backgroundColor: "white", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                    >
                        {priorityData?.map((data, i) => (
                            <List.Item
                                style={{ backgroundColor: "#EAEAEA", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                                titleStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 12, }} title={data.categoryName} onPress={() => {
                                    let priorityData = { ...allData }
                                    priorityData.priority.id = data.id
                                    priorityData.priority.name = data.categoryName
                                    setAllData(priorityData)
                                    setPriority(data.categoryName)
                                    setPriorityId(data.id)
                                    setExpandForPriority(false)
                                }} />
                        ))}

                    </List.Accordion>

                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ paddingHorizontal: 15, color: "black", backgroundColor: "white", fontFamily: 'SiemensSans-Roman', fontSize: 10 }}
                        right={<TextInput.Icon name={() => <Icon name={'calendar'} onPress={() => setOpen(true)} size={20} />}
                        />}
                        label="Due Date"
                        placeholder="select date"
                        format="DD.MM.YYYY"

                        value={confirmDateForDisplay}
                        maxLength={20}
                        onChange={(e) => {

                            setDateChange(e.target.value)
                            setConfirmDateDisplay(e.target.value)

                        }}

                    />
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        minimumDate={moment().toDate()}
                        mode='date'
                        onConfirm={(date) => {
                            setIsConfirmDateSetted(true);
                            updatedDate(date)

                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    <List.Accordion title="Assigned User"
                        descriptionStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 14, }}
                        description={assignUser} expanded={expandForAssignUser} onPress={() => setExpandForAssignUser(!expandForAssignUser)}
                        style={{ backgroundColor: "white", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                        titleStyle={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}


                    >
                        {assignUserData.map((data, i) => (
                            <List.Item
                                title={data}
                                style={{ backgroundColor: "#EAEAEA", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                                titleStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                                onPress={() => {
                                    let assignedUserData = { ...allData }
                                    assignedUserData.assignedTo.login = data
                                    setAllData(assignedUserData)
                                    setAssignUser(data)
                                    setExpandForAssignUser(false)

                                }} />
                        ))}
                    </List.Accordion>
                    <View style={{ marginHorizontal: 5, marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={{ marginLeft: 5, fontSize: 12, fontFamily: 'SiemensSans-Roman', color: 'rgba(27,21,52,0.6)' }}>Description</Text>
                        <Recording setDescriptionData={setDescription} />
                    </View>


                    <TextInput
                        selectionColor='#2D373C'
                        underlineColor='#BECDD7'
                        activeUnderlineColor='#50BED7'
                        outlineColor='black'
                        activeOutlineColor='black'
                        style={{ marginHorizontal: 5, borderWidth: 1, borderColor: '#E2E8ED', color: "#707070", backgroundColor: "white", fontSize: 12 }}
                        editable={false}
                        numberOfLines={5}
                        multiline={true}
                        placeholder="Please add text here"
                        mode='flat'
                        value={description}
                        onChangeText={description => setDescription(description)}

                    />

                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={{ paddingHorizontal: 5, alignSelf: 'flex-end', color: "#004669", fontFamily: "SiemensSans-Roman" }}>
                            {description && description.length > 0 ? description.length + "/200" : "0/200"}
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 15, }}>
                        <Text style={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12 }}>Comments</Text>
                        <TouchableOpacity onPress={() => {
                            showModal()
                            getAllComments()
                        }}>
                            <Text style={{ color: LoginCommonCss.buttonBackground(), fontFamily: "SiemensSans-Bold", fontSize: 12 }}>View</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                        <Button color={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 16, }} borderColor={LoginCommonCss.buttonBackground()} style={{ borderRadius: LoginCommonCss.buttonBorderRadiusForEditTask(), padding: 7, justifyContent: "center", borderWidth: 1, borderColor: LoginCommonCss.buttonBackground(), width: 150 }} uppercase={false} onPress={() => editTaskData(false)}>
                            {buttonLabel1}
                        </Button>

                        <Button mode="contained" color={LoginCommonCss.buttonBackground()} labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 16, }} style={{ borderRadius: LoginCommonCss.buttonBorderRadiusForEditTask(), padding: 7, justifyContent: "center", width: 150 }} uppercase={false} onPress={() => editTaskData(true)}>
                            {buttonLabel}
                        </Button>
                    </View>
                </View>

            </ScrollView >

            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: 'center', }}>
                    <TouchableOpacity style={{ marginRight: 15, }} onPress={() => { hideModal() }}>
                        <SVGCloseIcon height={25} width={25} />
                    </TouchableOpacity>
                </View>
                <Divider style={{ height: 1, backgroundColor: "#D7D7D7", width: "100%" }} />
                <View style={{ flex: 9 }}>
                    <ScrollView>
                        <View style={{ flex: 5, marginVertical: 5, }}>
                            <View style={{ marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={{ color: "#1B1534", fontSize: 12, fontFamily: 'SiemensSans-Roman', marginLeft: 10, }}>Comments</Text>
                                <Recording setDescriptionData={setCurrentComment} />
                            </View>

                            <View style={{ borderWidth: 1, borderColor: "#E2E8ED", marginHorizontal: 10 }}>

                                <TextInput
                                    value={currentComment}
                                    placeholder="Please add text here"
                                    activeUnderlineColor='#50BED7'
                                    placeholderTextColor={'#707070'}
                                    multiline={true}
                                    numberOfLines={5}
                                    style={{ color: "#E2E8ED", fontSize: 12, backgroundColor: "white", }}
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


export default EditTask;