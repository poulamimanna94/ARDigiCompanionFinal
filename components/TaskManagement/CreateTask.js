/*
 * @author : Poulami Manna
 * @description : Create Task Page
*/

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TextInput, List, Button, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import { Utils } from '../Common/Utils';
import { useDispatch, useSelector } from 'react-redux';
import Recording from './Recording';
import Orientation from 'react-native-orientation';
import AllActions from '../../redux/AllActions';
import moment from 'moment';
import FullLoader from '../Loader/FullLoader';
import { width, height } from '../../utils/Constants';
import { LoginCommonCss } from '../../css/CommonCss';

const CreateTask = ({ navigation, route, toggleAttachment }) => {
    const [text, setText] = useState();
    const selectAssetEditToViewData = useSelector(state => state.selectAssetEditToViewData);
    const [selectText, setSelectText] = useState(selectAssetEditToViewData?.split(' | ')?.join(' > '));
    const assetId = useSelector(state => state.assetId);
    const [priority, setPriority] = useState();
    const [category, setCategory] = useState();
    const [assignUser, setAssignUser] = useState();
    const [expandForPriority, setExpandForPriority] = useState(false);
    const [expandForCategory, setExpandForCategory] = useState(false);
    const [expandForAssignUser, setExpandForAssignUser] = useState(false);
    const [description, setDescription] = useState();
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [buttonLabel, ] = useState("Create");
    const [showName, setShowName] = useState(false);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const userDetail = useSelector(state => state.userDetail);
    const [categoryData, setCategoryData] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [taskData, setTaskData] = useState([]);
    const [priorityData, setPriorityData] = useState([]);
    const [priorityId, setPriorityId] = useState();
    const [assignUserData, setAssignUserData] = useState([]);
    const [confirmDate, setConfirmDate] = useState(date.getFullYear().toString() + "-" +
        parseInt(date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}` + "-" + parseInt(date.getDate()) > 9 ? date.getDate().toString() : `0${date.getDate().toString()}`);
    const [, setDateChange] = useState();
    const [, setAssetDetailId] = useState();
    const tenantId = useSelector(state => state.tenantId);
    const dispatch = useDispatch();
    const hideModal = () => setVisible(false);
    const showModal = () => setVisible(true);
    const [visible, setVisible] = React.useState(false);
    const containerStyleForComplete = { backgroundColor: 'white', borderRadius: 7, height: 150, width: '80%', marginLeft: width * 0.1, marginBottom: height * 0.1, zIndex: 1 };
    const [isDisabled, setIsDisabled] = useState(false);

    const [confirmDateForDisplay, setConfirmDateDisplay] = useState();
    const [taskDataForFilter, setTaskDataForFilter] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    const [nameLoader, setNameLoader] = useState(true);
    const [categoryLoader, setCategoryLoader] = useState(true);
    const [priorityLoader, setPriorityLoader] = useState(true);
    const [assignedUserLoader, setAssignedUserLoader] = useState(true);
 

    React.useEffect(() => {
        Orientation.lockToPortrait();
    }, [])


    const onChangeSearch = (query) => {
        filterTaskName(query)
    }
    const filterTaskName = (query) => {
        let filterTaskNameData = [];
        taskDataForFilter?.map((val) => {
            if ((val.categoryName.toLowerCase()).includes(query.toLowerCase())) {
                filterTaskNameData.push(val)
            }

        })
        setTaskData(filterTaskNameData);

    }



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
        const finalDateAndTime = finalDate + " " + givenTime
        console.log(finalDateAndTime, "finalDateAndTime")
        var dateUtc = new Date(`${finalDateAndTime} UTC`)
        console.log(dateUtc.toISOString(), confirmDate, "dateUtc confirmDate")
        return dateUtc.toISOString();
    }
    const createTaskData = () => {
        console.log(assetId, "task create console!!");
        let localAssetDetailId = assetId;
        if (!(localAssetDetailId && assignUser && description && confirmDate && priorityId && categoryId && text)) {
            dispatch(AllActions.errorPopup('Please fill all the mandatory details'));
            return;
        }
        const inputObject = {

            "asset": {
                "id": localAssetDetailId
            },
            "assignedTo": {
                "login": assignUser
            },

            "description": description,
            "dueDate": dueDateCompute(confirmDate),
            "priority": {
                "id": priorityId
            },

            "taskCategory": {
                "id": categoryId
            },
            "taskName": text,
            "lastModifiedBy": userDetail?.login,
            "createdBy": userDetail?.login

        }
        console.log(inputObject, "inputObject created");


        Utils.postCreateTaskData(ipPortData, accessToken, inputObject, dispatch,tenantId)
            .then(res => {
                console.log(res, "response for task creation")
                taskNotification(res?.id);
                dispatch(AllActions.setCreatedAssignedTaskId(res?.id));
                showModal();
                dispatch(AllActions.setSelectAssetEditToView(null));

            })
            .catch(err => {
                console.log(err, "error for task creation")
            dispatch(AllActions.errorPopup('task creation failed'));

            })
        setIsDisabled(true);
    }

    useEffect(() => {
        Utils.getCategoryTaskData(ipPortData, accessToken, "task", dispatch,tenantId)
            .then(res => {
                if (res?.length > 0) {
                    setCategoryData(res)
                }
                else {
                    setError(true)
                }
                setCategoryLoader(false)

            })
    }, [])

    useEffect(() => {
        Utils.getCategoryTaskData(ipPortData, accessToken, "taskName", dispatch,tenantId)
            .then(res => {
                if (res?.length > 0) {
                    setTaskData(res)
                    setTaskDataForFilter(res)
                }
                else {
                    setError(true)
                }
                setNameLoader(false)


            })
    }, [])

    useEffect(() => {
        Utils.getCategoryTaskData(ipPortData, accessToken, "priority", dispatch,tenantId)
            .then(res => {
                if (res?.length > 0) {
                    setPriorityData(res)
                }
                else {
                    setError(true)
                }
                setPriorityLoader(false)


            })
    }, [])

    useEffect(() => {
        Utils.getAssignedUserData(ipPortData, accessToken, dispatch,tenantId)
            .then(res => {
                if (res?.length > 0) {
                    setAssignUserData(res)
                }
                else {
                    setError(true)
                }
                setAssignedUserLoader(false);
            })
    }, [])

    useEffect(() => {
        if (!nameLoader && !categoryLoader && !priorityLoader && !assignedUserLoader) {
            setLoader(false)
            setError(false)
        }
    }, [nameLoader, categoryLoader, priorityLoader, assignedUserLoader])

     const taskNotification = (taskIdData) => {
        console.log(taskIdData, "taskIdData")
        const dataToNotify = [{
            taskName: text,
            message: "New Task assigned",
            taskId: taskIdData,
        }]

        console.log(dataToNotify, "dataToNotify")
        Utils.postTaskNotification(ipPortData, accessToken, dataToNotify, dispatch, tenantId)
            .finally(() => { setLoader(false) })
            .then(response => {
                console.log(response, "Task NOTIFY")
                // dispatch(AllActions.setNotificationData([{
                //     id: taskIdData,
                //     taskName: text,
                //     desc: description

                // }]))
            })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
                {toggleAttachment && <Text>First create the task</Text>}
                <View>
                    <View>
                    <TextInput
                            selectionColor='#2D373C'
                            underlineColor='#BECDD7'
                            activeUnderlineColor='#50BED7'
                            outlineColor='black'
                            activeOutlineColor='black'
                            style={{ paddingHorizontal: 20, backgroundColor: "white", color: "#1B1534", fontFamily: "SiemensSans-Roman", fontSize: 12, marginLeft: -4}}
                            label="Name*"
                            right={<View style={{ flexDirection: "row" }}><Image height={10} width={10} source={require('../../assets/arrow_down_small.png')} /></View>}
                            value={text}
                            onChangeText={text => {
                                setText(text)
                                onChangeSearch(text)
                            }}
                            onFocus={() => {
                                setShowName(true)
                            }}
                            editable={!isDisabled}

                        />

                        {showName &&
                            <View>
                                <ScrollView >
                                    {
                                        taskData?.map((item, i) => (
                                            <TouchableOpacity key={i} onPress={() => {
                                                setText(item.categoryName)
                                                setShowName(false)
                                            }} style={{ padding: 15, backgroundColor: "#EAEAEA", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}>
                                                <Text style={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}>{item.categoryName}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>

                            </View>
                        }

                        <TextInput
                            selectionColor='#2D373C'
                            underlineColor='#BECDD7'
                            activeUnderlineColor='#50BED7'
                            outlineColor='black'
                            activeOutlineColor='black'
                            editable={false}
                            style={{ paddingHorizontal: 20, color: "#1B1534", backgroundColor: "white", fontFamily: "SiemensSans-Roman", fontSize: 12, marginLeft: -4}}

                            right={<TextInput.Icon onPress={() => {
                                setShowName(false)
                                !isDisabled && navigation.navigate("SelectAssets", {
                                    setSelectText: setSelectText,
                                    setAssetDetailId: setAssetDetailId,
                                    action: true

                                })
                            }} name={() => selectText ? <Icon size={10}>
                                <Text style={{ paddingHorizontal: 20, color: LoginCommonCss.buttonBackground(), fontFamily: "SiemensSans-Roman", fontSize: 10, fontWeight: "bold" }}>Change</Text>
                            </Icon> : <Icon name="angle-right" size={25} />}
                                editable={isDisabled}
                            />}

                            label="Asset*"
                            value={selectText}
                            onChangeText={selectText => setSelectText(selectText)}
                        />

                        <List.Accordion title="Category*"
                            descriptionStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 14, }}
                            description={category} expanded={expandForCategory && !isDisabled} onPress={() => {
                                setExpandForCategory(!expandForCategory)
                                setShowName(false)
                            }}

                            style={{ backgroundColor: "white", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                            titleStyle={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12, marginLeft: -2}}

                        >
                            {categoryData.map((data, i) => (
                                <List.Item key={i}
                                    style={{ backgroundColor: "#EAEAEA", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                                    titleStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 12, }} title={data.categoryName} onPress={() => {
                                        setCategory(data.categoryName)
                                        setCategoryId(data.id)
                                        setExpandForCategory(false)
                                    }} />
                            ))}

                        </List.Accordion>

                        <List.Accordion title="Priority*"
                            descriptionStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 14, }}
                            description={priority} expanded={expandForPriority && !isDisabled} onPress={() => {
                                setExpandForPriority(!expandForPriority)
                                setShowName(false)
                            }}
                            style={{ backgroundColor: "white", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                            titleStyle={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12, marginLeft: -2}}

                        >
                            {priorityData.map((data, i) => (
                                <List.Item key={i}
                                    style={{ backgroundColor: "#EAEAEA", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                                    titleStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 12, }} title={data.categoryName} onPress={() => {

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
                            onFocus={() => setShowName(false)}
                            right={<TextInput.Icon name={() => <Icon name={'calendar'} onPress={() => setOpen(true)} size={20}/>}
                            />}
                            label="Due Date*"
                            style={{ paddingHorizontal: 20, color: "black", backgroundColor: "white", fontFamily: 'SiemensSans-Roman', fontSize: 11, marginLeft: -6 }}
                            placeholder="select date"
                            format="DD.MM.YYYY"
                            value={confirmDateForDisplay}
                            maxLength={20}
                            onChange={(e) => {
                                setDateChange(e.target.value)
                                setConfirmDateDisplay(e.target.value)
                            }}
                            editable={!isDisabled}

                        />
                        <DatePicker
                            modal
                            open={open && !isDisabled}
                            date={date}
                            minimumDate={moment().toDate()}
                            mode='date'
                            onConfirm={(date) => {
                                let date1 = parseInt(date.getDate()) > 9 ? date.getDate().toString() : `0${date.getDate().toString()}`
                                let month1 = parseInt(date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : `0${(date.getMonth() + 1).toString()}`
                                let year1 = date.getFullYear().toString()
                                let hh1 = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
                                let mm1 = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
                                let ss1 = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
                                setOpen(false)
                                setDate(date)
                                setConfirmDate(year1 + "-" +
                                    month1 + "-" + date1 + " " + hh1 + ":" + mm1 + ":" + ss1)

                                setDateChange(date1 + ":" + month1 + ":" + year1 + " " + hh1 + ":" + mm1 + ":" + ss1)
                                setConfirmDateDisplay(date1 + ":" + month1 + ":" + year1)

                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />

                        <List.Accordion title="Assigned User*" description={assignUser} expanded={expandForAssignUser && !isDisabled} onPress={() => {
                            setExpandForAssignUser(!expandForAssignUser)
                            setShowName(false)
                        }}
                            style={{ backgroundColor: "white", borderBottomColor: "#BECDD7", borderBottomWidth: 1, marginLeft: -2 }}
                            titleStyle={{ color: "rgba(27,21,52,0.6)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                            descriptionStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 14, }}

                        >
                            {assignUserData.map((data, i) => (
                                <List.Item title={data}
                                    titleStyle={{ color: "rgba(27,21,52,1)", fontFamily: "SiemensSans-Roman", fontSize: 12, }}
                                    style={{ backgroundColor: "#EAEAEA", borderBottomColor: "#BECDD7", borderBottomWidth: 1 }}
                                    onPress={() => {
                                        setAssignUser(data)
                                        setExpandForAssignUser(false)

                                    }} />
                            ))}
                        </List.Accordion>

                        <View style={{ marginHorizontal: 5, marginTop: 10, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Text style={{ marginLeft: 5, fontSize: 12, fontFamily: 'SiemensSans-Roman', color: 'rgba(27,21,52,0.6)' }}>Description*</Text>
                            <Recording setDescriptionData={setDescription} />
                        </View>


                        <TextInput
                            selectionColor='#2D373C'
                            underlineColor='#BECDD7'
                            activeUnderlineColor='#50BED7'
                            outlineColor='black'
                            activeOutlineColor='black'
                            style={{ marginHorizontal: 5, borderWidth: 1, borderColor: '#E2E8ED', color: "#707070", backgroundColor: "white", fontSize: 12 }}
                            numberOfLines={5}
                            multiline={true}
                            placeholder="Please add text here"
                            mode='flat'
                            value={description}
                            onFocus={() => setShowName(false)}
                            onChangeText={description => setDescription(description)}
                            editable={!isDisabled}

                        />
                        <View style={{}}>
                            <Text style={{ alignSelf: 'flex-end', color: "#004669", fontFamily: "SiemensSans-Roman" }}>
                                {description && description.length > 0 ? description.length + "/200" : "0/200"}
                            </Text>
                        </View>
                    </View>

                    <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                        <Button mode="contained" labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, }} disabled={isDisabled} color= {LoginCommonCss.buttonBackground()} style={{ borderRadius: LoginCommonCss.buttonBorderRadiusForCreateTask(), padding: 7, width: '45%', justifyContent: "center", marginLeft: 55, marginRight: 55 }} uppercase={false} onPress={() => {
                            createTaskData()
                            }}>
                            {buttonLabel}
                        </Button>
                    </View>
                </View>

                <Modal visible={visible} contentContainerStyle={containerStyleForComplete}>
                    <View style={{ height: '30%', paddingHorizontal: 10 }}>
                        <Text style={{ paddingVertical: 10, fontSize: 16, color: "#000", fontFamily: "SiemensSans-Bold" }}>Task Created</Text>
                    </View>
                    <View style={{ height: '45%', paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Text style={{ fontSize: 14, color: "#000", fontFamily: "SiemensSans-Roman" }}>Task Created Successfully</Text>
                    </View>
                    <View style={{ height: '25%', flexDirection: "row", justifyContent: "flex-end", marginRight: 10, }}>

                        <Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, color: LoginCommonCss.buttonBackground(), marginRight: 16 }} onPress={() => hideModal()}>Ok</Text>
                    </View>
                </Modal>
                {loader && <FullLoader />}
                {error && <View style={{ height: height * 0.8, justifyContent: "center", alignItems: "center" }}><Text style={{ fontFamily: 'SiemensSans-Bold', fontSize: 16, color: '#000' }}>Something Went Wrong !!</Text></View>}

            {/* </ScrollView > */}

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    ImageStyle: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default CreateTask;