/**
 * 获取设备尺寸和缩放比例
 */
import {Dimensions,Platform,StatusBar} from 'react-native';


export const width = Dimensions.get('window').width;
export const height = Platform.OS == 'ios' ? Dimensions.get('window').height:Dimensions.get('window').height - StatusBar.currentHeight ;
export const zoomW =  isIphoneX()?750 / parseInt(Dimensions.get('window').width):750 / parseInt(Dimensions.get('window').width);
export const zoomH = isIphoneX()?812 / parseInt(Dimensions.get('window').height):667 / parseInt(Dimensions.get('window').height);


export function isIphoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}