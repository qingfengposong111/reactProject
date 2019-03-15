import React, {Component} from 'react';
import Footer from '../../components/footer/index'
import Line from '../../components/line/index'
import home from './../../images/home.png'
import love from './../../images/love.png'
import img1 from '../../images/img_image01.png'
import attention from './../../images/icon_collection.png'
import active from './../../images/icon_signup.png'
import belong from './../../images/tad_school_pre.png'
import order from './../../images/home_btn_institutions.png'
import wallet from './../../images/icon_wallet@2x.png'
import set from './../../images/icon_Set.png'
import area from './../../images/area.png'
import './mine.css'
class School extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    image:attention,
                    contain:'我的关注'
                },
                {
                    image:active,
                    contain:'活动报名'
                },
                {
                    image:belong,
                    contain:'所属学校'
                },
                {
                    image:order,
                    contain:'我的订单'
                },
                {
                    image:wallet,
                    contain:'我的钱包'
                },
                {
                    image:set,
                    contain:'设置'
                }
            ],
            personal:localStorage.qrcodeImg||img1,
            himSelf:localStorage.nickname||'点击登陆/注册'
        };

    };
    goPath(num){
        switch(num){
            case 0:
                this.props.history.push('/MyAttention');
                break;
            case 1:
                this.props.history.push('/ActivityEnroll');
                break;
            case 2:
                this.props.history.push('/BelongSchool');
                break;
            case 3:
                this.props.history.push('/MyOrder');
                break;
            default:
                this.props.history.push('/Wallet');
                break;

        }
    }
    goPersonal () {
        if(localStorage.token){
            this.props.history.push('/Personal')
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':') + 5);
            this.props.history.push('/login/#' + daa);
        }

    }
    render() {
        return (
            <div>
                <div className="mines">
                    <div className="mines_title">我的</div>
                    <div onClick={this.goPersonal.bind(this)} className="mines_img">
                        <img src={this.state.personal} alt="" />
                    </div>
                    <div className="himSelf">{this.state.himSelf}</div>
                    <div className="shows">
                        <div className="shows_single">
                            <img src={love} alt=""/>
                            <p>关爱值</p>
                        </div>
                        <div className="shows_single">
                            <img src={area} alt=""/>
                            <p>区域排行</p>
                        </div>
                        <div className="shows_single">
                            <img src={home} alt=""/>
                            <p>家庭排行</p>
                        </div>
                    </div>
                </div>
                <div className="mine-list">
                    {
                        this.state.list.map((item,index) =>{
                            return <div onClick={this.goPath.bind(this,index)} key={index}><Line data2={item} /></div>
                        })
                    }
                </div>

                <Footer footerFlag='4' />
            </div>
        )
    }
}
export default School