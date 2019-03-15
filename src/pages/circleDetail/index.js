import React, {Component} from 'react'
import Header from '../../components/header/index'
import CircleComment from '../../components/circleComment/index'
import axios from 'axios'
import './circleDetail.css'
import heart from './../../images/heart.png'
import com from './../../images/com.png'
const host = 'http://api.labiyouxue.cn/';
class ActiveComDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            schoolCommentList: [],
            val: ''
        };
        this.circleDetail();
        this.circleComments();
    }

    circleComments() {
        axios.get(host + '/api/v2/circleComments', {
            params: {
                id: this.props.match.params.id
            }, headers: {
                'token': localStorage.token
            }
        }).then(res => {
            if (res.data.code === '1') {
                this.setState({
                    schoolCommentList: res.data.data.list
                })
            }
        })
    }

    circleDetail() {
        axios.get(host + '/api/v2/circleNewsDetail', {
            params: {
                id: this.props.match.params.id
            }, headers: {
                'token': localStorage.token
            }
        }).then(res => {
            this.setState({
                detail: res.data.data
            })
        });
    }

    /*点赞*/
    praise() {
        if(localStorage.token){
            axios.post(host + '/api/v2/circleLike', {
                cid: this.props.match.params.id
            }, {
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                alert(res.data.msg)
                this.circleDetail();
            }).catch(err=>{
                if(err.response.status===401){
                    alert('会话过期!')
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
            val: e.target.value
        })
    }

    /*失去焦点*/
    blur() {
        if (this.state.val === '') {
            alert('请输入评论内容!')
        } else {
            axios.post(host + '/api/v2/circleReply', {
                    pid: this.props.match.params.id,
                    replyMid: '',
                    content: this.state.val
                }, {
                    headers: {
                        'token': localStorage.token
                    }
                }
            ).then(res => {
                alert(res.data.msg);
                this.circleComments();
                this.circleDetail();
            })
        }
    }

    render() {
        return (
            <div className="com-detail">
                <Header data='评论详情'/>
                <div style={{padding:'0 10px'}}>
                    <CircleComment  com={this.state.detail}/>
                </div>

                <div className="praise-comment">
                    <div onClick={this.praise.bind(this)}>
                        <img src={heart} alt=""/>
                        <span>{this.state.detail.likeNum}</span>
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
                                    <span >{item.nickname}：</span><span>{item.content}</span>
                                </div>
                            )
                        }) : ''
                    }
                </div>
                <div className="circle-com">
                    <input id="input" value={this.state.val} onChange={this.change.bind(this)}
                           onBlur={this.blur.bind(this)} type="text"
                           placeholder="说点什么"/>
                </div>
            </div>
        )
    }
}
export default ActiveComDetail;