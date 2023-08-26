/*
 * @author : Poulami Manna
 * @description : Audit Trail for Task Management
*/

import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { List } from 'react-native-paper';
import { Utils } from '../Common/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { height } from '../../utils/Constants';
import { LocaleDate } from '../Common/LocaleDate';

const Actions = ({ route }) => {
    const [taskActions, setTaskActions] = useState([]);
    const ipPortData = useSelector(state => state.ipPortData);
    const accessToken = useSelector(state => state.accessToken);
    const dispatch = useDispatch()
    const tenantId = useSelector(state => state.tenantId);

    React.useEffect(() => {
        Utils.getTaskAudits(ipPortData, accessToken, route?.params?.taskIdForAction,dispatch,tenantId)
            .then(res => {
                if (res) {
                    setTaskActions(res);
                }
                else {
                    setTaskActions([]);
                }

            })
    })

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ minHeight: height * 0.8, backgroundColor: '#fff', }}>
                    {
                        taskActions?.length === 0 && <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#000000", fontFamily: 'SiemensSans-Bold', fontSize: 16, }}>No Actions Found !</Text>
                        </View>
                    }

                    {taskActions?.map((data, i) => {
                        let color = i % 2 == 0 ? "white" : "#EAEAEA"
                        return (
                            <View key={data.id} style={{ backgroundColor: color, padding: 12, }}>
                                <Text style={{ paddingHorizontal: 15, color: "#000000", fontFamily: 'SiemensSans-Bold', fontSize: 16, }}>{data.actionDescription}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text>
                                        <List.Item
                                            title="Modified On"
                                            titleStyle={{ color: "#00000060", fontFamily: 'SiemensSans-Roman', fontSize: 14, }}
                                            description={LocaleDate(data.lastModifiedDate)}
                                            descriptionStyle={{ marginTop: 5, color: "#000000", fontFamily: 'SiemensSans-Roman', fontSize: 14, }}
                                        />
                                    </Text>
                                    <Text>
                                        <List.Item
                                            title="Modified By"
                                            titleStyle={{ color: "#00000060", fontFamily: 'SiemensSans-Roman', fontSize: 14 }}
                                            description={data.lastModifiedBy ? data.lastModifiedBy : 'admin' }
                                            descriptionStyle={{ marginTop: 5, color: "#000000", fontFamily: 'SiemensSans-Roman', fontSize: 14, }}
                                        />
                                    </Text>
                                </View>

                            </View>
                        )

                    })}

                </View>
            </ScrollView>
        </>
    )

}

export default Actions;