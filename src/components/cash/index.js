import React, {Component} from 'react'
import axios from 'axios'
import Header from './../publicComponents/header/index'
import './cash.css'
const host = 'http://api.kingsf.cn/'/*'https://api.labiyouxue.cn/'*/;
class Cash extends Component{
    constructor(props){
        super(props);
        this.state={
            inputVal:'',
            zfVal:'',
            balance:'',
            alipayAccount:''
        };
        this.getInfo();
    }
    getInfo=()=>{
        axios.get(host+'/api/v2/showPersonInfo',{
            headers:{
                'token':localStorage.token
            }
        }).then(res=>{
            console.log(res)
            if(res.data.data.alipayAccount===null){
                this.setState({
                    zfVal:''
                })
            }else{
                this.setState({
                    zfVal:res.data.data.alipayAccount+''
                })
            }
            this.setState({
                balance:res.data.data.balance
            })
        })
    };
    formatDate = (value) => {
        let date = new Date(value);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return YY + '-' + MM + '-' + d;
    };
    yuan = (value) => {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    inputVal=(e)=>{
      this.setState({
          inputVal:e.target.value
      })
    };
    zfVal=(e)=>{
        this.setState({
            zfVal:e.target.value
        })
    };
    allBalance=()=>{
        this.setState({
            inputVal:this.yuan(this.state.balance)
        })
    };
    submit=()=>{
        if(this.state.inputVal===''){
            alert('请输入提现金额！');
        }else if(this.state.zfVal===''){
            alert('请输入支付宝帐号！');
        }else{
            axios.post(host+'/api/v2/applyWithdraw',{
                money:+(parseFloat(this.state.inputVal)*100).toFixed(0),
                alipayAccount:this.state.zfVal
            },{
                headers:{
                    'token':localStorage.token,
                }
            })
                .then(res=>{
                    alert(res.data.msg);
                    this.getInfo();
                    this.props.history.push('/Wallet')
                })
        }
    };
    render=()=>{
        return (
            <div className="cash">
                <Header data="提现" />
                <div className="cash-top">
                    <div className="cash-til">余额</div>
                    <div className="cash-money">
                        ￥<span>{this.yuan(this.state.balance)}</span>
                    </div>
                </div>
                <div className="cash-done">
                    <div className="cash-til " style={{padding:'20px 0'}}>提现到支付宝</div>
                    <div className="cash-wallet">
                        <span style={{color:'#666'}}>￥</span>
                        <div className="cash-input">
                            <input type="number" value={this.state.inputVal} onChange={this.inputVal.bind(this)}   id="val"  placeholder="输入提现金额" />
                        </div>
                        <span onClick={this.allBalance.bind(this)}>全额</span>
                    </div>
                    <div className="cash-zf">
                        <input type="text" value={this.state.zfVal} onChange={this.zfVal.bind(this)}  id="account" placeholder="请输入您的支付宝账号" />
                    </div>
                </div>
                <div className="cash-tip">* 提现免手续费，预计三个工作日内到账</div>
                <div onClick={this.submit.bind(this)} className={this.state.inputVal>0?"cash-button bgColor":'cash-button'} >
                立即提现
                </div>
            </div>
        )
    }
}
export default Cash;
