import React, {Component} from 'react'
import Header from '../publicComponents/header/index'
import Comment from '../publicComponents/comment/index'
import axios from 'axios'
import './commentDetail.css'
import heart from './../../images/heart.png'
import com from './../../images/com.png'
const host = 'http://api.kingsf.cn/';

class CommentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            schoolCommentList: [],
            sId: 0,
            SchoolVal: ''
        };
        this.goDetail();
        this.comList();

    }

    /*详情*/
    goDetail() {
        axios.get(host + '/api/v2/schoolCommentDetail1', {
            params: {
                id: this.props.match.params.id
            }
        }).then(res1 => {
            this.setState({
                detail: res1.data.data,
                sIid: res1.data.data.sId
            })
        });
    }

    comList() {
        axios.get(host + '/api/v2/schoolCommentDetail2', {
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
            axios.post(host + '/api/v2/schoolLike', {
                cid: this.props.match.params.id,
                sId: this.state.sId
            }, {
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                alert(res.data.msg);
                this.goDetail();
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
            SchoolVal: e.target.value
        })
    }

    /*失去焦点*/
    blur() {
        if (this.state.SchoolVal === '') {
            alert('请输入评论内容!')
        } else {
            axios.post(host + '/api/v2/schoolReply', {
                    pid: this.props.match.params.id,
                    replyMid: 0,
                    evaluation: this.state.SchoolVal,
                    sId: this.state.sId
                }, {
                    headers: {
                        'token': localStorage.token
                    }
                }
            ).then(res => {
                alert(res.data.msg);
                this.goDetail();
                this.comList();
            })
        }
    }

    render() {
        return (
            <div className="com-detail">
                <Header data='评论详情'/>
                <Comment onclick="return false;" comSchol={this.state.detail}/>
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
                        this.state.schoolCommentList != null ? this.state.schoolCommentList.map((item, index) => {
                            return (
                                <div className="com-single" key={index}>
                                    <span>{item.nickname}：</span><span>{item.evaluation}</span>
                                </div>
                            )
                        }) : ''
                    }

                </div>
                <div className="school-com">
                    <input id="input" value={this.state.SchoolVal} onChange={this.change.bind(this)}
                           onBlur={this.blur.bind(this)} type="text"
                           placeholder="说点什么"/>
                </div>
            </div>
        )
    }
}
export default CommentDetail;