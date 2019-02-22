import React, {Component} from 'react';
import Search from '../publicComponents/search/index'
import creatHistory from 'history/createHashHistory'
import { Link } from "react-router-dom";
import './activity.css'
import eyeGray from './../../images/icon_grey_eyes.png'
import img1 from './../../images/btn_return.png'
import iconSearch from './../../images/icon_search.png'
import comGray from './../../images/icon_grey_comments.png'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class Activity extends Component{
    constructor(props){
        super(props);
        this.state=({
            activityList:[],
            tabList: [
                {name: "全部", type: "0", active: true},
                {name: "报名中", type: "2", active: false},
                {name: "已结束", type: "3", active: false}
            ],
            actVal:''
        });
    }
    formatDate(value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
    }
    componentDidMount() {
        this.getList(0);
    }
    back(){
        const history = creatHistory();
        history.goBack();
    }
    getList(sType){
        axios.get(host+'/api/v2/findYxwActivityList',{
            params:{
                sType: sType,
                areaId: '441900',
                activeName:this.props.match.params.acv
            }
        }).then(res=>{
            this.setState({
                activityList:res.data.data.list
            })
        });
        let arr = this.state.tabList;
        for (let i = 0; i < arr.length; i++) {
            arr[i].active = false;
            if(parseInt(sType)===3){
                arr[parseInt(sType)-1].active = true;
            }else{
                arr[parseInt(sType)].active = true;
            }
        }
        this.setState({
            tabList:arr
        })
    }
    searchActivity(){
        this.props.history.push('/SearchActivity')
    }
    render(){
        return(
            <div className="activity">
                <div className="header-search">
                    <div className="backs" data="返回" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center singleCenter" onClick={this.searchActivity.bind(this)}>
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search drs={this.props.match.params.acv} placeholder="搜索活动名称/类型"> </Search>
                    </div>
                </div>
                <div className="activity-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'select-nav' : ''}
                                        onClick={this.getList.bind(this, a===2?a=3:a)}>{temp.name}</div>
                        })
                    }
                </div>
                <div className="activityList1">
                    {
                        this.state.activityList.map((item,index)=>{
                            return(
                                <Link to={"/ActivityDetail/"+item.id} className="activity-single" key={index}>
                                    <div className="activity-img">
                                        <img src={item.actImg} alt=""/>
                                    </div>
                                    <div className="activity-title">
                                        <span>{item.activeName}</span>
                                        <span className={item.isEnd===3?'Ashows':'Ahid'}>已结束</span>
                                        <span className={item.isEnd===1?'Ashows':'Ahid'}>报名中</span>
                                        <span className={item.isEnd===2?'Ashows':'Ahid'}>进行中</span>
                                    </div>
                                    <div className="activity-bottom">
                                        <div className="b-left">
                                            <span>活动时间:</span>
                                            <span>{this.formatDate(item.startTime)}</span>
                                        </div>
                                        <div className="b-right">
                                            <div>
                                                <img src={comGray} alt=""/>
                                                <span>{item.collectNum}</span>
                                            </div>
                                            <div>
                                                <img src={eyeGray} alt=""/>
                                                <span>{item.readNum}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Activity;
