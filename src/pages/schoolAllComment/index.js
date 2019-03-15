import React, {Component} from 'react';
import Header from '../../components/header/index'
import Comment from '../../components/comment'
import {Link} from 'react-router-dom'
import './schoolAllComment.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class SchoolAllComment extends Component{
    constructor(props){
        super(props);
        this.state={
            tabList: [//tab标签
                {name: "全部", type: "0", active: true},
                {name: "晒图", type: "1", active: false},
                {name: "低分", type: "2", active: false},
                {name: "最新", type: "3", active: false}
            ],
            lists:[],//评论列表
            tagList:[],//标签列表
            len:'',//评论数量
            showOrNot:false
        }
    }
    componentDidMount() {
        this.getList(0);
        let that = this;
        axios.get(host+'/api/v2/schoolTags',{//标签
            params:{sId: this.props.match.params.id}
        }).then(res=>{
            res.data.data.forEach(item=>{
                if(item.count>0){
                    that.setState({
                        showOrNot:true
                    })
                }
            });
            this.setState({
                tagList:res.data.data
            })
        })
    }
    getList(type) {//评论列表
            axios.get(host + 'api/v2/schoolComments', {
                params: {
                    type: type,
                    sId:this.props.match.params.id
                },
                headers: {
                    'token': localStorage.token||''
                }

            }).then(res => {
                this.setState({
                    lists: res.data.data.list,
                });
                if(type===0){
                    this.setState({
                        len:res.data.data.list.length
                    })
                }
            }).catch(err=>{

            });

        let arr = this.state.tabList;
        for (let i = 0; i < arr.length; i++) {
            arr[i].active = false;
            arr[parseInt(type)].active = true;
        }
        this.setState({
            tabList:arr
        })
    }
    render=()=>{
        return (
            <div className="schoolAllComment">
                <Header data="评价" />
                <div className="school-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'select-nav' : ''}
                                        onClick={this.getList.bind(this, temp.type)}>{temp.name} {a===0?'('+this.state.len+')':''}</div>
                        })
                    }
                </div>

                <div className="schoolAllComment-list">
                    <div className={this.state.showOrNot?"tags tag-show2":'tag-hid'}>
                        {
                            this.state.tagList.map((temp,b)=>{
                                return(
                                    <div key={b} className={temp.count>0?"tags-temp tag-show":'tag-hid'}>{temp.name}({temp.count})</div>
                                )
                            })
                        }
                    </div>
                    {
                        this.state.lists!==null?this.state.lists.map((item,index)=>{
                            return <Link key={index} to={"/CommentDetail/" + item.id}><Comment comSchol={item}/></Link>
                        }):''
                    }

                </div>
            </div>
        )
    }
}
export default SchoolAllComment;
