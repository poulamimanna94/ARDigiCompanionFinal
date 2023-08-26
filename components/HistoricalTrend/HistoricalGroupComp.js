import React from 'react'
import { ActivityIndicator, Text, View, } from 'react-native'
import { LoginCommonCss } from '../../css/CommonCss';
import { height } from '../../utils/Constants'
import HistoricalChartComp from './HistoricalChartComp';


const HistoricalGroupComp = ({ groupNameToShowOnView, loader, dateError, showGraph, toggleOrientation, chartDataPoints, legends, tooltipPos, setTooltipPos }) => {

    return (
        <View style={{ flex: 1, height: height * 0.8, }}>
            {
                legends?.length == 0 ? (
                    dateError ? (
                        <DateComponent />
                    )
                        :
                        !dateError && !groupNameToShowOnView ? (
                            <EmptyLegendsComponent toggleOrientation={toggleOrientation} />
                        )
                            :
                            !dateError && groupNameToShowOnView && loader ? (
                                <Loader toggleOrientation={toggleOrientation} />
                            )
                                : null
                )
                    :
                    (
                        <HistoricalChartComp showGraph={showGraph} toggleOrientation={toggleOrientation} chartDataPoints={chartDataPoints} legends={legends} tooltipPos={tooltipPos} setTooltipPos={setTooltipPos} />
                    )
            }
            
        </View>
    )
}

const DateComponent = ({ toggleOrientation }) => {
    return (
        <View style={{ flex: 1, height: height * 0.6, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: toggleOrientation ? '55%' : 0, fontFamily: 'SiemensSans-Bold', fontSize: 16 }}>Please Select Start Date And End Date</Text>
        </View>
    )
}

const EmptyLegendsComponent = ({ toggleOrientation }) => {
    return (
        <View style={{ flex: 1, height: height * 0.6, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: toggleOrientation ? '55%' : 0, fontFamily: 'SiemensSans-Bold', fontSize: 16 }}>Please Select Group to View</Text>
        </View>
    )
}

const Loader = ({ toggleOrientation }) => {
    return (
        <View style={{ flex: 1, height: height * 0.9, justifyContent: "center", alignItems: 'center', }}>
            <ActivityIndicator size={60} color= {LoginCommonCss.buttonBackground()} />
            <Text style={{ fontFamily: 'SiemensSans-Bold', marginTop: 5, color: '#2D373C', marginBottom: toggleOrientation ? '35%' : 0 }}>Loading ...</Text>
        </View >
    )
}





export default HistoricalGroupComp;