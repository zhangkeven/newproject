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
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../../service/rpc";
import {NavigationActions} from "react-navigation";
import Toast from "react-native-simple-toast";
@observer
class operatingRecord extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '操作记录',
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
                const { goBack } = this.props.navigation;
                goBack();
            }
        });
        NetInfo.fetch().done((connectionInfo) => {
            if (connectionInfo.toLowerCase() === 'none') {
                Toast.show('网络异常,请检查手机网络', Toast.SHORT);
            } else {
                ListStore.getOperatingRecord();
            }
        });

    }

    //跳转到操作记录详情
    recordDetail=()=>{
        this.props.navigation.navigate('RecordDetail',{});
    }
    //操作记录
    _keyExtractor = (item, index) => index;
    recordItem({ item, index }) {
        return (
            <TouchableOpacity style={listStyle.item}  key={index} onPress={()=>{this.recordDetail()}}>
                <View style={listStyle.itemDesc}>
                    <Text style={listStyle.listTitle}>{item.operateAction}</Text>
                </View>
                <Text>{item.operateTime}</Text>
                <View style={listStyle.itemChoose}>
                    <Image style={{width: 25/zoomW*2,height:25}} source={require('../../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
        );
    }
    render () {
        return (
            <View style={{flex:1}}>
                <View style={listStyle.order}>
                    <FlatList
                        data={ListStore.operatingRecord}
                        extraData={this.state}
                        renderItem={this.recordItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </View>
        )

    }
}
export default operatingRecord;