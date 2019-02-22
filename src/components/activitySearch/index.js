import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import Search from '../publicComponents/search/index'
import img1 from './../../images/btn_return.png'
import deleteImg from './../../images/btn_trash.png'
import iconSearch from './../../images/icon_search.png'
import './activitySearch.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class SearchActivity extends Component{
    constructor(props){
        super(props);
        this.state={
            hotList:[],
            acVal:''
        };
        this.hotSearch();
    }
    back(){
        const history = creatHistory();
        history.goBack();
    }
    hotSearch(){
        axios.get(host+'/api/v2/hotSearch',{
            params:{
                type:2
            }
        }).then(res=>{
            if(res.data.code==='1'){
                this.setState({
                    hotList:res.data.data
                })
            }
        })
    }
    searchActivity (){
        this.props.history.push('/Activity/'+this.state.acVal)
    }
    getVal(e){
        this.setState({
            acVal:e.target.value
        })
    }
    setVal(item){
        this.setState({
            acVal:item
        })
    }
    render () {
        return (
            <div className="searchActivity-out">
                <div className="searchActivity">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center">
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search drs={this.state.acVal} getVal={this.getVal.bind(this)} placeholder="搜索活动名称/类型"> </Search>
                    </div>
                    <div className="rt" onClick={this.searchActivity.bind(this)}>搜索</div>
                </div>
                <div className="activity-hot-search">
                    <div className="ash-title">热门搜索</div>
                    <div className="ash-children">
                        {
                            this.state.hotList!=null?this.state.hotList.map((item,index)=>{
                                return (
                                    <span onClick={this.setVal.bind(this,item)} key={index}>{item}</span>
                                )
                            }):''
                        }
                    </div>
                </div>
                <div className="activity-history-search">
                    <div className="ahs-title">
                        <span>历史搜索</span>
                        <img src={deleteImg} alt=""/>
                    </div>
                    <div className="ahs-children">
                        <span>我们</span><span>你们</span><span>他们</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchActivity;
