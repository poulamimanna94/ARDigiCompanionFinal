import React from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { height } from '../../utils/Constants';
import GraphErrorMessage from '../Trends/GraphErrorMessage';
import GraphToolTip from '../Trends/GraphToolTip';
import TagsAsLabel from '../Trends/TagsAsLabel';

const HistoricalChartComp = ({ showGraph, toggleOrientation, chartDataPoints, legends, tooltipPos, setTooltipPos }) => {
   
    const getHeight = (orientation) => {
        if (orientation)
            return height * 0.35
        else
            return height * 0.65
    }

    return (
        <View>
            <TagsAsLabel legends={legends} />
            <View>
                {
                    showGraph && chartDataPoints ? (
                        <LineChart
                            data={chartDataPoints}
                            width={Dimensions.get("window").width * 0.95} // from react-native
                            height={getHeight(toggleOrientation)}
                            withHorizontalLines={true}
                            withVerticalLines={false}
                            withVerticalLabels={false}
                            segments={10}
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
                                decimalPlaces: 0,
                                color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForBackgroundLines: {
                                    strokeWidth: "1",
                                    stroke: "#5D596E"
                                },
                                propsForDots: {
                                    r: "5",
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
                            < GraphErrorMessage />
                        )
                }
            </View>

        </View>
    )
}

export default HistoricalChartComp;