/*
 * @author : Poulami Manna
 * @description : Common CSS Page for different brandNames
*/

/* 
        important
        When brandName is AR Digi then companyName = AR Power and vice - versa
*/


import {brandName} from '../utils/BrandName';
import { height, width } from '../utils/Constants';

let companyName = brandName;
if(companyName == "AR Digi") {
    companyName = "AR Power";
} else {
    companyName = "ArDigi"
}
export const LoginCommonCss = {
    buttonBackground : () => {
        if(companyName === "ArDigi") {
            return '#8A00E5'
        }
        else {
            return '#007993'
        }
    },
    buttonBorderRadius : () => {
        if(companyName === "ArDigi") {
            return 0.1
        }
        else {
            return 0
        } 
    },
    swipeButtonBackground : () => {
        if(companyName === "ArDigi") {
            return '#1B1534'
        }
        else {
            return '#007993'
        }
    },

    buttonBorderRadiusForCreateTask : () => {
        if(companyName === "ArDigi") {
            return 26
        }
        else {
            return 0
        } 
    },

    svgPlusButtonBackground : () => {
        if(companyName === "ArDigi") {
            return "ArDigi"
        }
        else {
            return "ArPower"
        }
    },

    buttonBorderRadiusForEditTask : () => {
        if(companyName === "ArDigi") {
            return 25
        }
        else {
            return 0
        } 
    },


    buttonBorderRadiusForTrends : () => {
        if(companyName === "ArDigi") {
            return 0.2
        }
        else {
            return 0
        } 
    },

    parameterScreenBottomTabs : () => {
        if(companyName === "ArDigi") {
            return '#1B1534'
        }
        else {
            return "#66667E"
        } 
    },

    buttonBorderRadiusForConsent : () => {
        if(companyName === "ArDigi") {
            return 20
        }
        else {
            return 0
        } 
    },

    loginPageBackground : () => {
        if(companyName === "ArDigi") {
            return '#190D35'
        }
        else {
            return '#000028'
        }
    },

    buttonSortByBackground : () => {
        if(companyName === "ArDigi") {
            return true
        }
        else {
            return false
        }
    },

    appLogoWidthBackground : () => {
        if(companyName === "ArDigi") {
            return 0.4
        }
        else {
            return 0.31
        }
    },

    appLogoHeightBackground : () => {
        if(companyName === "ArDigi") {
            return 0.2
        }
        else {
            return 0.15
        }
    },

    appLogoIconUI : () => {
        if(companyName === "ArDigi") {
            return {
                justifyContent: 'space-evenly', alignItems: 'flex-start', width: width * 1, height: height * 0.35, marginTop: 40, marginLeft: 105
            }
        }
        else {
            return {
                justifyContent: 'space-evenly', alignItems: 'center', width: width * 1, height: height * 0.35, marginTop: 40, marginRight: -20
            }
        }
    },

    appLogoTextBackground : () => {
        if(companyName === "ArDigi") {
            return "AR Power"
        }
        else {
            return "AR Digi"
        }
    },

    appLogoTextBackgroundCenterPosition : () => {
        if(companyName === "ArDigi") {
            return 8
        }
        else {
            return 10
        }
    },

    hamburgerBackground : () => {
        if(companyName === "ArDigi") {
            return '#1B1534'
        }
        else {
            return '#000028'
        }
    },

    cameraScreenrBackground : () => {
        if(companyName === "ArDigi") {
            return '#2D373C'
        }
        else {
            return '#000028'
        }
    },

    hamburgerTitleText : () => {
        if(companyName === "ArDigi") {
            return "Siemens Energy"
        }
        else {
            return "Siemens"
        }
    },

    

    
}
