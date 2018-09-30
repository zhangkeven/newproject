import {observable,action} from 'mobx'
import FetchUtil from "../service/rpc";
import Toast from "react-native-simple-toast";
let index = 0
class ObservableListStore {
    @observable
    uName;
    @observable
    UpWd;
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
    ipPath;
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
    getData=()=>{
        let data={
            "currentPage": "1"};
        FetchUtil.post(this.ipPath+'/api/management/org/list',data).then(res=>{
            console.log(res);
            this.name=res.data.result[0].orgName;
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
            "loginNo": "asd",
            "password": "123"
        };
        FetchUtil.post(this.ipPath+'/api/management/app/login',data).then(res=>{
            console.log(res);
        }).catch((error)=>{
            console.warn(error);
        });
    }
}


const observableListStore = new ObservableListStore()
export default observableListStore