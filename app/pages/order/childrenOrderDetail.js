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
import Communications from 'react-native-communications';
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../../service/rpc";
import {NavigationActions} from "react-navigation";
@observer
class childOrderDetail extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '子订单详情',
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
                            <View style={listStyle.sample}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>母订单编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>YP180002939-1</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>子订单编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>YP180002939-2</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>返或意向编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>YP180002939-3</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>HS编码</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>666888</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品编码</Text>
                                    </View>
                                    <View style={{

                                    }}>
                                        <Text style={{
                                            fontFamily: 'PingFangSC-Regular',
                                            fontSize: 14,
                                            color: '#9B9B9B',
                                            letterSpacing: 0,
                                            textAlign: 'right'
                                        }}>Ysdsad123132</Text>
                                    </View>
                                    <View style={listStyle.itemChoose}>
                                        <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                                    </View>
                                </TouchableOpacity>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品名称</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>金砖</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>订单数量</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>11233</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>大货留样</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>89件</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>大货留样时间</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>2018/8/8</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>研发留样</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>89件</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>FOB单价</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>20元</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>子订单金额</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>￥768884</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>单位料</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>8.9</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>单位工</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>1.08</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>价格条款</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>FOB支付</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>模型加成</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>8.9</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>模型差异</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>8.9</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>有效产出率</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>8.9</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[listStyle.Department,{marginBottom:17}]}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>生产部门</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>生产一部</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>生产负责人</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{Communications.phonecall('123', true)}}>
                                        <Image source={require('../../img/椭圆形@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:11/zoomW*2}} resizeMode='contain'/>
                                    </TouchableOpacity>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>张三</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[listStyle.Department,{marginBottom:17}]}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>品控部门</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>生产一部</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>品控负责人</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{Communications.phonecall('123', true)}}>
                                        <Image source={require('../../img/椭圆形@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:11/zoomW*2}} resizeMode='contain'/>
                                    </TouchableOpacity>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>张三</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[listStyle.remark,{marginBottom:20}]}>
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
                                        }]}>待定项目</Text>
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
                            <View style={{width:'100%',backgroundColor:'#fff',marginBottom:30}}>
                                <TouchableOpacity style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>物料配置单</Text>
                                    </View>
                                    <View style={{

                                    }}>
                                        <Text style={{
                                            fontFamily: 'PingFangSC-Regular',
                                            fontSize: 14,
                                            color: '#9B9B9B',
                                            letterSpacing: 0,
                                            textAlign: 'right'
                                        }}>详情</Text>
                                    </View>
                                    <View style={listStyle.itemChoose}>
                                        <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )

    }
}
export default childOrderDetail;