/*
 * @author : Poulami Manna
 * @description : Live Parameter in Augmented View
*/

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import SVGRefreshIcon from '../assets/refresh_white.svg';
import { Card } from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  ParameterIcon,
  VideoCallIcon,
  CrossIcon,
  AlertDataIcon,
} from '../components/Icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Utils } from '../components/Common/Utils';
import { height, width } from '../utils/Constants';
import moment from 'moment';
import Orientation from 'react-native-orientation';
import SVGPlusIcon from '../assets/plus_white.svg';
import AllActions from '../redux/AllActions';
import {LoginCommonCss} from '../css/CommonCss';


const HiddenDetails = ({ low, high, veryLow, veryHigh }) => {
  return (<View style={{ justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.5)', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFF00' }}>Hi</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFF00' }}>{high}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FF0000' }}>Hi Hi</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FF0000' }}>{veryHigh}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFF00' }}>Lo</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFF00' }}>{low}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FF0000' }}>Lo Lo</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FF0000' }}>{veryLow}</Text>
    </View>

  </View>)
}

const ParameterOverCamera = props => {
  const { data } = props;
  const [hiddenShow, SetHiddenShow] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.rowFront}
        onPress={() => SetHiddenShow(!hiddenShow)}
        onLongPress={() => navigation.navigate('CreateTask')}
      >
        <View style={{ padding: 25, flexDirection: 'row', height: height * 0.09, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ width: width * 0.5 }}>
            <Text style={{ color: data.item.color }}>
              {data.item.title}
            </Text>
            <Text style={{ marginTop: 1, color: data.item.color }}>
              {data.item.kksCode}
            </Text>
          </View>
          <View style={{ width: width * 0.15, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={(styles.title, { color: data.item.color })}>
              {data.item.value}
            </Text>
          </View>
          <View style={{ width: width * 0.1 }}>
            <AlertDataIcon data={data} />
          </View>
        </View>
      </TouchableOpacity>
      {hiddenShow &&
        <HiddenDetails low={data.item.low} high={data.item.high} veryLow={data.item.veryLow} veryHigh={data.item.veryHigh} />
      }
    </View>
  );
};

const CameraScreen = (props) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [listData, setListData] = useState([]);
  const ipPortData = useSelector(state => state.ipPortData);
  const accessToken = useSelector(state => state.accessToken);
  const [loading, setLoading] = React.useState(true);
  const [assetId, setAssetId] = React.useState();
  const [menuHeaderName, setMenuHeaderName] = React.useState();
  const [currentDate, setCurrentDate] = useState('');
  const dispatch = useDispatch();
  const [refreshing, isRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const tenantId = useSelector(state => state.tenantId);

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, [])

  React.useEffect(() => {
    setAssetId(props.assetId);
  }, [props.assetId])

  React.useEffect(() => {
    setMenuHeaderName(props.menuHeaderName);
  }, [props.menuHeaderName])

  const changeColor = (NotificationItem) => {
    if (NotificationItem.tagValue >= NotificationItem.limitHighHigh || NotificationItem.tagValue <= NotificationItem.limitLowLow) {
      return "#FF0000"
    }
    else if (NotificationItem.tagValue >= NotificationItem.limitHigh || NotificationItem.tagValue <= NotificationItem.limitLow) {
      return "#ffcd50"
    }
    return "#FFFFFF"
  }

  useEffect(() => {

    setLiveTagsValue()

  }, [assetId])

  function setLiveTagsValue() {
    isRefreshing(true);
    Utils.getTagsListData(ipPortData, accessToken, assetId, false, dispatch,tenantId)
      .then(response => {
        setLoading(false);
        isRefreshing(false);
        var date = moment()
          .utcOffset('+05:30')
          .format('DD/MM/YYYY hh:mm:ss A');
        setCurrentDate(date);
        setListData(
          response.map((NotificationItem, index) => ({
            key: `${index}`,
            title: NotificationItem.tagName || NotificationItem.title,
            value: NotificationItem.tagValue ? Math.round(NotificationItem.tagValue * 1000) / 1000 : '0',
            kksCode: NotificationItem.unit || NotificationItem.kksCode,
            low: NotificationItem.limitLow,
            high: NotificationItem.limitHigh,
            veryLow: NotificationItem.limitLowLow,
            veryHigh: NotificationItem.limitHighHigh,
            color: changeColor(NotificationItem)
          }))
        )

      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }



  const VisibleItem = visibleItemProps => {
    const { data } = visibleItemProps;
    return (
      <SafeAreaView>
        {shouldShow ? <ParameterOverCamera data={data} /> : null}
      </SafeAreaView>
    );
  };

  const ParameterOverCameraScreenIcon = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
          <Image
            style={{ tintColor: '#fff' }}
            source={require('../assets/parameters.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = () => {
    return (
      <View style={{ position: 'absolute', top: 2, right: 0, width: width * 0.3, height: height * 0.08, backgroundColor: LoginCommonCss.swipeButtonBackground() }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          dispatch(AllActions.setSelectAssetEditToView(menuHeaderName))
          navigation.navigate('CreateTask')
        }} style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }}>
          <SVGPlusIcon style={{ tintColor: '#fff', }} />
          <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Roman', color: '#fff' }} >Create Task</Text>
        </TouchableOpacity>
      </View>
    );

  };

  const RefreshAssetParameter = () => {
    return (
      <TouchableOpacity
        style={styles.refresh}
      >
        <Text style={styles.title}>Last updated on: {currentDate} </Text>
        <TouchableOpacity onPress={() => { setLiveTagsValue() }} style={{ padding: 5, }}>
          <SVGRefreshIcon />
        </TouchableOpacity>

      </TouchableOpacity>
    );
  };

  const renderItem = (data) => {
    return <VisibleItem data={data} />;
  };



  return (
    <View style={styles.body}>
      <RNCamera type={RNCamera.Constants.Type.back} style={styles.preview}>
        <View style={styles.headerContainer}>
          <CrossIcon />
          <ParameterOverCameraScreenIcon />
          <VideoCallIcon />
        </View>

        {shouldShow ? <RefreshAssetParameter /> : null}

        <View style={styles.swipeListContainer}>
          <SwipeListView
            ListEmptyComponent={() => (
              <View style={{ minHeight: height * 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.6)', }}>
                <Text style={{ color: '#fff' }}>{loading ? 'Fetching Asset' : loading}</Text>
              </View>
            )}
            refreshing={refreshing}
            onRefresh={() => setLiveTagsValue()}
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-105}
          />
        </View>

        <View
          style={{
            paddingTop: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            borderRadius: 80,
            
          }}>
          <Card style={{ width: '70%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'SiemensSans-Bold', marginLeft: width * 0.001 }}>
              {menuHeaderName ? menuHeaderName.substr(menuHeaderName.lastIndexOf('|') + 1) : 'Turbine'}
            </Text>
            <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'SiemensSans-Roman', marginLeft: width * 0.01 }}>{menuHeaderName ? menuHeaderName : "loading..."}</Text>
          </Card>
          <Card style={{ width: '25%', justifyContent: 'center' }}>
            <ParameterIcon kksTag={assetId}
              path={menuHeaderName} />
          </Card>
        </View>
      </RNCamera>
    </View>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);

const styles = StyleSheet.create({
  data1: { flexDirection: 'row', justifyContent: 'space-between' },
  swipeListContainer: { flex: 3, height: 80, width: '85%', paddingBottom: 90 },
  refresh: {
    shadowColor: LoginCommonCss.hamburgerBackground(),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 2,
    height: height * 0.06,
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerContainer: {
    flex: 0.3,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 80,
  },
  textContainer: {
    fontSize: 15,
    color: '#FFFFFF',
    shadowColor: 'rgba(52, 52, 52, 0.8)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    padding: 20,
    borderRadius: 1,
  },

  text: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: LoginCommonCss.cameraScreenrBackground(),
    justifyContent: 'center',
    borderRadius: 5,
    height: height * 0.081,
    margin: 1,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

  title: {
    fontSize: 12,
    fontFamily: 'SiemensSans-Bold',
    color: '#FFFFFF',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
