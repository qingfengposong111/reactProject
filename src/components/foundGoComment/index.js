import React, {Component} from 'react';
import {Upload, Icon, message} from '../../../node_modules/antd';
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import cancel from './../../images/btn_cancel.png'
import './foundGoComment.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class FoundGoComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tea: '',
            loading: '',
            imagesArr: []
        };
    }

    back = () => {
        const history = creatHistory();
        history.goBack();
    };

    hander(e) {
        this.setState({
            tea: e.target.value
        })
    }

    /*上传图片*/
     beforeUpload = (file) => {//图片格式与大小的限定
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('只能上传JPG格式图片!');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('图片大小必须小于5MB!');
        }
        return isJPG && isLt5M;
    };

    handleChange = (info) => {//点击上传
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        let arr = [];
        if (info.file.status === 'done') {
            arr.push(info.file.response.data);
            this.setState({
                imagesArr: this.state.imagesArr.concat(arr),
                loading: false,
            })
        }
    };

    cancel(index) {
        let arr = this.state.imagesArr;
        arr.splice(index, 1);
        this.setState({
            imagesArr: arr
        })
    }

    send() {
        if (this.state.tea !== '') {
            axios.post(host + '/api/v2/circlePublish', {
                urls: this.state.imagesArr,
                content: this.state.tea
            }, {
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                if(res.data.code==='0'){
                    alert(res.data.msg);
                }else if(res.data.code===1){
                    this.props.history.push('/Found');
                }
            }).catch(err => {
                if(err.response.status===401){
                 alert('会话过期!');
                 let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
                 this.props.history.push('/login/#'+daa);
                 }
            })
        } else {
            alert('请输入内容!');
        }
    }

    render() {
        return (
            <div className="foundGoComment">
                <div className="foundComment-head">
                    <div className="foundComment-img" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="foundComment-center">发表评论</div>
                    <div className="foundComment-rt" onClick={this.send.bind(this)}>发布</div>
                </div>
                <div className="found-box">
                    <div className="foundContent">
                        <textarea value={this.state.tea} placeholder="说点什么~" onChange={this.hander.bind(this)}> </textarea>
                    </div>
                    <div className="foundFile">

                        {
                            this.state.imagesArr !== null ? this.state.imagesArr.map((temp, m) => {
                                return (
                                    <div key={m}>
                                        <img src={'http://qiniu.wantfg.com/' +temp} alt="" className="img"/>
                                        <img onClick={this.cancel.bind(this, m)} src={cancel} alt="" className="cancel"/>
                                    </div>
                                )
                            }) : ''
                        }
                        <div className="goFile">
                            <Upload name="file" listType="picture-card" showUploadList={false}  multiple={true}
                                    action={host+'/api/v2/uploadImage'}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                            >
                                <div className="goUpload">
                                    <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                                </div>
                            </Upload>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FoundGoComment;