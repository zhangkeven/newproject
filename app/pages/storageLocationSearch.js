import React, { Component } from 'react'
import App from './App';
import ListStore from '../mobx/listStore'
import listStyle from './listStyle/listStyle';
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
import {line, publicStyle, height,width,NoDoublePress,zoomW,zoomH,getHeaderPadding, getHeaderHeight,} from "../utils/util";
import {observer} from "mobx-react/native";
import ImagePicker from "react-native-image-picker";
import FetchUtil from "../service/rpc";
import {NavigationActions} from "react-navigation";
@observer
class storageLocationSearch extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '库位查询',
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 25/zoomW*2, height:25}} source={require('../img/icon_arrow_left_passion_blue_idle_25x25@xhdi.png')}
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
    }
    //跳转到订单详情
    toOrderDetail=()=>{
        this.props.navigation.navigate('storageLocationDetail',{})
    }
    //历史记录
    _keyExtractor = (item, index) => index;
    historyItem({ item, index }) {
        return (
            <TouchableOpacity style={listStyle.item}  key={index} onPress={()=>{this.toOrderDetail()}}>
                <View style={listStyle.itemDesc}>
                    <Text style={listStyle.listTitle}>{item}</Text>
                </View>
                <View style={listStyle.itemChoose}>
                    <Image style={{width: 25/zoomW*2,height: 25}} source={require('../img/icon_arrow_right_warm_gray_idle_25x25@xhdi.png')}/>
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
                            <Image source={require('../img/Icon_搜索25x25@xhdi.png')} style={styles.searchIcon} resizeMode='contain'/>
                            <TextInput style={styles.textInput} keyboardType='web-search'
                                       underlineColorAndroid='transparent'
                                       placeholder='请输入库位编号，如Dxx-xx-xx'
                                       placeholderTextColor="#C4C4C6"
                                       onChangeText={text => this.setState({searchText: text})}
                                       onSubmitEditing={() => {
                                       }}/>
                        </View>
                    </View>
                    <View style={styles.searchResult}>
                        <TouchableOpacity>
                            <Text style={styles.historyText}>搜索历史</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.clearText}>清空记录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'100%',backgroundColor:'#fff'}}>
                        <FlatList
                            data={ListStore.orderList}
                            extraData={this.state}
                            renderItem={this.historyItem.bind(this)}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
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
        alignItems: 'center'
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
export default storageLocationSearch;