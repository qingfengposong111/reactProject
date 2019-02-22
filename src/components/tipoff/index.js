import React, {Component} from 'react';
import {Link} from "react-router-dom";
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import img2 from '../../images/img_image01.png'
import grayEye from './../../images/icon_grey_eyes.png'
import tipBtn from './../../images/circleBtn.png'
import './tipoff.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class TipOff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            getBalance:'',
            getCash:'',
            ownerImg:localStorage.qrcodeImg||img2
        };
        this.getInfo();
        this.getList();
    }

    back = () => {
        const history = creatHistory();
        history.goBack();
    };
    getList () {
        axios.get(host+'/api/v2/exposeList',{
            headers:{
                'token':localStorage.token||''
            }
        }).then(res=>{
            this.setState({
                list:res.data.data.list
            })
        })
    }
    getInfo=()=>{
        axios.get(host+'/api/v2/showPersonInfo',{
            headers:{
                'token':localStorage.token
            }
        }).then(res=>{
            this.setState({
                getBalance:res.data.data.commission,
                getCash:res.data.data.withdraw,
                ownerImg:res.data.data.qrcodeImg
            });
        })
    };
    rule () {
        this.props.history.push('/Rule')
    }
    tipList () {
        if(localStorage.token){
            this.props.history.push('/TipList')
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
            this.props.history.push('/login/#'+daa);
        }

    }
    formatDate=(value)=> {
        let date = new Date(value);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return YY + '-' + MM + '-' + d ;
    };
    yuan=(value)=> {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    goComment () {
        this.props.history.push('/TipSendGoComment');
    }
    render() {
        return (
            <div className="tipoff">
                <div className="tipoff-head">
                    <div className="tipoff-img" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="tipoff-center">爆料圈</div>
                    <div className="tipoff-rt" onClick={this.rule.bind(this)}>规则</div>
                </div>
                <div className="tipoff-owner">
                    <div className="tipoff-owner-img">
                        <img src={this.state.ownerImg} alt=""/>
                    </div>
                    <div className="tipoff-owner-money">
                        <div onClick={this.tipList.bind(this)}>所得佣金:{this.yuan(this.state.getBalance)}元</div>
                        <div>已提现:{this.yuan(this.state.getCash)}元</div>
                    </div>
                </div>
                <div className="tipoff-main">
                    {
                        this.state.list!==null?this.state.list.map((item,index)=>{
                            return (
                                <Link key={index} to={'/TipListDetail/'+item.id} className="tep">
                                    <div className="til">{item.title}</div>
                                    <div className='com-con'>
                                        <p>{item.shortContent}</p>
                                    </div>
                                    <div className="pic-box">
                                        {
                                            item.urls!==null?item.urls.map((temp,as)=>{
                                                return (
                                                    <div key={as} className="com-pic">
                                                        <img src={temp} alt=""/>
                                                    </div>
                                                )
                                            }):''
                                        }

                                    </div>
                                    <div className="time-show">
                                        <div>{this.formatDate(item.createTime)}</div>
                                        <div className="show">
                                            <img style={{width:'14px',height:'14px',marginRight:'5px'}} src={grayEye} alt=""/>
                                            <span>{item.hits}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }):''
                    }

                </div>
                <img className="tipBtn" onClick={this.goComment.bind(this)} src={tipBtn} alt=""/>
            </div>
        )
    }
}
export default TipOff;