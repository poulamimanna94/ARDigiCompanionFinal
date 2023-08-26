import React from 'react'
import { StatusBar, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { Icon } from 'react-native-elements';
import { colors, height, width } from '../utils/Constants';
import HistoricalTrendTopTab from '../components/HistoricalTrend/HistoricalTrendTopTab';
import AllActions from '../redux/AllActions';
import { Utils } from '../components/Common/Utils';
import HistoricalGroupComp from '../components/HistoricalTrend/HistoricalGroupComp';
import HistoricalTagsComp from '../components/HistoricalTrend/HistoricalTagsComp';
import Orientation from 'react-native-orientation';
import { useNavigation } from '@react-navigation/native';
import SVGCalenderIcon from '../assets/calender.svg';
import ErrorPopup from '../components/ErrorPopup';

const Analyze = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    let [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0, visible: false, value: 0 })
    const [openStartDateDialog, setOpenStartDateDialog] = React.useState(false);
    const [openEndDateDialog, setOpenEndDateDialog] = React.useState(false);
    const [startDateStr, setStartDateStr] = React.useState('');
    const [endDateStr, setEndDateStr] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [url, setUrl] = React.useState('');
    const [timeStamp, setTimeStamp] = React.useState([]);
    const [allTagsYValues, setAllTagsYValues] = React.useState([]);
    const [tagsToShow, setTagsToShow] = React.useState([]);
    const [chartDataPoints, setChartDataPoints] = React.useState({});
    const [legends, setLegends] = React.useState([]);
    const [allTagsNormalizedYValues, setAllTagsNormalizedYValues] = React.useState([]);
    const [isStartAndEndDateAvail,] = React.useState(true);
    const [dateError, setDateError] = React.useState(true);
    const [showGraph, setShowGraph] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [loader, setLoader] = React.useState(true);
    const tenantId = useSelector(state => state.tenantId);

    React.useEffect(() => {
        Orientation.unlockAllOrientations();
        Orientation.addOrientationListener(changeOrientation);

        return (() => {
            Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
            dispatch(AllActions.toggleOrientation('PORTRAIT'));
        })
    }, [])

    React.useEffect(() => {
        chartDataReset();
        return (() => { chartDataReset() })
    }, [props.toggleBetweenGroupAndTagsInHistorical])
    
    React.useEffect(() => {
        navigation.addListener('blur',() => {
            console.warn("hello")
            chartDataReset()
        })
        return () => {
            navigation.removeListener('blur')
        }
    })

    function chartDataReset() {
        setChartDataPoints([]);
        setTimeStamp([]);
        setLegends([]);
        setShowGraph(false);
        setError(false);
    }


    function changeOrientation(orientation) {
        if (orientation === 'LANDSCAPE') {
            // do something with landscape layout
            dispatch(AllActions.toggleOrientation('LANDSCAPE'));
            navigation.setOptions({ headerShown: false });
        } else {
            // do something with portrait layout
            dispatch(AllActions.toggleOrientation('PORTRAIT'));
            navigation.setOptions({ headerShown: true });
        }
    }

    React.useEffect(() => {
        if (startDateStr && endDateStr) setDateError(false);
        else setDateError(true);
    }, [startDateStr, endDateStr])

    React.useEffect(() => {
        getTagList();
        return () => {
            dispatch(AllActions.closeTopHistoricalBar())
        };
    }, [props.toggleBetweenGroupAndTagsInHistorical])

    React.useEffect(() => {
        if (props.tagList) getGraphPlotPointData();
    }, [props.tagList])

    React.useEffect(() => {
        if (url.endsWith('hour')) {
            if (props.toggleBetweenGroupAndTagsInHistorical) {
                if (props.graphGroupData && props.groupNameToShowOnView) getHistoricalGraphTag();
            }
            else {
                if (props.tagList) getGraphPlotPointData();
            }
        }

    }, [url, props.toggleBetweenGroupAndTagsInHistorical, props.graphGroupData && props.groupNameToShowOnView])

    function getHistoricalGraphTag() {
        const filteredGroupData = props.graphGroupData.filter((item) => item.groupName === props.groupNameToShowOnView);
        if (filteredGroupData?.length > 0) {
            const filterTagsData = filteredGroupData[0]?.tags;
            if (!startDateStr || !endDateStr) {
                setDateError(true);
                return;
            }
            getPointsCorrToTagList(filterTagsData, startDateStr, endDateStr); //historical call for tags points
        }
    }

    function getTagList() {
        if (props.toggleBetweenGroupAndTagsInHistorical) {
            Utils.getHistoricalGroup(props.ipPortData, props.accessToken, 'historical', dispatch, tenantId)
                .then(async (response) => {

                    if (response) {
                        dispatch(AllActions.setGraphGroupData(response));
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    React.useEffect(async () => {
        if (timeStamp && allTagsYValues && tagsToShow) {
            normalizeDataPoints(allTagsYValues);
        }
    }, [allTagsYValues])

    React.useEffect(() => {
        if (allTagsNormalizedYValues && timeStamp && allTagsYValues && tagsToShow) {
            prepareChartData(timeStamp, allTagsNormalizedYValues, tagsToShow);
        }
    }, [allTagsNormalizedYValues])


    function getGraphPlotPointData() {
        let filteredTags = props.tagList.filter(item => item.isSelected);
        if (!startDateStr || !endDateStr) {
            setDateError(true);
            return;
        }
        if (filteredTags?.length == 0) {
            setLegends([]);
            setChartDataPoints([]);
        }
        if (filteredTags?.length > 0) getPointsCorrToTagList(filteredTags, startDateStr, endDateStr);
    }

    function getPointsCorrToTagList(filteredTags, startDateStr, endDateStr) {
        let dataToSentAsBody = [];
        filteredTags.map(item => {
            let obj = {
                tagId: item.id,
                tagName: item.tagName,
                opcServer: item.opcServer,
                opcSubscriptionName: item.opcSubscriptionName
            }
            dataToSentAsBody.push(obj);
        })
        //change url listener required
        Utils.getHistoricalTrend(props.ipPortData, props.accessToken, dataToSentAsBody, url, dispatch, tenantId)
            .then(async (res) => {
                setPropertyToShowOnGraph(res);
            })
            .catch(err => {
                setShowGraph(false);
                setError(true);
                console.log(err);
            });
    }


    function setTimeStampFromRawData(tagsRawData) {
        const localTimeStamp = [];
        tagsRawData.forEach((tagAndValue) => {
            if (localTimeStamp.length <= 0) {
                Object.values(tagAndValue.tag)[0].forEach(valueItem => {
                    localTimeStamp.push(valueItem.timeStamp);
                })
            }
            setTimeStamp(localTimeStamp);
        })
        setTimeStamp(localTimeStamp);
    }

    function setLegendsFromRawData(tagsRawData) {
        const tempLegends = [];
        tagsRawData.forEach((item) => {
            tempLegends.push(Object.keys(item.tag)[0])
        })

        setTagsToShow(tempLegends);
    }

    function setPointsValueFromRawData(tagsRawData) {

        const tempYValue = [];
        tagsRawData.forEach((tagAndValue) => {

            const localYValue = [];
            Object.values(tagAndValue.tag)[0].forEach(valueItem => {
                localYValue.push(valueItem.value);
            })
            tempYValue.push(localYValue);
        })
        setAllTagsYValues(tempYValue);
    }

    function setPropertyToShowOnGraph(tagsWithPointsObj) {

        if (tagsWithPointsObj) {
            setTimeStampFromRawData(tagsWithPointsObj);
            setLegendsFromRawData(tagsWithPointsObj);
            setPointsValueFromRawData(tagsWithPointsObj);
        } else {
            setError(true);
        }

    }
    //for normalizing data point
    function normalizeDataPoints(allTagsYValue) {
        let normalizeData = [];
        let allNormalizeData = [];
        allTagsYValue.forEach((singleArrYValues) => {
            let max = Math.max(...singleArrYValues);
            let min = Math.min(...singleArrYValues);
            normalizeData = [];
            singleArrYValues.forEach((singlePoint) => {
                let tagValue = ((singlePoint - min) / (max - min)) * 100;
                normalizeData.push(tagValue);
            })
            allNormalizeData.push(normalizeData);

        })
        setAllTagsNormalizedYValues(allNormalizeData);
    }

    function prepareChartData(timeStamps, allTagsNormalizedYValue, tagsToShows) {
        const datasets = [];
        const xLabels = [];
        const legend = [];
        timeStamps.map((item) => {
            let date = new Date(item);
            const minSec = date.toLocaleDateString() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            xLabels.push(minSec);
        })

        for (let i = 0; i < allTagsNormalizedYValue.length; i++) {
            if (allTagsNormalizedYValue[i].length > 0) {
                datasets.push({
                    data: [...allTagsNormalizedYValue[i]],
                    color: () => colors[i % colors.length], // optional
                    strokeWidth: 2,// optional
                    tagValueArr: allTagsYValues[i],
                    timeStamps: xLabels[i],
                    timeStampArr: [...xLabels],
                    tagName: tagsToShows[i] ? tagsToShows[i] : 'No Tag',
                })
            }
        }


        let tempShowGraph = false;
        datasets?.forEach(item => {
            if (item.data.length > 0) {
                tempShowGraph = true;
            }
        })


        if (tempShowGraph) {
            const tempChartDataPoints = {
                labels: [...xLabels],
                datasets: [...datasets],
            }

            setChartDataPoints(tempChartDataPoints);
            setShowGraph(true);
        } else {
            setChartDataPoints([]);
            setShowGraph(false);
        }

        for (let i = 0; i < tagsToShow.length; i++) {
            legend.push({
                tagName: tagsToShow[i],
                color: colors[i % colors.length]
            })
        }
        setLegends(legend)
        if (legend.length > 0)
            setLoader(false);

    }


    const responseOnSetDate = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    };

    function setStartDateAfterConvertingToUTC(date) {
        setShowGraph(false);

        const locStartDate = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
        const dateString = `${locStartDate}T00:00:00`;
        const [fullDate, time] = dateString.split('T');
        const [year, month, newDate] = fullDate.split('-');
        const [hour, minute, second] = time.split(':');
        const dateTime = new Date(year, month, newDate, hour, minute, second);
        let dateToReturn = new Date(dateTime.toISOString());

        if (date > new Date()) {
            if (Platform.OS === 'android') {
                responseOnSetDate(`Start date cannot be greater than current date`);
            } else {
                alert(message);
            }

            setOpenStartDateDialog(false);
            return;
        }
        setShowGraph(false);
        setStartDateStr(dateToReturn);
        setEndDate(new Date());
        setEndDateStr('');
        setStartDate(dateTime);
        setLoader(true);
        if (Platform.OS === 'android') {
            responseOnSetDate(`Start date is set to ${locStartDate}`);
        } else {
            alert(message);
        }

        setOpenStartDateDialog(false);
        setUrl(`/api/${tenantId}/historicalTrendsTags?startDate=${dateTime.toISOString().replace('T', ' ').replace('Z', '')}`)
    }
    function setEndDateAfterConvertingToUTC(date) {
        const locEndDate = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
        let dateString = "";
        if (date == new Date()) {
            dateString = `${locEndDate}T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        } else {
            dateString = `${locEndDate}T23:59:59`;
        }
        const [fullDate, time] = dateString.split('T');
        const [year, month, newDate] = fullDate.split('-');
        const [hour, minute, second] = time.split(':');
        const dateTime = new Date(year, month, newDate, hour, minute, second);
        let dateToReturn = new Date(dateTime.toISOString());

        if (startDate > dateTime) {
            if (Platform.OS === 'android') {
                responseOnSetDate(`End date cannot be Smaller than start date`);
            } else {
                alert(message);
            }

            setOpenEndDateDialog(false);
            return;
        }
        if (Platform.OS === 'android') {
            responseOnSetDate(`End date is set to ${locEndDate}`);
        } else {
            alert(message);
        }

        setEndDate(date)
        setEndDateStr(dateToReturn);
        setOpenEndDateDialog(false);
        setLoader(true);
        setUrl(url + `&endDate=${dateTime.toISOString().replace('T', ' ').replace('Z', '')}&aggregationUnit=1%20hour`)
    }


    return (
        <>
            <ErrorPopup />
            <View style={{ flex: 1, height: height * 1, backgroundColor: '#fff', }}>
                <StatusBar
                    animated={true}
                    hidden={props.toggleOrientation} />
                <Header setEndDateAfterConvertingToUTC={setEndDateAfterConvertingToUTC} setStartDateAfterConvertingToUTC={setStartDateAfterConvertingToUTC} startDate={startDate} endDate={endDate} endDateStr={endDateStr} props={props} openStartDateDialog={openStartDateDialog} openEndDateDialog={openEndDateDialog} setOpenStartDateDialog={setOpenStartDateDialog} setOpenEndDateDialog={setOpenEndDateDialog} />
                {
                    props.toggleBetweenGroupAndTagsInHistorical ?
                        <HistoricalGroupComp loader={loader} groupNameToShowOnView={props.groupNameToShowOnView} showGraph={showGraph} isStartAndEndDateAvail={isStartAndEndDateAvail} dateError={dateError} width={width} toggleOrientation={props.toggleOrientation} chartDataPoints={chartDataPoints} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} />
                        :
                        <HistoricalTagsComp error={error} loader={loader} isAssetSelectedToView={props.isAssetSelectedToView} showGraph={showGraph} dateError={dateError} isStartAndEndDateAvail={isStartAndEndDateAvail} width={width} toggleOrientation={props.toggleOrientation} chartDataPoints={chartDataPoints} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} />
                }
            </View>
            {
                props.toggleHistoricalTopBar && <TopBarModal props={props} />
            }
        </>

    )
}


const TopBarModal = ({ props }) => {
    return (
        <View key={1} style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 1,
            borderColor: '#B5C5D1',
            backgroundColor: '#fff',
            position: 'absolute',
            left: width * 0.08,
            top: 45,
            width: width * 0.8,
            height: props.toggleOrientation ? height * 0.38 : height * 0.5

        }}>
            <HistoricalTrendTopTab />
        </View >
    )
}

const Header = ({ setEndDateAfterConvertingToUTC, setStartDateAfterConvertingToUTC, startDate, endDate, props, openStartDateDialog, setOpenStartDateDialog, openEndDateDialog, setOpenEndDateDialog }) => {
    return (
        <View style={{ padding: 15, height: height * 0.07, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.toggleTopBarModal()}>
                    <Text>Select Tag</Text>
                    <Icon size={20} style={{ marginLeft: 10, marginBottom: 3, }} name="chevron-down-outline" type="ionicon" color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15, }} onPress={() => {
                    setOpenStartDateDialog(true)
                }}>
                    <Text>Start Date :  </Text>
                    <SVGCalenderIcon />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 15, flexDirection: 'row', }} onPress={() => {
                    setOpenEndDateDialog(true)
                }}>
                    <Text>End Date : </Text>
                    <SVGCalenderIcon />
                </TouchableOpacity>

                <DatePicker
                    theme='light'
                    modal

                    open={openStartDateDialog}
                    date={startDate}
                    mode='date'
                    onConfirm={(date) => {
                        setStartDateAfterConvertingToUTC(date);
                    }}
                    onCancel={() => {
                        setOpenStartDateDialog(false);
                    }}
                />
                <DatePicker
                    theme='light'
                    modal
                    open={openEndDateDialog}
                    date={endDate}
                    mode='date'
                    onConfirm={(date) => {
                        setEndDateAfterConvertingToUTC(date);
                    }}
                    onCancel={() => {
                        setOpenEndDateDialog(false);
                    }}
                />

            </View>
        </View>
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
        toggleBetweenGroupAndTagsInHistorical: state.toggleBetweenGroupAndTagsInHistorical,
        graphGroupData: state.graphGroupData,
        groupNameToShowOnView: state.groupNameToShowOnView,
        hisStartDate: state.hisStartDate,
        hisEndDate: state.hisEndDate,
        isAssetSelectedToView: state.isAssetSelectedToView,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTopBarModal: () => {
            dispatch(AllActions.toggleHistoricalTopBar());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Analyze)