/*
 * @author : Poulami Manna
 * @description : Live Parameter Page
*/

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AlertDataIcon } from '../components/Icons';
import { ActivityIndicator, } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Utils } from '../components/Common/Utils';
import moment from 'moment';
import Notification from '../components/Notification';
import SVGRefreshIcon from '../assets/refresh.svg';
import SVGPlusIcon from '../assets/plus_white.svg';
import { height, width } from '../utils/Constants';
import Orientation from 'react-native-orientation';
import { useNavigation } from '@react-navigation/native';
import AllActions from '../redux/AllActions';
import {LoginCommonCss} from '../css/CommonCss';




const HiddenDetails = ({ low, high, veryLow, veryHigh }) => {
  return (<View style={{ justifyContent: 'center', backgroundColor: '#EAEAEA', padding: 10, paddingLeft: 20, paddingRight: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>Hi</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>{high}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>Hi Hi</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>{veryHigh}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>Lo</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>{low}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>Lo Lo</Text>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4C5264' }}>{veryLow}</Text>
    </View>

  </View>)
}





const ParameterOverNormalScreen = props => {
  const { data } = props;
  const [hiddenShow, SethiddenShow] = useState(false);

  return (
    <View>
      {data.item.color == '#FFFFFF' ? (
        <>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => SethiddenShow(!hiddenShow)}
            style={styles.rowFront}
          >
            <View style={{ padding: 15, flexDirection: 'row'  }}>
              <View style={{ width: width * 0.65 }}>
                <Text style={(styles.title, { color: '#2D373C' })}>
                  {data.item.title.trim()}
                </Text>
                <Text style={(styles.title, { color: '#2D373C' })}>
                  {data.item.kksCode}
                </Text>
              </View>
              <View style={{ width: width * 0.2, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={(styles.title, { color: '#2D373C' })}>
                  {data.item.value}
                </Text>
              </View>
              <View style={{  justifyContent: 'center', alignItems: 'center', }}>
                <AlertDataIcon data={data} />
              </View>

            </View>
          </TouchableOpacity >
          {hiddenShow ? (
            <HiddenDetails low={data.item.low} high={data.item.high} veryLow={data.item.veryLow} veryHigh={data.item.veryHigh} />
          ) : null}
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => SethiddenShow(!hiddenShow)}
            style={styles.rowFront}
          >
            <View style={{ padding: 15, flexDirection: 'row' }}>
              <View style={{ width: width * 0.65 }}>
                <Text style={(styles.title, { color: data.item.color })}>
                  {data.item.title}
                </Text>
                <Text style={(styles.title, { color: data.item.color })}>
                  {data.item.kksCode}
                </Text>
              </View>
              <View style={{ width: width * 0.2, justifyContent: 'center', alignItems: 'flex-start', }}>
                <Text style={(styles.title, { color: data.item.color })}>
                  {data.item.value}
                </Text>
              </View>
              <View style={{ marginLeft: 3, justifyContent: 'center', alignItems: 'center', }}>
                <AlertDataIcon data={data} />
              </View>

            </View>
          </TouchableOpacity>
          {hiddenShow ? (
            <HiddenDetails low={data.item.low} high={data.item.high} veryLow={data.item.veryLow} veryHigh={data.item.veryHigh} />
          ) : null}
        </>
      )}
    </View>
  );
};

const Parameter = (props) => {

  const navigation = useNavigation()
  const [path, setPath] = useState("");
  const [assetId, setAssetId] = useState(0);
  const ipPortData = useSelector(state => state.ipPortData);
  const accessToken = useSelector(state => state.accessToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [refreshing, isRefreshing] = React.useState(false);
  const tenantId = useSelector(state => state.tenantId);

  const changeColor = (NotificationItem) => {
    if (NotificationItem.tagValue >= NotificationItem.limitHighHigh || NotificationItem.tagValue <= NotificationItem.limitLowLow) {
      return "#FF0000"
    }
    else if (NotificationItem.tagValue >= NotificationItem.limitHigh || NotificationItem.tagValue <= NotificationItem.limitLow) {
      return "#ffcd50"
    }
    return "#FFFFFF"
  }

  React.useEffect(() => {
    setPath(props.menuHeaderName);
  }, [props.menuHeaderName])

  React.useEffect(() => {
    setAssetId(props.assetId);
  }, [props.assetId])

  React.useEffect(() => {

    navigation.addListener('focus', () => {
      lockRotationToPortrait();
    })
    lockRotationToPortrait()

  }, [])

  function lockRotationToPortrait() {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
  }

  useEffect(() => {
    if (assetId > 0 && path.length > 0) {
      setLiveTagsValue();
    }
  }, [assetId, path])


  function setLiveTagsValue() {
    if (listData.length > 0) {
      isRefreshing(true);
    }

    Utils.getTagsListData(ipPortData, accessToken, assetId, false, dispatch,tenantId)
      .finally(() => {
        setLoading(false);
        isRefreshing(false);
      })
      .then(response => {
        console.log(response[0]);
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
          }
          ))
        )

      })
      .catch((err) => {
        console.log(err)
      })
  }

  const VisibleItem = visibleItemProps => {
    const { data } = visibleItemProps;
    return (
      <ParameterOverNormalScreen data={data} />
    );
  };

  const renderHiddenItem = () => {
    return (
      <View style={{ position: 'absolute', right: 0, width: width * 0.3, height: '100%', backgroundColor: LoginCommonCss.swipeButtonBackground() }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {
          dispatch(AllActions.setSelectAssetEditToView(path))
          navigation.navigate('CreateTask')
        }} style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }}>
          <SVGPlusIcon style={{ tintColor: '#fff', }} />
          <Text style={{ fontSize: 12, fontFamily: 'SiemensSans-Roman', color: '#fff' }} >Create Task</Text>
        </TouchableOpacity>
      </View>
    )
  };
  const renderItem = (renderItemData) => {
    return <VisibleItem data={renderItemData} />;
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', width: width, height: height * .65, }}>
        {
          loading ? (
            <>
              <ActivityIndicator color={LoginCommonCss.buttonBackground()} size="large" />
            </>
          ) :
            (
              <Text style={{ color: '#2D373C', fontFamily: 'SiemensSans-Bold', fontSize: 16 }}>No tags found !</Text>
            )
        }
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <View>
        {
          path?.includes("|") ? (
            <Text style={styles.assetName}>{path ? path.substring(path.lastIndexOf('|') + 1) : 'Asset Name'}</Text>
          )
            :
            path?.includes(">") ? (
              <Text style={styles.assetName}>{path ? path.substring(path.lastIndexOf('>') + 1) : 'Asset Name'}</Text>
            )
              :
              (
                <Text style={styles.assetName}>{'Asset Name'}</Text>
              )
        }

        <Text
          style={{
            paddingLeft: 10,
            paddingBottom: 20,
            fontSize: 14,
            color: '#4C5264',
            fontFamily: 'siemensSans-Roman',
            backgroundColor: '#FFFFFF',
          }}>
          {path ? path : 'path'}
        </Text>
        <View style={styles.refresh}>
          <Text style={{ color: '#2D373C', fontFamily: 'SiemensSans-Roman', fontSize: 12, }}>Last updated on: {currentDate}</Text>
          <TouchableOpacity
            onPress={() => setLiveTagsValue()}
            style={{ marginRight: 10 }}
          >
            <SVGRefreshIcon />
          </TouchableOpacity>

        </View>

      </View>
      <View style={{ height: height * 0.62, }}>
        <SwipeListView
          refreshing={refreshing}
          onRefresh={() => setLiveTagsValue()}
          ListEmptyComponent={ListEmptyComponent}
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-105}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Notification />
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

export default connect(mapStateToProps, mapDispatchToProps)(Parameter);

const styles = StyleSheet.create({
  assetName: {
    fontSize: 16,
    fontFamily: 'SiemensSans-Bold',
    backgroundColor: '#FFFFFF',
    marginLeft: width * 0.01,
    fontWeight: '700',
    paddingBottom: 5,
    paddingTop: 10,
    color: '#4C5264',
  },
  data1: { flexDirection: 'row', justifyContent: 'space-between' },

  refresh: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DFE6ED',
    padding: 10,

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

    color: '#4C5264',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 1,
  },

  text: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    color: '#4C5264',
  },
  body: {
    flex: 1,
  },

  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderRadius: 5,
    height: height * 0.09,
    borderBottomWidth: 1,
    borderBottomColor: '#BECDD7',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  title: {
    alignItems: 'flex-start',
    fontSize: 14,
    fontFamily: 'SiemensSans-Bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    fontFamily: 'SiemensSans-Roman',
  },
});
