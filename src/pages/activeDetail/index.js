import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'
import Line from '../../components/line/index'
import Swiper from '../../components/swiper/index'
import creatHistory from 'history/createHashHistory'
import img1 from '../../images/btn_return.png'
import ActComment from '../../components/act/index'
import './activeDetail.css'
import grayPhone from './../../images/grayPhone.png'
import phone from './../../images/phone.png'
import price from './../../images/price.png'
import address from './../../images/icon_address.png'
import eyeGray from './../../images/icon_grey_eyes.png'
import comGray from './../../images/icon_grey_comments.png'
import time from './../../images/time.png'
import noStar from './../../images/btn_hollow_Focus.png'
import doneStar from './../../images/btn_solid_Focus.png'
import './../schoolDetail/schoolDetail.css'
const host = 'http://api.labiyouxue.cn/';
class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDetail: {},
            list: [],
            desc: true,
            record: false,
            comms: false,
            acList: [],
            sPlist: [],
            tabList: [
                {name: "活动介绍", type: "0", active: true},
                {name: "活动印记", type: "1", active: false},
                {name: "活动评价", type: "2", active: false}
            ],
            describ: '',
            recordList: [],
            comList: [],
            number: 0,
            isCollection: null,
            collectImg: noStar,
            lat:'',
            lng:''
        };

        axios.get(host + '/api/v2/getYxwActivity', {
            params: {
                id: this.props.match.params.id
            }, headers: {
                'token': localStorage.token || ''
            }
        }).then(res => {
            this.setState({
                activeDetail: res.data.data,
                actList: [
                    {
                        image: address,
                        contain: res.data.data.hostAddress
                    }, {
                        image: grayPhone,
                        contain: res.data.data.consultPhone
                    }
                ],
                sPlist: res.data.data.spList,
                describ: res.data.data.describes,
                isCollection: res.data.data.collected,
                lat:res.data.data.latitude,
                lng:res.data.data.longitude
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


        });
        const that = this;
        axios.get(host + "/api/v2/getAdvImg", {
            params: {
                id: this.props.match.params.id,
                type: 4
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
                    list: ars
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(host + '/api/v2/findYxwActivityPictureList', {
            params: {
                id: this.props.match.params.id
            }
        }).then(res => {
            this.setState({
                recordList: res.data.data
            })
        });
        axios.get(host + '/api/v2/activityComments', {
            params: {
                activityId: this.props.match.params.id
            }
        }).then(res => {
            this.setState({
                comList: res.data.data.list.slice(0, 3),
                number: res.data.data.list.length
            })
        })
    }

    formatDate(value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '-' + d;
    }
    onLine () {
        this.props.history.push('/ActivityOnLine/'+this.props.match.params.id)
    }
    goMap () {
        this.props.history.push('/Maps/'+this.state.lat+'/'+this.state.lng)
    }
    select(type) {
        let that = this;
        if (type === '0') {
            this.setState({
                desc: true,
                record: false,
                comms: false
            })
        } else if (type === '1') {
            this.setState({
                desc: false,
                record: true,
                comms: false
            })
        } else if (type === '2') {
            this.setState({
                desc: false,
                record: false,
                comms: true
            })
        }
        for (let i = 0; i < this.state.tabList.length; i++) {
            that.state.tabList[i].active = false;
        }
        that.state.tabList[parseInt(type)].active = true;
    }

    back() {
        const history = creatHistory();
        history.goBack();
    }

    /*收藏*/
    collected() {
        if (localStorage.token) {
            axios.post(host + '/api/v2/collectActivity', {
                activityId: this.props.match.params.id
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
                    alert(res.data.msg);
                })
        }
    }
    mores () {
        this.props.history.push('/ActivityAllComment/'+this.props.match.params.id);
    }
    goComment () {
        if(localStorage.token){
            this.props.history.push('/ActivityGoComment/'+this.props.match.params.id);
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
            this.props.history.push('/login/#'+daa);
        }

    }
    render() {
        return (
            <div className="activityDetail">
                <div className="activeDetail-head">
                    <div className="activeDetail-img" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="activeDetail-center">{this.state.activeDetail.activeName}</div>
                    <div className="activeDetail-rt" onClick={this.collected.bind(this)}>
                        <img src={this.state.collectImg} alt=""/>
                    </div>
                </div>
                <div className="banner">
                    <Swiper list={this.state.list}/>
                </div>
                <div className="acts-main">
                    <div className="act-name">{this.state.activeDetail.activeName}</div>
                    <div className="act-com">
                        <div className="act-com-lf">
                            <div>
                                <div>
                                    <img src={comGray} alt=""/>
                                    <span>{this.state.activeDetail.collectNum}</span>
                                </div>
                                <div>
                                    <img src={eyeGray} alt=""/>
                                    <span>{this.state.activeDetail.readNum}</span>
                                </div>
                            </div>
                        </div>
                        <div className="act-com-rt">
                            <span className={this.state.activeDetail.isEnd === 3 ? 'act-show' : 'act-hid'}>已结束</span>
                            <span className={this.state.activeDetail.isEnd === 2 ? 'act-show' : 'act-hid'}>进行中</span>
                            <span className={this.state.activeDetail.isEnd === 1 ? 'act-show' : 'act-hid'}>报名中</span>
                        </div>
                    </div>
                    <div className="act-start-end">
                        <img src={time} alt=""/>
                        <div className="act-se-rt">
                            <div>报名截止时间: {this.formatDate(this.state.activeDetail.startTime)}</div>
                            <div>活动开始时间: {this.formatDate(this.state.activeDetail.applyEnd)}</div>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.actList != null ? this.state.actList.map((temp, index) => {
                                return <div key={index} onClick={this.goMap.bind(this)} ><Line data2={temp}/></div>
                            }) : ''
                        }
                        <div className="act-price">
                            <img src={price} alt=""/>
                            <span>{this.state.activeDetail.money}</span>
                        </div>
                    </div>
                    <div className="act-autor">
                        <div className="act-autor-title">活动赞助商</div>
                        <div className="act-list">
                            {
                                this.state.sPlist !== null ? this.state.sPlist.map((item1, index1) => {
                                    return (
                                        <div className="act-list-angle" key={index1}>
                                            <img src={item1.imgUrl} alt=""/>
                                            <div>{item1.name}</div>
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>
                    </div>
                    {/*活动三层*/}
                    <div className="three-out">
                        <div className="activeDetail-nav">
                            {
                                this.state.tabList.map((temp, a) => {
                                    return <div key={a} className={temp.active ? 'select-nav' : ''}
                                                onClick={this.select.bind(this, temp.type)}>{temp.name}</div>
                                })
                            }
                        </div>
                        <div
                            className={this.state.desc ? 'desc act-show' : 'act-hid'}>{this.state.describ.replace(/<p>/g,'').replace(/<\/p>/g,'\r').replace(/&nbsp;/g,'')}</div>
                        <div className={this.state.record ? 'record act-show' : 'act-hid'}>
                            {
                                this.state.recordList != null ? this.state.recordList.map((item2, index2) => {
                                    return (
                                        <img key={index2} src={item2} alt=""/>
                                    )
                                }) : ''
                            }
                        </div>
                        <div className={this.state.comms ? 'act-comList act-show' : 'act-hid'}>
                            {
                                this.state.comList != null ? this.state.comList.map((item4, index4) => {
                                    return <Link key={index4} to={"/ActiveComDetail/" + item4.id}><ActComment
                                        comActive={item4}/></Link>
                                }) : ''
                            }
                            <div className={this.state.number>0?"mores act-show2":'act-hid'} style={{marginBottom: '0'}} onClick={this.mores.bind(this)}>
                                <span>查看更多</span>
                                <div><span>共{this.state.number}条</span><span className="shape"></span></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="lesson_footer">
                    <div>
                        <a href={this.state.activeDetail.consultPhone}>
                            <img src={phone} alt=""/>
                            <span>电话咨询</span>
                        </a>
                    </div>
                    <div onClick={this.onLine.bind(this)}>
                        在线报名
                    </div>
                    <div onClick={this.goComment.bind(this)}>发表评价</div>
                </div>
            </div>
        )
    }
}
export default ActivityDetail;