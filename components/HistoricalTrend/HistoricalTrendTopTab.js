import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoricalTags from './HistoricalTags';
import { height, width } from '../../utils/Constants';
import HistoricalGroups from './HistoricalGroups';
import { connect } from 'react-redux';
import { LoginCommonCss } from '../../css/CommonCss';



const Tab = createMaterialTopTabNavigator();

const screenOptions = {
    tabBarShowIcon: true,
    tabBarShowLabel: true,
    headerShown: false,
    swipeEnabled: true,
    tabBarIndicatorStyle: {
        backgroundColor: 'transparent',
    },

    tabBarLabelStyle: {
        fontSize: 25,
    },
};

function MyTabBar({ state, descriptors, navigation }) {

    return (
        <View style={{ height: height * 0.06, flexDirection: 'row', position: 'relative', }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ fontSize: 14, color: 'rgba(27, 21, 52, 0.8)', fontFamily: isFocused ? 'SiemensSans-Bold' : 'SiemensSans-Roman', flex: 1, position: 'absolute', left: index == 0 ? width * 0.27 : width * 0.4, bottom: isFocused ? 5 : 8, borderBottomWidth: isFocused ? 3 : 0, borderBottomColor: isFocused ? LoginCommonCss.buttonBackground() : null }}
                    >
                        <Text >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const HistoricalTrendTopTab = (props) => {
    const toggleBetweenGroupAndTagsInHistorical = props.toggleBetweenGroupAndTagsInHistorical
    return (
        <Tab.Navigator initialRouteName={toggleBetweenGroupAndTagsInHistorical ? 'Group' : 'Tags'} tabBar={props => <MyTabBar {...props} />} screenOptions={screenOptions}>
            <>
                <Tab.Screen
                    name="Tags"
                    options={{
                        tabBarStyle: { borderEndColor: 'red', },
                        tabBarLabelStyle: {
                            position: 'absolute',
                            left: 35,
                            top: -2,
                            borderBottomWidth: 1,
                            borderBottomColor: '#000',
                            fontFamily: 'SiemensSans-Bold',
                        },
                    }}
                    component={HistoricalTags}
                />
                <Tab.Screen
                    name="Group"
                    options={{
                        tabBarStyle: {},
                        tabBarLabelStyle: {
                            position: 'absolute',
                            right: 8,
                            top: -2,
                            borderBottomWidth: 2,
                            borderBottomColor: '#000',
                            fontFamily: 'SiemensSans-Bold',
                        },

                    }}
                    component={HistoricalGroups}
                />
            </>

        </Tab.Navigator>
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
        toggleBetweenGroupAndTagsInHistorical: state.toggleBetweenGroupAndTagsInHistorical
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTopBarModal: () => {
            dispatch(AllActions.toggleHistoricalTopBar());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalTrendTopTab);