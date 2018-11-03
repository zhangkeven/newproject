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
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../../service/rpc";
import {NavigationActions} from "react-navigation";
@observer
class mySample extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '我的样品',
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
        ListStore.getMySample();
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
    //跳转到样品详情
    toRestore=(id)=>{
        ListStore.MySampleId=id;
        this.props.navigation.navigate('Restore',{})
    }
    //历史记录
    _keyExtractor = (item, index) => index;
    historyItem({ item, index }) {
        return (
            <TouchableOpacity style={styles.main} key={index} onPress={()=>{this.toRestore(item.id)}}>
                <View style={{
                    flexDirection:'row',
                    borderBottomColor:'#DADADD',
                    borderBottomWidth: 0.5,
                    width:'100%',
                    height:30,
                    alignItems:'center'
                }}>
                    <Text style={styles.number}>样品编号：{item.sampleNo}</Text>
                    <Text style={styles.status}>{this.setStatus(item.status)}</Text>
                </View>
                <View style={{alignItems:'center',width:'100%',height:70,justifyContent:'space-around',flexDirection:'row'}}>
                        <Image
                            style={{marginLeft:20/zoomW*2,width:78/zoomW*2,height:78}}
                            source={{uri:item.img }}
                            resizeMode='contain'
                        />
                    <View style={{marginRight:80/zoomW*2}}>
                        <Text style={styles.title}>{item.sampleName}</Text>
                        <Text style={[styles.number,{marginLeft:0}]}>库位编号 {item.warehouseNo}</Text>
                    </View>
                    <Image style={{width: 25/zoomW*2,height: 25,marginRight: 23/zoomW*2}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')}/>
                </View>
            </TouchableOpacity>
        );
    }
    render () {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.search}>
                        <View style={styles.bgTextInput}>
                            <Image source={require('../../img/Icon_搜索25x25@xhdi.png')} style={styles.searchIcon} resizeMode='contain'/>
                            <TextInput style={styles.textInput}
                                       keyboardType='web-search'
                                       underlineColorAndroid='transparent'
                                       placeholder='请输入样品编号或名称'
                                       placeholderTextColor="#C4C4C6"
                                       onChangeText={text => this.setState({searchText: text})}
                                       onSubmitEditing={() => {
                                       }}/>
                        </View>
                    </View>

                        <FlatList
                            data={ListStore.MySampleList}
                            extraData={this.state}
                            renderItem={this.historyItem.bind(this)}
                            keyExtractor={this._keyExtractor}
                        />

                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    search:{
        width:'100%',
        height:50,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 13
    },
    bgTextInput:{
        width:360/zoomW*2,
        height:35,
        backgroundColor:'#E8EBEF',
        borderRadius:5/zoomW*2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    searchIcon:{
        width:20/zoomW*2,
        height:20
    },
    textInput: {
        width: 310 / zoomW * 2,
        height: 34,
        fontSize:14,
        padding: 0,
        marginLeft: 13/zoomW*2
    },
    searchResult:{
        width:360/zoomW*2,
        height:35,
        backgroundColor:'#E8EBEF',
        borderRadius:5/zoomW*2,
        flexDirection:'row',
        alignItems:'center'
    },
    main:{
        width:'100%',
        height:100,
        backgroundColor:'#fff',
        marginBottom: 4
    },
    number:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color:'#9B9B9B',
        letterSpacing: 0,
        marginLeft:18/zoomW*2
    },
    status:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color:'#9B9B9B',
        letterSpacing: 0,
        marginLeft: 155/zoomW*2,
    },
    title:{
        fontFamily: 'PingFangSC-Medium',
        fontSize: 18,
        color: '#000000',
        letterSpacing: 0
    },
    historyText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize:12,
        color:'#898994',
        letterSpacing: 0.17,
        marginLeft: 17/zoomW*2
    },
    clearText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color:'#3788E4',
        letterSpacing: 0.17,
        marginLeft: 235/zoomW*2
    }
});
export default mySample;