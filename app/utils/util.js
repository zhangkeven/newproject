/**
 * Created by DEV005 on 2017/8/31.
 */

import React, { Component } from 'react';
import { BackHandler,AppState,StyleSheet,View,Text
    , NativeModules,AsyncStorage,NavigationActions,PixelRatio,StatusBar,
    ActivityIndicator,TouchableOpacity,Image,Touch,Platform,Dimensions
} from 'react-native';

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const __IOS__ = Platform.OS === "ios";
export const __ANDROID__ = Platform.OS !== "ios";
export const line = 1 / PixelRatio.get();
import Toast from 'react-native-root-toast';
export const zoomW =  isIphoneX()?750 / parseInt(Dimensions.get('window').width):750 / parseInt(Dimensions.get('window').width);
export const zoomH = isIphoneX()?812 / parseInt(Dimensions.get('window').height):667 / parseInt(Dimensions.get('window').height);


export const publicStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6"
  },
  loadingBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderBottomStyle: {
    borderBottomWidth: line,
    borderBottomColor: "#F6F6F6"
  },
  shadow:{
	  shadowColor:"#DCDCDC",
	  shadowOffset:{width:0,height:1},
	  shadowOpacity:0.5,
	  shadowRadius:2,
	  elevation:1,
  }
})

/**
 * 冒一个时间比较短的Toast
 * @param content
 */
export const xnToast = (content) => {
    if (global.toast !== undefined) {
        Toast.hide(toast);
    };
    global.toast = Toast.show(content.toString(), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    },100);
};

export const formatStringWithHtml = (originString) => {
    if (originString === undefined) {
        return '';
    }
    const newString = originString
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    return newString;
};


//是否 isIphoneX
export function isIphoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}

//获取头部高度
export function getHeaderHeight() {
    if( Platform.OS === 'android'){
        return 48;

    }else if(Platform.OS === 'ios') {

        if(isIphoneX()){
            return 88;
        }else {
            return 64;
        }
    }
}
//获取头部填充高度
export function getHeaderPadding() {
    if( Platform.OS === 'android'){
        return 0;
    }else if(Platform.OS === 'ios') {
        if(isIphoneX()){
            return 44;
        }else {
            return 20;
        }
    }
}

//获取头部填充底部填充高度
export function getFooterBottom() {
    if( Platform.OS === 'android'){
        return 0;
    }else if(Platform.OS === 'ios') {
        if(isIphoneX()){
            return 34;
        }else {
            return 0;
        }
    }
}

//防止按钮多次触发
export const NoDoublePress = {
    lastPressTime: 1,
    onPress(callback){
        let curTime = new Date().getTime();
        if (curTime - this.lastPressTime > 1000) {
            this.lastPressTime = curTime;
            callback();
        }
    },
}

export function xnBorderWidth() {
    if(isIphoneX()){
        return 1;
    }else {
        return 0.5;
    }
}



const xnUtils={
    xnToast:xnToast,
    isIphoneX:isIphoneX,
    getHeaderHeight:getHeaderHeight,
    getHeaderPadding:getHeaderPadding,
    getFooterBottom:getFooterBottom,
    xnBorderWidth:xnBorderWidth
}
export default xnUtils;