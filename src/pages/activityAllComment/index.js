import React, {Component} from 'react';
import Header from '../../components/header/index'
import Act from '../../components/act'
import {Link} from 'react-router-dom'
import './activityAllComment.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class ActivityAllComment extends Component{
    constructor(props){
        super(props);
        this.state={
            tabList: [
                {name: "全部", type: "0", active: true},
                {name: "晒图", type: "1", active: false},
                {name: "低分", type: "2", active: false},
                {name: "最新", type: "3", active: false}
            ],
            lists:[],
            tagList:[],
            len:''
        }
    }
    componentDidMount() {
        this.getList(0);
    }
    getList(type) {
        axios.get(host + 'api/v2/activityComments', {
            params: {
                type: type,
                activityId:this.props.match.params.id
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
                    {
                        this.state.lists!==null?this.state.lists.map((item,index)=>{
                            return <Link key={index} to={"/ActiveComDetail/" + item.id}><Act comActive={item}/></Link>
                        }):''
                    }

                </div>
            </div>
        )
    }
}
export default ActivityAllComment;
