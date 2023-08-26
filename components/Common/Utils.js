/*
 * @author : Poulami Manna
 * @description : All API call for the application except Video Call APIs
*/

import axios from 'axios';
import { getSelectAssetData, getTaskListData } from '../../components/Common/MockData';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteFile } from '../../utils/ReadWriteFunc';
import AllActions from '../../redux/AllActions';

const ISLOCAL = {
    assetDateUtils: true,
    listDataUtils: false,
    documentRepositoryData: false,
    unitHierachyData: false,
    documentationData: false,
    companyLogoNameData: false,
    tagsListData: false,
    assetHierachyData: false,
    createTaskData: false,
    categoryTaskDate: false,
    assignedUserData: false,
    unitData: false,
    headerData: false,
    subHeaderData: false,
    assetData: false,
    operatorCount: false,
    totalNumberOfTask: false,
    getLiveTrend: false,
    tagsListInAsset: false,
    allAssetDetails: false,
    allImages: false,
    deleteAllImages: false,
    downloadImages: false,
    GroupTagsListInAsset: false,
    putUploadImages: false,
    getTaskIdData: false,
    getTaskComments: false,
    editTaskData: false,
    postTaskComments: false,
    getTaskAudits: false,
    deleteTaskId: false,
    consent: false,
    updateStatusTaskId: false,
    postTaskNotificationData: false,
    totalNumberOfVideoCallDetails: false
};
export const Utils = {
    logoutOnSessionTimeOut: async (error, dispatch) => {
        if (error?.response?.status === 401) {
            await AsyncStorage.removeItem('@Key')
            await AsyncStorage.removeItem('@username');
            await AsyncStorage.removeItem('@hostname');
            await AsyncStorage.removeItem('@port');
            await AsyncStorage.removeItem('@protocol');
            dispatch(AllActions.userLoggedOut(''));
            deleteFile(JSON.stringify({}))
                .then(() => {
                    console.log('file deleted successfully....')
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    getSelectAssetDataUtils: () => {
        if (ISLOCAL.assetDateUtils) {
            return getSelectAssetData
        }
        else {
            //api call
        }
    },
    getTaskListDataUtils: (ipPortData, accessToken) => {
        if (ISLOCAL.listDataUtils) {
            return getTaskListData
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/tasks/all`,
                    { headers },
                )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error);
                    return []
                });

        }
    },

    getDocumentationData: (ipPortData, accessToken, assetId, dispatch, tenantId) => {
        if (ISLOCAL.documentationData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };
            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/asset/${assetId}/documents`,
                    { headers },
                )
                .then(response => {
                    return response.data?.result || [];
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return [];

                });

        }

    },

    getDocumentRepositoryData: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.documentRepositoryData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };
            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/asset/documents`,
                    { headers },
                )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error);

                });

        }
    },

    getUnitHierachyData: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.unitHierachyData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/units-details`,
                    { headers },
                )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error);
                });

        }
    },

    getCompanyLogoNameData: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.companyLogoNameData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/customer`,
                    { headers },
                )
                .then(response => {
                    return response.data;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getTagsListData: (ipPortData, accessToken, assetId, asset, dispatch, tenantId) => {
        if (ISLOCAL.tagsListData) {
            Promise.resolve([]);
        }
        else {
            //api call

            const assetUrl = true ? "live-asset-tags" : "live-kks-tags";
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/${assetId}/${assetUrl}`,
                    { headers },
                )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    console.log("error", error)
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });
        }
    },

    getTagsInAsset: (ipPortData, accessToken, assetId, asset, dispatch) => {


        if (ISLOCAL.tagsListInAsset) {
            Promise.resolve([]);
        }
        else {
            //api call

            const assetUrl = true ? "live-asset-tags" : "live-kks-tags";
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${assetId}/${assetUrl}`,
                    { headers },
                )
                .then(response => {


                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error);
                    return []
                });

        }
    },

    getAssetHierachyData: (ipPortData, accessToken, kksCode, dispatch, tenantId) => {
        if (ISLOCAL.assetHierachyData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };


            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/${kksCode}/hierachy`,
                    { headers },
                )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    postCreateTaskData: (ipPortData, accessToken, input, dispatch, tenantId) => {

        if (ISLOCAL.createTaskData) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };

            return axios({
                method: 'post',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks`,
                headers: headers,
                data: input

            })
                .then(response => {
                    console.log(response.data.result, "response.data.result task creation")
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });
        }
    },
    getDocument: (ipPortData, accessToken, docName, dispatch, tenantId) => {
        if (ISLOCAL.createTaskData) {
            Promise.resolve([]);
        }
        else {

            let extension = docName.split(".");
            const api = encodeURI(`${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/asset/downloadDoc/${docName}`)
            // console.log(docName.split('.'), "EXTENSION")
            return RNFetchBlob
                .config({
                    fileCache: true,
                    path: RNFS.ExternalDirectoryPath + `/${docName.substring(extension[1])}`
                })
                .fetch('GET', api, {
                    Authorization: `${accessToken}`,
                })
                .then((res) => {
                    return res.path();
                })
                .catch((err) => {
                    Utils.logoutOnSessionTimeOut(err, dispatch);
                    return [];
                })



        }
    },

    getCategoryTaskData: (ipPortData, accessToken, categoryType, dispatch, tenantId) => {
        if (ISLOCAL.categoryTaskDate) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/category/${categoryType}`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getAssignedUserData: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.assignedUserData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/i/users/get-all-user`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getUnitData: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.unitData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/units`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getHeaderData: (ipPortData, accessToken, unitId, dispatch, tenantId) => {
        if (ISLOCAL.headerData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/unit/${unitId}/headers`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getSubHeaderData: (ipPortData, accessToken, headerId, dispatch, tenantId) => {
        if (ISLOCAL.subHeaderData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/header/${headerId}/subHeaders`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error);
                    return []
                });

        }
    },

    getTotalCountOfOperator: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.operatorCount) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/user-auth/operator-stats`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });
        }
    },

    getTotalNumberOfTasks: (ipPortData, accessToken, dispatch, tenantId, userDetail) => {
        console.log(userDetail, "userDetail")
        if (ISLOCAL.totalNumberOfTask) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/?login=${userDetail.login}`,
                    { headers },
                )
                .then(response => {


                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });
        }
    },

    getTotalNumberOfVideoCallDetails: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.totalNumberOfVideoCallDetails) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/videoCallDetails`,
                    { headers },
                )
                .then(response => {


                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });
        }
    },


    getGroupTagsCoordinatePoints: (ipPortData, accessToken, assetId, groupType, dispatch, tenantId) => {
        if (ISLOCAL.GroupTagsListInAsset) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/getTrendGroups?assetId=${assetId}&groupType=${groupType}`,
                    { headers },
                )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });
        }
    },
    getLiveTrend: (ipPortData, accessToken, bodyData, dispatch, tenantId) => {
        if (ISLOCAL.getLiveTrend) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };
            //api call
            return axios({
                method: 'post',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/trendsTags?noOfTags=10`,
                headers: headers,
                data: bodyData

            })
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });

        }
    },
    getHistoricalTrend: (ipPortData, accessToken, bodyData, url, dispatch, tenantId) => {
        if (ISLOCAL.getLiveTrend) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            }
            return axios({
                method: 'post',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}${url}`,
                headers: headers,
                data: bodyData

            })
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });

        }


    },
    getHistoricalGroup: (ipPortData, accessToken, groupType, dispatch, tenantId) => {
        if (ISLOCAL.GroupTagsListInAsset) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };
            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/getTrendGroups?groupType=${groupType}`,
                    { headers },
                )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });
        }
    },
    getAssetData: (ipPortData, accessToken, subHeaderId, dispatch, tenantId) => {
        if (ISLOCAL.assetData) {
            Promise.resolve([]);
        }

        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };


            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/subHeader/${subHeaderId}/assets`,

                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    console.log(error, dispatch);
                    return []
                });

        }
    },
    getSubHeaderDataForTask: (ipPortData, accessToken, headerId, dispatch, tenantId) => {
        if (ISLOCAL.subHeaderData) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/header/${headerId}/subHeaders`,
                    { headers },
                )
                .then(response => {
                    console.log('response ->', response);
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error);
                    return []
                });
        }
    },

    getAssetDataForTask: (ipPortData, accessToken, subHeaderId, dispatch, tenantId) => {
        if (ISLOCAL.assetData) {
            Promise.resolve([]);
        }

        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };
            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/subHeader/${subHeaderId}/assets-reverse-heirarchy`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error);
                    return []
                });

        }
    },


    getTagsData: (ipPortData, accessToken, assetId, dispatch, tenantId) => {
        if (ISLOCAL.tagsListInAsset) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/asset/${assetId}/tags`,
                    { headers },
                )
                .then(response => {


                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log("error", error)
                    return []
                });
        }

    },

    getAllAssetDetails: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.allAssetDetails) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/subHeader/assets-detail`,
                    { headers },
                )
                .then(response => {

                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getUploadedImages: (ipPortData, accessToken, id = null, dispatch, tenantId) => {
        if (ISLOCAL.allImages) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${id}/attachments`,
                    { headers },
                )
                .then(response => {
                    console.log(response.data.result, "response.data.result for get image")
                    return id ? response.data.result : [];
                })
                .catch((error) => {
                    console.log(error, "get image error")
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    deleteUploadedImages: (ipPortData, accessToken, taskId, id, userDetail, dispatch, tenantId) => {
        if (ISLOCAL.deleteAllImages) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken
            };

            return axios({
                method: 'DELETE',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${taskId}/attachments/${id}?modifiedBy=${userDetail.login}`,
                headers: headers,

            })


                .then(response => {
                    return response.data;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getDownloadImages: (ipPortData, accessToken, id, dispatch, tenantId) => {
        if (ISLOCAL.downloadImages) {
            Promise.resolve([]);
        }
        else {
            return RNFetchBlob
                .config({
                    fileCache: true,

                    path: RNFS.ExternalDirectoryPath + `/test.jpeg`
                })
                .fetch('GET', `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/downloadAttachment/tasks/attachments/${id}`, {
                    Authorization: `${accessToken}`,
                })
                .then((res) => {

                    return res.path();
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return [];
                })

        }
    },


    putUploadImages: async (ipPortData, accessToken, imageData, taskId, userDetail, dispatch, tenantId) => {
        const formData = new FormData()


        formData.append("files",
            {
                uri: imageData.assets[0].uri,
                type: 'image/jpeg',
                name: `photos${1}.jpg`,
            },
        );

        const headers = {
            Authorization: accessToken,
            "Content-Type": 'multipart/form-data',
        };
        return axios({
            method: 'POST',
            url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${taskId}/upload?modifiedBy=${userDetail.login}`,
            data: formData,
            headers

        })
            .then(response => {
                console.log(response, "response -----")
                return response.data;
            })
            .catch((error) => {
                Utils.logoutOnSessionTimeOut(error, dispatch);
                return []
            });
    },

    getTaskIdData: (ipPortData, accessToken, id, dispatch, tenantId) => {
        if (ISLOCAL.getTaskIdData) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${id}`,
                    { headers },
                )
                .then(response => {
                    return { ...response?.data?.result, ...response?.data?.resultDetails };
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getTaskComments: (ipPortData, accessToken, id, dispatch, tenantId) => {

        if (ISLOCAL.getTaskComments) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${parseInt(id)}/comments`,
                    { headers },
                )
                .then(response => {
                    return response.data.result || [];
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },

    getEditTaskData: (ipPortData, accessToken, id, input, dispatch, tenantId) => {
        console.log(id, input, "id and input for edit coming")
        if (ISLOCAL.editTaskData) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };
            return axios({
                method: 'PUT',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${id}`,
                headers: headers,
                data: input

            })
                .then(response => {

                    return response;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error, "edit error")
                    return []
                });
        }
    },

    updateStatusTaskId: (ipPortData, accessToken, id, input, dispatch, tenantId) => {
        if (ISLOCAL.updateStatusTaskId) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };
            return axios({
                method: 'PUT',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/task/${id}`,
                headers: headers,
                data: input

            })
                .then(response => {
                    console.log(response, "status update api response")
                    return response;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error, "edit error")
                    return []
                });
        }
    },

    postTaskComments: (ipPortData, accessToken, id, input, userDetail, dispatch, tenantId) => {
        if (ISLOCAL.postTaskComments) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };

            return axios({
                method: 'POST',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${id}/taskComments`,
                headers: headers,
                data:
                {
                    "comments": input,
                    "createdBy": userDetail.login,
                    "lastModifiedBy": userDetail.login
                }


            })
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error)
                    return []
                });
        }
    },

    getTaskAudits: (ipPortData, accessToken, id, dispatch, tenantId) => {

        if (ISLOCAL.getTaskAudits) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken,
            };

            return axios
                .get(
                    `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${id}/audits`,
                    { headers },
                )
                .then(response => {
                    return response.data.result || [];
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    return []
                });

        }
    },
    getAllConsents: (ipPortData, accessToken, dispatch, tenantId) => {
        if (ISLOCAL.consent) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };

            return axios.get(
                `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/consent/all`,
                { headers },
            )
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error)
                    return []
                });
        }
    },
    sendConsent: (ipPortData, accessToken, bodyData, dispatch, tenantId) => {
        if (ISLOCAL.consent) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };
            console.log(`${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/consent`);
            return axios({
                method: 'POST',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/consent`,
                headers: headers,
                data: bodyData,
            })
                .then(response => {
                    return response.data.result;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error)
                    return []
                });
        }
    },
    deleteTaskId: (ipPortData, accessToken, id, dispatch, tenantId) => {
        console.log(id, "task id coming for delete")
        if (ISLOCAL.deleteTaskId) {
            Promise.resolve([]);
        }
        else {
            //api call
            const headers = {
                Authorization: accessToken
            };

            return axios({
                    method: 'DELETE',
                    url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/tasks/${id}`,
                    headers: headers,

                })
                .then(response => {

                    return response;
                })
                .catch((error) => {
                    Utils.logoutOnSessionTimeOut(error, dispatch);
                    console.log(error, "error coming");
                    return []
                });

        }
    },
//Post API call for video call notification to users

  postNotifyToJoin: (ipPortData, accessToken, input, dispatch, tenantId) => {
    if (ISLOCAL.createTaskData) {
      Promise.resolve([]);
    } else {
      const headers = {
        Authorization: accessToken,
      };

      return axios({
        method: 'post',
        url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/sendVideoCallNotifications`,
        headers: headers,
        data: input,
      })
        .then(response => {
            console.log(response.data, "push notification response")
          return response.data.result;
        })
        .catch(error => {
          return [];
        });
    }
  },

  sendDeviceTokenOnLogin: (
    ipPortData,
    accessToken,
    id,
    deviceToken,
    dispatch,
    tenantId,
    deviceType
  ) => {
    if (ISLOCAL.createTaskData) {
      Promise.resolve([]);
    } else {
      const headers = { Authorization: accessToken };
      return axios({
        method: 'post',
        url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/i/${id}/addtoken/${deviceToken}/${deviceType}`,
        headers: headers,
      })
        .then(response => {
          console.log(response, "token saved");
          return response.data.result;
        })
        .catch(error => {
          console.log(error, "token error");
          return [];
        });
    }
  },

  deleteDeviceTokenOnLogin: (
    ipPortData,
    accessToken,
    deviceToken,
    dispatch,
    tenantId,
  ) => {
    if (ISLOCAL.createTaskData) {
      Promise.resolve([]);
    } else {
      const headers = { Authorization: accessToken };
     
      return axios({
        method: 'delete',
        url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/i/devicetoken/${deviceToken}`,
        headers: headers,
      })
        .then(response => {
          console.log(response, "token saved");
          return response.data.result;
        })
        .catch(error => {
          console.log(error, "token error");
          return [];
        });
    }
  },

  getUserListWithDevice: (ipPortData, accessToken, dispatch, tenantId, userId) => {
    if (ISLOCAL.consent) {
        Promise.resolve([]);
    }
    else {
        const headers = {
            Authorization: accessToken,
        };

        return axios.get(
            `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/i/getalluserwithdevice?ids=${userId}`,
            { headers },
        )
            .then(response => {
                return response.data.result;
            })
            .catch((error) => {
                return []
            });
    }
},

postTaskNotification: (ipPortData, accessToken, input, dispatch, tenantId) => {
console.log(input, "task notification input")
    if (ISLOCAL.postTaskNotificationData) {
        Promise.resolve([]);
    }
    else {
        const headers = {
            Authorization: accessToken,
        };

        return axios({
            method: 'post',
            url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/sendtaskNotifications`,
            headers: headers,
            data: input

        })
            .then(response => {
                console.log(response, "task notification api response")
                return response.data;
            })
            .catch((error) => {
                console.log(error, "task notification api error")
                Utils.logoutOnSessionTimeOut(error, dispatch);
                return []
            });
    }
},

postSaveCalls: (ipPortData, accessToken, input, tenantId) => {
        if (ISLOCAL.postTaskNotificationData) {
            Promise.resolve([]);
        }
        else {
            const headers = {
                Authorization: accessToken,
            };
    
            return axios({
                method: 'post',
                url: `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/savecalls`,
                headers: headers,
                data: input
    
            })
                .then(response => {
                    console.log(response.data, "save calls data")
                    return response.data;
                })
                .catch((error) => {
                    console.log(error, "Save Call data ERROR")
                    return []
                });
        }
    },


}
