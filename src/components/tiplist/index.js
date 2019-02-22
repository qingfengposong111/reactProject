import React, {Component} from 'react';
import Header from './../publicComponents/header/index'
import './tiplist.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class TipList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            tabList: [
                {name: "已审核", type: "2", active: true, key: 0},
                {name: "未审核", type: "1", active: false, key: 1}
            ]
        };
    }

    formatDate = (value) => {
        let date = new Date(value);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return YY + '-' + MM + '-' + d;
    };

    componentDidMount() {
        this.getList(0);
    }

    getList(key) {
        let status;
        if (localStorage.token) {
            if (key === 0) {
                status = 2
            } else if (key === 1) {
                status = 1
            }
            axios.get(host + 'api/v2/myExpose', {
                params: {
                    status: status
                },
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                this.setState({
                    list: res.data.data.list
                })
            }).catch(err => {
                if (err.response.status === 401) {
                    alert('会话过期!');
                    let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
                    this.props.history.push('/login/#' + daa);
                }
            });
            let arr = this.state.tabList;
            for (let i = 0; i < arr.length; i++) {
                arr[i].active = false;
                arr[key].active = true;
            }
            this.setState({
                tabList: arr
            })
        } else {
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
            this.props.history.push('/login/#' + daa);
        }

    };

    yuan = (value) => {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };

    detail(id) {
        this.props.history.push('/TipListDetail/' + id)
    }

    render = () => {
        return (
            <div className="tiplist">
                <Header data="爆料圈"/>
                <div className="tiplist-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'select-nav' : ''}
                                        onClick={this.getList.bind(this, temp.key)}>{temp.name}</div>
                        })
                    }
                </div>
                <div className="tiplist-list">
                    {
                        this.state.list !== null ? this.state.list.map((item, index) => {
                            return (
                                <div key={index} className="tiplist-list-temp"
                                     onClick={this.detail.bind(this, item.id)}>
                                    <div className="tiplist-list-temp-top">
                                        <div className="temp-top-img">
                                            <img src={item.urls !== null ? item.urls[0] : ''} alt=""/>
                                        </div>
                                        <div className="temp-top-txt">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div
                                        className={item.status === 2 ? "tiplist-list-temp-bottom tiplist-show" : 'tiplist-hid'}>
                                        <div><span>点击量</span> <span className="blue-color">{item.hits}</span></div>
                                        <div><span>佣金</span> <span
                                            className="blue-color">{this.yuan(item.commission)}</span></div>
                                        <div><span className="blue-color">{this.formatDate(item.createTime)}</span>
                                            <span>发布</span></div>
                                    </div>
                                    <div
                                        className={item.status !== 2 ? "tiplist-list-temp-bottom2 tiplist-show" : 'tiplist-hid'}>
                                        <div><span>状态</span> <span
                                            className="blue-color">{item.status === 1 ? '待审核' : '审核失败'}</span></div>
                                        <div><span className="blue-color">{this.formatDate(item.createTime)}</span>
                                            <span>发布</span></div>
                                    </div>
                                </div>
                            )
                        }) : ''
                    }

                </div>
            </div>
        )
    }
}
export default TipList;
