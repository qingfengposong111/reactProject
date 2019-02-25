import React, {Component} from 'react';
import axios from 'axios'
import Line from '../publicComponents/line/index'
import Swiper from '../publicComponents/swiper/index.js'
import Star from '../publicComponents/star/index'
import {Link} from 'react-router-dom'
import Comment from '../publicComponents/comment/index'
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import noStar from './../../images/btn_hollow_Focus.png'
import doneStar from './../../images/btn_solid_Focus.png'
import grayPhone from './../../images/grayPhone.png'
import phone from './../../images/phone.png'
import address from './../../images/icon_address.png'
import './../schoolDetail/schoolDetail.css'
const host = 'http://api.labiyouxue.cn/';

class LessonDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            list: [],
            imgList: [],
            commList: [],
            collectImg: noStar,
            isCollection: null,
            lat: '',
            lng: '',
            comNum: 0
        };
        this.getDetail();
    }

    yuan(value) {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };

    getDetail() {
        let that = this;
        axios.get(host + '/api/v2/showDetail', {
                params: {
                    id: this.props.match.params.id
                }, headers: {
                    'token': localStorage.token || ''
                }
            }
        )
            .then(res => {
                if (res.data.code === '1') {
                    this.setState({
                        isCollection: res.data.data.collected,
                        detail: res.data.data,
                        lat: res.data.data.latitude,
                        lng: res.data.data.longitude,

                    });
                    if (!this.state.isCollection) {
                        this.setState({
                            collectImg: noStar
                        })
                    } else {
                        this.setState({
                            collectImg: doneStar
                        })
                    }
                    axios.get(host + "/api/v2/getAdvImg", {
                        params: {
                            id: this.props.match.params.id,
                            type: res.data.data.type
                        }
                    })
                        .then(function (response) {
                            let arr = response.data.data;
                            let ars = [];
                            arr.forEach(function (item) {
                                let obj = {};
                                obj.image = item.imgUrl;
                                ars.push(obj);
                            });
                            that.setState({
                                imgList: ars
                            })
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            });
        axios.get(host + '/api/v2/schoolComments', {
            params: {
                sId: this.props.match.params.id
            }
        }).then(res1 => {
            that.setState({
                commList: res1.data.data.list,
                comNum: res1.data.data.list.length
            })
        })
    }

    /*返回*/
    back() {
        const history = creatHistory();
        history.goBack();
    }

    /*收藏*/
    collect() {
        if (localStorage.token) {
            axios.post(host + '/api/v2/collectSchool', {
                sId: this.props.match.params.id,
                type: this.state.detail.type
            }, {
                headers: {
                    'token': localStorage.token
                }
            })
                .then(res => {
                    if (!this.state.isCollection) {
                        this.setState({
                            isCollection: true,
                            collectImg: doneStar
                        })
                    } else {
                        this.setState({
                            isCollection: false,
                            collectImg: noStar
                        })
                    }
                    alert(res.data.msg)
                }).catch(err => {
                if (err.response.status === 401) {
                    alert('会话过期!');
                    let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
                    this.props.history.push('/login/#' + daa);
                }
            })
        } else {
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
            this.props.history.push('/login/#' + daa);
        }
    }

    goComment() {
        if(localStorage.token){
            this.props.history.push('/SchoolGoComment/' + this.props.match.params.id)
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
            this.props.history.push('/login/#' + daa);
        }

    }

    goMap() {
        this.props.history.push('/Maps/' + this.state.lat + '/' + this.state.lng)
    }

    schoolIntro() {
        this.props.history.push('/SchoolIntro/' + this.props.match.params.id);
    }

    schoolScreen() {
        this.props.history.push('/SchoolScreen/' + this.props.match.params.id)
    }

    schoolOnLine() {
        if (localStorage.token) {
            if (this.state.detail.type === 1) {
                this.props.history.push('/SchoolOnLine/' + this.props.match.params.id)
            } else {
                this.props.history.push('/Meth/' + this.props.match.params.id + '/' + this.state.lat + '/' + this.state.lng)
            }
        } else {
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
            this.props.history.push('/login/#' + daa);
        }

    }

    mores() {
        this.props.history.push('/SchoolAllComment/' + this.props.match.params.id)
    }
    tel(){

    }
    render() {
        const tel = {
            image: grayPhone,
            contain: this.state.detail.consultPhone
        };
        return (
            <div className="schoolDetail">
                <div className="schoolDetail-head">
                    <div className="schoolDetail-img" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="schoolDetail-center">{this.state.detail.name}</div>
                    <div className="schoolDetail-rt" onClick={this.collect.bind(this)}>
                        <img src={this.state.collectImg} alt=""/>
                    </div>
                </div>
                <div className="banner">
                    <Swiper list={this.state.imgList}/>
                </div>

                <div className="banDown">
                    <div className="b_lf">
                        <div>{this.state.detail.name}</div>
                        <Star starFlag={false} star={this.state.detail.score}/>
                    </div>
                </div>
                <div className="meth" onClick={this.goMap.bind(this)}>
                    <div className="meth_lf">
                        <img src={address} alt=""/>
                        <div className="out-address">
                            <div className="addresses">{this.state.detail.addr}</div>
                            <div className="address_tip">{this.state.detail.addrExplain}</div>
                        </div>
                    </div>
                    <div className="shape"></div>
                </div>
                <div className="telPhone"><Line className="hid" data2={tel}/></div>
                <div className="intro" onClick={this.schoolIntro.bind(this)}>
                    <div className="intro_txt"><span className="sh"> </span> <span>校园简介</span></div>
                    <div className="shape"></div>
                </div>
                <div className="intro" onClick={this.schoolScreen.bind(this)}>
                    <div className="intro_txt1"><span>校园风采</span></div>
                    <div className="shape"></div>
                </div>
                <div className="intro">
                    <div className="intro_txt1"><span>用户评价</span><span>({this.state.comNum})</span></div>
                    <div className="shape"></div>
                </div>
                <div className="alls">
                    <div className="alls-lf">
                        <div className="alls-lf-lf">{this.state.detail.score}</div>
                        <div className="alls-lf-rt">
                            <div>综合评分</div>
                            <Star starFlag={false} star={this.state.detail.score}/>
                        </div>
                    </div>
                    <div className="alls-rt">
                        <div>高于{this.state.detail.aboveRate * 100}%同行</div>
                        <div>好评率{this.state.detail.favorableRate * 100}%</div>
                    </div>
                </div>
                <div className="comments">
                    {
                        this.state.commList !== null ? this.state.commList.map((item, index) => {
                            return <Link key={index} to={"/CommentDetail/" + item.id}><Comment comSchol={item}/></Link>
                        }) : ''
                    }
                </div>
                <div className={this.state.comNum > 0 ? "mores s-show" : 's-hid'} onClick={this.mores.bind(this)}>
                    <span>查看更多</span>
                    <div><span>共{this.state.comNum}条</span><span className="shape"> </span></div>
                </div>
                <div className="schoolDetail_footer">
                    <div>
                        <a href={'tel:'+this.state.detail.consultPhone} onClick={this.tel.bind(this)}>
                            <img src={phone} alt=""/>
                            <span>电话咨询</span>
                        </a>
                    </div>
                    <div onClick={this.schoolOnLine.bind(this)}>
                        在线报名
                    </div>
                    <div onClick={this.goComment.bind(this)}>发表评价</div>
                </div>
            </div>
        )
    }
}
export default LessonDetail;