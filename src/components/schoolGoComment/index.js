import React, {Component} from 'react';
import {Upload, Icon, message} from '../../../node_modules/antd';
import Star from '../publicComponents/star/index'
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import cancel from './../../images/btn_cancel.png'
import './schoolGoComment.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class SchoolGoComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tea: '',
            tags: [],
            selectArr: [],
            schName: '',
            loading: '',
            imagesArr: [],
            starNum: 0
        };
    }

    componentDidMount() {
        axios.get(host + '/api/v2/schoolTags').then(res => {//获取标签
            if (res.data.code === '1') {
                res.data.data.forEach(item => {
                    item.active = false;
                });
                this.setState({
                    tags: res.data.data
                });
            }
        });
        axios.get(host + '/api/v2/showDetail', {//获取机构名字
                params: {
                    id: this.props.match.params.id
                }, headers: {
                    'token': localStorage.token || ''
                }
            }
        )
            .then(res => {
                this.setState({
                    schName: res.data.data.name
                })
            })
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

    tagSelect(temp) {
        let arr = this.state.tags;
        let that = this;
        arr.forEach(item => {
            if (temp.id === item.id) {
                if (temp.active) {
                    temp.active = false;
                    let index = that.state.selectArr.indexOf(temp.id);
                    if (index > -1) {
                        that.state.selectArr.splice(index, 1);
                    }
                } else {
                    temp.active = true;
                    that.state.selectArr.push(temp.id);
                }
            }

        });
        this.setState({
            tags: arr
        });
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

    getStar(val) {
        this.setState({
            starNum: val
        })
    }

    send() {
        if (this.state.tea !== '') {
            axios.post(host + '/api/v2/commitSchoolComment', {
                sId: parseInt(this.props.match.params.id),
                tagList: this.state.selectArr,
                score: parseInt(this.state.starNum),
                evaUrl: this.state.imagesArr.join(','),
                evaluation: this.state.tea
            }, {
                headers: {
                    'token': localStorage.token
                }
            }).then(res => {
                if (res.data.code === '0') {
                    alert(res.data.msg);
                } else if (res.data.code === 1) {
                    alert(res.data.msg);
                    this.props.history.push('/SchoolDetail/' + this.props.match.params.id);
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    alert('会话过期!');
                    let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
                    this.props.history.push('/login/#' + daa);
                }
            })
        } else {
            alert('请输入内容!');
        }
    }

    render() {
        return (
            <div className="schoolGoComment">
                <div className="schoolComment-head">
                    <div className="schoolComment-img" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="schoolComment-center">发表评论</div>
                    <div className={this.state.tea.length > 0 ? "schoolComment-rt subes" : 'schoolComment-rt'}
                         onClick={this.send.bind(this)}>提交
                    </div>
                </div>
                <div className="schoolName">{this.state.schName}</div>
                <div className="schoolStar">
                    <Star getStars={this.getStar.bind(this)} starFlag={true}/>
                </div>
                <div className="schoolTags">
                    {
                        this.state.tags.map((item, index) => {
                            return <div
                                className={item.active ? "schoolTags-item schoolTags-item-select" : "schoolTags-item"}
                                onClick={this.tagSelect.bind(this, item)} id={item.id} key={index}>{item.name}</div>
                        })
                    }
                </div>
                <div className="schoolContent">
                    <textarea value={this.state.tea} placeholder="说点什么~" onChange={this.hander.bind(this)}> </textarea>
                </div>
                <div className="schoolFile">

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
export default SchoolGoComment;