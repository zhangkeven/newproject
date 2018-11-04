import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import Barcode from 'react-native-smart-barcode'
import {zoomW} from "../../utils/util";
import {NavigationActions} from "react-navigation";
import ListStore from '../../mobx/listStore'
import FetchUtil from "../../service/rpc";
type Props = {};
export default class Scan extends Component<Props> {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: '扫一扫',
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 25/zoomW*2, height:25}} source={require('../../img/icon_arrow_left_passion_blue_idle_25x25@xhdi.png')}
                       resizeMode="contain"/>
            </TouchableOpacity>
        </View>),
        headerRight:(<View/>)
    });
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            viewAppear: false,
        };
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
    componentDidMount() {
        //启动定时器
        this.timer = setTimeout(
            () => this.setState({viewAppear: true}),
            250
        );
    }
    //组件销毁生命周期
    componentWillUnmount() {
        //清楚定时器
        this.timer && clearTimeout(this.timer);
    }

    _onBarCodeRead = (e) => {
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        console.log(e.nativeEvent.data.code);
        this._startScan(e.nativeEvent.data.code);
        // Alert.alert("二维码", e.nativeEvent.data.code, [
        //     {text: '确认', onPress: () => this._startScan()},
        // ])
    };

    _startScan = (e) => {
        console.log(e);
        console.log(e.slice(1,-1));
        var str =e.slice(1,-1);
        status= str.split(',')[0];
        id=str.split(',')[1];
        console.log(status);
        console.log(id);
         ListStore.sampleId=id;
         ListStore.getSampleDetail();
            let data={
                "id":id
            };
            FetchUtil.post(ListStore.ipPath+'/api/management/app/sample/detail',data).then(res=>{
                if(res.data.sampleDetail.status==1){
                    this.props.navigation.navigate('Lend')
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Lend'})
                        ]
                    })
                    this.props.navigation.dispatch(resetAction);
                }else{
                    this.props.navigation.navigate('NotExecutable')
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'NotExecutable'})
                        ]
                    })
                    this.props.navigation.dispatch(resetAction);
                }
            }).catch((error)=>{
                console.warn(error);
            });
        // this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.viewAppear ?
                    <Barcode style={{flex: 1}}
                             ref={component => this._barCode = component}
                             onBarCodeRead={this._onBarCodeRead}
                             scannerRectCornerColor={'#107FE0'}
                    />
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
