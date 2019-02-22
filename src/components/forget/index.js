import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import './forget.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class Forget extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:false,
            val1:'',
            val2:'',
            handleCode:'',
            send:true,
            codeText:'发送验证码'
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
    handleCode (e) {
        this.setState({
            handleCode:e.target.value
        })
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
                alert('请同意协议!');
                return false;
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
                alert(res.data.msg);
                return false;
            }else{
                alert(res.data.msg);
                this.props.history.push('/Login');
            }
        })
    }}
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
                    <div className="register-center">重置密码</div>
                    <div className="register-rt" onClick={this.login.bind(this)}>登录</div>
                </div>
                <div className="register-main">
                    <div className="phone">
                        <input type='text' value={this.state.val1} onChange={this.handle1.bind(this)} placeholder="请输入您的手机号码"/>
                    </div>
                    <div className='register-show pwd'>
                        <input type='password'  onChange={this.handle2.bind(this)} placeholder="请重置您的密码"/>
                    </div>
                    <div className="code">
                        <input type='text' onChange={this.handleCode.bind(this)} value={this.state.handleCode} placeholder="请输入您的验证码"/>
                        <span onClick={this.getCode.bind(this)}>{this.state.codeText}</span>
                    </div>
                    <div className={this.state.val1!==''?"submit submit-color":'submit'} onClick={this.goSubmit.bind(this)}>确认</div>
                </div>
            </div>
        )
    }
}
export default Forget;