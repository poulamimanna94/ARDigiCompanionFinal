/*
 * @author : Anurag Chhaperwal
 * @description : Dashboard for User Management, Task Management and Video call with graph
*/

import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { VictoryPie, VictoryLegend, VictoryContainer } from 'victory-native'
import { Utils } from '../Common/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { width, height } from '../../utils/Constants';


const Dashboard = () => {

    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const dispatch = useDispatch();
    const [operatorData, setOperatorData] = React.useState({});
    const [processedOppData, setProcessedOppData] = React.useState([
        { x: 0, y: 1 }, { x: 0, y: 1 }
    ])
    const tenantId = useSelector(state => state.tenantId);
    const userDetail = useSelector(state => state.userDetail);
    const [taskData, setTaskData] = React.useState({});
    const [videoData, setVideoData] = React.useState({});
    const [processedTaskData, setProcessedTaskData] = React.useState([
        { x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }
    ])
    
    const [processedVideoData, setProcessedVideoData] = React.useState([
        { x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }
    ])


    React.useEffect(() => {
        //getting operator count
        Utils.getTotalCountOfOperator(ipPortData, accessToken, dispatch,tenantId)
            .then((res) => {
                setOperatorData(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    React.useEffect(() => {
        //getting task count
        Utils.getTotalNumberOfTasks(ipPortData, accessToken, dispatch,tenantId, userDetail)
            .then((res) => {
                console.log(res, userDetail, "total no. task res")
                setTaskData(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    React.useEffect(() => {
        //getting videoCallDetails count
        Utils.getTotalNumberOfVideoCallDetails(ipPortData, accessToken, dispatch,tenantId)
            .then((res) => {
                console.log(res, "total no. video res")
                setVideoData(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    React.useEffect(() => {
        //processing the data so that apply on the graph
        setProcessedOppData([]);
        let arr = [];
        for (let key in operatorData) {
            let obj = {
                x: operatorData[key],
                y: operatorData[key],
                name: key,
            }
            arr.push(obj);
        }
        setProcessedOppData(arr);
    }, [operatorData])

    React.useEffect(() => {

        setProcessedTaskData([]);
        let arr = [];
        for (let key in taskData) {
            console.log(key);
            let obj = {
                x: taskData[key] === 0 ? null : taskData[key],
                y: taskData[key] === 0 ? 0 : taskData[key],
                name: key,
            }
            arr.push(obj);
        }
        setProcessedTaskData(arr);
    }, [taskData])

    React.useEffect(() => {

        setProcessedVideoData([]);
        let arr = [];
        for (let key in videoData) {
            console.log(key);
            let obj = {
                x: videoData[key] === 0 ? null : videoData[key],
                // y: videoData[key] === 0 ? 0 : videoData[key],
                y: "cc",
                name: key,
            }
            console.log(obj, "obj video")
            arr.push(obj);
        }
        setProcessedVideoData(arr);
    }, [videoData])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <DashboardHeader heading={'Number of Users'} />
            <View style={{ minHeight: height * 0.2, position: 'relative', width: '100%', }}>
                <TouchableOpacity style={styles.icons}>
                    <Image source={require('../../assets/operator.png')} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <VictoryPie
                        containerComponent={<VictoryContainer responsive={false} />}
                        events={[{

                            target: "data",
                            eventHandlers: {
                                onPressIn: (data) => {

                                    return [
                                        {
                                            target: "data",
                                            mutation: ({ style }) => {
                                                return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                                            }
                                        }, {
                                            target: "labels",
                                            mutation: ({ text }) => {
                                                return text === "Active User" ? null : { text: "Active User" };
                                            }
                                        }
                                    ];
                                }
                            }
                        }]}
                        padAngle={() => 2}
                        standalone={true}
                        colorScale={["#0084E1", "#C6AE00",]}
                        width={380} height={380}
                        data={processedOppData}
                        innerRadius={90} labelRadius={110}
                        style={{ labels: { fontFamily: 'SiemensSans-Bold', fontSize: 12, fill: "white" } }}
                    />
                    <View style={{ position: 'absolute', top: 0, left: (width * 0.09), }}>
                        <VictoryLegend x={80} y={10}
                            orientation="horizontal"
                            // gutter={20}

                            colorScale={["#0084E1", "#C6AE00"]}
                            data={[
                                { name: "Active" }, { name: "Total" }
                            ]}
                        />
                    </View>
                </View>
            </View>
            <DashboardHeader heading={'Number of Tasks'} />
            <View>
                <TouchableOpacity style={styles.icons}>
                    <Image style={{marginTop: 25}} source={require('../../assets/taskManagement.png')} />
                </TouchableOpacity >
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, }}>
                    <VictoryPie
                        padAngle={() => 2}
                        standalone={true}
                        colorScale={["#0084E1", "#C6AE00", '#27B66D', '#DA1E28']}
                        width={380} height={380}
                        data={processedTaskData}
                        innerRadius={90} labelRadius={110}
                        style={{ labels: { fontSize: 12, fill: "white", fontFamily: 'SiemensSans-Bold' } }}
                    />
                </View>
                <View style={{ justifyContent: 'space-around', alignItems: 'center', marginTop: 5, paddingHorizontal: 5, height: height * 0.08, width: width * 0.5, position: 'absolute', }}>
                    <Legends color={'#0084E1'} title={'Total Open'} />
                    <Legends color={'#C6AE00'} title={'Due Today'} />
                </View>
                <View style={{ justifyContent: 'space-around', alignItems:'flex-start', marginTop: 5,  height: height * 0.08, width: width * 0.5, position: 'absolute', right: 0,}}>
                    <Legends color={'#27B66D'} title={'Completed Today'} />
                    <Legends color={'#DA1E28'} title={'Total Overdue'} />
                </View>
            </View>
            <DashboardHeader heading={'Video Call Minutes'} />
            <View>
                <TouchableOpacity style={styles.icons}>
                    <Image height={100} width={100} style={{marginTop: 25}} source={require('../../assets/video_call_image.png')} />
                </TouchableOpacity >
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 10}}>
                    <VictoryPie
                        padAngle={() => 2}
                        standalone={true}
                        colorScale={["#0084E1", "#C6AE00", '#27B66D', 'tomato']}
                        width={380} height={380}
                        // data={[
                        //     { x: 1, y: 150 }, { x: 2, y: 150 }, { x: 3, y: 75 }
                        // ]}
                        data={processedVideoData}
                        innerRadius={90} labelRadius={110}
                        style={{ labels: { fontSize: 12, fill: "white", fontFamily: 'SiemensSans-Bold' } }}
                    />
                </View>
                <View style={{ justifyContent: 'space-around', alignItems: 'flex-start', marginTop: 5, paddingHorizontal: 5, height: height * 0.08, width: width * 0.5, position: 'absolute', marginLeft: 30 }}>
                    <Legends color={'#0084E1'} title={'Current Day'} />
                    <Legends color={'#C6AE00'} title={'Current Week'} />
                </View>
                <View style={{ justifyContent: 'space-around', alignItems: 'flex-start', marginTop: 5, paddingHorizontal: 5, height: height * 0.08, width: width * 0.5, position: 'absolute', right: 0, }}>
                    <Legends color={'#27B66D'} title={'Current Month'} />
                    <Legends color={'#FF6347'} title={'Last 6 Months'} />
                </View>

            </View>
        </ScrollView>
    )
}

const Legends = ({ color, title }) => {
    return (
        <View style={{ flexDirection: 'row', }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ height: 10, width: 10, backgroundColor: color, borderRadius: 50, marginTop: 5, marginLeft: 15, }}></View>

                <Text style={{ marginLeft: 20, fontSize: 15, fontFamily: 'SiemensSans-Roman' }}>{title}</Text>
            </View>

        </View>

    )
}

const DashboardHeader = ({ heading }) => {
    return (
        <View style={{ backgroundColor: '#DFE6ED', width: '100%', height: height * 0.06, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={{marginLeft: 20, marginTop: 15, fontFamily: 'SiemensSans-Bold'}}>{heading}</Text>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({

    icons: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {

    },

});