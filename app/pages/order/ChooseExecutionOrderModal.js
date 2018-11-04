/**
 * Created by yzdd on 2018/2/1.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {line, width} from '../../utils/util';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-end"
    },
    content: {
        width:'100%',
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    titleItem: {
        width: width,
        height: 47,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15
    },
    font1: {
        color: "#5CB438",
        fontSize: 17
    },
    cancelBtn: {
        width: 40,
        height: 20,
    },
    font2: {
        color: "#000",
        fontSize: 17
    },
    item: {
        width:'100%',
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: line,
        borderTopColor: "#F6F6F6",
        flexDirection:'row'
    }

});
import {observer} from "mobx-react/native";
import ListStore from '../../mobx/listStore'
@observer
export default class ProjectProcessModal extends Component {

    cancel = () => {
        const {goBack} = this.props.navigation;
        goBack();
    };

    select = (v,i) => {
        const {projectProcess} = this.props.navigation.state.params;
        const {goBack} = this.props.navigation;
        if (projectProcess) {
            projectProcess.setKey(v.key);
            projectProcess.setValue(v.value);
        }
        this.setState({
            designStyle:v.orderNo
        })
        goBack({name:this.props.navigation.state.params.callback(v.orderNo,v.id,i)});
        goBack();
    };
    constructor(props) {
        super(props);
        this.state = {
            designStyleList: ListStore.childOrderAllList,
            designStyle :this.props.navigation.state.params.designStyle,
            height:this.props.navigation.state.params.height//滚动高度
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.content,{height:ListStore.childOrderAllList.length>3?180:ListStore.childOrderAllList.length*60}]}>
                    <ScrollView
                        style={{flex: 1}}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ref={scrollView => {
                            if(scrollView !== null){
                                setTimeout(()=>{
                                    //父组件传入的参数的option（用于计算偏移，根据自己实际情况）
                                    scrollView.scrollTo({x:0,y:this.state.height*60,animated:true},1)
                                })
                            }}}>
                        {
                            this.state.designStyleList &&this.state.designStyleList.map((v, i) =>
                                <TouchableOpacity activeOpacity={0.8} style={styles.item} key={i} onPress={() => this.select(v,i)}>
                                    {ListStore.lendOrderId ===v.id ? <Text style={{color:'#009688',fontSize:17}}>{v.orderNo}</Text> : <Text style={{fontSize:17}}>{v.orderNo}</Text>}
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </View>
                <View style={{marginTop:10}}>
                    <TouchableOpacity activeOpacity={0.9} onPress={this.cancel}>
                        <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:60,backgroundColor:'#fff'}}>
                            <Text style={styles.font2}>取消</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
