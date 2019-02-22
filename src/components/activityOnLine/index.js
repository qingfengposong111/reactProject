import React, {Component} from 'react';
import Header from '../publicComponents/header/index'
import './activityOnLine.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class ActivityOnLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeName: '',//活动名称
            list: [],//套票列表
            price: 0,//折扣价
            lessPrice: 0,//优惠价
            tpId: 0//所选项目的ID
        }
    }

    yuan = (value) => {//金钱过滤
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };

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
        axios.get(host + 'api/v2/showActivityPackage', {//此活动的所有套票
            params: {
                activityId: this.props.match.params.id
            }
        }).then(res => {
            if (res.data.data !== null) {
                res.data.data.forEach(item => {
                    item.active = false;
                })
            }
            this.setState({
                list: res.data.data
            });
        })
    }

    selectItem(index) {//选择任一活动项目
        let arr = this.state.list;
        let that = this;
        arr[index].active = !arr[index].active;
        arr.forEach(item => {
            if (item !== arr[index]) {
                item.active = false;
            } else {
                that.setState({
                    price: item.discountPrice,
                    lessPrice: item.marketPrice - item.discountPrice,
                    tpId: item.id
                })
            }
        });
        that.setState({
            list: arr
        });
    }

    submit() {
        let actId = -1;
        this.state.list.forEach(item => {
            if (item.active) {
                actId = item.id;
            }
        });
        if (actId === -1) {
            alert("请选择套餐!");
            return false;
        }
        this.props.history.push('/ActivityPay/' + this.props.match.params.id + '/' + actId)
    }

    render = () => {
        return (
            <div className="activityOnLine">
                <Header data="活动报名"/>
                <div className="active-content">
                    <div className="active-name">
                        {this.state.activeName}
                    </div>
                    <div className="active-til">
                        套票
                    </div>
                    <div className="active-list">
                        {
                            this.state.list !== null ? this.state.list.map((item, index) => {
                                return (
                                    <div onClick={this.selectItem.bind(this, index)} key={index}
                                         className="active-list-item">
                                        <div className="active-list-item-lf">{item.name}</div>
                                        <div className="active-list-item-rt">
                                            <div className="active-list-item-rt-money">
                                                ￥{this.yuan(item.marketPrice)}</div>
                                            <div className="active-list-item-rt-select">
                                    <span className={item.active ? 'c label2' : 'c'}>
                                         <input name="shoolClass" className="ms" type="radio"/>
                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : ''
                        }
                    </div>
                    <div className="active-concat">
                        <div className="active-concat-title">联系人信息</div>
                        <div className="active-concat-int">
                            <div><input type="text" placeholder="联系人姓名"/></div>
                            <div><input type="text" placeholder="联系人电话"/></div>
                        </div>
                    </div>
                    <div className="active-footer">
                        <div className="active-footer-til">* 请确保看清了活动介绍，缴费成功概不退款</div>
                        <div className="active-footer-main">
                            <div className="active-footer-lf">
                                <div><span>已优惠</span>￥{this.yuan(this.state.lessPrice)}</div>
                                <div>￥{this.yuan(this.state.price)}</div>
                            </div>
                            <div onClick={this.submit.bind(this)} className="active-footer-rt">去支付</div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
export default ActivityOnLine;