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
    ScrollView
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components';
import {line, publicStyle, height,width,NoDoublePress,zoomW,zoomH,getHeaderPadding, getHeaderHeight,} from "../../utils/util";
import {observer} from "mobx-react/native";
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../../service/rpc";
import {NavigationActions} from "react-navigation";
import Communications from "react-native-communications";
@observer
class Lend extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '样品信息',
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 25/zoomW*2, height:25}} source={require('../../img/icon_arrow_left_passion_blue_idle_25x25@xhdi.png')}
                       resizeMode="contain"/>
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
                this.props.navigation.navigate('Index',{});
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Index'})
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }
        });
        ListStore.getSampleDetail();
    }
    //把返回的状态翻译成中文
    setStatus = (status) => {
        switch (status) {
            case "1":
                return "正常";
            case "2":
                return "在借";
            case "3":
                return "报修";
            case "4":
                return "报废";
            case "5":
                return "归档";
        }
    }
    //跳转到样品操作记录页面
    operatingRecord=()=>{
        this.props.navigation.navigate('operatingRecord',{});
    }
    //跳转到立即借出页面
    toLend=()=>{
        ListStore.sampleId=ListStore.sampleDetailList.id;
        this.props.navigation.navigate('ImmediatelyLend',{});
    }
    //跳转到子订单详情
    toChildOrderDetail=(id)=>{
        ListStore.childOrderId=id;
        this.props.navigation.navigate('ChildOrderDetail',{})
    }
    //所属订单
    _keyExtractor = (item, index) => index;
    orderItem({ item, index }) {
        return (
            <TouchableOpacity style={listStyle.item}  key={index} onPress={()=>{this.toChildOrderDetail(item.id)}}>
                <View style={listStyle.itemDesc}>
                    <Text style={listStyle.listTitle}>{item.orderNo}</Text>
                </View>
                <View style={listStyle.itemChoose}>
                    <Image style={{width: 25/zoomW*2,height:25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
        );
    }
    //所属订单
    _keyExtractor = (item, index) => index;
    imgItem({ item, index }) {
        return (
            <View>
                <Image style={{width: 48/zoomW*2,height:48}} source={{uri:item}} resizeMode="contain"/>
            </View>
        );
    }
    render () {
        return (
            <View style={{flex:1}}>
                <View style={listStyle.container}>
                    <View style={listStyle.content}>
                        <ScrollView>
                            <View style={listStyle.sample}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.sampleNo}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品名称</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.sampleName}</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={ListStore.sampleDetailList.imgs}
                                    extraData={this.state}
                                    renderItem={this.imgItem.bind(this)}
                                    keyExtractor={this._keyExtractor}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />

                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品类型</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.sampleType}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>库存区域</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.warehouseArea}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>库位编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.warehouseNo}</Text>
                                    </View>
                                </View>
                                {/*<View style={listStyle.item}>*/}
                                    {/*<View style={listStyle.itemDesc}>*/}
                                        {/*<Text style={listStyle.listTitle}>库存数量</Text>*/}
                                    {/*</View>*/}
                                    {/*<View style={listStyle. itemDetail}>*/}
                                        {/*<Text style={listStyle.listText}>暂无参数</Text>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品状态</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{this.setStatus(ListStore.sampleDetailList.status)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={listStyle.Department}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>保管部门</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.manageOrg}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>保管责任人</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{Communications.phonecall(ListStore.sampleDetailList.mobile, true)}}>
                                        <Image source={require('../../img/椭圆形@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:11/zoomW*2}} resizeMode='contain'/>
                                    </TouchableOpacity>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.manageUser}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={listStyle.remark}>
                                <View style={{
                                    width:358/zoomW*2,
                                    backgroundColor: '#ffffff',
                                    marginLeft:19/zoomW*2,
                                }}>
                                    <View style={[listStyle.itemDesc,{
                                        marginTop: 11,
                                    }]}>
                                        <Text style={[listStyle.listTitle,{
                                            color:'#000',
                                            letterSpacing: 0.2
                                        }]}>备注信息</Text>
                                    </View>
                                    <View style={{
                                        width:340/zoomW*2,
                                        marginBottom:11,
                                        marginTop:14
                                    }}>
                                        <Text style={listStyle.remarkText}>
                                            {ListStore.sampleDetailList.remark}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={listStyle.personText}>所属订单</Text>
                            <View style={listStyle.order}>
                                <FlatList
                                    data={ListStore.childOrderAllList}
                                    extraData={this.state}
                                    renderItem={this.orderItem.bind(this)}
                                    keyExtractor={this._keyExtractor}
                                />
                            </View>
                            <View style={listStyle.record}>
                            <TouchableOpacity style={listStyle.item} onPress={()=>{this.operatingRecord()}}>
                            <View style={listStyle.itemDesc}>
                            <Text style={listStyle.listTitle}>样品操作记录</Text>
                            </View>
                            <View style={listStyle.itemChoose}>
                            <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')}/>
                            </View>
                            </TouchableOpacity>
                            </View>
                            <View style={listStyle.repair}>
                                <TouchableOpacity style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品报修</Text>
                                    </View>
                                    <View style={listStyle.itemChoose}>
                                        <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={listStyle.button} onPress={()=>{this.toLend()}}>
                        <Text style={listStyle.textButton}>借出</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}
export default Lend;