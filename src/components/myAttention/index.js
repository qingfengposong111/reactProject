import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Header from '../publicComponents/header/index'
import SmList from '../publicComponents/schMethList/index'
import './myAttention.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class MyAttention extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                {name: "全部", type: 0, active: true},
                {name: "学校", type: 1, active: false},
                {name: "培训机构", type: 2, active: false},
                {name: "俱乐部", type: 3, active: false}
            ],
            lists: []
        };
    }
    componentDidMount() {
        this.getList(0);
    }
    getList(type) {
        if(localStorage.token){
            axios.get(host + 'api/v2/schoolCollections', {
                params: {
                    type: type,
                    pageSize: 200
                },
                headers: {
                    'token': localStorage.token
                }

            }).then(res => {
                this.setState({
                    lists: res.data.data.list
                })
            }).catch(err=>{
                if(err.response.status===401){
                    alert('会话过期!');
                    let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
                    this.props.history.push('/login/#'+daa);
                }
            });
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
            this.props.history.push('/login/#'+daa);
        }
        let arr = this.state.tabList;
        for (let i = 0; i < arr.length; i++) {
            arr[i].active = false;
            arr[parseInt(type)].active = true;
        }
        this.setState({
            tabList:arr
        })
    }

    render() {
        return (
            <div className="myAttention">
                <Header data="我的关注"/>
                <div className="school-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'select-nav' : ''}
                                        onClick={this.getList.bind(this, temp.type)}>{temp.name}</div>
                        })
                    }
                </div>
                <div className="myAttention-list">
                    <div className='panel'>
                        {
                            this.state.lists.map((item, index) => {
                                return <Link key={index} to={'/SchoolDetail/'+item.sId}><SmList abc={item}/></Link>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default MyAttention;