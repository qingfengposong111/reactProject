import React, {Component} from 'react'
import Header from '../publicComponents/header/index'
import ActComment from '../publicComponents/act/index'
import axios from 'axios'
import './commentDetail.css'
import heart from './../../images/heart.png'
import com from './../../images/com.png'
const host = 'http://api.kingsf.cn/';

class ActiveComDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            schoolCommentList: [],
            aid: 0,
            activityVal: ''
        };
        this.comDetail();
        this.comComments();
    }

    comDetail() {
        axios.get(host + '/api/v2/activityCommentDetail1', {
            params: {
                id: this.props.match.params.id
            }
        }).then(res => {
            this.setState({
                detail: res.data.data,
                aid: res.data.data.activityId
            })
        });
    }

    comComments() {
        axios.get(host + '/api/v2/activityCommentDetail2', {
            params: {
                id: this.props.match.params.id
            }
        }).then(res => {
            if (res.data.code === '1') {
                this.setState({
                    schoolCommentList: res.data.data.list
                })
            }
        })
    }

    /*点赞*/
    praise() {
        if(localStorage.token){
            axios.post(host + '/api/v2/activityLike', {
                cid: this.props.match.params.id,
                aid: this.state.aid
            }, {
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                alert(res.data.msg);
                this.comDetail();
            }).catch(err=>{
                if(err.response.status===401){
                    alert('会话过期!');
                    let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
                    this.props.history.push('/login/#'+daa);
                }
            })
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
            this.props.history.push('/login/#'+daa);
        }

    }

    /*获取焦点*/
    getFocus() {
        if (localStorage.token) {
            document.getElementById('input').focus();
        } else {
            alert('请登录!')
        }
    }

    /*获取内容*/
    change(e) {
        this.setState({
            activityVal: e.target.value
        })
    }

    /*失去焦点*/
    blur() {
        if (this.state.activityVal === '') {
            alert('请输入评论内容!')
        } else {
            axios.post(host + '/api/v2/activityReply', {
                    pid: this.props.match.params.id,
                    replyMid: '',
                    activityId: this.state.aid,
                    evaluation: this.state.activityVal
                }, {
                    headers: {
                        'token': localStorage.token
                    }
                }
            ).then(res => {
                alert(res.data.msg);
                this.comComments();
                this.comDetail();
            })
        }
    }

    render() {
        return (
            <div className="com-detail">
                <Header data='评论详情'/>
                <ActComment comActive={this.state.detail}/>
                <div className="praise-comment">
                    <div onClick={this.praise.bind(this)}>
                        <img src={heart} alt=""/>
                        <span>{this.state.detail.revNum}</span>
                    </div>
                    <div onClick={this.getFocus.bind(this)}>
                        <img src={com} alt=""/>
                        <span>{this.state.detail.commentNum}</span>
                    </div>
                </div>
                <div className="comList">
                    {
                        this.state.schoolCommentList !== null ? this.state.schoolCommentList.map((item, index) => {
                            return (
                                <div className="com-single" key={index}>
                                    <span>{item.nickname}：</span><span>{item.evaluation}</span>
                                </div>
                            )
                        }) : ''
                    }
                </div>
                <div className="activity-com">
                    <input id="input" value={this.state.activityVal} onChange={this.change.bind(this)}
                           onBlur={this.blur.bind(this)} type="text"
                           placeholder="说点什么"/>
                </div>
            </div>
        )
    }
}
export default ActiveComDetail;