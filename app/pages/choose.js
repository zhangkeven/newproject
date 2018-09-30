import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native';
import ListStore from "../mobx/listStore";
import Toast from "react-native-simple-toast";
export default class edit extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.headTitle,
        headerLeft: (<View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 15, paddingLeft: 10}} onPress={() => navigation.state.params.operaGoBack()}>
                <Image style={{width: 16, height: 16}} source={require('../img/head_back2x.png')}
                       resizeMode="contain"/>
            </TouchableOpacity>
        </View>),
        headerRight:(<View/>)
    })
    constructor(props) {
        super(props)
        this.state = {
            headTitle:'',
            dataList: this.props.navigation.state.params.data || '',
            phoneShow: this.props.navigation.state.params.show,
            addressShow: false,
            arrayList: this.props.navigation.state.params.showList,
            type:this.props.navigation.state.params.type || '',
            title:'获取验证码',
            count:Number(60)
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
    select=(item,type)=>{
        this.props.navigation.state.params.logic.selectItem(item,type);
        this.props.navigation.goBack();
    }
    keyExtractor = (item, index) => index.toString();
    renderList ({item,index}) {
        return (
            <TouchableOpacity onPress={()=>this.select(item,this.state.type)} key={index}>
            <View  style={styles.item}>
                    <View>
                        <Text>{item}</Text>
                    </View>
            </View>
            </TouchableOpacity>
        )
    }
    getNumber(){
       if(this.state.title==='获取验证码'){
           let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
           let reg=/^\d{6}$/;
           if(!phoneReg.test(this.props.navigation.state.params.logic.phone)){
               Toast.show('请输入正确的手机号码！', Toast.SHORT);
           }else{
               const timer1 = setTimeout(() => {
                   clearTimeout(timer1);
                   Toast.show('验证码为888666', Toast.SHORT);
               }, 5000);
               let count = this.state.count;
               const timer = setInterval(() => {
                   this.setState({
                           title: '重新发送'+'('+(count--)+')'
                       },
                       ()=> {
                           if (count === 0 || reg.test(this.props.navigation.state.params.logic.upWd)) {
                               clearInterval(timer);
                               this.setState({
                                   title:'获取验证码',
                                   count: 60
                               })
                           }
                       });
               }, 1000);
           }
       }
    }
    save(){
        let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let reg=/^\d{6}$/;
        if(!phoneReg.test(this.props.navigation.state.params.logic.phone)){
            Toast.show('请输入正确的手机号码！', Toast.SHORT);
        }else if(!reg.test(this.props.navigation.state.params.logic.upWd)){
            Toast.show('验证码不正确', Toast.SHORT);
        }else{

            this.props.navigation.goBack();
        }
    }
    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                {this.state.arrayList && <View>
                    <FlatList 
                        data={this.state.dataList}
                        renderItem={this.renderList.bind(this)}
                        keyExtractor={this.keyExtractor}
                    />
                </View>}
                {this.state.phoneShow && <View style={{width:'100%',height:'100%'}}>
                    <View style={{flex:1}}>
                        <View style={styles.phone}>
                            <Text style={{marginLeft: 20, marginRight: 20}}>手机号</Text>
                            <TextInput placeholder='请输入手机号' underlineColorAndroid='transparent' style={styles.input} keyboardType={Platform.OS === 'ios'?'decimal-pad':"phone-pad"} onChangeText={(newText) => this.props.navigation.state.params.logic.updatePhone(newText)} maxLength={11}/>
                        </View>
                        <View style={styles.phone}>
                            <Text style={{marginLeft: 20, marginRight: 20}}>验证码</Text>
                            <TextInput placeholder='请输入手机号' underlineColorAndroid='transparent' style={styles.input} keyboardType={Platform.OS === 'ios'?'decimal-pad':"phone-pad"} onChangeText={(newText) => this.props.navigation.state.params.logic.updateWd(newText)} maxLength={6}/>
                            <TouchableOpacity onPress={()=>{this.getNumber()}}>
                                <Text style={{marginRight: 20}}>{this.state.title}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.save} onPress={()=>{this.save()}}>
                        <Text style={styles.saveText}>保存</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
    },
    saveText: {
        color: '#fff'
    },
    save: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28C35A'
    },
    item: {
        height: 40,
        backgroundColor: '#ffffff',
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        borderStyle:"solid",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    phone: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        borderStyle:"solid",
    },
    input: {
        flex: 1
    }
})