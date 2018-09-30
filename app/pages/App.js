import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet ,
    ScrollView,
    ActivityIndicator,
    Image,
    Platform,
    FlatList
} from 'react-native'
import {observer} from 'mobx-react/native'
import NewItem from '../NewItem'
import {line, publicStyle, width, NoDoublePress, zoomW} from "../utils/util";
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import DatePicker1 from 'react-native-datepicker';

@observer
class TodoList extends Component {
    constructor () {
        super()
        this.state = {
            text: '',
            showInput: false,
            dataList: [
                {name: '性别'},
                {name: '家庭住址'},
                {name: '工作经验'},
                {name: '手机号码'},
            ]
        }
    }
    toggleInput () {
        this.setState({ showInput: !this.state.showInput })
    }
    addListItem () {
        this.props.store.addListItem(this.state.text)
        this.setState({
            text: '',
            showInput: !this.state.showInput
        })
    }
    removeListItem (item) {
        this.props.store.removeListItem(item)
    }
    updateText (text) {
        this.setState({text})
    }
    addItemToList (item) {
        this.props.navigator.push({
            component: NewItem,
            type: 'Modal',
            passProps: {
                item,
                store: this.props.store
            }
        })
    }
    keyExtractor = (item, index) => index.toString();
    renderItem ({item,index}) {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Choose',{
                data: item.name
            })}>
                <View key={index} style={styles.item}>
                    <View style={styles.itemDesc}>
                        <Text style={{color:'#000'}}>{item.name}</Text>
                    </View>
                    <View style={styles.itemChoose}>
                        <Image style={{width: 16,height: 26}} source={require('../img/icon.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { showInput } = this.state
        const { list } = this.props.store
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarText}>
                                <Text style={{fontSize: 17,color:'#000'}}>个人头像</Text>
                            </View>
                            <View style={styles.avatar}>

                            </View>
                            <View style={styles.avatarIcon}>
                                <Image style={{width: 16,height: 26}} source={require('../img/icon.png')}/>
                            </View>
                        </View>
                        <View style={styles.edit}>
                            <View style={styles.item}>
                                <View style={styles.name}>
                                    <Text style={{color:'#000'}}>姓名</Text>
                                </View>
                                <View style={styles.nameText}>
                                    <TextInput style={styles.formViewItemsInput} underlineColorAndroid="transparent" maxLength={50} placeholder="必填" placeholderTextColor="#BBBBBB" maxLength={100}
                                               onChangeText={(newText) => {}}/>
                                </View>
                            </View>
                            <FlatList
                                data={this.state.dataList}
                                renderItem={this.renderItem.bind(this)}
                                keyExtractor={this.keyExtractor}
                            />
                        </View>
                    </View>
                    <View style={styles.save}>
                        <Text style={styles.saveText}>保存</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const NoList = () => (
    <View style={styles.noList}>
        <Text style={styles.noListText}>No List, Add List To Get Started</Text>
    </View>
)

const styles = StyleSheet.create({
    formViewItemsInput: {
        padding: 0,
        fontSize:14
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1
    },
    titleContainer: {
        height: 44,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    back: {
        width: 40,
        marginLeft: 10,
    },
    title: {
        flex: 1,
        color: '#000000',
        alignItems: 'center',
        justifyContent: "center"
    },
    share: {
        width: 40
    },
    avatarContainer: {
        height: 86,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    avatarText: {
        marginLeft: 10,
        flex: 1,
    },
    avatar: {
        height: 56,
        width: 56,
        backgroundColor: '#d8d8d8',
        marginRight: 10,
    },
    avatarIcon: {
        width: 8,
        marginRight: 10
    },
    item: {
        height: 40,
        backgroundColor: '#ffffff',
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        borderStyle:"solid",
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        flex: 1,
        marginLeft: 10
    },
    nameText: {
        marginRight: 10
    },
    itemDesc: {
        flex: 1,
        marginLeft: 10
    },
    itemChoose: {
        marginRight: 10
    },

    save: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28C35A'
    },
    saveText: {
        color: '#fff'
    }
})

export default TodoList