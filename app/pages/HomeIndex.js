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
    Platform
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
        title: '信息编辑',
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
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.avatarContainer} onPress={() => NoDoublePress.onPress(() => { this.selectImage(); })}>
                            <View style={styles.avatarText}>
                                <Text style={{fontSize: 17,color:'#000'}}>个人头像</Text>
                            </View>
                            {ListStore.imagePath===''?<View style={styles.avatar}>

                            </View>:<Image style={{width: 80,height: 56}} source={{uri: ListStore.imagePath }} />

                            }
                            <View style={styles.avatarIcon}>
                                <Image style={{width: 16,height: 26}} source={require('../img/icon.png')}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.edit}>
                                <View style={styles.formViewItem}>
                                    <View style={styles.formViewItemLabel}>
                                        <Text style={styles.formViewItemLabelFont}>姓名</Text>
                                    </View>
                                    <View style={styles.formViewItemRdom}>
                                        <TextInput style={styles.formViewItemsInput} underlineColorAndroid="transparent" maxLength={50}  placeholderTextColor="#BBBBBB"
                                             value={ListStore.name}   onChangeText={(newText) => ListStore.updateName(newText)}/>
                                    </View>
                                </View>
                            <TouchableOpacity onPress={() =>{this.selectItem('性别')}}>
                                <View style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={{color:'#000'}}>性别</Text>
                                    </View>
                                    <View>
                                        <Text>{ListStore.gender}</Text>
                                    </View>
                                    <View style={styles.itemChoose}>
                                        <Image style={{width: 16,height: 26}} source={require('../img/icon.png')}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{this.selectItem('家庭住址')}}>
                                <View style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={{color:'#000'}}>家庭住址</Text>
                                    </View>
                                    <View>
                                        <Text>{ListStore.address}</Text>
                                    </View>
                                    <View style={styles.itemChoose}>
                                        <Image style={{width: 16,height: 26}} source={require('../img/icon.png')}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{this.selectItem('工作经验')}}>
                                <View style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={{color:'#000'}}>工作经验</Text>
                                    </View>
                                    <View>
                                        <Text>{ListStore.work}</Text>
                                    </View>
                                    <View style={styles.itemChoose}>
                                        <Image style={{width: 16,height: 26}} source={require('../img/icon.png')}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{this.selectItem('手机号码')}}>
                                <View style={styles.item}>
                                    <View style={styles.itemDesc}>
                                        <Text style={{color:'#000'}}>手机号码</Text>
                                    </View>
                                    <View>
                                        <Text>{ListStore.phone}</Text>
                                    </View>
                                    <View style={styles.itemChoose}>
                                        <Image style={{width: 16,height: 26}} source={require('../img/icon.png')}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.save}>
                        <Text style={styles.saveText}>保存</Text>
                    </TouchableOpacity>
                </View>
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
    formViewItem: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 10 ,
        paddingRight: 10,
        height: 44,
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
        borderRadius: 4 ,
    },
    formViewItemLabel: {
        flex:0.2,
        justifyContent: 'center'
    },
    formViewItemLabelFont: {
        fontSize: 14,
        color: '#333333'
    },
    formViewItemRdom: {
        flex: 0.8,
        justifyContent: 'center'
    },
    formViewItemsInput: {
        textAlign:'right',
        color:'#BBB',
        padding: 0,
        fontSize:14
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1
    },
    titleContainer: {
        height: 44,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    back: {
        width: 40,
        marginLeft: 10,
    },
    title: {
        flex: 1,
        color: '#000000',
        alignItems: 'center',
        justifyContent: "center"
    },
    share: {
        width: 40
    },
    avatarContainer: {
        height: 86,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    avatarText: {
        marginLeft: 10,
        flex: 1,
    },
    avatar: {
        height: 56,
        width: 56,
        backgroundColor: '#d8d8d8',
        marginRight: 10,
    },
    avatarIcon: {
        width: 8,
        marginRight: 10
    },
    item: {
        height: 40,
        backgroundColor: '#ffffff',
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        borderStyle:"solid",
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        flex: 3.5,
        marginLeft: 10
    },
    nameText: {
       flex:1,
        marginRight: 10
    },
    itemDesc: {
        flex:1,
        marginLeft: 10
    },
    itemChoose: {
        marginRight: 10
    },

    save: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28C35A'
    },
    saveText: {
        color: '#fff'
    }
})
export default ReactNativeMobX;