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
    ActivityIndicator,
    Modal
} from 'react-native'
import {Navigator} from 'react-native-deprecated-custom-components';
import {line, publicStyle, height,width,NoDoublePress,zoomW,zoomH,getHeaderPadding, getHeaderHeight,} from "../../utils/util";
import {observer} from "mobx-react/native";
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../../service/rpc";
import {NavigationActions} from "react-navigation";
import Toast from 'react-native-simple-toast';
const options = {
    title: '请选择上传图片方式',
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
@observer
class ImmediatelyLend extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '借出样品',
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
            designStyleHeight:0,
            designStyle:'',
            loading:false

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
        ListStore.lendOrderName='';
        ListStore.lendOrderId='';
        ListStore.lendImgList=[];
    }
    //借出图片
    lendImage( item, i ) {
        return (
            <View style={{marginRight:20/zoomW*2}} key={i}>
                <Image style={{width: 60/zoomW*2,height:60}} source={{uri:item}} resizeMode="contain"/>
            </View>
        );
    }
    //选择执行订单
    goExecutionOrder() {
        this.props.navigation.navigate("ChooseExecutionOrderModal", {height:this.state.designStyleHeight, designStyle:this.state.designStyle,callback:(name,id,i)=>{
                if(i>2 && i!==3){
                    this.setState({
                        designStyleHeight:i-1//跳到指定位置
                    })
                    ListStore.lendOrderName=name;
                    ListStore.lendOrderId=id;
                }else if(i===3){
                    this.setState({
                        designStyleHeight:i-2//跳到指定位置
                    })
                    ListStore.lendOrderName=name;
                    ListStore.lendOrderId=id;
                }else{
                    this.setState({
                        designStyleHeight:0//跳到指定位置
                    })
                    ListStore.lendOrderName=name;
                    ListStore.lendOrderId=id;
                }
            }});
    }
    // 上传图片
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

               var imgList =ListStore.lendImgList;
                    imgList.push(file.uri);
                console.log(ListStore.lendImgList);
//                 AppService.uploadImage(file, global.passportId).then((response) => {
//                     const rep = response;
//                     if (!!rep.url && rep.url.length > 0) {
//                         AppService.uploadbyfileid({
//                             fileId: rep.id,
//                             businessId: this.state.processId,
//                             businessType: 'ONEKEYSPACE',
//                             businessCategory: 'PROJECTPROCESS',
//                         }).then((response) => {
//                             that.state.uploadImageList.push(rep);
//                             that.setState({
//                                 //imageList: that.state.imageList.concat(that.state.uploadImageList),
//                                 imageList: that.state.uploadImageList,
//                                 loading: false,
//                             });
//                         }).catch((error) => {
//                             that.setState({
//                                 loading: false,
//                             });
//                             Toast.show(error);
//                         });
//                     } else {
//                         that.setState({
//                             loading: false,
//                         });
//                     }
//                 }).catch((error) => {
//                     that.setState({
//                         loading: false,
//                     });
//                     Toast.show(error);
//                 });
            }
        });
    }
    // 删除图片
    deleteImg(id, index) {
        const _this = this;
        //if (global.isConnected) {
        const vm = {
            businessType: 'ONEKEYSPACE',
            businessId: this.state.processId,
        };
        // 获取成果图片
        AppService.getUploadImage(vm).then((data) => {
            if (data.message) {
                Toast.show(data.message);
                return;
            }
            if (!!data.errors === true && !!data.errors.length > 0) {
                Toast.show(data.errors[0].message);
            } else {
                _this.setState({
                    imgList: data.attachmentList || [],
                }, () => {
                    for (let i = 0; i < _this.state.imgList.length; i++) {
                        if (id === _this.state.imgList[i].fileId) {
                            AppService.deleteUploadImage({ attachmentId: _this.state.imgList[i].id }).then((response) => {
                                if (response.message) {
                                    Toast.show(response.message);
                                    return;
                                }
                                if (!!response.errors === true && !!response.errors.length > 0) {
                                    Toast.show(response.errors[0].message);
                                } else {
                                    _this.state.uploadImageList.splice(index, 1);
                                    _this.setState({
                                        imageList: _this.state.uploadImageList,
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
        /*  } else {
            Toast.show('网络异常');
          }*/
    }
    //借出样品
    lendSample=()=>{
        // ListStore.lendSample();
        if(ListStore.lendOrderName==''){
            Toast.show('请选择执行订单', Toast.SHORT);
        }else{
            this.setState({
                loading:true
            })
            let data={
                "sampleId":ListStore.sampleId,
                "exeOrder":ListStore.lendOrderName,
                "orderId":ListStore.lendOrderId,
                "remark":ListStore.lendRemark
            };
            FetchUtil.post(ListStore.ipPath+'/api/management/app/sample/out',data).then(res=>{
                console.log(res);
                this.setState({
                    loading:false
                })
                if(res.errmsg==='成功'){
                    Toast.show('成功借出样品', Toast.SHORT);
                    this.props.navigation.navigate('mySample',{})
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'mySample'})
                        ]
                    })
                    this.props.navigation.dispatch(resetAction);
                    ListStore.lendOrderName='';
                    ListStore.lendOrderId='';
                }else{
                    Toast.show('借出样品失败', Toast.SHORT);
                    ListStore.lendOrderName='';
                    ListStore.lendOrderId='';
                }

            }).catch((error)=>{
                console.warn(error);
            });
        }
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
                    <Image style={{width: 25/zoomW*2,height:25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
        );
    }
    render () {
        return (
            <View style={{flex:1}}>
                <Modal
                    animationType="none"
                    transparent
                    visible={this.state.loading}
                    onRequestClose={() => {}}
                >
                    <View style={styles.loadingBg}>
                        <ActivityIndicator size="large" />
                    </View>
                </Modal>
                <View style={listStyle.container}>
                    <ScrollView style={listStyle.content}>
                        <View>
                            <View style={listStyle.sample}>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>Label</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.sampleNo}</Text>
                                    </View>
                                </View>
                                <View style={listStyle.item}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>样品名称</Text>
                                    </View>
                                    <View style={listStyle. itemDetail}>
                                        <Text style={listStyle.listText}>{ListStore.sampleDetailList.sampleName}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={listStyle.item} onPress={()=>{this.goExecutionOrder()}}>
                                    <View style={listStyle.itemDesc}>
                                        <Text style={listStyle.listTitle}>执行订单</Text>
                                    </View>
                                    <View style={[listStyle. itemDetail,{marginRight:3/zoomW*2}]}>
                                        {ListStore.lendOrderName==''?<Text style={listStyle.listText}>请选择执行订单</Text>
                                            :<Text style={listStyle.listText}>{ListStore.lendOrderName}</Text>
                                        }
                                    </View>
                                    <Image source={require('../../img/icon_arrow_down_passion_blue_idle_25x25@xhdi.png')} style={{width:25/zoomW*2,height:25,marginRight:20/zoomW*2}} resizeMode='contain'/>
                                </TouchableOpacity>
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
                                        <Text style={{
                                            width:350/zoomW*2,
                                            height:1,
                                            backgroundColor:'#E7E7E9',
                                            marginTop:12,
                                            marginBottom:10,
                                        }}>

                                        </Text>
                                        <View style={styles.formViewRemarkItem}>
                                            <TextInput
                                                style={styles.formViewItemsRemark}
                                                underlineColorAndroid="transparent"
                                                placeholder="请输入备注信息，选填"
                                                placeholderTextColor="#9B9B9B"
                                                maxLength={200}
                                                multiline={true}
                                                ref={'content'}
                                                textAlignVertical="top"
                                                onChangeText={(newText) =>{ListStore.updateLendRemark(newText)}}
                                            />
                                                <Text
                                                style={{
                                                    opacity: 0.5,
                                                    fontFamily:'PingFangSC-Regular',
                                                    fontSize: 12,
                                                    color:'#59708A',
                                                    letterSpacing: 0,
                                                    textAlign: 'right',
                                                    lineHeight: 20
                                                }}
                                                >0/200字</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formRepair}>
                                <View style={styles.formRepairDivTitle}>
                                    <Text style={styles.formRepairTitleLabel}>归还拍照</Text>
                                    <Text style={styles.formRepairTitleRemarks}>（选项，最多4张）</Text>
                                </View>
                                <View style={styles.formView}>
                                    {ListStore.lendImgList.length>0 && ListStore.lendImgList.map((item, index) => this.lendImage(item, index))}
                                    {/*{this.state.imageList.length<6&&*/}
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => NoDoublePress.onPress(() => { this.selectImage(); })}>
                                        <Image style={{width: 60/zoomW*2,height:60}} source={require('../../img/icon_add_pic_60x60@xhdi.png')} resizeMode="contain"/>
                                    </TouchableOpacity>
                                    {/*}*/}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={listStyle.button} onPress={()=>{this.lendSample()}}>
                        <Text style={listStyle.textButton}>立即借出</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    formViewRemarkItem: {
        backgroundColor: '#ffffff',
    },
    formViewItemsRemark: {
        height: 80,
        opacity: 0.5,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#9B9B9B',
        letterSpacing: 0,
        lineHeight: 20
    },
    formRepair: {
        marginTop:26,
        marginBottom:74,
        backgroundColor:"#fff",
        paddingLeft: 15 / zoomW * 2,
        paddingRight: 15 / zoomW * 2,
        paddingBottom: 40
    },
    formRepairDivTitle: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    formRepairDivTitleR: {
        width: 4 / zoomW * 2,
        height: 14,
        backgroundColor: '#28C35A',
        borderRadius: 2 / zoomW * 2,
    },
    formRepairTitleLabel: {
        paddingLeft: 5 / zoomW * 2,
        fontSize: 14,
        color: '#333333'
    },
    formRepairTitleRemarks: {
        fontSize: 14,
        color: '#333333'
    },
    formView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    formUploads: {
        width: 80 / zoomW * 2,
        height: 80 / zoomW * 2,
        borderStyle: 'dotted',
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formUploadsText: {
        fontSize: 20,
        color: '#666666'
    },
    loadingBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default ImmediatelyLend;