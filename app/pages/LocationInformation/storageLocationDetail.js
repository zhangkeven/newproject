import React, { Component } from 'react'
import ListStore from '../../mobx/listStore'
import listStyle from '../listStyle/listStyle';
import {
    AppRegistry,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Platform,
    ScrollView, NetInfo
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components';
import {line, publicStyle, height,width,NoDoublePress,zoomW,zoomH,getHeaderPadding, getHeaderHeight,} from "../../utils/util";
import {observer} from "mobx-react/native";
import Communications from 'react-native-communications';
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../../service/rpc";
import {NavigationActions} from "react-navigation";
import Toast from "react-native-simple-toast";
@observer
class storageLocationDetail extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '库位详情',
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 25/zoomW*2, height:25}} source={require('../../img/icon_arrow_left_passion_blue_idle_25x25@xhdi.png')} resizeMode="contain"/>
            </TouchableOpacity>
        </View>),
        headerRight:(<View/>)
    });
    // logic = new ListStore();
    constructor () {
        super()
        this.state = {
            text: '',
            showInput: false,
        }
    }
    componentWillMount() {
        //路由组件
        this.props.navigation.setParams({
            //返回上一个路由
            operaGoBack: () => {
                const { goBack } = this.props.navigation;
                goBack();
            }
        });

        // 获取网络状态
        NetInfo.fetch().done((connectionInfo) => {
            if (connectionInfo.toLowerCase() === 'none') {
                Toast.show('网络异常,请检查手机网络', Toast.SHORT);
            } else {
                //获取库位详情
                ListStore.getStoreDetail();
            }
        });
    }
    //在库样品
    _keyExtractor = (item, index) => index;
    sampleInItem({ item, index }) {
        return (
            <TouchableOpacity style={listStyle.item}  key={index}>
                <View style={listStyle.itemDesc}>
                    <Text style={listStyle.listTitle}>{item.code}</Text>
                </View>
                <View style={{

                }}>
                    <Text style={{
                        fontFamily: 'PingFangSC-Regular',
                        fontSize: 14,
                        color: '#9B9B9B',
                        letterSpacing: 0,
                        textAlign: 'right'
                    }}>{item.sampleName}</Text>
                </View>
                <View style={listStyle.itemChoose}>
                    <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
        );
    }
    render () {
        return (
            <View style={{flex:1}}>
                <View style={listStyle.container}>
                    <View style={listStyle.content}>
                        <ScrollView>
                            <View style={listStyle.Department}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>库存区域</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.storeDetailList.warehouseArea}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>库位编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.storeDetailList.warehouseNo}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>库位类型</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.storeDetailList.inventoryType}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>库位状态</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.storeDetailList.status}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={listStyle.personText}>负责人</Text>
                            <View style={listStyle.Department}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>所属部门</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.storeDetailList.orgName}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>负责人</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.storeDetailList.userName}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>联系电话</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <TouchableOpacity onPress={()=>{Communications.phonecall(ListStore.storeDetailList.mobile, true)}}>
                                            <Text style={listStyle.listText}>{ListStore.storeDetailList.mobile}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                                <Text style={listStyle.personText}>在库样品</Text>
                                <View style={listStyle.Department}>
                                    <FlatList
                                        data={ListStore.sampleInList}
                                        extraData={this.state}
                                        renderItem={this.sampleInItem.bind(this)}
                                        keyExtractor={this._keyExtractor}
                                    />
                                </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )

    }
}
export default storageLocationDetail;