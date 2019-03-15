import React, {Component} from 'react'
import axios from 'axios'
import Header from '../../components/header/index'
import './wallet.css'
const host = 'http://api.labiyouxue.cn/';

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: '',
            walletList: [],
            pageSize:20,
            pageNumber:1,
            isLoadingMore: false,
            type:1,
            showOrHid:true
        };
    }
    componentDidMount() {
        this.getInfo();
        this.getMoney();
        this.loadMore();
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
    yuan = (value) => {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    getInfo = () => {
        axios.get(host + '/api/v2/showPersonInfo', {
            headers: {
                'token': localStorage.token
            }
        }).then(res => {
            this.setState({
                balance: res.data.data.balance
            })
        })
    };
    getMoney = () => {
        axios.get(host + '/api/v2/billRecord', {
            params: {
                pageSize: this.state.pageSize*this.state.pageNumber
            },
            headers: {
                'token': localStorage.token
            }
        }).then(res => {
            if (res.data.code === '1') {
                this.setState({
                    walletList: res.data.data.list
                })
            }
        })
    };
    loadMore () {
        const wrapper = this.refs.moreWrap;
        const loadMoreDataFn = this.loadMoreDataFn;
        const that = this; // 为解决不同context的问题
        let timeCount;
        function callback() {
            const top = wrapper.getBoundingClientRect().top;//相对于视窗,到顶部的距离
            const windowHeight = window.screen.height;//视窗的高度
            if (top && top < windowHeight) {
                // 当 wrapper 已经被滚动到页面可视范围之内触发
                loadMoreDataFn(that);
            }
        }
        window.addEventListener('scroll', function () {
            if (this.state.isLoadingMore) {
                return ;
            }
            if (timeCount) {
                clearTimeout(timeCount);
            }
            timeCount = setTimeout(callback, 50);
        }.bind(this), false);
    }
    loadMoreDataFn=()=> {//加载更多
        if(this.state.walletList.length>=this.state.pageNumber*this.state.pageSize){
            this.setState({
                pageNumber:this.state.pageNumber+1
            });
            this.getMoney();
        }
        if(this.state.walletList.length<20){
            this.setState({
                showOrHid:false
            });
            return false;
        }

    };
    goCash = () => {
        this.props.history.push('/Cash')
    };
    render = () => {
        return (
            <div className="wallet">
                <Header data="我的钱包"/>
                <div className="wallet-ban">
                    <div className="wallet-til">余额</div>
                    <div className="wallet-money">
                        <div><span>￥</span><span
                            style={{fontSize: '30px', marginLeft: '5px'}}>{this.yuan(this.state.balance)}</span></div>
                        <div onClick={this.goCash.bind(this)}>提现 <span> > </span></div>
                    </div>

                </div>
                <div className="wallet-list">
                    {
                        this.state.walletList !== null ? this.state.walletList.map((item, index) => {
                            return (
                                <div className="wallet-list-temp" key={index}>
                                    <div><span style={{color: '#666'}}>{item.title}</span><span
                                        className={item.type === 1 ? 'wallet-unblue' : 'wallet-blue'}>{item.type === 1 ? (this.yuan(item.moneyStr)) : ('+' + this.yuan(item.moneyStr))}</span>
                                    </div>
                                    <div style={{fontSize: '12px', color: '#999'}}>
                                        <span>{item.remark}</span><span>{item.datetime}</span></div>
                                </div>
                            )
                        }) : ''
                    }

                </div>
                <div className={this.state.showOrHid?"load-more load-more-show":"load-more-hid"} onClick={this.loadMoreDataFn.bind(this)} ref="moreWrap" >加载更多</div>
            </div>
        )
    }
}
export default Wallet;
