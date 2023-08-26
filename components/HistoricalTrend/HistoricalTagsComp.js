import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { height } from '../../utils/Constants'
import HistoricalChartComp from './HistoricalChartComp';

const HistoricalTagsComp = ({ error, loader, isAssetSelectedToView, showGraph, dateError, toggleOrientation, chartDataPoints, legends, tooltipPos, setTooltipPos }) => {


  if (chartDataPoints) {
    loader = false;
  }
  return (
    <View style={{ flex: 1, height: height * 0.8, }}>

      {
        error ? (
          <View>
            <Text style={{ fontSize: 16, fontFamily: 'SiemensSans-Bold', color: '#2D373C' }}>
              Something went wrong !
            </Text>
          </View>
        )
          : dateError ? (
            <DateComponent />
          )
            : !dateError && !isAssetSelectedToView ? (
              <EmptyLegendsComponent toggleOrientation={toggleOrientation} />
            )
              : !dateError && !isAssetSelectedToView && loader ?
                (
                  <View>
                    <View style={{ flex: 1, height: height * 0.9, justifyContent: "center", alignItems: 'center', }}>
                      <ActivityIndicator size={60} color={'#641E8C'} />
                      <Text style={{ fontFamily: 'SiemensSans-Bold', marginTop: 5, color: '#2D373C', marginBottom: toggleOrientation ? '35%' : 0 }}>Loading ...</Text>
                    </View >
                  </View>
                )
                : legends?.length > 0 && !loader ? (
                  <HistoricalChartComp showGraph={showGraph} toggleOrientation={toggleOrientation} chartDataPoints={chartDataPoints} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} />
                )
                  :
                  null


      }
    </View>
  )
}

const DateComponent = ({ toggleOrientation }) => {
  return (
    <View style={{ flex: 1, height: height * 0.6, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: toggleOrientation ? '45%' : 0, fontFamily: 'SiemensSans-Bold', fontSize: 16 }}>Please Select Start Date And End Date</Text>
    </View>
  )
}

const EmptyLegendsComponent = ({ toggleOrientation }) => {
  return (
    <View style={{ flex: 1, height: height * 0.6, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: toggleOrientation ? '45%' : 0, fontFamily: 'SiemensSans-Bold', fontSize: 16 }}>Please Select Asset(s) to View</Text>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleTopBarModal: () => {
      dispatch(AllActions.toggleHistoricalTopBar());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalTagsComp)