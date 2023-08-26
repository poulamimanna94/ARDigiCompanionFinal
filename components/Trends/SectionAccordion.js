import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import SVGRightArrow from '../../assets/arrow-right-small.svg'
import { width, height } from '../../utils/Constants';

const SectionAccordion = (props) => {

    return (
        <List.Accordion
            style={{ backgroundColor: '#fff', height: height * 0.04, }}
            left={() => <Left name={props.name} />}
            right={() => <Right />}
            expanded={props.expanded}
            onPress={() => props.handlePress(props.name, props.expanded)}>
            {
                props.name === 'unit' && <>{
                    props?.unitData.map((item, unitIndex) => (
                        <List.Item key={unitIndex + 'u'} left={() =>
                            <TouchableOpacity onPress={() => props.getChildData(props?.name, item.id)} style={{ width: '100%', height: '100%', marginLeft: width * 0.05, }}>
                                <Text style={{ fontSize: 14, fontFamily: 'SiemensSans-Roman', color: '#2D373C', }} > {item.unitName}</Text>
                            </TouchableOpacity>
                        }
                        />
                    ))
                }

                </>
            }
            {
                props.name == 'header' && <>{
                    props?.headerData.map((item, headerIndex) => (
                        <List.Item key={headerIndex + 'h'} left={() =>
                            <TouchableOpacity onPress={() => props.getChildData(props?.name, item.id)} style={{ width: '100%', height: '100%', marginLeft: width * 0.05, }}>
                                <Text style={{ fontSize: 14, fontFamily: 'SiemensSans-Roman', color: '#2D373C', }} > {item.headerName}</Text>
                            </TouchableOpacity>
                        }
                        />
                    ))
                }

                </>
            }
            {
                props.name === 'subheader' && <>{
                    props?.subHeaderData.map((item, subHeaderIndex) => (
                        <List.Item key={subHeaderIndex + 's'} left={() =>
                            <TouchableOpacity onPress={() => props.getChildData(props?.name, item.id)} style={{ width: '100%', height: '100%', marginLeft: width * 0.05, }}>
                                <Text style={{ textTransform: 'capitalize', fontSize: 14, fontFamily: 'SiemensSans-Roman', color: '#2D373C', }} > {item.subHeaderName}</Text>
                            </TouchableOpacity>
                        }
                        />
                    ))
                }
                </>
            }
            {
                props.name === 'asset' && <>{
                    props?.assetData.map((item, assetIndex) => (
                        <List.Item key={assetIndex + 'a'} left={() =>
                            <TouchableOpacity onPress={() => props.getChildData(props?.name, item.id)} style={{ width: '100%', height: '100%', marginLeft: width * 0.05, }}>
                                <Text style={{ fontSize: 14, fontFamily: 'SiemensSans-Roman', color: '#2D373C', }} > {item.kksTag}</Text>
                            </TouchableOpacity>
                        }
                        />
                    ))
                }
                </>
            }
        </List.Accordion>
    )
}

const Left = ({ name }) => {
    return (
        <View style={{ height: '100%', }}>
            <Text style={{ textTransform: 'capitalize', fontSize: 14, fontFamily: 'SiemensSans-Bold', color: '#2D373C', }} > {name}</Text>
        </View>
    )
}

const Right = () => {
    return (
        <View style={{ marginBottom: height * 0.02, }}>
            {/* <Image
                height={5}
                style={{ marginRight: 15, transform: [{ rotate: "-90deg" }] }}
                source={require('../../assets/arrow-right-small.png')}
            /> */}
            <SVGRightArrow
                height={20}
                style={{ marginRight: 15, transform: [{ rotate: "-90deg" }] }}
            />
        </View>
    )
}

const ChildLeft = (props) => {
    return (
        <TouchableOpacity onPress={props.getChildData.getChildData(props.item.unitName, props.item.id)} style={{ width: '100%', height: '100%', marginLeft: width * 0.05, }}>
            <Text style={{ fontSize: 14, fontFamily: 'SiemensSans-Roman', color: '#2D373C', }} > {props?.item?.unitName}</Text>
        </TouchableOpacity>
    )
}

export default SectionAccordion;