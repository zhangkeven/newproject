import {StyleSheet} from "react-native";
import {zoomW} from "../../utils/util";

const listStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1
    },
    listTitle:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        color: '#323232',
        letterSpacing: 0,
        lineHeight: 20
    },
    listText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        color: '#808080',
        letterSpacing: 0,
        textAlign: 'right'
    },
    sample:{
        width:'100%',
        backgroundColor:'#fff',
        marginBottom: 20
    },
    Department:{
        width:'100%',
        backgroundColor:'#fff',
    },
    person:{
        width:'100%',
        backgroundColor:'#fff',
        marginBottom:20
    },
    personText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#898994',
        marginLeft:19/zoomW*2,
        marginTop: 10,
        marginBottom:4
    },
    remark:{
        width:'100%',
        backgroundColor:'#fff',
    },
    remarkText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#4A4A4A',
        letterSpacing: 0.17
    },
    order:{
        width:'100%',
        backgroundColor:'#fff',
        marginBottom:20
    },
    item: {
        height: 40,
        width:358/zoomW*2,
        backgroundColor: '#ffffff',
        borderBottomWidth:1,
        borderBottomColor:"#E7E7E9",
        borderStyle:"solid",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 17/zoomW*2
    },
    itemDesc: {
        flex:1,
    },
    itemChoose: {
        marginRight: 20/zoomW*2
    },
    itemDetail:{
        justifyContent:'center',
        alignItems:'center',
        marginRight: 20/zoomW*2
    },
    record:{
        width:'100%',
        height:40,
        backgroundColor:'#fff',
        marginBottom:20
    },
    repair:{
        width:'100%',
        backgroundColor:'#fff',
        marginBottom:59
    },
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#107FE0'
    },
    textButton: {
        color: '#fff'
    }
});
export default listStyle;