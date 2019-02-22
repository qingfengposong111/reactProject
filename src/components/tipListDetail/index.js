import React, {Component} from 'react'
import axios from 'axios'
import Zmage from 'react-zmage'
import Header from './../publicComponents/header/index'
import './tipListDetail.css'
import heart from './../../images/heart.png'
import grayHeart from'./../../images/grayHeart.png'
import send from './../../images/icon_forwarding.png'
import iconSend from './../../images/icon_send.png'
const host = 'http://api.kingsf.cn/'/*'https://api.labiyouxue.cn/'*/;
class TipListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            urls: [],
            imgPraise: grayHeart,
            isPraise: false,
            commentList:[],
            inputVal:''
        };
        this.getInfo();
        this.bcommentList();
    }

    getInfo = () => {
        axios.get(host + '/api/v2/exposeDetail', {
            params: {
                id: this.props.match.params.id
            },
            headers: {
                'token': localStorage.token || ''
            }
        }).then(res => {
            if (res.data.code === '1') {
                this.setState({
                    isPraise: res.data.data.liked,
                    detail: res.data.data
                });
                if (!this.state.isPraise) {
                    this.setState({
                        imgPraise: grayHeart
                    })
                } else {
                    this.setState({
                        imgPraise: heart
                    })
                }
            }
            this.setState({
                info: res.data.data,
                urls: res.data.data.urls
            })
        })
    };
    praise = () => {
        if (localStorage.token) {
            axios.get(host + '/api/v2/exposeLike', {
                params: {
                    exposeId: this.props.match.params.id
                },
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                if (res.data.code === '1') {
                    alert(res.data.msg);
                    if (!this.state.isPraise) {
                        this.setState({
                            isPraise: true,
                            imgPraise: heart
                        })
                    } else {
                        this.setState({
                            isPraise: false,
                            imgPraise: grayHeart
                        })
                    }
                    this.getInfo();
                }

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
    };
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
    /*爆料评论列表*/
    bcommentList=()=>{
        axios.get(host+'/api/v2/commentList',{
            params:{
                exposeId: this.props.match.params.id,
                pageSize:100,
                pageNumber:2
            },
            headers: {
                'token': localStorage.token||''
            }
        }).then(res=>{
            this.setState({
                commentList:res.data.data.list
            })
        })
    };
    goComment=()=>{
        if(localStorage.token){
            if(this.state.inputVal===''){
                alert('请输入内容!')
            }else{
                axios.post(host+'/api/v2/addComment',{
                    exposeId:this.props.match.params.id,
                    comment:this.state.inputVal,
                    replyMid:''
                },{
                    headers:{
                        'token':localStorage.token
                    }
                }).then(res=>{
                    console.log(res);
                    this.bcommentList();
                    this.setState({
                        inputVal:''
                    })
                }).catch(err=>{
                    if(err.response.status===401){
                        alert('会话过期!');
                        let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
                        this.props.history.push('/login/#'+daa);
                    }
                })
            }
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
            this.props.history.push('/login/#'+daa);
        }

    };
    inputVal=(e)=>{
        this.setState({
            inputVal:e.target.value
        })
    };
    render = () => {
        const controller = {
            // 关闭按钮
            close: true,
            // 缩放按钮
            zoom: true,
            // 旋转按钮
            rotate: true,
            // 翻页按钮
            flip: true,
            // 多页指示
            pagination: false,
        };
        let arr=[];
        if(this.state.urls!==undefined&&this.state.urls!==null){
            this.state.urls.forEach((item,index)=>{
                arr.push({'src':item,'alt':index})
            })
        }
        return (
            <div className="tiplistdetail">
                <Header data="爆料详情页"/>
                <div className="tiplistdetail-main">

                    <div className="tip-main-title">
                        {this.state.info.title}
                    </div>
                    <div className="tip-main-time">
                        <span style={{marginRight: '10px'}}>{this.formatDate(this.state.info.createTime)}</span>
                        <span>{this.state.info.commentNum} 阅读</span>
                    </div>
                    <div className="tip-main-txt">
                        {
                            this.state.info.content
                        }
                    </div>
                    <div className="tip-main-pics">
                        {
                            this.state.urls !== null ? this.state.urls.map((item, index) => {
                                return (
                                    <div key={index} className="tip-main-pics-single">
                                        <Zmage set={arr} edge={5} controller={controller} zIndex={index} src={item} alt=""/>
                                    </div>
                                )
                            }) : ''
                        }
                    </div>
                </div>
                <div className="praise-send">
                    <div className="ps-praise" onClick={this.praise.bind(this)}>
                        <img src={this.state.imgPraise} alt=""/>
                        <span className={this.state.isPraise ? 'praise-color' : ''}>点赞</span>
                    </div>
                    <div className="ps-send">
                        <img src={send} alt=""/>
                        <span>转发</span>
                    </div>
                </div>
                <div className="tip-commentList">
                    {
                        this.state.commentList!==null?this.state.commentList.map((item1,index1)=>{
                            return (
                                <div className="tip-commentList-temp" key={index1}>
                                    <span className="tip-temp-first">{item1.nickname}:</span>
                                    <span className="tip-temp-last">{item1.comment}</span>
                                </div>
                            )
                        }):''
                    }
                </div>
                <div className="tipdetail-bot">
                    <div className="tipdetail-txt">
                        <input value={this.state.inputVal} onChange={this.inputVal.bind(this)} type="text" placeholder="说点什么" />
                    </div>
                    <img onClick={this.goComment.bind(this)} src={iconSend} alt=""/>
                </div>
            </div>
        )
    }
}
export default TipListDetail;
