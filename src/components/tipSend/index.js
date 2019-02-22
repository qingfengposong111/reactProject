import React, {Component} from 'react';
/*import * as qiniu from 'qiniu-js'*/
import {Upload, Icon, message} from 'antd';
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import cancel from './../../images/btn_cancel.png'
import iconVideo from './../../images/icon_video.png'
import './tipSend.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';

class TipSendGoComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tea: '',
            til: '',
            loading: '',
            imagesArr: [],
            videoSrc: '',
            token: '',
            posters: '',
            show: false,
            txt: '导入视频',
            flag:true
        };
    }

    back = () => {
        const history = creatHistory();
        history.goBack();
    };

    componentDidMount() {
        axios.get(host + 'api/v2/qnToken').then(res => {
            this.setState({
                token: res.data.data.token
            })
        });
    }

    onChange(info) {
        let that = this;
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            let src = info.file.response.key;
            that.setState({
                videoSrc: src,
                posters: 'http://qiniu.wantfg.com/' + src + '?vframe/jpg/offset/1',
                show: true,
                txt: '点击更换视频'
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    handleTitle(e) {
        this.setState({
            til: e.target.value
        })
    }

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

    goPlay() {
        let video = document.getElementsByTagName('video')[0];
        if (video.paused) {
            video.play();
            this.setState({
                flag:false
            })
        } else {
            video.pause();
            this.setState({
                flag:true
            })
        }
    };
    goPlay1(){
        let video = document.getElementsByTagName('video')[0];
        if (video.paused) {
            video.play();
            this.setState({
                flag:false
            })
        } else {
            video.pause();
            this.setState({
                flag:true
            })
        }
    }

    send() {//发布
        if (this.state.til === '') {
            alert('请输入爆料标题!')
        }
        if (this.state.tea === '') {
            alert('请输入爆料内容!')
        } else {
            axios.post(host + '/api/v2/publishExpose', {
                title: this.state.til,
                content: this.state.tea,
                image: this.state.imagesArr.join(','),
                video: this.state.videoSrc,
                videoImg: this.state.posters
            }, {
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                console.log(res, 5);
            })
        }
    }

    render() {
        let props = {
            name: 'file',
            action: 'http://upload-z2.qiniup.com',
            data: {
                token: this.state.token
            },
            headers: {
                authorization: 'authorization-text'
            }
        };
        return (
            <div className="tipSendGoComment">
                <div className="tipSendComment-head">
                    <div className="tipSendComment-img" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="tipSendComment-center">发表评论</div>
                    <div className="tipSendComment-rt" onClick={this.send.bind(this)}>发布</div>
                </div>
                <div className="videos">
                    <div className={this.state.show ? "videos-box tipSend-show" : 'tipSend-hid'}>
                        <video onClick={this.goPlay1.bind(this)} webkit-playsinline='' playsinline='' x5-playsinline=''  x-webkit-airplay='allow' id="video" poster={this.state.posters}
                               src={'http://qiniu.wantfg.com/' + this.state.videoSrc}/>
                        <img onClick={this.goPlay.bind(this)} className={this.state.flag?"iconPlay tipSend-show":'tipSend-hid'} src={iconVideo} alt=""/>
                    </div>
                    <div className="uploadBtn">
                        <Upload {...props} onChange={this.onChange.bind(this)}>
                            {this.state.txt}
                        </Upload>
                    </div>

                </div>

                <div className="tipSend">

                    <div className="tipSend-til">
                        <input type="text" value={this.state.til} onChange={this.handleTitle.bind(this)}
                               placeholder="请写下您的爆料标题"/>
                    </div>
                    <div className="tipSendContent">
                        <textarea placeholder="请写下您的爆料内容" value={this.state.tea}
                                  onChange={this.hander.bind(this)}> </textarea>
                    </div>
                </div>

                <div className="tipSendFile">

                    {
                        this.state.imagesArr !== null ? this.state.imagesArr.map((temp, m) => {
                            return (
                                <div key={m}>
                                    <img src={'http://qiniu.wantfg.com/' + temp} alt="" className="img"/>
                                    <img onClick={this.cancel.bind(this, m)} src={cancel} alt="" className="cancel"/>
                                </div>
                            )
                        }) : ''
                    }
                    <div className="goFile">
                        <Upload name="file" listType="picture-card" showUploadList={false} multiple={true}
                                action={host + '/api/v2/uploadImage'}
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
        )
    }
}
export default TipSendGoComment;