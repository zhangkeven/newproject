import React, { Component } from 'react'
import App from './App';
import ListStore from '../mobx/listStore'

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
import {line, publicStyle, height,width,NoDoublePress,zoomW,zoomH,getHeaderPadding, getHeaderHeight,} from "../utils/util";
import {observer} from "mobx-react/native";
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../service/rpc";
import {NavigationActions} from "react-navigation";
@observer
class ReactNativeMobX extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '样品信息',
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 16, height: 16}} source={require('../img/head_back2x.png')}
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
                const { goBack } = this.props.navigation;
                goBack();
            }
        });
    }
    //所属订单
    _keyExtractor = (item, index) => index;
    orderItem({ item, index }) {
        return (
            <TouchableOpacity style={styles.item}  key={index}>
                <View style={styles.itemDesc}>
                    <Text style={styles.listTitle}>{item}</Text>
                </View>
                <View style={styles.itemChoose}>
                    <Image style={{width: 8/zoomW*2,height: 12}} source={require('../img/icon.png')}/>
                </View>
            </TouchableOpacity>
        );
    }
    render () {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <ScrollView>
                        <View style={styles.sample}>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>样品编号</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                   <Text style={styles.listText}>YP180002939-1</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>样品名称</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                    <Text style={styles.listText}>YJ笔记本</Text>
                                </View>
                            </View>
                            <View style={[styles.item,{height:70}]}>
                               <View></View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>样品类型</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                    <Text style={styles.listText}>客供样品</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>样品状态</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                    <Text style={styles.listText}>在借</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>操作时间</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                    <Text style={styles.listText}>2018/09/22 12：22</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.Department}>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>保管部门</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                    <Text style={styles.listText}>生产一部</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>保管责任人</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                    <Text style={styles.listText}>张三</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>联系电话</Text>
                                </View>
                                <View style={styles. itemDetail}>
                                    <Text style={styles.listText}>177179340987</Text>
                                </View>
                            </View>
                        </View>
                            <Text style={styles.personText}>使用人</Text>
                            <View style={styles.person}>
                                <View style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={styles.listTitle}>使用部门</Text>
                                    </View>
                                    <View style={styles.itemDetail}>
                                        <Text style={styles.listText}>1235466</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={styles.listTitle}>使用责任人</Text>
                                    </View>
                                    <View style={styles. itemDetail}>
                                        <Text style={styles.listText}>1235466</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={styles.listTitle}>联系电话</Text>
                                    </View>
                                    <View style={styles. itemDetail}>
                                        <Text style={styles.listText}>1235466</Text>
                                    </View>
                                </View>
                            </View>
                        <View style={styles.remark}>
                            <View style={{
                                width:358/zoomW*2,
                                backgroundColor: '#ffffff',
                                marginLeft:19/zoomW*2,
                            }}>
                                <View style={[styles.itemDesc,{
                                    marginTop: 11,
                                }]}>
                                    <Text style={[styles.listTitle,{
                                        color:'#000',
                                        letterSpacing: 0.2
                                    }]}>备注信息</Text>
                                </View>
                                <View style={{
                                    width:340/zoomW*2,
                                    marginBottom:11,
                                    marginTop:14
                                }}>
                                    <Text style={styles.remarkText}>
                                        从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。
                                    </Text>
                                </View>
                            </View>
                        </View>
                            <Text style={styles.personText}>执行订单</Text>
                        <View style={styles.order}>
                            <FlatList
                                data={ListStore.orderList}
                                extraData={this.state}
                                renderItem={this.orderItem.bind(this)}
                                keyExtractor={this._keyExtractor}
                            />
                        </View>
                            <View style={styles.record}>
                                <TouchableOpacity style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={styles.listTitle}>订单号</Text>
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
                                    <View style={styles.itemChoose}>
                                        <Image style={{width: 8/zoomW*2,height: 12}} source={require('../img/icon.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        {/*<View style={styles.record}>*/}
                            {/*<TouchableOpacity style={styles.item}>*/}
                                {/*<View style={styles.itemDesc}>*/}
                                    {/*<Text style={styles.listTitle}>样品操作记录</Text>*/}
                                {/*</View>*/}
                                {/*<View style={styles.itemChoose}>*/}
                                    {/*<Image style={{width: 8/zoomW*2,height: 12}} source={require('../img/icon.png')}/>*/}
                                {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        <View style={styles.repair}>
                            <TouchableOpacity style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>样品报修</Text>
                                </View>
                                <View style={styles.itemChoose}>
                                    <Image style={{width: 8/zoomW*2,height: 12}} source={require('../img/icon.png')}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <View style={styles.itemDesc}>
                                    <Text style={styles.listTitle}>样品移交</Text>
                                </View>
                                <View style={styles.itemChoose}>
                                    <Image style={{width: 8/zoomW*2,height: 12}} source={require('../img/icon.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>归还</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1
    },
    listTitle:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        color: '#323232',
        letterSpacing: 0,
        lineHeight: 20
    },
    listText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        color: '#808080',
        letterSpacing: 0,
        textAlign: 'right'
    },
    sample:{
      width:'100%',
      height:270,
      backgroundColor:'#fff',
      marginBottom: 20
    },
    Department:{
        width:'100%',
        height:120,
        backgroundColor:'#fff',
    },
    person:{
        width:'100%',
        height:120,
        backgroundColor:'#fff',
        marginBottom:20
    },
    personText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#898994',
        marginLeft:19/zoomW*2,
        marginTop: 10,
        marginBottom:4
    },
    remark:{
        width:'100%',
        backgroundColor:'#fff',
    },
    remarkText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#4A4A4A',
        letterSpacing: 0.17
    },
    order:{
        width:'100%',
        backgroundColor:'#fff',
        marginBottom:20
    },
    item: {
        height: 40,
        width:358/zoomW*2,
        backgroundColor: '#ffffff',
        borderBottomWidth:1,
        borderBottomColor:"#E7E7E9",
        borderStyle:"solid",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 17/zoomW*2
    },
    itemDesc: {
        flex:1,
    },
    itemChoose: {
        marginRight: 20/zoomW*2
    },
    itemDetail:{
        justifyContent:'center',
        alignItems:'center',
        marginRight: 20/zoomW*2
    },
    record:{
        width:'100%',
        height:40,
        backgroundColor:'#fff',
        marginBottom:20
    },
    repair:{
        width:'100%',
        height:80,
        backgroundColor:'#fff',
        marginBottom:59
    },
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#107FE0'
    },
    textButton: {
        color: '#fff'
    }
})
export default ReactNativeMobX;