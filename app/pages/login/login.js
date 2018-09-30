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
    TouchableOpacity
} from 'react-native';
import ListStore from "../../mobx/listStore";
import Toast from "react-native-simple-toast";
import FetchUtil from "../../service/rpc";

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');

export default class loginView extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '登录',
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 16, height: 16}} source={require('../../img/head_back2x.png')}
                       resizeMode="contain"/>
            </TouchableOpacity>
        </View>),
        headerRight:(<View/>)
    });
    // logic = new ListStore();
    constructor () {
        super()
        this.state = {

        }
    }
    componentWillMount() {
        ListStore.getList();
        const process1 = new Promise((resolve, reject) => {
            let data={};
            FetchUtil.post('http://192.168.81.119/WEB/data/index/getUrl.php',data).then(res=>{
                resolve(res);
                //this.ipPath=res.data.result[0].orgName;
            }).catch((error)=>{
                console.warn(error);
            });
        })
        Promise.all([process1]).then(function (results) {
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
    isLogin=()=>{
        // ListStore.isLogin();
        let data={
            "loginNo": ListStore.uName,
            "password": ListStore.UpWd
        };
        FetchUtil.post(ListStore.ipPath+'/api/management/app/login',data).then(res=>{
            if(res.errmsg==='成功'){
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
                Toast.show('账号或密码错误', Toast.SHORT);
            }
            console.log(res.errmsg);
            this.isLogin=res.errmsg;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../img/teaser15.png')} style={styles.tgIconStyle}/>
                <TextInput placeholder={'请输入用户名'} underlineColorAndroid="transparent" style={styles.tgTextInputStyle} onChangeText={(newText) => ListStore.updateUName(newText)} maxLength={128}/>
                <TextInput placeholder={'请输入密码'}  secureTextEntry={true}  underlineColorAndroid="transparent" style={styles.tgTextInputStyle} onChangeText={(newText) => ListStore.updateUpWd(newText)} maxLength={6}/>
                <TouchableOpacity onPress={()=>{this.isLogin()}}>
                    <View style={styles.tgLoginBtnStyle}>
                        <Text style={{color:'white'}}>登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },

    tgIconStyle:{
        width:80,
        height:80,
        marginTop:60,
        marginBottom:30,
        borderRadius:40,
        borderWidth:1,
        borderColor:'grey'
    },

    tgTextInputStyle:{
        width:width*0.8,
        height:38,
        borderColor: 'lightgrey',
        borderWidth: 1,
        marginBottom:8,
        borderRadius:4,
        textAlign:'left',
        alignSelf:'center'
    },

    tgLoginBtnStyle:{
        height:38,
        width:width*0.8,
        backgroundColor:'#00BB00',
        marginTop:8,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
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

