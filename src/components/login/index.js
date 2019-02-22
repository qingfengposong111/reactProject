import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import './login.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            pwdFlag:true,
            codeFlag:false,
            txt:'验证码登录',
            val1:'',
            val2:'',
            handleCode:'',
            codeText:'发送验证码'
        }
    }
    back(){
        const history = creatHistory();
        history.goBack();
    }
    selectLogin(){
        if(this.state.pwdFlag){
            this.setState({
                pwdFlag:false,
                codeFlag:true,
                txt:'密码登录',
                flag:true
            })
        }else{
            this.setState({
                pwdFlag:true,
                codeFlag:false,
                txt:'验证码登录'
            })
        }
    }
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
    handleCode (e) {
        this.setState({
            handleCode:e.target.value
        })
    }
    /*获取验证码*/
    getCode () {
        if(this.state.flag){
            let reg = /^1[34578]\d{9}$/;
            let n=60;
            let that = this;
            if(!reg.test(this.state.val1)||this.state.val1.trim()===''){
                alert('您输入的手机号有误,请重新输入!');
                return false;
            }else{
                axios.get(host+'/api/v2/sendSmsCode/'+this.state.val1).then(res=>{
                    let timer = setInterval(function(){
                        n--;
                        if(n===0){
                            that.setState({
                                codeText:'重新发送',
                                flag:true
                            });
                            n=60;
                            clearInterval(timer)
                        }else{
                            that.setState({
                                codeText:n+'s后重新发送',
                                flag:false
                            })
                        }
                    },1000)
                })
            }
        }

    }
    register (){
        this.props.history.push('/Register')
    }
    goSubmit(){
        let reg = /^1[34578]\d{9}$/;
        if(!reg.test(this.state.val1)&&this.state.val1!==''){
            alert('您输入的手机号有误,请重新输入!');
            this.setState({
                val1:''
            })
        }else{
            axios.post(host+'/api/v2/login',{
                    mobile:this.state.val1,
                    smsCode:this.state.handleCode,
                    passwd:this.state.val2,
                    lastLoginIp:' '
                }
            ).then(res=>{
                if(res.data.code==='0'){
                    alert(res.data.msg);
                }else if(res.data.code==='1'){
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("truename", res.data.data.truename);
                    localStorage.setItem("nickname", res.data.data.nickname);
                    localStorage.setItem("sex", res.data.data.sex);
                    localStorage.setItem("id", res.data.data.id);
                    localStorage.setItem("qrcodeImg", res.data.data.qrcodeImg);
                    localStorage.setItem("mobile", res.data.data.mobile);
                    let pas = window.location.href.substring(window.location.href.indexOf('#')+1);
                    let sign = window.location.href.indexOf('#');
                  if(sign===-1){
                        this.props.history.push('/')
                    }else{
                        this.props.history.push(pas)
                    }
                }
            })
        }

    }
    forget () {
        this.props.history.push('/Forget')
    }
    render(){
        return(
            <div>
                <div className="login-head">
                    <div className="login-img"  onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="login-center">登录</div>
                    <div className="login-rt" onClick={this.register.bind(this)}>注册</div>
                </div>
                <div className="login-main">
                    <div className="phone">
                        <input type='text' value={this.state.val1} onChange={this.handle1.bind(this)} placeholder="请输入您的手机号码"/>
                    </div>
                    <div className={this.state.pwdFlag?'login-show pwd':'login-hid'}>
                        <input type='password'  onChange={this.handle2.bind(this)} placeholder="请输入您的密码"/>
                    </div>
                    <div className={this.state.codeFlag?"login-show code":'login-hid'}>
                        <input value={this.state.handleCode} type='text' onChange={this.handleCode.bind(this)} placeholder="请输入您的验证码"/>
                        <span onClick = {this.getCode.bind(this)}>{this.state.codeText}</span>
                    </div>
                    <div className={this.state.val1!==''?"submit submit-color":'submit'} onClick={this.goSubmit.bind(this)}>登录</div>
                    <div className="login-tip">
                        <span onClick={this.selectLogin.bind(this)}>{this.state.txt}</span><span onClick={this.forget.bind(this)}>忘记密码?</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;