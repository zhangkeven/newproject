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
    ScrollView,
    NetInfo
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
        NetInfo.fetch().done((connectionInfo) => {
            if (connectionInfo.toLowerCase() === 'none') {
                Toast.show('网络异常,请检查手机网络', Toast.SHORT);
            } else {
                ListStore.getChildOrderDetail();
            }
        });

        //路由组件
        this.props.navigation.setParams({
            //返回上一个路由
            operaGoBack: () => {
                const { goBack } = this.props.navigation;
                goBack();
            }
        });
    }
    add0(m) {
        return m < 10 ? `0${m}` : m;
    }
    // 时间戳转换成年月日时分
    formatDateSec(needTime) {
        const time = new Date(needTime);
        const y = time.getFullYear();
        const m = time.getMonth() + 1;
        const d = time.getDate();
        const h = time.getHours();
        const mm = time.getMinutes();
        const s = time.getSeconds();
        return `${y}/${this.add0(m)}/${this.add0(d)}`;
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
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.orderCode}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>子订单编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.subOrderCode}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>返或意向编号</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.intentOrder}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>HS编码</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.hsCode}</Text>
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
                                        }}>{ListStore.childOrderDetailList.sampleCode}</Text>
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
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.sampleName}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>订单数量</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.totalCount}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>大货留样</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.sampleCount}件</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>大货留样时间</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{this.formatDateSec(ListStore.childOrderDetailList.sampleTime)}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>研发留样</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.researchCount}件</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>FOB单价</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.fobPrice}元</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>子订单金额</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>￥{ListStore.childOrderDetailList.subOrderTotal}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>单位料</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.unitMaterial}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>单位工</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.perHours}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>模型加成</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.modelAddition}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>模型差异</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.modelDifference}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>有效产出率</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.effectiveOutputRate}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[listStyle.Department,{marginBottom:17}]}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>生产部门</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.productionOrgName}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>生产负责人</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{Communications.phonecall(ListStore.childOrderDetailList.productionMobile, true)}}>
                                        <Image source={require('../../img/椭圆形@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:11/zoomW*2}} resizeMode='contain'/>
                                    </TouchableOpacity>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.productionLeaderName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[listStyle.Department,{marginBottom:17}]}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>品控部门</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.qaOrgName}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>品控负责人</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{Communications.phonecall(ListStore.childOrderDetailList.qaMobile, true)}}>
                                        <Image source={require('../../img/椭圆形@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:11/zoomW*2}} resizeMode='contain'/>
                                    </TouchableOpacity>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.childOrderDetailList.qaLeaderName}</Text>
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
                                            {ListStore.childOrderDetailList.undeterminedProject}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:'100%',backgroundColor:'#fff',marginBottom:30}}>
                                <TouchableOpacity style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>大货留样</Text>
                                    </View>
                                    <View style={{

                                    }}>
                                        <Text style={{
                                            fontFamily: 'PingFangSC-Regular',
                                            fontSize: 14,
                                            color: '#9B9B9B',
                                            letterSpacing: 0,
                                            textAlign: 'right'
                                        }}>{ListStore.childOrderDetailList.retentionSampleCount}</Text>
                                    </View>
                                    <View style={listStyle.itemChoose}>
                                        <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>印刷样品</Text>
                                    </View>
                                    <View style={{

                                    }}>
                                        <Text style={{
                                            fontFamily: 'PingFangSC-Regular',
                                            fontSize: 14,
                                            color: '#9B9B9B',
                                            letterSpacing: 0,
                                            textAlign: 'right'
                                        }}>

                                        </Text>
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