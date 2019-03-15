import React, {Component} from 'react';
import {Link} from "react-router-dom";
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import './register.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:false,
            val1:'',
            val2:'',
            handleCode:'',
            codeText:'发送验证码',
            send:true
        }
    }
    back=()=>{
        const history = creatHistory();
        history.goBack();
    };
    handle1(e){
        this.setState({
            val1:e.target.value
        });
    }
    handle2(e){
        this.setState({
            val2:e.target.value
        });
    }
    goSubmit(){
        let reg = /^1[34578]\d{9}$/;
        if(!reg.test(this.state.val1)&&this.state.val1!==''){
            alert('您输入的手机号有误,请重新输入!');
            this.setState({
                val1:''
            })
        }else{
            axios.post(host+'/api/v2/register',{
                    mobile:this.state.val1,
                    smsCode:this.state.handleCode,
                    passwd:this.state.val2,
                    lastLoginIp:' '
                }
            ).then(res=>{
              if(res.data.code==='0'){
                  alert(res.data.msg)
              }else{
                  alert(res.data.msg);
                  this.props.history.push('/Login');
              }
            })
    }
    }
    /*获取验证码*/
    getCode () {
        if(this.state.send){
            let reg = /^1[34578]\d{9}$/;
            let n=60;
            let that = this;
            if(!reg.test(this.state.val1)||this.state.val1.trim()===''){
                alert('您输入的手机号有误,请重新输入!');
                return false;
            }else if(!this.state.flag){
                alert('请同意协议!')
            }else{
                axios.get(host+'/api/v2/sendSmsCode/'+this.state.val1).then(res=>{
                    let timer = setInterval(function(){
                        n--;
                        if(n===0){
                            that.setState({
                                codeText:'重新发送',
                                send:true
                            });
                            n=60;
                            clearInterval(timer)
                        }else{
                            that.setState({
                                codeText:n+'s后重新发送',
                                send:false
                            })
                        }
                    },1000)
                })
            }
        }

    }
    handleCode (e) {
        this.setState({
            handleCode:e.target.value
        })
    }
    login () {
        this.props.history.push('/Login')
    }
    protocol () {
        let flag = this.state.flag;
        this.setState({
            flag:!flag
        })
    }
    render(){
        return(
            <div>
                <div className="register-head">
                    <div className="register-img"  onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="register-center">注册</div>
                    <div className="register-rt" onClick={this.login.bind(this)}>登录</div>
                </div>
                <div className="register-main">
                    <div className="phone">
                        <input type='text' value={this.state.val1} onChange={this.handle1.bind(this)} placeholder="请输入您的手机号码"/>
                    </div>
                    <div className='register-show pwd'>
                        <input type='password'  onChange={this.handle2.bind(this)} placeholder="请设置您的密码"/>
                    </div>
                    <div className="code">
                        <input type='text' value={this.state.handleCode} onChange={this.handleCode.bind(this)} placeholder="请输入您的验证码"/>
                        <span onClick={this.getCode.bind(this)}>{this.state.codeText}</span>
                    </div>
                    <div className={this.state.val1!==''?"submit submit-color":'submit'} onClick={this.goSubmit.bind(this)}>注册</div>
                    <div className="protocol">
                        <span onClick={this.protocol.bind(this)} className={this.state.flag?'rc label2':'rc'}> </span>
                        <Link to="/https://www.labiyouxue.com/signIn/agreement">我已阅读《蜡笔幼学注册协议》</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;