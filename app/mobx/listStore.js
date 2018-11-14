import {observable,action} from 'mobx'
import FetchUtil from "../service/rpc";
import Toast from "react-native-simple-toast";
import {NavigationActions} from "react-navigation";
let index = 0
class ObservableListStore {
    @observable
    top=133;
    @observable
    uid="";
    @observable
    uName="";//用户名
    @observable
    UpWd="";//用户密码
    @observable
    ticked="";//请求头
    @observable
    name;
    @observable
    genderList;
    @observable
    gender;
    @observable
    addressLis;
    @observable
    address;
    @observable
    workList;
    @observable
    work;
    @observable
    phone;
    @observable
    upWd;
    @observable
    imagePath;
    @observable
    ipPath="";//接口地址
    @observable
    imgIp='http://192.168.1.59:8080';//图片域名
   @observable
    isLogin;
    @observable
    MySampleList=[];//我的样品列表
    @observable
    MySampleId='';//我的样品id
    @observable
    MySampleDetail=[];//我的样品详情
    @observable
    sampleId="";//样品id
    @observable
    operatingRecord =[];//操作记录
    @observable
    sampleDetailList=[];//样品详情
    @observable
    lendImgList=[];//借出样品图片列表
    @observable
    lendOrderName="";//执行订单名称
    @observable
    lendOrderId="";//执行订单id
    @observable
    isLendSuccess="";//是否借出成功
    @observable
    isRestoreSuccess="";//是否归还成功
    @observable
    searchText='';//订单搜索关键字
    @observable
    orderList=[] ;//订单列表
    @observable
    orderId="" ;//订单id
    @observable
    orderDetailList=[]  ;//订单详情
    @observable
    childOrderList=[]  ;//子订单列表
    @observable
    childOrderName=[]  ;//所属订单名称
    @observable
    childOrderUid=[]  ;//所属订单id
    @observable
    childOrderAllList=[]  ;//所属子订单列表
    @observable
    childOrderId="" ;//子订单id
    @observable
    childOrderDetailList=[]  ;//子订单详情
    @observable
    lendRemark="" ;//立即借出备注
    @observable
    retoreRemark="" ;//立即归还备注
    @observable
    searchStoreText="" ;//库位搜索关键字
    @observable
    storeList=[] ;//库位列表
    @observable
    storeId="" ;//库位id
    @observable
    storeDetailList=[];//库位信息
    @observable
    sampleInList=[];//在库样品信息
    @action
    updateLendRemark=(text)=>{
        this.lendRemark=text;
    }
    @action
    updateRetoreRemark=(text)=>{
        this.retoreRemark=text;
    }
    @action
    getList=()=>{
        this.genderList=['男','女','保密'];
        this.addressList=['江苏省盐城市','江苏省苏州市','江苏无锡市','江苏省南京市'];
        this.workList=['1年以内','2年','3年','4年','5年','6年','7年以上'];
    }
    @action
    selectItem= (item,type)=> {
        if(type==='性别'){
            this.gender=item;
        }else if(type==='家庭住址'){
            this.address=item;
        }else if(type==='工作经验'){
            this.work=item;
        }
    }
    @action
    updateTop=()=>{
        this.top=0;
    }
    @action
    updateUName=(name)=>{
        this.uName=name;
    }
    @action
    updateUpWd=(text)=>{
        this.UpWd=text;
    }
    @action
    updateName=(name)=>{
        this.name=name;
    }
    @action
    updatePhone=(phone)=>{
        this.phone=phone;
    }
    @action
    updateWd=(upwd)=>{
        this.upWd=upwd;
    }
    @action
    updateSearchText=(text)=>{
        this.searchText=text;
    }
    //搜索订单列表
    @action
    searchOrder=()=>{
        let data={
            "orderCode": this.searchText};
        FetchUtil.post(this.ipPath+'/api/management/app/order/list',data).then(res=>{
            console.log(res.data.order);
            this.orderList=res.data.order;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取订单详情
    @action
    getOrderDetail=()=>{
        let data={
            "id": this.orderId};
        FetchUtil.post(this.ipPath+'/api/management/app/order/orderDetail',data).then(res=>{
            console.log(res.data);
            this.orderDetailList=res.data;
            this.childOrderList=res.data.subOrderListDTOList;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取操作记录
    @action
    getOperatingRecord=()=>{
        let data={
            "id": this.sampleId
        };
        FetchUtil.post(this.ipPath+'/api/management/app/sample/oprList',data).then(res=>{
            console.log(res);
            this.operatingRecord=res.data;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取子订单详情
    @action
    getChildOrderDetail=()=>{
        let data={
            "id": this.childOrderId};
        FetchUtil.post(this.ipPath+'/api/management/app/order/subOrderDetail',data).then(res=>{
            console.log(res);
            this.childOrderDetailList=res.data;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取库位搜索框字段
    @action
    updateSearchStore=(text)=>{
        this.searchStoreText=text;
    }
    //搜索库位
    @action
    searchStoreLocation=()=>{
        let data={
            "warehouseNo":this.searchStoreText };
        FetchUtil.post(this.ipPath+'/api/management/app/warehouse/list',data).then(res=>{
            console.log(res);
            this.storeList=res.data;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取库位详情
    @action
    getStoreDetail=()=>{
        let data={
            "id":this.storeId };
        FetchUtil.post(this.ipPath+'/api/management/app/warehouse/detail',data).then(res=>{
            console.log(res);
            this.storeDetailList=res.data.warehouse;
            this.sampleInList=res.data.sampleIn;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取样品详情
    @action
    getSampleDetail=()=>{
        let data={
           "id":this.sampleId
        };
        FetchUtil.post(this.ipPath+'/api/management/app/sample/detail',data).then(res=>{
            console.log(res.data.sampleDetail);
            console.log(res.data.belongOrder);
            this.sampleDetailList=res.data.sampleDetail;
            this.childOrderAllList=res.data.belongOrder;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取我的样品列表
    @action
    getMySample=()=>{
        let data={

        };
        FetchUtil.post(this.ipPath+'/api/management/app/user/mySample',data).then(res=>{
            console.log(res);
            this.MySampleList=res.data;
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //获取我的样品详情
    @action
    getMySampleDetail=()=>{
        let data={
            "id":this.MySampleId
        };
        FetchUtil.post(this.ipPath+'/api/management/app/sample/detail',data).then(res=>{
            console.log(res);
                this.MySampleDetail=res.data.sampleDetail;
                this.childOrderAllList=res.data.belongOrder;
                this.childOrderName=res.data.belongOrder[0].orderNo;
            this.childOrderId=res.data.belongOrder[0].id;
                console.log(this.childOrderName);
        }).catch((error)=>{
            console.warn(error);
        });
    }
    //立即借出
    @action
    lendSample=()=>{
        // let data={
        //     "sampleId":this.sampleId,
        //     "exeOrder":this.lendOrderName,
        //     "orderId":this.lendOrderId
        // };
        // FetchUtil.post(this.ipPath+'/api/management/app/sample/out',data).then(res=>{
        //     console.log(res);
        //     if(res.errmsg==='成功'){
        //         Toast.show('成功借出样品', Toast.SHORT);
        //         this.props.navigation.navigate('mySample',{})
        //         const resetAction = NavigationActions.reset({
        //             index: 0,
        //             actions: [
        //                 NavigationActions.navigate({ routeName: 'mySample'})
        //             ]
        //         })
        //         this.props.navigation.dispatch(resetAction);
        //     }
        //
        // }).catch((error)=>{
        //     console.warn(error);
        // });
    }
    //立即归还
    @action
    restoreSample=()=>{
        let data={
            "sampleId":this.MySampleId,
            "remark":this.retoreRemark

        };
        FetchUtil.post(this.ipPath+'/api/management/app/sample/in',data).then(res=>{
            console.log(res);
            if(res.errmsg==='成功'){
                Toast.show('成功归还样品', Toast.SHORT);
                this.props.navigation.navigate('mySample',{})
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'mySample'})
                    ]
                })
                this.props.navigation.dispatch(resetAction);
            }

        }).catch((error)=>{
            console.warn(error);
        });
    }
    @action
    getProject=()=>{
        let data={
            "param": "",
            "status": "1",
            "currentPage": "1"
        };
        FetchUtil.post(this.ipPath+'/api/management/user/list',data).then(res=>{
            console.log(res);
        }).catch((error)=>{
            console.warn(error);
        });
    }
    @action
    isLogin=()=>{
        let data={
            "loginNo": this.uName,
            "password": this.UpWd
        };
        FetchUtil.post(this.ipPath+'/api/management/app/login',data).then(res=>{
            console.log(res.errmsg);
            this.isLogin=res.errmsg;
        }).catch((error)=>{
            console.warn(error);
        });
    }
}


const observableListStore = new ObservableListStore()
export default observableListStore