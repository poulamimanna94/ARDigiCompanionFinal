/*
 * @author : Poulami Manna
 * @description : Global Document Page for all assets
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ActivityIndicator, Searchbar, List, Snackbar, Button } from 'react-native-paper';
import { Utils } from '../components/Common/Utils';
import { useDispatch, useSelector } from 'react-redux';
import FileViewer from "react-native-file-viewer";
import { height, width } from '../utils/Constants'
import DocumentComp from './Document/DocumentComp';
import { LoginCommonCss } from '../css/CommonCss';

const DocumentRepository = () => {

    const [filterData, setFilterData] = useState([]);
    const [data, setData] = useState([]);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken)
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = React.useState(false);
    const [filterCategory, setFilterCategory] = useState([]);
    const [documentCategory, setDocumentCategory] = useState();
    const [expandForDocumentCategory, setExpandForDocumentCategory] = useState(false);
    const [fileLoaded, setFileLoaded] = React.useState({
        message: '',
        success: false,
        error: false,
        visible: false,
    })
    const dispatch = useDispatch();
    const tenantId = useSelector(state => state.tenantId);
    useEffect(() => {
        Utils.getDocumentRepositoryData(ipPortData, accessToken, dispatch,tenantId)
            .finally(() => setLoading(false))
            .then(response => {

                if (response.length > 0) {
                    setData(response);
                    setFilterData(response);
                    filterCategoryList(response);
                    setError(false);
                }
                else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            })

    }, [])

    const onChangeSearch = (query) => {
        filterKksOrDescription(query, data)
    }
    const filterKksOrDescription = (query, dataList) => {
        let filterKksOrDescriptionData = [];
        dataList.map((val) => {
            if ((val.assetName && (val.assetName.toLowerCase()).includes(query)) || (val.description && (val.description.toLowerCase()).includes(query)) || (val.title && (val.title.toLowerCase()).includes(query)) || (val.docName && (val.docName.toLowerCase()).includes(query.toLowerCase()))) {
                filterKksOrDescriptionData.push(val)
            }

        })
        setFilterData(filterKksOrDescriptionData);
    }
    React.useEffect(() => {
        setTimeout(() => {
            if (fileLoaded.visible) {
                setFileLoaded({
                    message: '',
                    error: false,
                    success: false,
                    visible: false,
                })
            }
        }, 1000)

    }, [fileLoaded])
    const filterCategoryList = (filterListData) => {
        let filterCategoryData = new Set();
        filterListData.forEach((filterCategoryListData) => {
            filterCategoryListData.docCategory && filterCategoryData.add(filterCategoryListData.description)
        })

        setFilterCategory([...filterCategoryData])
    }
    const onFilterChange = (value) => {
        let tempFilterData = [...data]
      
        const filteredData = value ?  tempFilterData?.filter(item => item.description === value) : tempFilterData
  
        setFilterData(filteredData)
    }

    const readDocument = (docName) => {
        setLoader(true);
        Utils.getDocument(ipPortData, accessToken, docName,dispatch, tenantId)
            .finally(() => {
                setLoader(false);
            })
            .then((response) => {
                OpenFile(response);
            })
            .catch(() => {
                setError(true);
            })
    }
    function OpenFile(absoluteFilePath) {
        FileViewer.open(`${absoluteFilePath}`)
            .then(() => {
                setLoader(false);
                setFileLoaded({
                    ...fileLoaded,
                    message: 'file loaded Successfully',
                    visible: true,
                    success: true,
                })
               
            })
            .catch((err) => {
                setLoader(false);
                console.log('failure', err.message);
                if (err.message === 'No app associated with this mime type') {
                    setFileLoaded({
                        ...fileLoaded,
                        message: 'Please download appropriate file viewer !',
                        visible: true,
                        error: true,
                    })
                }
                else {
                    setFileLoaded({
                        ...fileLoaded,
                        message: 'Something went wrong. Try again !',
                        visible: true,
                        error: true,
                    })
                }

            });
    }
    return (

        <View style={{ flex: 1, width: '100%', padding: 10, backgroundColor: "#ffffff" }}>
            <Searchbar
                style={{ height: height * 0.052, fontSize: 8, backgroundColor: "#FFFFFF", justifyContent: "center", borderWidth: 1, borderColor: '#1A1A1B', }}
                placeholder="Search by KKS or description"
                placeholderTextColor="rgba(0,0,0,0.4)"
                onChangeText={onChangeSearch} />

            <View style={{ minHeight: '7%', width: '100%', flexDirection: 'row'}}>
                <View>
                <Text style={{ color: '#4C5264', fontFamily: 'SiemensSans-Roman', fontSize: 12, }}>  
                <List.Accordion title="Document Category" description={documentCategory} expanded={expandForDocumentCategory} onPress={() => {
                    setExpandForDocumentCategory(!expandForDocumentCategory)

                }
                }
                    style={{ backgroundColor: 'white', width: '100%' }}
                    titleStyle={{ fontSize: 12, color: '#4C5264', fontFamily: 'SiemensSans-Bold' }}
                >
                    {
                        filterCategory?.map((datas, i) => (
                            <ScrollView scrollEnabled={true}  nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                <List.Item key={i} title={datas}
                                    titleStyle={{ color: '#4C5264', fontSize: 14, fontFamily: 'SiemensSans-Roman' }}
                                    style={{ color: '#4C5264', fontFamily: 'SiemensSans-Roman' }}
                                    onPress={() => {
                                        setDocumentCategory(datas)
                                        setExpandForDocumentCategory(false)
                                        onFilterChange(datas)

                                    }} />
                            </ScrollView>
                        )
                        )}
                </List.Accordion>
                </Text>
                </View>
                <View>
                   { documentCategory && 
                        <Button color ='#EBF0F5' mode="contained" labelStyle={{ fontFamily: 'SiemensSans-Bold', fontSize: 14, marginTop: 5 }} style={{ fontFamily: 'SiemensSans-Roman', fontSize: 10, marginTop: 20, marginRight: 80, borderWidth: 1, borderColor: "black", width: 80, borderRadius: 25, height: 30}} onPress={() => {
                            setDocumentCategory(null)
                            onFilterChange(null)
                        }}
                         uppercase={false}>Clear</Button>
                    }
                    </View>

            </View>

            <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>
                {
                    loading ? (
                        <Loader />
                    ) : error && !loading ? (
                        < ListEmptyComponent />

                    ) : filterData?.map((document, index) => {
                        return (
                            <DocumentComp index={index} readDocument={readDocument} docName={document.docName} description={document.description} size={document.size} />
                        )
                    })}

            </ScrollView>

            {
                loader && <DocumentDownloadLoader />
            }
            <Snackbar
                visible={fileLoaded.visible}
                duration={1500}
            >
                {
                    fileLoaded.success && <Text>{fileLoaded.message}</Text>
                }
                {
                    fileLoaded.error && <Text>{fileLoaded.message}</Text>
                }

            </Snackbar>
        </View>


    )
}


const Loader = () => {
    return (
        <View style={{ width: width, height: height * 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={LoginCommonCss.buttonBackground()} size='large' />
        </View>
    )
}
const DocumentDownloadLoader = () => {
    return (
        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: width, height: height * 0.8, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={LoginCommonCss.buttonBackground()} size='large' />
            <Text style={{ marginTop: 10, fontFamily: 'SiemensSans-Bold', fontSize: 14, }}>Loading ...</Text>
        </View>
    )
}

const ListEmptyComponent = () => {
    return (
        <View style={{ width: width, height: height * 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontFamily: 'SiemensSans-Bold', color: '#2D373C', }}>No Document found</Text>
        </View>
    )
}

export default DocumentRepository;

const styles = StyleSheet.create({})