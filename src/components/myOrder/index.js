import React, {Component} from 'react'
import Header from '../publicComponents/header/index'
import './myOrder.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                {name: "全部", type: 2, active: true, keys: 1},
                {name: "待付款", type: 0, active: false, keys: 2},
                {name: "已付款", type: 1, active: false, keys: 3}

            ],
            lists: []
        };
    }
    componentDidMount() {
        this.getList(2,1);
    }
    formatDate(value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        s = s < 10 ? ('0' + s) : s;
        d = d < 10 ? ('0' + d) : d;
        return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }

    yuan(value) {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };

    getList(type, key) {
        if (localStorage.token) {
            axios.get(host + '/api/v2/orderList', {
                params: {
                    isPay: type
                },
                headers: {
                    'token': localStorage.token
                }
            })
                .then(res => {
                    this.setState({
                        lists: res.data.data.list
                    });
                }).catch(err => {
                if (err.response.status === 401) {
                    alert('会话过期!');
                    let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
                    this.props.history.push('/login/#' + daa);
                }
            });
        } else {
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
            this.props.history.push('/login/#' + daa);
        }
        let arr = this.state.tabList;
        for (let i = 0; i < arr.length; i++) {
            arr[i].active = false;
            arr[parseInt(key) - 1].active = true;
        }
        this.setState({
            tabList:arr
        })
    }

    render() {
        return (
            <div className="myOrder">
                <Header data="我的订单"/>
                <div className="myOrder-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'select-nav' : ''}
                                        onClick={this.getList.bind(this, temp.type, temp.keys)}>{temp.name}</div>
                        })
                    }
                </div>
                <div className="myOrder-list">
                    {
                        this.state.lists != null ? this.state.lists.map((item, index) => {
                            return (
                                <div className="myOrder-list-single" key={index}>
                                    <div className="myOrder-list-single-title">
                                        <span>{item.agencyName}</span>
                                        <span
                                            className={item.isPay === 1 && (item.endOrNot === false) ? "payAlready myOrder-show" : 'myOrder-hid'}>已付款</span>
                                        <span
                                            className={item.isPay === 0 && item.endOrNot === false ? "payGoAlready myOrder-show" : 'myOrder-hid'}>去付款</span>
                                        <span
                                            className={item.endOrNot === true ? "payOut myOrder-show" : 'myOrder-hid'}>已失效</span>
                                    </div>
                                    <div className="myOrder-list-single-main">
                                        <div className="myOrder-list-single-main-img">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="myOrder-list-single-main-rt">
                                            <div className="myOrder-list-single-main-rt-name">{item.name}</div>
                                            <div>订单号:{item.orderSn}</div>
                                            <div>下单时间:{this.formatDate(item.createTime)}</div>
                                            <div>订单金额:￥{this.yuan(item.price)}</div>
                                        </div>
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
export default MyOrder;
