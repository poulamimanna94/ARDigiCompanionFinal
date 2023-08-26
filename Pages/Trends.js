import { Dimensions, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import TrendsTopTab from '../components/Trends/TrendsTopTab';
import SVGRefreshIcon from '../assets/refresh.svg';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Utils } from '../components/Common/Utils';
import AllActions from '../redux/AllActions';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import Orientation from 'react-native-orientation';
import { colors, height, width } from '../utils/Constants';
import GraphErrorMessage from '../components/Trends/GraphErrorMessage';
import GraphToolTip from '../components/Trends/GraphToolTip';
import TagsAsLabel from '../components/Trends/TagsAsLabel';
import { LoginCommonCss } from '../css/CommonCss';


const Trends = (props) => {

  let [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0, visible: false, value: 0 })
  const navigation = useNavigation();
  const [tags, setTags] = React.useState([]);
  const [ChartDataPoints, setChartDataPoints] = React.useState({});
  const [legends, setLegends] = React.useState([]);
  const [allTagsNormalizedYValues, setAllTagsNormalizedYValues] = React.useState([]);
  const [timeStamp, setTimeStamp] = React.useState([]);
  const [allTagsYValues, setAllTagsYValues] = React.useState([]);
  const [tagsToShow, setTagsToShow] = React.useState([]);
  const [filterGroupData, setFilterGroupData] = React.useState([]);
  const timer = React.useRef(null);
  const toggleTrendsPopup = props.toggleTrendsPopup;
  const dispatch = useDispatch()
  const ipPortData = useSelector(state => state.ipPortData);
  const accessToken = useSelector(state => state.accessToken);
  const [error, setError] = React.useState(false);
  const [showGraph, setShowGraph] = React.useState(false);
 
  const tenantId = useSelector(state => state.tenantId);


  React.useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(orientationDidChange);

    return (() => {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
      dispatch(AllActions.toggleOrientation('PORTRAIT'));
    })
  }, [])


  //change orientation
  function orientationDidChange(orientation) {
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

  //graph group data 
  React.useEffect(async () => {
    if (props.graphGroupData && props.groupNameToShowOnView) {
      const filteredGroupData = await props.graphGroupData.filter((item) => item.groupName === props.groupNameToShowOnView);
      setFilterGroupData(filteredGroupData);
    }
  }, [props.graphGroupData, props.groupNameToShowOnView])

  //graph group data
  React.useEffect(async () => {
    if (filterGroupData) {
      const filterTagsData = filterGroupData[0]?.tags;
      //Timer logic will come here
      if (timer.current == null) {
        timer.current = setInterval(() => {
          updateGraph(filterTagsData);
        }, 3000)
      }
    }
  }, [filterGroupData])

  //when timestamp allTagsYValue and legends are available
  React.useEffect(async () => {
    if (timeStamp && allTagsYValues && tagsToShow) {
      normalizeDataPoints(allTagsYValues);
    }
  }, [allTagsYValues])

  //for normalizing data point
  function normalizeDataPoints(tempAllTagsYValues) {
    let normalizeData = [];
    let allNormalizeData = [];
    tempAllTagsYValues.forEach((singleArrYValues) => {
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

  React.useEffect(() => {
    navigation.addListener('blur', () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      setLegends([]);
      setTags([]);
      setTagsWithProperty([])
      resetChartData();
      setShowGraph(false);
      setError(false);

    })
    navigation.addListener('focus', () => {
      Orientation.unlockAllOrientations();
      getAllTags();
    })
    return (() => {
      navigation.removeListener('blur');
      navigation.removeListener('focus');
      setLegends([]);
      setTags([]);
      setShowGraph(false);
      setError(false);
      setTagsWithProperty([])
      clearInterval(timer.current);
      timer.current = null;
    })
  }, [])

  //get all tags Data
  function getAllTags() {
    if (props.toggleBetweenGroupAndTags) {
      Utils.getGroupTagsCoordinatePoints(ipPortData, accessToken, props.assetId, 'live',dispatch,tenantId)
        .then(async (response) => {
          if (response) {
            dispatch(AllActions.setGraphGroupData(response));
          }
          setError(false);
        })
        .catch(err => {
          setShowGraph(false);
          setError(true);
          console.log(err);
        });
    }
    else {
      Utils.getTagsData(ipPortData, accessToken, props.assetId,dispatch,tenantId)
        .then(async (response) => {
          let retTags = await setTagsWithProperty(response);
          setTags(retTags);
        })
        .catch(error => {

          setShowGraph(false);
          setError(true);
          console.log(error);
        });
    }

  }

  //set tag with property isSelected
  function setTagsWithProperty(tagArr) {
    const funTags = tagArr.map((item, index) => {
      let new_name = item.name;
      if (index < 10) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
      return ({ ...item, new_name });
    });
    dispatch(AllActions.tagsByDefaultSelected(tagArr));
    return funTags;
  }
  //chart data prepare method call 
  React.useEffect(() => {
    if (allTagsNormalizedYValues && timeStamp && allTagsYValues && tagsToShow) {
      prepareChartData(timeStamp, allTagsNormalizedYValues, tagsToShow);
    }
  }, [allTagsNormalizedYValues])

  React.useEffect(() => {
    navigation.addListener('blur',() => {
        console.warn("hello")
        resetChartData()
    })
    return () => {
        navigation.removeListener('blur')
    }
})

  //when switching in top bar this will run
  React.useEffect(() => {
    resetChartData();
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    getAllTags();
    return (() => {
      resetChartData();
    })
  }, [props.toggleBetweenGroupAndTags]);

  function resetChartData() {
    setChartDataPoints([]);
    setAllTagsYValues([]);
    setAllTagsNormalizedYValues([]);
    setLegends([]);
    setTagsToShow([]);
    setShowGraph(false);
    setError(false);
    setTimeStamp([]);
    setTooltipPos({ x: 0, y: 0, visible: false, value: 0 })
  }

  //setting the tags trends data
  React.useEffect(() => {
    const arr = tags.filter((item) => item.isSelected);
    
    dispatch(AllActions.setTagsTrendsData(arr));
  }, [tags])

  //timer logic comes here
  React.useEffect(() => {
    onListUpdateOrRefresh();
    resetChartData();
  }, [props.selectedTrendTagList])

  function onListUpdateOrRefresh() {
    const arr = props.selectedTrendTagList.filter((item) => item.isSelected);
    console.log('arr ->', arr);
    if (arr.length == 0) {
      resetChartData();
      setShowGraph(true);
      setError(true);

    }
    else if (props.selectedTrendTagList.length > 0) {
      if (props.toggleBetweenGroupAndTags) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        return;
      }
      if (!timer.current) {
        timer.current = setInterval(() => {
          updateGraph(props.selectedTrendTagList);
        }, 3000);
      }
    }
  }


  //for preparing chart data
  async function prepareChartData(timeStampArr, allTagsNormalizedYValuesArr, tagsToShowArr) {
    const datasets = [];
    const xLabels = [];
    const locLegends = [];

    timeStampArr.map((item) => {
      let date = new Date(item);
      let min = 0;
      let sec = 0;
      let hr = 0;

      if (date.getHours() <= 9) {
        hr = '0' + date.getHours() + 'h'
      } else {
        hr = date.getHours() + 'h';
      }

      if (date.getMinutes() <= 9) {
        min = '0' + date.getMinutes() + 'm';
      } else {
        min = date.getMinutes() + 'm';
      }
      if (date.getSeconds() <= 9) {
        sec = '0' + date.getSeconds() + "s"
      }
      else {
        sec = date.getSeconds() + 's';
      }
      const minSec = hr + " : " + min + " : " + sec;
      xLabels.push(minSec);
    })


    tagsToShowArr.forEach((item, i) => {
      locLegends.push({
        tagName: item,
        color: colors[i % colors.length]
      })
    })
    if (locLegends.length > 0) {
      setLegends(locLegends);
    } else {
      setLegends([]);
    }

    for (let i = 0; i < allTagsNormalizedYValuesArr.length; i++) {
      if (allTagsNormalizedYValues[i].length > 0) {
        datasets.push({
          data: [...allTagsNormalizedYValues[i]],
          color: () => colors[i % colors.length], // optional
          strokeWidth: 3,// optional
          tagValueArr: allTagsYValues[i],
          timeStamp: xLabels[i],
          timeStampArr: [...xLabels],
          tagName: tagsToShowArr[i] ? tagsToShowArr[i] : 'No Tag',
        })
      }

    }

    let tempShowGraph = false;
    datasets.forEach(item => {
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
    }
    else {
      setShowGraph(false);
      setError(true);
    }

  }

  async function updateGraph(selectedTrendTagList) {
    let dataToSentAsBody = [];
    if (selectedTrendTagList) {
      selectedTrendTagList.map(item => {
        let obj = {
          tagId: item.id,
          tagName: item.tagName,
          opcServer: item.opcServer,
          opcSubscriptionName: item.opcSubscriptionName
        }
        dataToSentAsBody.push(obj);
      })

      Utils.getLiveTrend(ipPortData, accessToken, dataToSentAsBody,dispatch,tenantId)
        .then(async (res) => {
          setPropertyToShowOnGraph(res);
          setError(false);
        })
        .catch(error => {
          setShowGraph(false);
          setError(true);
          console.log(error);
        });
    }
    else {
      setShowGraph(false);
      setError(true);
    }
  }

  function setTimeStampFromRawData(tagsRawData) {
    const localTimeStamp = [];
    Object.values(tagsRawData[0].tag)[0].forEach(valueItem => {
      localTimeStamp.push(valueItem.timeStamp);
    })
    setTimeStamp(localTimeStamp);
  }

  function setLegendsFromRawData(tagsRawData) {
    const tempLegends = [];
    tagsRawData.forEach((item) => { tempLegends.push(Object.keys(item.tag)[0]) })
    setTagsToShow(tempLegends);
  }

  function setPointsValueFromRawData(tagsRawData) {
    const tempYValue = [];
    try {
      tagsRawData.forEach((tagAndValue) => {
        const localYValue = [];
        Object.values(tagAndValue.tag)[0].forEach(valueItem => {
          localYValue.push(valueItem.value);
        })
        tempYValue.push(localYValue);
      })
      setAllTagsYValues(tempYValue);
      setError(false);
    }
    catch (err) {
      setShowGraph(false);
      setError(true);

    }
  }

  function setPropertyToShowOnGraph(tagsWithPointsObj) {
    
    if (tagsWithPointsObj) {
      setTimeStampFromRawData(tagsWithPointsObj);
      setLegendsFromRawData(tagsWithPointsObj);
      setPointsValueFromRawData(tagsWithPointsObj);
      setError(false);
    } else {
      setShowGraph(false);
      setError(true);
    }
  }

  return (
    <View style={{ height: height * 1, backgroundColor: '#fff', }}>
      <StatusBar
        backgroundColor={'#190D35'}
        animated={true}
        hidden={props.toggleOrientation} />
      <ScrollView >
       
        <View style={{ flexDirection: 'row', padding: 15, flex: 1, height: height * 0.06, justifyContent: 'space-between', backgroundColor: '#fff', }}>
          <View style={{ flexDirection: 'row' }}>
            <View >
              <TouchableOpacity activeOpacity={0.8} onPress={() => {
                if (timer.current) {
                  clearInterval(timer.current);
                  timer.current = null;
                }
                props.closeTrendPopup()
              }}

                style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 14, color: '#5D596E', fontFamily: 'SiemensSans-Roman' }}>Select Tag</Text><Icon size={20} style={{ marginLeft: 5, marginTop: -3, }} name="chevron-down-outline" type="ionicon" color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <SVGRefreshIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: height * 0.7, }}>
          {
            !showGraph ? (
              <LoadingOrErrorMessageComp toggleOrientation={props.toggleOrientation} error={error} />
            ) : props.toggleBetweenGroupAndTags ? (
              <View style={{ minHeight: height * 0.5, }}>
                <GraphGroupComp showGraph={showGraph} groupNameToShowOnView={props.groupNameToShowOnView} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} props={props} ChartDataPoints={ChartDataPoints} />
              </View>
            ) : (
              <View style={{ flex: 1, height: height * 0.8, }}>
                <SingleTagsComp showGraph={showGraph} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} props={props} ChartDataPoints={ChartDataPoints} />
              </View>
            )
          }
        </View >

        {
          toggleTrendsPopup ? (
            <View style={{
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
              height: props.toggleOrientation ? height * 0.4 : height * 0.5

            }}>
              <TrendsTopTab />
            </View >
          ) : null
        }

      </ScrollView >
    </View >
  )



};
const mapStateToProps = state => {
  return {
    ipPortData: state.ipPortData,
    accessToken: state.accessToken,
    tagList: state.tagList,
    selectedTrendTagList: state.selectedTrendTagList,
    assetId: state.assetId,
    toggleTrendsPopup: state.toggleTrendsPopup,
    toggleBetweenGroupAndTags: state.toggleBetweenGroupAndTags,
    toggleOrientation: state.toggleOrientation,
    groupNameToShowOnView: state.groupNameToShowOnView,
    graphGroupData: state.graphGroupData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedTagForTrend: (list) => {
      dispatch(AllActions.setTagsTrendsData(list));
    },
    closeTrendPopup: () => {

      dispatch(AllActions.toggleTrendsPopup());
    },
    setGroupGraphData: (data) => {
      dispatch(AllActions.setGraphGroupData(data));
    }
  }
};

const LoadingOrErrorMessageComp = ({ toggleOrientation, error }) => {
  return (
    error ? (      
      <View style={{ flex: 1, height: height * 0.9, justifyContent: "center", alignItems: 'center', }}>
        <ActivityIndicator size={60} color={LoginCommonCss.buttonBackground()} />
        <Text style={{ fontFamily: 'SiemensSans-Bold', marginTop: 5, color: '#2D373C', marginBottom: toggleOrientation ? '35%' : 0 }}>Loading ...</Text>
      </View >
    ) : (
      <View style={{ flex: 1, height: height * 0.9, justifyContent: "center", alignItems: 'center', }}>
        <Text style={{ fontSize: 16, fontFamily: 'SiemensSans-Bold', marginTop: 5, color: '#2D373C', marginBottom: toggleOrientation ? '35%' : 0 }}>{'No data found !'}</Text>
      </View >
    )
  )
}


const SingleTagsComp = ({ showGraph, legends, tooltipPos, setTooltipPos, props, ChartDataPoints }) => {

  return (
    showGraph &&
    <ScrollView style={{ backgroundColor: 'white', }} nestedScrollEnabled={true}>
      <LiveGraphComponent showGraph={showGraph} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} props={props} ChartDataPoints={ChartDataPoints} />
    </ScrollView>

  )
}

const GraphGroupComp = ({ groupNameToShowOnView, showGraph, legends, tooltipPos, setTooltipPos, props, ChartDataPoints }) => {
  return (
    groupNameToShowOnView && showGraph ? (
      <Group showGraph={showGraph} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} props={props} ChartDataPoints={ChartDataPoints} />
    ) : (
      <View style={{ height: height * 0.3, flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ marginBottom: props.toggleOrientation ? "35%" : "5%", fontSize: 18, fontFamily: 'SiemensSans-Bold', color: '#000', }}>Please Select the Group !!!</Text>
      </View>
    )
  )
}
const Group = ({ legends, showGraph, tooltipPos, setTooltipPos, props, ChartDataPoints }) => {

  return (
    showGraph ? (
      <ScrollView style={{ backgroundColor: 'white', }} nestedScrollEnabled={true}>
        <LiveGraphComponent showGraph={showGraph} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} props={props} ChartDataPoints={ChartDataPoints} />
      </ScrollView>
    ) : (
      <View style={{ height: height * 0.7, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: props.toggleOrientation ? '35%' : 0, fontFamily: 'SiemensSans-Bold' }}>Tags Data Not Found</Text>
      </View>
    )
  )
}



const LiveGraphComponent = ({ showGraph, legends, ChartDataPoints, props, setTooltipPos, tooltipPos }) => {
  return (
    <View>
      <TagsAsLabel legends={legends} />
      <View>
        {
          showGraph && ChartDataPoints ?
            (
              <LineChart
                data={ChartDataPoints}
                width={Dimensions.get("window").width * 0.95} // from react-native
                height={props.toggleOrientation ? height * 0.35 : height * 0.65}
                withHorizontalLines={true}
                withVerticalLines={false}
                withVerticalLabels={props.toggleOrientation ? false : true}
                segments={10}
                horizontalLabelRotation={0}
                verticalLabelRotation={90}
                onDataPointClick={
                  (data) => {
                    let isSamePoint = (tooltipPos.x === data.x
                      && tooltipPos.y === data.y)
                    isSamePoint ? setTooltipPos((previousState) => {
                      return {
                        ...previousState,
                        normalizedValue: Math.round(data?.dataset?.data[data?.index] * 100) / 100,
                        tagName: data?.dataset?.tagName,
                        timeStamp: data?.dataset?.timeStampArr[data?.index],
                        actualValue: data?.dataset?.tagValueArr[data?.index],
                        visible: !previousState.visible
                      }
                    })
                      :
                      setTooltipPos({
                        x: data.x,
                        normalizedValue: Math.round(data?.dataset?.data[data?.index] * 100) / 100,
                        y: data.y,
                        tagName: data?.dataset?.tagName,
                        timeStamp: data?.dataset?.timeStampArr[data?.index],
                        actualValue: Math.round(data?.dataset?.tagValueArr[data?.index] * 100) / 100,
                        visible: true
                      });
                  } // end function
                }
                decorator={() => {
                  return tooltipPos.visible ? (<GraphToolTip tooltipPos={tooltipPos} />) : (null)
                }}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForBackgroundLines: {
                    strokeWidth: "2",
                    stroke: "#5D596E"
                  },
                  propsForDots: {
                    r: "4",
                  }
                }}

                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            )
            :
            (
              <GraphErrorMessage toggleOrientation={props.toggleOrientation} />
            )

        }
      </View>
    </View>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Trends);