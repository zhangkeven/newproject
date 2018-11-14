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
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../../service/rpc";
import {NavigationActions} from "react-navigation";
import Communications from "react-native-communications";
import Toast from "react-native-simple-toast";
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
        NetInfo.fetch().done((connectionInfo) => {
            if (connectionInfo.toLowerCase() === 'none') {
                Toast.show('网络异常,请检查手机网络', Toast.SHORT);
            } else {
                //获取我的样品详情
                ListStore.getMySampleDetail();
            }
        });

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
    //跳转到移交页面
    handover=()=>{
        this.props.navigation.navigate('Handover',{});
    }
    //立即归还样品
    toRestore=()=>{
        this.props.navigation.navigate('ImmediatelyRestore',{});
    }
    //跳转到子订单详情
    toChildOrderDetail=()=>{
        this.props.navigation.navigate('ChildOrderDetail',{})
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
                                   <Text style={listStyle.listText}>{ListStore.MySampleDetail.sampleNo}</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品名称</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>{ListStore.MySampleDetail.sampleName}</Text>
                                </View>
                            </View>
                            <FlatList
                                data={ListStore.MySampleDetail.imgs}
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
                                    <Text style={listStyle.listText}>{ListStore.MySampleDetail.sampleType}</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品状态</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>{this.setStatus(ListStore.MySampleDetail.status)}</Text>
                                </View>
                            </View>
                            {/*<View style={listStyle.item}>*/}
                                {/*<View style={listStyle.itemDesc}>*/}
                                    {/*<Text style={listStyle.listTitle}>操作时间</Text>*/}
                                {/*</View>*/}
                                {/*<View style={listStyle. itemDetail}>*/}
                                    {/*<Text style={listStyle.listText}> </Text>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        </View>
                        <View style={listStyle.Department}>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>保管部门</Text>
                                </View>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>{ListStore.MySampleDetail.manageOrg}</Text>
                                </View>
                            </View>
                            <View style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>保管责任人</Text>
                                </View>
                                <TouchableOpacity onPress={()=>{Communications.phonecall(ListStore.MySampleDetail.mobile, true)}}>
                                    <Image source={require('../../img/椭圆形@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:11/zoomW*2}} resizeMode='contain'/>
                                </TouchableOpacity>
                                <View style={listStyle. itemDetail}>
                                    <Text style={listStyle.listText}>{ListStore.MySampleDetail.manageUser}</Text>
                                </View>
                            </View>
                        </View>
                            {/*<Text style={listStyle.personText}>使用人</Text>*/}
                            {/*<View style={listStyle.person}>*/}
                                {/*<View style={listStyle.item}>*/}
                                    {/*<View style={listStyle.itemDesc}>*/}
                                        {/*<Text style={listStyle.listTitle}>使用部门</Text>*/}
                                    {/*</View>*/}
                                    {/*<View style={listStyle.itemDetail}>*/}
                                        {/*<Text style={listStyle.listText}>{ListStore.MySampleDetail.mobile}</Text>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                {/*<View style={listStyle.item}>*/}
                                    {/*<View style={listStyle.itemDesc}>*/}
                                        {/*<Text style={listStyle.listTitle}>使用责任人</Text>*/}
                                    {/*</View>*/}
                                    {/*<TouchableOpacity onPress={()=>{Communications.phonecall(ListStore.MySampleDetail.mobile, true)}}>*/}
                                        {/*<Image source={require('../../img/椭圆形@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:11/zoomW*2}} resizeMode='contain'/>*/}
                                    {/*</TouchableOpacity>*/}
                                    {/*<View style={listStyle. itemDetail}>*/}
                                        {/*<Text style={listStyle.listText}>{ListStore.MySampleDetail.manageUser}</Text>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*</View>*/}
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
                                        {ListStore.MySampleDetail.remark}
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
                                <TouchableOpacity style={listStyle.item} onPress={()=>{this.toChildOrderDetail()}}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>
                                            {ListStore.childOrderName}
                                        </Text>
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
                                        <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon.png')} resizeMode={"contain"}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        <View style={listStyle.repair}>
                            <TouchableOpacity style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品报修</Text>
                                </View>
                                <View style={listStyle.itemChoose}>
                                    <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon.png')} resizeMode={"contain"}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={listStyle.item} onPress={()=>{this.handover()}}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>样品移交</Text>
                                </View>
                                <View style={listStyle.itemChoose}>
                                    <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon.png')} resizeMode={"contain"}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={listStyle.item}>
                                <View style={listStyle.itemDesc}>
                                    <Text style={listStyle.listTitle}>大货留样</Text>
                                </View>
                                <View style={listStyle.itemChoose}>
                                    <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon.png')} resizeMode={"contain"}/>
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