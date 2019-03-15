import React, {Component} from 'react';
import {Upload, message} from '../../../node_modules/antd';
import Header from '../../components/header/index'
import './personal.css'
import img1 from './../../images/img_image01.png'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: localStorage.qrcodeImg,
            loading: false,
            name: localStorage.getItem('truename'),
            headImg: localStorage.getItem("qrcodeImg"),
            nickname: localStorage.getItem("nickname"),
            sex: localStorage.getItem("sex"),
            mobile: localStorage.getItem("mobile"),
            sexList: [{id: '0', name: '保密'},
                {id: '1', name: '男'},
                {id: '2', name: '女'}],
            sexName: localStorage.getItem("sex") === '0' ? '保密' : (localStorage.getItem("sex") === '1' ? '男' : '女'),
            sexFlag: false
        }
    }

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
        if (info.file.status === 'done') {
            localStorage.setItem('qrcodeImg', 'http://qiniu.wantfg.com/' + info.file.response.data);
            this.setState({
                images: 'http://qiniu.wantfg.com/' + info.file.response.data,
                loading: false,
            });
            axios.post(host + '/api/v2/editPersonInfo',
                {
                    qrcodeImg: info.file.response.data
                }, {
                    headers: {
                        'token': localStorage.getItem("token")
                    }
                }).then(res => {
                alert('修改' + res.data.msg);
            })

        }
    };

    editor(til, cont) {
        let val = window.prompt('是否修改‘' + til + '’', cont);
        if (val !== null && val !== "") {
            if (til === '姓名') {
                this.setState({
                    name: val
                });
                localStorage.setItem('truename', val);
            }
            if (til === '昵称') {
                this.setState({
                    nickname: val
                });
                localStorage.setItem('nickname', val);
            }
            if (til === '手机') {
                this.setState({
                    mobile: val
                });
                localStorage.setItem('mobile', val);
            }
            axios.post(host + '/api/v2/editPersonInfo',
                {
                    truename: this.state.name,
                    mobile: this.state.mobile,
                    nickname: this.state.nickname
                }, {
                    headers: {
                        'token': localStorage.getItem("token")
                    }
                }).then(res => {
                alert('修改' + res.data.msg);
            })

        }
    }

    sexShow() {
        this.setState({
            sexFlag: true
        })
    }

    sexSelect(item) {
        this.setState({
            sex: item.id,
            sexName: item.name,
            sexFlag: false
        });
        localStorage.setItem('sex', item.id);
        axios.post(host + '/api/v2/editPersonInfo',
            {
                sex: this.state.sex
            }, {
                headers: {
                    'token': localStorage.getItem("token")
                }
            }).then(res => {
            alert('修改' + res.data.msg);
        })
    }

    render = () => {
        return (
            <div className="personal">
                <Header data="个人资料"/>
                <div className="personal-main">
                    <div>
                        <div>
                            头像
                        </div>
                        <div>
                            <div className="upload-imgs">
                                <Upload name="file" listType="picture-card" showUploadList={false} multiple={true}
                                        action={host + '/api/v2/uploadImage'}
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                >
                                    <div className="goups">
                                        {
                                            this.state.images ? <img src={this.state.images} alt=""/> :
                                                <img src={img1} alt=""/>
                                        }
                                    </div>
                                </Upload>
                            </div>
                            <div className="shape"></div>
                        </div>
                    </div>
                    <div onClick={this.editor.bind(this, '姓名', this.state.name ? this.state.name : '')}>
                        <div>
                            姓名
                        </div>
                        <div>
                            <div>{this.state.name}</div>
                            <div className="shape"></div>
                        </div>
                    </div>
                    <div >
                        <div>
                            性别
                        </div>
                        <div>
                            <div className="sex-select">
                                <div onClick={this.sexShow.bind(this)}>{this.state.sexName}</div>
                                <div className={this.state.sexFlag ? "sex-updown sex-show" : 'sex-hid'}>
                                    {
                                        this.state.sexList.map((item, index) => {
                                            return <div onClick={this.sexSelect.bind(this, item)}
                                                        key={index}>{item.name}</div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="shape"></div>
                        </div>
                    </div>
                    <div onClick={this.editor.bind(this, '昵称', this.state.nickname ? this.state.nickname : '')}>
                        <div>
                            昵称
                        </div>
                        <div>
                            <div>{this.state.nickname}</div>
                            <div className="shape"></div>
                        </div>
                    </div>
                    <div onClick={this.editor.bind(this, '手机', this.state.mobile ? this.state.mobile : '')}>
                        <div>
                            手机
                        </div>
                        <div>
                            <div>{this.state.mobile}</div>
                            <div className="shape"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Personal;