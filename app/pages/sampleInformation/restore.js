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
@observer
class Restore extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '样品信息',
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 25/zoomW*2, height: 25}} source={require('../../img/icon_arrow_left_passion_blue_idle_25x25@xhdi.png')}
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
    }
    //立即归还样品
    toRestore=()=>{
        this.props.navigation.navigate('ImmediatelyRestore',{});
    }
    //所属订单
    _keyExtractor = (item, index) => index;
    orderItem({ item, index }) {
        return (
            <TouchableOpacity style={listStyle.item}  key={index}>
                <View style={listStyle.itemDesc}>
                    <Text style={listStyle.listTitle}>{item}</Text>
                </View>
                <View style={listStyle.itemChoose}>
                    <Image style={{width: 8/zoomW*2,height: 12}} source={require('../../img/icon.png')} resizeMode="contain"/>
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
                        <View style={listStyle.sample}>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品编号</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                   <Text style={listStyle.listText}>YP180002939-1</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品名称</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>YJ笔记本</Text>
                                </View>
                            </View>
                            <View style={[listStyle.item,{height:70}]}>
                               <View></View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品类型</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>客供样品</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品状态</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>在借</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>操作时间</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>2018/09/22 12：22</Text>
                                </View>
                            </View>
                        </View>
                        <View style={listStyle.Department}>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>保管部门</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>生产一部</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>保管责任人</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>张三</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>联系电话</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>177179340987</Text>
                                </View>
                            </View>
                        </View>
                            <Text style={listStyle.personText}>使用人</Text>
                            <View style={listStyle.person}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>使用部门</Text>
                                    </View>
                                    <View style={listStyle.itemDetail}>
                                        <Text style={listStyle.listText}>1235466</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>使用责任人</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>1235466</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>联系电话</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>1235466</Text>
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
                                        从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。
                                    </Text>
                                </View>
                            </View>
                        </View>
                            <Text style={listStyle.personText}>执行订单</Text>
                        {/*<View style={styles.order}>*/}
                            {/*<FlatList*/}
                                {/*data={ListStore.orderList}*/}
                                {/*extraData={this.state}*/}
                                {/*renderItem={this.orderItem.bind(this)}*/}
                                {/*keyExtractor={this._keyExtractor}*/}
                            {/*/>*/}
                        {/*</View>*/}
                            <View style={listStyle.record}>
                                <TouchableOpacity style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>DD180908000345-1</Text>
                                    </View>
                                    <View style={{
                                        marginRight:9./zoomW*2
                                    }}>
                                        <Text style={{
                                            fontFamily: 'PingFangSC-Regular',
                                            fontSize: 14,
                                            color: '#9B9B9B',
                                            letterSpacing: 0,
                                            textAlign: 'right'
                                        }}>查看详情</Text>
                                    </View>
                                    <View style={listStyle.itemChoose}>
                                        <Image style={{width: 8/zoomW*2,height: 12}} source={require('../../img/icon.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        <View style={listStyle.repair}>
                            <TouchableOpacity style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品报修</Text>
                                </View>
                                <View style={listStyle.itemChoose}>
                                    <Image style={{width: 8/zoomW*2,height: 12}} source={require('../../img/icon.png')}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品移交</Text>
                                </View>
                                <View style={listStyle.itemChoose}>
                                    <Image style={{width: 8/zoomW*2,height: 12}} source={require('../../img/icon.png')}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>大货留样</Text>
                                </View>
                                <View style={listStyle.itemChoose}>
                                    <Image style={{width: 8/zoomW*2,height: 12}} source={require('../../img/icon.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={listStyle.button} onPress={()=>{this.toRestore()}}>
                        <Text style={listStyle.textButton}>归还</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}
export default Restore ;