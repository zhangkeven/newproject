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
    AsyncStorage,
    NetInfo
} from 'react-native';
import ListStore from "../../mobx/listStore";
import Toast from "react-native-simple-toast";
import {zoomW} from '../../utils/getSize';
import FetchUtil from "../../service/rpc";

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');

export default class loginView extends Component {
    // logic = new ListStore();
    constructor () {
        super()
        this.state = {

        }
    }
    componentWillMount() {
        // 获取网络状态
        NetInfo.fetch().done((connectionInfo) => {
            if (connectionInfo.toLowerCase() === 'none') {
                Toast.show('网络异常，请检查手机是否联网', Toast.SHORT);
            } else {
                this._retrieveData();
                ListStore.getList();
                const process1 = new Promise((resolve, reject) => {
                    let data={};
                    FetchUtil.post('http://www.kevenzhang.com/data/index/getUrl.php',data).then(res=>{
                        resolve(res);
                    }).catch((error)=>{
                        console.warn(error);
                    });
                })
                Promise.all([process1]).then(function (results) {
                    console.log(results[0]);
                    console.log(results[0][0].url);
                    ListStore.ipPath=results[0][0].url;
                    if(results && results.length>0 && ListStore.ipPath){
                        // ListStore.getData();
                        // ListStore.getProject();
                        // ListStore.isLogin();
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
        });

    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('uname', ListStore.uName);
            await AsyncStorage.setItem('upwd', ListStore.UpWd);
        } catch (error) {
            // Error saving data
        }
    }
    _retrieveData = async () => {
        try {
            const uname = await AsyncStorage.getItem('uname');
            const upwd = await AsyncStorage.getItem('upwd');
            if (uname !== null && upwd!==null) {
                // We have data!!
                console.log(value);
                // 获取网络状态
                NetInfo.fetch().done((connectionInfo) => {
                    if (connectionInfo.toLowerCase() === 'none') {
                        Toast.show('网络异常,请检查手机是否联网', Toast.SHORT);
                    } else {
                        let data={
                            "loginNo": uname,
                            "password": upwd
                        };
                        FetchUtil.post(ListStore.ipPath+'/api/management/app/login',data).then(res=>{
                            console.log(res);
                            if(res.errmsg==='成功'){
                                ListStore.ticked=res.data;
                                Toast.show('登录成功', Toast.SHORT);
                                this.props.navigation.navigate('Index',{})
                                ListStore.uName='' ;
                                ListStore.UpWd='';
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Index'})
                                    ]
                                })
                                this.props.navigation.dispatch(resetAction);

                            }else{
                                ListStore.uName='';
                                ListStore.UpWd='';
                                Toast.show('账号或密码错误', Toast.SHORT);
                                this.props.navigation.navigate('Login',{})
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Login'})
                                    ]
                                })
                                this.props.navigation.dispatch(resetAction);

                            }
                            console.log(res.errmsg);
                            this.isLogin=res.errmsg;
                        }).catch((error)=>{
                            console.warn(error);
                        });
                    }
                });
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    isLogin=()=>{
        if(ListStore.uName==="" ){
            Toast.show('用户名不能为空', Toast.SHORT);
        }else if(ListStore.UpWd===""){
            Toast.show('密码不能为空', Toast.SHORT);
        }else{
            // 获取网络状态
            NetInfo.fetch().done((connectionInfo) => {
                if (connectionInfo.toLowerCase() === 'none') {
                    Toast.show('网络异常,请检查手机是否联网', Toast.SHORT);
                } else {
                    let data={
                        "loginNo": ListStore.uName,
                        "password": ListStore.UpWd
                    };
                    FetchUtil.post(ListStore.ipPath+'/api/management/app/login',data).then(res=>{
                        console.log(res);
                        if(res.errmsg==='成功'){
                            ListStore.ticked=res.data;
                            this._storeData();
                            Toast.show('登录成功', Toast.SHORT);
                            this.props.navigation.navigate('Index',{})
                            ListStore.uName='' ;
                            ListStore.UpWd='';
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'Index'})
                                ]
                            })
                            this.props.navigation.dispatch(resetAction);

                        }else{
                            ListStore.uName='';
                            ListStore.UpWd='';
                            Toast.show('账号或密码错误', Toast.SHORT);
                            this.props.navigation.navigate('Login',{})
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'Login'})
                                ]
                            })
                            this.props.navigation.dispatch(resetAction);

                        }
                        console.log(res.errmsg);
                        this.isLogin=res.errmsg;
                    }).catch((error)=>{
                        console.warn(error);
                    });
                }
            });
        }
        // this._storeData();
        // this.props.navigation.navigate('Index',{})
        //             const resetAction = NavigationActions.reset({
        //                 index: 0,
        //                 actions: [
        //                     NavigationActions.navigate({ routeName: 'Index'})
        //                 ]
        //             })
        //             this.props.navigation.dispatch(resetAction);

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems:"center",marginTop:90}}>
                <Image source={require('../../img/brand_cre8_full_colour_logo_450x200@xhdi.png')} style={styles.topImage} resizeMode='contain'/>
                <View style={styles.nameTextInput}>
                    <View style={styles.textIcon}>
                        <Image source={require('../../img/User@xhdi.png')} style={styles.leftIcon} resizeMode='contain'/>
                    </View>
                    <Text style={styles.line}>

                    </Text>
                    <TextInput style={styles.tgTextInputStyle}
                                   underlineColorAndroid='transparent'
                                   placeholder={'请输入用户名'}
                                   placeholderTextColor="#C4C4C6"
                                   onChangeText={(newText) => ListStore.updateUName(newText)} maxLength={128}/>
                </View>
                <View style={[styles.nameTextInput,{marginBottom:50}]}>
                    <View style={styles.textIcon}>
                        <Image source={require('../../img/Unlock@xhdi.png')} style={styles.leftIcon} resizeMode='contain'/>
                    </View>
                    <Text style={styles.line}>

                    </Text>
                    <TextInput style={styles.tgTextInputStyle}
                               underlineColorAndroid='transparent'
                               placeholder={'请输入密码'}
                               placeholderTextColor="#C4C4C6"
                               secureTextEntry={true}
                               onChangeText={(newText) => ListStore.updateUpWd(newText)} maxLength={6}/>
                </View>
                <TouchableOpacity onPress={()=>{this.isLogin()}}>
                    <View style={styles.tgLoginBtnStyle}>
                        <Text style={{color:'white'}}>登录</Text>
                    </View>
                </TouchableOpacity>
                </View>
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
    }
});

