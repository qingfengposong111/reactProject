import React, {Component} from 'react';
import Header from '../publicComponents/header/index'
import './schoolOnLine.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class SchoolOnLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],//数据列表
            checkSingle: false,//是否同意协议
            hasList: false//是否有课程
        }
    }

    componentDidMount() {//获取数据
        axios.get(host + '/api/v2/showSchoolApply', {
            params: {
                sId: this.props.match.params.id
            }
        }).then(res => {
            if (res.data.code === '1') {
                if (res.data.data.length > 0) {
                    res.data.data.forEach(item => {
                        item.select = false;
                    });
                    this.setState({
                        list: res.data.data,
                        hasList: true
                    })
                }
            }
        })
    }

    chose(index) {//选择班级
        let that = this;
        let arr = that.state.list;
        if (arr[index].endOrNot) {
            return false;
        } else {
            arr[index].select = !arr[index].select;
            arr.forEach(item => {
                if (item !== arr[index]) {
                    item.select = false;
                }
            });
            that.setState({
                list: arr
            });
        }
    }

    submit() {//提交
        let productId = -1;
        this.state.list.forEach(item => {
            if (item.select) {
                productId = item.productId;
            }
        });
        if (productId === -1) {
            alert("请选择课程!");
            return false;
        }
        if (!this.state.checkSingle) {
            alert("请同意协议!");
            return false;
        }
        this.props.history.push('/Pay/' + productId)
    }

    check() {//同意协议
        let flag = this.state.checkSingle;
        this.setState({
            checkSingle: !flag
        })
    }

    yuan = (value) => {//金钱过滤
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    render = () => {
        return (
            <div className="schoolOnLine">
                <Header data="在线报名"/>
                <div>
                    <div className="act-main">
                        <div className={this.state.hasList ? 'schoolOnLine-hid' : "noLessons schoolOnLine-show"}>
                            还没有可报名的班级哦！
                        </div>
                        <ul className="order_list">
                            {
                                this.state.list !== null ? this.state.list.map((item, index) => {
                                    return (
                                        <li key={index} onClick={this.chose.bind(this, index)}>
                                            <div className="both_lr">
                                                <div className="left_img">
                                                    <img src={item.productImg} alt=""/>
                                                </div>
                                                <div className="right_contain">
                                                    <h4>
                                                        <span
                                                            className="enlist_b">报名费：￥{this.yuan(item.applicationFee)}</span>
                                                        <span
                                                            className={item.endOrNot ? 'schoolOnLine-hid' : 'schoolOnLine-show'}>{/**/}
                                                            <span className={item.select ? "c label2" : 'c'}>
                                                                <input name="shoolClass" className="ms" type="radio"/>
                                                            </span>
                                                        </span>
                                                        <span
                                                            className={item.endOrNot ? 'schoolOnLine-show' : 'schoolOnLine-hid'}>已结束报名</span>
                                                    </h4>
                                                    <p className="t_d">
                                                        <span
                                                            className="tuition">学费：<s>￥{this.yuan(item.marketPrice)}</s></span>
                                                        <span
                                                            className="discount">折扣价：￥{this.yuan(item.promotePrice)}</span>
                                                    </p>
                                                    <p>{item.explain}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) : ''
                            }
                        </ul>
                        <div className="bot" v-if="list.length>0">
                            <p><span className={this.state.checkSingle ? "c label2" : 'c'}
                                     onClick={this.check.bind(this)}><input id="yd" type="checkbox"/></span> <a
                                href="https://www.labiyouxue.com/classApply/agreement">我已阅读《蜡笔幼学报名协议》</a></p>
                            <div className="submit" onClick={this.submit.bind(this)}>交纳报名费预约名额</div>
                        </div>
                    </div>

                </div>
            </div>
        )

    }
}
export default SchoolOnLine;
