import React, {Component} from 'react';
import Header from '../publicComponents/header/index'
import aliPay from './../../images/AliPay.png'
import wxPay from './../../images/WxPay.png'
import './activityPay.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class ActivityPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            activeName: '',
            aliPayFlag: false,
            wxPayFlag: false
        }
    }

    componentDidMount() {
        axios.get(host + '/api/v2/getYxwActivity', {//活动名称的获取
            params: {
                id: this.props.match.params.id
            }, headers: {
                'token': localStorage.token || ''
            }
        }).then(res => {
            this.setState({
                activeName: res.data.data.activeName
            })
        });
        let actId = parseInt(this.props.match.params.actId);
        axios.get(host + 'api/v2/showActivityPackage', {//此活动的所有套票
            params: {
                activityId: this.props.match.params.id
            }
        }).then(res => {
            if (res.data.data !== null) {
                res.data.data.forEach(item => {
                    if (actId === item.id) {
                        this.setState({
                            detail: item
                        })
                    }
                })
            }
            this.setState({
                list: res.data.data
            });
        })
    }

    wxPay() {
        this.setState({
            aliPayFlag: false,
            wxPayFlag: true
        })
    }

    aliPay() {
        this.setState({
            aliPayFlag: true,
            wxPayFlag: false
        })
    }

    yuan = (value) => {//金钱过滤
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    render = () => {
        return (
            <div className="apay">
                <Header data="支付"/>
                <div className="apay-main">
                    <div className="aproduct-title">产品信息</div>
                    <div className="aproduct-info">
                        <div className="aproduct-info-lf">
                            <div className="alf-top">{this.state.activeName}</div>
                            <div className="alf-bottom">{this.state.detail.name}</div>
                        </div>
                        <div className="aproduct-rt" style={{color: '#e4393c'}}>
                            ￥{this.yuan(this.state.detail.discountPrice)}
                        </div>
                    </div>
                    <div className="apay-method">支付方式</div>
                    <div className="apay-single" onClick={this.wxPay.bind(this)}>
                        <div className="apay-single-lf">
                            <div className="apay-single-img">
                                <img src={wxPay} alt=""/>
                            </div>
                            <div className="apay-single-main">
                                <div className="apay-single-main-top">微信支付</div>
                                <div className="apay-single-main-tip">亿万用户的选择，更快更安全</div>
                            </div>
                        </div>
                        <span className={this.state.wxPayFlag ? 'ac alabel2' : 'ac'}>
                             <input name="shoolClass" className="ams" type="radio"/>
                         </span>
                    </div>
                    <div className="apay-single" onClick={this.aliPay.bind(this)}>
                        <div className="apay-single-lf">
                            <div className="apay-single-img">
                                <img src={aliPay} alt=""/>
                            </div>
                            <div className="apay-single-main">
                                <div className="apay-single-main-top">支付宝</div>
                                <div className="apay-single-main-tip">数亿用户都在使用，安全可托付</div>
                            </div>
                        </div>
                        <span className={this.state.aliPayFlag ? 'c label2' : 'c'}>
                             <input name="ashoolClass" className="ams" type="radio"/>
                         </span>
                    </div>
                </div>
                <div className="asubs">支付￥{this.yuan(this.state.detail.discountPrice)}</div>
            </div>
        )
    }
}
export default ActivityPay;
