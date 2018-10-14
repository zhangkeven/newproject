import React from 'react';
import {NavigationActions, StyleSheet, TouchableOpacity, View} from 'react-native';

import {getHeaderHeight, getHeaderPadding} from "./utils/util";
import HomeIndex from './pages/HomeIndex';
import mySample from './pages/sampleInformation/mySample';
import userDetail from './pages/user/userDetail';
import Restore from './pages/sampleInformation/restore';
import Lend from './pages/sampleInformation/lend';
import ImmediatelyLend from './pages/sampleInformation/ImmediatelyLend';
import Scan from './pages/order/scan';
import SearchOrder from './pages/order/searchOrder';
import OrderDetail from './pages/order/orderDetail';
import ChildOrderDetail from './pages/order/childrenOrderDetail';
import storageLocationSearch from './pages/LocationInformation/storageLocationSearch';
import storageLocationDetail from './pages/LocationInformation/storageLocationDetail';
import  Choose from  './pages/choose';
import Login from './pages/login/login';
import {StackNavigator} from 'react-navigation';
import {fromBottomLikeAndroid} from "./utils/NavigationUtil";
import ImmediatelyRestore from "./pages/sampleInformation/ImmediatelyRestore";
import Handover from "./pages/sampleInformation/handover";
import NotExecutable from "./pages/sampleInformation/notExecutable";
import operatingRecord from "./pages/operatingRecord/operatingRecord";
import RecordDetail from "./pages/operatingRecord/recordDetail";
const styles = StyleSheet.create({
    tabIcon: {
        height: 24,
        width: 24,
        marginBottom: 2,
    }
});
const Navigator = StackNavigator({
    mySample :{screen: mySample},
    userDetail :{screen: userDetail},
    Restore :{screen: Restore},
    ImmediatelyRestore:{screen: ImmediatelyRestore},
    Lend:{screen: Lend},
    ImmediatelyLend:{screen: ImmediatelyLend},
    NotExecutable :{screen: NotExecutable},
    Handover:{screen: Handover},
    Scan:{screen: Scan},
    SearchOrder:{screen: SearchOrder},
    OrderDetail:{screen: OrderDetail},
    ChildOrderDetail:{screen: ChildOrderDetail},
    storageLocationSearch:{screen: storageLocationSearch},
    storageLocationDetail:{screen: storageLocationDetail},
    operatingRecord:{screen: operatingRecord},
    RecordDetail:{screen: RecordDetail},
    Choose:{screen: Choose},
}, {
    // headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    navigationOptions: {
        // // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
        headerStyle: {
            paddingTop: getHeaderPadding(),
            backgroundColor: 'white',
            elevation: 0,   //去掉阴影
            height: getHeaderHeight(),
            borderBottomWidth:1,
            borderBottomColor:"#ddd",
            borderStyle:"solid",
        },
        // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
        headerTitleStyle: {
            color: '#000000',
            alignSelf: "center",
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontSize: 16,
            fontWeight: "bold",
            textAlign: 'center',
        },
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}/>),
        headerRight: (<View style={{flexDirection: 'row', flex: 1}}/>)
    }
});
export const BottomModal = StackNavigator({
    // Demo:{screen: Demo},
    Login:{screen:Login},
    Index: {screen: HomeIndex},
    Navigator: {screen: Navigator},
}, {
    // mode: 'modal',
    headerMode: 'none',
    title: ' ', // 这里不给值
    header: false, // 不显示导航栏
    gesturesEnabled: false,
    transitionConfig: () => ({screenInterpolator: fromBottomLikeAndroid}),
    cardStyle: {
        backgroundColor: 'rgba(0,0,0,0)',
        shadowOpacity: 0,
    }
});
//export default Navigator;
