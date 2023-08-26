import React from 'react';
import {
    View,
} from 'react-native';
import Svg, { Rect, Text as TextSVG } from 'react-native-svg';


const GraphToolTip = ({ tooltipPos }) => {

    return (
        <View>
            <Svg>
                <Rect x={tooltipPos.x - 15} y={tooltipPos.y + 10} width="105"
                    height="70" fill="black" />
                <TextSVG
                    x={tooltipPos.x + 35}
                    y={tooltipPos.y + 25}
                    fill="white"
                    fontFamily='SiemensSans-Bold'
                    fontSize="10"
                    textAnchor="middle">
                    {"NV: " + tooltipPos.normalizedValue}
                </TextSVG>
                <TextSVG
                    x={tooltipPos.x + 35}
                    y={tooltipPos.y + 40}
                    fill="white"
                    fontFamily='SiemensSans-Bold'
                    fontSize="10"
                    textAnchor="middle">
                    {"AV : " + tooltipPos.actualValue}
                </TextSVG>
                <TextSVG
                    x={tooltipPos.x + 35}
                    y={tooltipPos.y + 55}
                    fill="white"
                    fontFamily='SiemensSans-Bold'
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle">
                    {"TN : " + tooltipPos.tagName}
                </TextSVG>
                <TextSVG
                    x={tooltipPos.x + 37}
                    y={tooltipPos.y + 70}
                    fill="white"
                    fontFamily='SiemensSans-Bold'
                    fontSize="10"
                    textAnchor="middle">
                    {"TS : " + tooltipPos.timeStamp}
                </TextSVG>
            </Svg>
        </View>
    )
}

export default GraphToolTip;