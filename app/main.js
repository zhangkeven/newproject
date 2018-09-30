/**
 * Created by DEV005 on 2017/8/23.
 */
import React, { Component } from 'react';
import {
    BackHandler,
    AppState,
    StyleSheet,
    View,
    Text,
    NativeModules,
    AsyncStorage,
    NavigationActions,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Touch,
    Platform,
    Dimensions
} from 'react-native';
import xnUtils,{xnToast,getHeaderHeight,getHeaderPadding,getFooterBottom} from "./utils/util";
import {BottomModal} from "./index";
import { observer } from 'mobx-react';
import SplashScreen from 'rn-splash-screen';
@observer
class App extends Component{

    constructor(props){
        super(props)
        this.state = {
            init: false
        }
    }
    async componentWillMount(){
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', () => {});
        }
    }
    componentDidMount(){

    }

    render() {
        return  <View style={styles.root}>
           <BottomModal />
        </View>
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginBottom:getFooterBottom(),
        backgroundColor:"#fff",
    },
    xnLoading:{
        position: "absolute",
        left:0,
        right:0,
        top:0,
        bottom:0,
        zIndex:9,
        backgroundColor:"#fff",
    }

});
export default App;