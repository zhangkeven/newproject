/**
 * Created by targetcloud on 2016/12/17.
 */
import React, { Component } from 'react';
import {StackNavigator,TabNavigator,NavigationActions,TabBarBottom} from 'react-navigation';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    BackHandler,
    BackAndroid,
    Platform
} from 'react-native';
import ListStore from "../../mobx/listStore";
import Toast from "react-native-simple-toast";
import {zoomW} from '../../utils/getSize';
import FetchUtil from "../../service/rpc";
import listStyle from "../listStyle/listStyle";

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');

export default class loginView extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '个人信息',
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
    }
    //退出登陆
    logOff=()=> {
        // ListStore.isLogin();
            this.props.navigation.navigate('Login', {})
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'})
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        return (
            <View style={{flex:1,position:'relative',height:'100%',alignItems:'center' }}>
                <View style={{width:'100%',height:'100%',flex:1}}>
                    <Image source={require('../../img/userDetail.png')} style={{width:'100%',height:600}} />
                </View>
                <View style={{position:'absolute',alignItems:'center',top:70}}>
                    <Image source={require('../../img/icon_me_40x40.png')} style={{width:60/zoomW*2,height:60}} resizeMode='contain'/>
                    <Text style={styles.titleText}>Hi ~ 张三</Text>
                    <Text style={styles.titleText}>工号 666888</Text>
                </View>
                <View style={{position:'absolute',top:195}}>
                    <View style={listStyle.sample}>
                        <View style={listStyle.item}>
                            <View style={listStyle.itemDesc}>
                                <Text style={listStyle.listTitle}>所属部门</Text>
                            </View>
                            <View style={listStyle. itemDetail}>
                                <Text style={listStyle.listText}>上海汇通</Text>
                            </View>
                        </View>
                        <View style={listStyle.item}>
                            <View style={listStyle.itemDesc}>
                                <Text style={listStyle.listTitle}>手机号</Text>
                            </View>
                            <View style={listStyle. itemDetail}>
                                <Text style={listStyle.listText}>183****6251</Text>
                            </View>
                        </View>
                        <View style={listStyle.item}>
                            <View style={listStyle.itemDesc}>
                                <Text style={listStyle.listTitle}>岗位</Text>
                            </View>
                            <View style={listStyle. itemDetail}>
                                <Text style={listStyle.listText}>技术岗</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width:'100%',
                        backgroundColor:'#fff'
                    }}>
                        <TouchableOpacity style={listStyle.item}>
                            <View style={listStyle.itemDesc}>
                                <Text style={listStyle.listTitle}>修改密码</Text>
                            </View>
                            <View style={listStyle.itemChoose}>
                                <Image style={{width: 25/zoomW*2,height: 25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{this.logOff()}}>
                    <View style={styles.tgLoginBtnStyle}>
                        <Text style={{color:'white'}}>退出登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        height:'100%',
        width:'100%'
    },
    nameTextInput: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:300/zoomW*2,
        height:45,
        borderColor: '#3788E4',
        borderWidth: 1,
        marginBottom:20,
        borderRadius:5/zoomW*2,
    },
    textIcon:{
        width:46/zoomW*2,
        height:45,
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        width:1/zoomW*2,
        height:15,
        backgroundColor: '#D8D8D8'
    },
    leftIcon:{
        width:20/zoomW*2,
        height:20
    },
    tgTextInputStyle:{
        width:254/zoomW*2,
        height:45,
        padding: 0,
        color:'#000',
        textAlign:'left',
        alignSelf:'center',
        marginLeft: 11/zoomW*2
    },
    textInput: {
        width: 310 / zoomW * 2,
        height: 34,
        fontSize:14,
        padding: 0
    },
    topImage:{
        width:115/zoomW*2,
        height:96,
        marginTop:133,
        marginBottom:19,
    },
    tgLoginBtnStyle:{
        height:45,
        width:300/zoomW*2,
        backgroundColor:'#107FE0',
        marginTop:8,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5/zoomW*2
    },

    tgSettingStyle:{
        flexDirection:'row',
        width:width*0.8,
        justifyContent:'space-between'
    },

    tgOtherLoginStyle:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:width*0.1,
        left:width*0.1
    },

    tgOtherImageStyle:{
        width:40,
        height:40,
        borderRadius:20,
        marginLeft:8
    },
    titleText:{
        fontFamily: 'MFLiHei_Noncommercial-Regular',
        fontSize:24,
        color: 'rgba(255,255,255,0.87)',
        letterSpacing: 0,
        textAlign: 'center',
        lineHeight: 25
    },
});

