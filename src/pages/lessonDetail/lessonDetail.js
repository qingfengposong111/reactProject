import React, {Component} from 'react';
import axios from 'axios'
import Header from '../../components/header/index'
import {Link} from "react-router-dom";
import phone from './../../images/phone.png'
import './lessonDetail.css'
const host = 'http://api.labiyouxue.cn/';
class LessonDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            agency: {},
            list: [],
            lat: '',
            lng: ''
        };
    }
    goMap () {
        this.props.history.push('/Maps/'+this.state.lat+'/'+this.state.lng)
    }
    yuan(value) {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };

    componentDidMount() {
        axios.get(host + '/api/v2/agencyApplyDetail', {
            params: {
                productId: this.props.match.params.id
            }
        })
            .then(res =>{
                if (res.data.code === '1') {
                    this.setState({
                        detail: res.data.data,
                        agency: res.data.data.agency,
                        lat: res.data.data.latitude,
                        lng: res.data.data.longitude,
                        flag: true
                    })
                }
            });
    }
    goPay () {
       /* if(this.state.detail.endOrNot){
            alert("报名已结束!");
            return false;
        }else{*/
            this.props.history.push('/Pay/'+this.props.match.params.id)
       /* }*/

    }
    render() {
        return (
            <div className="lessonOut">
                <Header data={this.state.detail.productName}/>
                <div className="banner">
                    <img src={this.state.detail.productImg} alt=""/>
                </div>
                <div className="banDown" onClick={this.goMap.bind(this)}>
                    <div className="b_lf">
                        <div>{this.state.detail.productName}</div>
                        <div><span className="addr">上课地点:</span> <span>{this.state.detail.addr}</span></div>
                    </div>
                    <div className="shape"></div>
                </div>
                <Link className="meth" to={"/SchoolDetail/" + this.state.agency.sId}>
                    <div className="meth_lf">
                        <img src={this.state.agency.imgUrl} alt=""/>
                        <span>{this.state.agency.name}</span>
                    </div>
                    <div className="shape"></div>
                </Link>
                <div className="tip">
                    <div className="tip_tip">温馨提示:</div>
                    <div className="tip_main1">
                        <span>报名费:</span><span>{this.yuan(this.state.detail.applicationFee)}</span>
                        <span>学费:</span><span>{this.yuan(this.state.detail.marketPrice)}</span>
                        <span>折扣价:</span><span>{this.yuan(this.state.detail.promotePrice)}</span>
                    </div>
                    <div className="tip_main2">{this.state.detail.explain}</div>
                </div>
                <div className="lesson-intro">
                    <div className="intro_tip">课程介绍:</div>
                    <div className="intro_main">
                        {this.state.detail.describes}
                    </div>
                </div>
                <div className="lesson_footer">
                    <div>
                        <a href={this.state.agency.consultPhone}>
                            <img src={phone} alt=""/>
                            <span>电话</span>
                        </a>

                    </div>
                    <div>
                        ￥{this.yuan(this.state.detail.promotePrice)}元/人
                    </div>
                    <div onClick={this.goPay.bind(this)}>立即报名</div>
                </div>
            </div>
        )
    }
}
export default LessonDetail;