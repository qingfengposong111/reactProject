import React, {Component} from 'react';
import Header from '../publicComponents/header/index'
import aliPay from './../../images/AliPay.png'
import wxPay from './../../images/WxPay.png'
import './pay.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class Pay extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            agency:{},
            aliPayFlag:false,
            wxPayFlag:false
        }
    }
    componentDidMount() {
        axios.get(host + '/api/v2/agencyApplyDetail', {
            params: {
                productId: this.props.match.params.id
            }
        })
            .then(res =>{
                if (res.data.code === '1') {
                    console.log(res)
                    this.setState({
                        detail: res.data.data,
                        agency: res.data.data.agency,
                    })
                }
            });
    }
    wxPay () {
        this.setState({
            aliPayFlag:false,
            wxPayFlag:true
        })
    }
    aliPay () {
        this.setState({
            aliPayFlag:true,
            wxPayFlag:false
        })
    }
    yuan = (value) => {//金钱过滤
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    render=()=>{
        return (
            <div className="pay">
                <Header data="支付" />
                <div className="pay-main">
                    <div className="product-title">产品信息</div>
                    <div className="product-info">
                        <div className="product-info-lf">
                            <div className="lf-top">{this.state.agency.name}</div>
                            <div className="lf-bottom">{this.state.detail.productName}</div>
                        </div>
                        <div className="product-rt" style={{color:'#e4393c'}}>￥{this.yuan(this.state.detail.applicationFee)}</div>
                    </div>
                    <div className="pay-method">支付方式</div>
                    <div className="pay-single" onClick={this.wxPay.bind(this)}>
                        <div className="pay-single-lf">
                            <div className="pay-single-img">
                                <img src={wxPay} alt=""/>
                            </div>
                            <div className="pay-single-main">
                                <div className="pay-single-main-top">微信支付</div>
                                <div className="pay-single-main-tip">亿万用户的选择，更快更安全</div>
                            </div>
                        </div>
                        <span className={this.state.wxPayFlag?'c label2':'c'}>
                             <input name="shoolClass" className="ms" type="radio"/>
                         </span>
                    </div>
                    <div className="pay-single" onClick={this.aliPay.bind(this)}>
                        <div className="pay-single-lf">
                            <div className="pay-single-img">
                                <img src={aliPay} alt=""/>
                            </div>
                            <div className="pay-single-main">
                                <div className="pay-single-main-top">支付宝</div>
                                <div className="pay-single-main-tip">数亿用户都在使用，安全可托付</div>
                            </div>
                        </div>
                        <span className={this.state.aliPayFlag?'c label2':'c'}>
                             <input name="shoolClass" className="ms" type="radio"/>
                         </span>
                    </div>
                </div>
                <div className="subs" >支付￥{this.yuan(this.state.detail.applicationFee)}</div>
            </div>
        )
    }
}
export default Pay;
