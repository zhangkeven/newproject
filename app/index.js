import React from 'react';
import {NavigationActions, StyleSheet, Touch, View} from 'react-native';

import {getHeaderHeight, getHeaderPadding} from "./utils/util";
import HomeIndex from './pages/HomeIndex';
import SampleInform from './pages/sampleInform';
import  Choose from  './pages/choose';
import Login from './pages/login/login';
import {StackNavigator} from 'react-navigation';
import {fromBottomLikeAndroid} from "./utils/NavigationUtil";
const styles = StyleSheet.create({
    tabIcon: {
        height: 24,
        width: 24,
        marginBottom: 2,
    }
});
const Navigator = StackNavigator({
    Index: {screen: HomeIndex},
    SampleInform :{screen: SampleInform},
    Choose:{screen: Choose}
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
    Login:{screen:Login},
    Navigator: {screen: Navigator},

}, {
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: () => ({screenInterpolator: fromBottomLikeAndroid}),
    cardStyle: {
        backgroundColor: 'rgba(0,0,0,0)',
        shadowOpacity: 0,
    }
});
//export default Navigator;
