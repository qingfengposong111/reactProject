import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import Search from '../publicComponents/search/index'
import img1 from './../../images/btn_return.png'
import deleteImg from './../../images/btn_trash.png'
import iconSearch from './../../images/icon_search.png'
import './lessonSearch.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class LessonSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            hotList:[],
            LessonVal:'',
            historyList:[]
        };
        this.hotSearch();

    }
    back () {
        const history = creatHistory();
        history.goBack();
    }
    hotSearch(){
        axios.get(host+'/api/v2/hotSearch',{
            params:{
                type:1
            }
        }).then(res=>{
            if(res.data.code==='1'){
                this.setState({
                    hotList:res.data.data
                })
            }
        })
    }
    searchLesson (){
        this.props.history.push('/MoreLesson/'+this.state.LessonVal)
    }
    getVal(event){
        this.setState({
            LessonVal:event.target.value
        });
    }
    setVal(item){
        this.setState({
            LessonVal:item
        })
    }
    render () {
        return (
            <div className="searchSchool-out">
                <div className="searchSchool">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center">
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search drs={this.state.LessonVal} getVal={this.getVal.bind(this)} placeholder="搜索课程/培训等"> </Search>
                    </div>
                    <div className="rt" onClick={this.searchLesson.bind(this)}>搜索</div>
                </div>
                <div className="school-hot-search">
                    <div className="sh-title">热门搜索</div>
                    <div className="sh-children">
                        {
                            this.state.hotList!==null?this.state.hotList.map((item,index)=>{
                                return (
                                    <span onClick={this.setVal.bind(this,item)} key={index}>{item}</span>
                                )
                            }):''
                        }
                    </div>
                </div>
                <div className="school-history-search">
                    <div className="hs-title">
                        <span>历史搜索</span>
                        <img src={deleteImg} alt=""/>
                    </div>
                    <div className="hs-children">
                        {
                            this.state.historyList!==[]? this.state.historyList.map((temp,as)=>{
                                return <span key={as}>{temp}</span>
                            }):""
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default LessonSearch;
