import React, { Component } from 'react'
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
    Platform
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components';
import {line, publicStyle, height,width,NoDoublePress,zoomW,zoomH,getHeaderPadding, getHeaderHeight,} from "../utils/util";
import {observer} from "mobx-react/native";
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../service/rpc";
import {NavigationActions} from "react-navigation";
@observer
class Index extends Component {
    // logic = new ListStore();
    constructor () {
        super()
        this.state = {
            text: '',
            showInput: false,
            dataList: [
                {name: '性别'},
                {name: '家庭住址'},
                {name: '工作经验'},
                {name: '手机号码'},
            ]
        }
    }
    componentWillMount() {
        ListStore.getList();
        let data={};
        FetchUtil.post('http://www.kevenzhang.com/data/index/getUrl.php',data).then(res=>{
            ListStore.name=res[0].cid;
            if(res[0].cid==='404'){
                this.props.navigation.navigate('Login',{})
                ListStore.uName='' ;
                ListStore.UpWd='';
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login'})
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }
        }).catch((error)=>{
            console.warn(error);
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
    //跳转到订单搜索页面
    toSearchOrder=()=>{
        this.props.navigation.navigate('SearchOrder',{});
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'SearchOrder'})
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }
    //跳转我的样品
    toMySample=()=>{
        // this.props.navigation.navigate('Lend',{});
        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'Lend'})
        //     ]
        // })
        // this.props.navigation.dispatch(resetAction);
    }
    //跳转到库位查询
    toLocationSearch=()=>{
        this.props.navigation.navigate('storageLocationSearch',{});
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'storageLocationSearch'})
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }
    //跳转到扫一扫页面
    toScan=()=>{
         this.props.navigation.navigate('Scan',{});
        // const resetAction = NavigationActions.reset({
        //                 index: 0,
        //                 actions: [
        //                     NavigationActions.navigate({ routeName: 'Scan'})
        //                 ]
        //             })
        //             this.props.navigation.dispatch(resetAction);
    }
    selectItem=(item)=>{
        if(item==='性别'){
            this.props.navigation.navigate('Choose',{
                showList:true,data:ListStore.genderList,logic:ListStore,type:item,headTitle:'选择性别'
            })
        }else if(item==='家庭住址'){
            this.props.navigation.navigate('Choose',{
                showList:true,data:ListStore.addressList,logic:ListStore,type:item,headTitle:'选择家庭住址'
            })
        }else if(item==='工作经验'){
            this.props.navigation.navigate('Choose',{
                showList:true,data:ListStore.workList,logic:ListStore,type:item,headTitle:'选择工作经验'
            })
        }else if(item==='手机号码'){
            ListStore.phone='';
            ListStore.upWd='';
            this.props.navigation.navigate('Choose',{
                show:true,logic:ListStore,type:item,headTitle:'输入手机号'
            })
        }
    }
    selectImage() {
        const that = this;
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.log('response.error:'+response.error);
                if (Platform.OS === 'ios') {
                    if (response.error.indexOf('Photo') != -1) {
                        Alert.alert(
                            '获取照片权限失败',
                            '程序正请求获取照片权限用于上传图片,请前往设置页面打开照片权限',
                            [
                                { text: '确定' },
                            ],
                            { cancelable: false },
                        );
                    } else if (response.error.indexOf('Camera') != -1) {
                        Alert.alert(
                            '获取相机权限失败',
                            '程序正请求获取相机权限用于上传图片,请前往设置页面打开相机权限',
                            [
                                { text: '确定' },
                            ],
                            { cancelable: false },
                        );
                    }
                } else if (Platform.OS === 'android') {
                    if (response.error.startsWith("Permissions weren't granted")) {
                        Alert.alert(
                            '获取相机权限失败',
                            '程序正请求获取相机权限用于上传图片,请前往设置页面打开相机权限',
                            [
                                { text: '确定' },
                            ],
                            { cancelable: false },
                        );
                    }
                }
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {
                const file = {
                    uri: '',
                    name: 'photo',
                    type: 'image/jpeg',
                };
                if (Platform.OS === 'android') {
                    file.uri = response.uri;
                } else {
                    file.uri = response.uri.replace('file://', '');
                }
              ListStore.imagePath=file.uri;
            }
        });
    }
    render () {
        return (
            <View style={{flex:1,position:'relative',height:'100%'}}>
                <View style={{width:'100%',height:'100%',flex:1}}>
                    <Image source={require('../img/bg_home_375x667.png')} style={{width:'100%',height:600}} />
                </View>
                <Text style={{opacity:0.5,width:1/zoomW*2,height:200,borderWidth: 1,borderColor: '#E6E6E6',position:'absolute',left:130/zoomW*2,top:240}}>

                </Text>
                <Text style={{opacity:0.5,width:1/zoomW*2,height:200,borderWidth: 1,borderColor: '#E6E6E6',position:'absolute',left:230/zoomW*2,top:240}}>

                </Text>
                <Text style={{opacity:0.5,width:300/zoomW*2,height:1,borderWidth: 1,borderColor: '#E6E6E6',position:'absolute',left:30/zoomW*2,top:340}}>

                </Text>
                <TouchableOpacity style={{position:'absolute',left:60/zoomW*2,top:260,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.toSearchOrder()}}>
                    <Image source={require('../img/icon_dingdan_40x40.png')} style={styles.navIcon} resizeMode='contain'/>
                    <Text style={styles.navText}>订单查询</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',left:160/zoomW*2,top:260,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.toMySample()}}>
                    <Image source={require('../img/icon_kucun_40x40.png')} style={styles.navIcon} resizeMode='contain'/>
                    <Text style={styles.navText}>我的样品</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',left:260/zoomW*2,top:260,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.toLocationSearch()}}>
                    <Image source={require('../img/icon_home_kucun_40x40.png')} style={styles.navIcon} resizeMode='contain'/>
                    <Text style={styles.navText}>库位查询</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute',left:60/zoomW*2,top:360,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../img/icon_help_40x40.png')} style={styles.navIcon} resizeMode='contain'/>
                    <Text style={styles.navText}>使用帮助</Text>
                </TouchableOpacity>
                <View style={{position:'absolute',left:110/zoomW*2,top:150,justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.titleText}>安徽创源文化</Text>
                </View>
                <View style={{position:'absolute',left:25/zoomW*2,top:30,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Image source={require('../img/icon_me_40x40.png')} style={styles.navIcon} resizeMode='contain'/>
                    <Text style={[styles.titleText,{marginLeft: 14/zoomW*2}]}>Hi ~ 张三</Text>
                </View>
                <TouchableOpacity style={{width:'100%',height:100,justifyContent:'center',alignItems:'center'}} onPress={()=>{ this.toScan()}}>
                    <Image source={require('../img/saoma_100x100.png')} style={{width:75/zoomW*2,height:75}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
        )

    }
}
const options = {
    title: '选择图片',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        waitUntilSaved: true,
    },
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.8,
    maxWidth:750,
    maxHeight:800,
    noData: true,
    modalShow: false,            // 图片模态框是否打开
    currentIndex: 0,              // 当前被点击的图片
};

const styles = StyleSheet.create({
   titleText:{
       fontFamily: 'MFLiHei_Noncommercial-Regular',
        fontSize:24,
        color: 'rgba(255,255,255,0.87)',
        letterSpacing: 0,
        textAlign: 'center',
        lineHeight: 25
   },
    navIcon:{
       width:40/zoomW*2,
       height:40
   },
    navText:{
        fontFamily: 'PingFangSC-Medium',
        fontSize: 10.6,
        color: '#4A4A4A',
        letterSpacing: 0,
        textAlign: 'center',
        lineHeight: 11.36,
        marginTop: 11
    }
})
export default Index;