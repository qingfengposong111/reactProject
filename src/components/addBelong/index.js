import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import {Upload, Icon, message} from '../../../node_modules/antd';
import './addBelong.css'
import axios from 'axios'
const host = /*'https://api.labiyouxue.cn/'*/ 'http://api.kingsf.cn/';
class AddBelong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        }
    }

    back() {
        const history = creatHistory();
        history.goBack();
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
        if (info.file.status === 'done') {
            this.setState({
                img: info.file.response.data,
                loading: false,
            })
        }
    };

    belongSearch() {
        this.props.history.push('/BelongSearch');
    }

    submit() {
        if (this.props.match.params.type === undefined) {
            alert('请选择学校或机构!');
        } else if (this.state.img === '') {
            alert('请上传凭证!');
        } else {
            axios.post(host + 'api/v2/schoolBelongCommit', {
                sId: this.props.match.params.id,
                imgUrl: this.state.img,
                type: this.props.match.params.type
            }, {
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                alert(res.data.msg);
                if(res.data.code==='1'){
                    this.props.history.push('/BelongSchool');
                }
            })
        }
    }

    render = () => {
        return (
            <div className="addBelong">
                <div className="belongSchool-head" style={{position: 'static'}}>
                    <div className="belongSchool-img" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="belongSchool-center">添加所属</div>
                    <div className="belongSchool-rt" onClick={this.submit.bind(this)}>确认</div>
                </div>
                <div className="addBelong-contain">
                    <div className="addBelong-contain-single" onClick={this.belongSearch.bind(this)}>
                        <div className="add-c-s-lf">名称</div>
                        <div className="add-c-s-rt">
                            <div
                                className="add-c-s-rt-lf">{this.props.match.params.name ? this.props.match.params.name : '请选择'}</div>
                            <div className="shape"></div>
                        </div>
                    </div>
                    <div className="addBelong-contain-single">
                        <div className="add-c-s-lf">类型</div>
                        <div className="add-c-s-rt">
                            <div
                                className="add-c-s-rt-lf">{this.props.match.params.type ? (this.props.match.params.type === 1 ? '学校' : '机构') : '--'}</div>
                            <div className="shape"></div>
                        </div>
                    </div>
                    <div className="addBelong-contain-single">
                        <div className="add-c-s-lf">凭证</div>
                        <div className="add-c-s-rt">
                            <Upload name="file" listType="picture-card" showUploadList={false}
                                    action={host + '/api/v2/uploadImage'}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                            >
                                <div className="goUpload" style={{border: '1px dashed #eee'}}>
                                    {this.state.img ?
                                        <img className="addPic" src={'http://qiniu.wantfg.com/' + this.state.img}
                                             alt="file"/> : <Icon type={this.state.loading ? 'loading' : 'plus'}/>}
                                </div>
                            </Upload>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default AddBelong;