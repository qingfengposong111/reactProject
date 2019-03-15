import React, {Component} from 'react';
import Header from '../../components/header/index'
import {Link} from 'react-router-dom'
import address from './../../images/icon_address.png'
import './meth.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class Meth extends Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            hasList:false
        }
    }
    componentDidMount() {//获取数据
        axios.get(host + '/api/v2/showAgencyApply', {
            params: {
                sId: this.props.match.params.id,
                longitude: this.props.match.params.long,
                latitude: this.props.match.params.lat
            }
        }).then(res => {
            if (res.data.code === '1') {
                console.log(res.data.data);
                if(res.data.data!==null){
                    res.data.data.forEach(item => {
                        if(item.distance!==null){
                            item.select = true;
                        }else{
                            item.select = false;
                        }

                    });
                    this.setState({
                        list: res.data.data,
                        hasList:true
                    })
                }else{
                    return false;
                }

            }

        })
    }
    yuan=(value)=> {
    return isNaN(value) ? 0.00 : parseFloat((value/100).toFixed(2)).toFixed(2);
};
    render=()=>{
        return (
            <div className="methList">
                <Header data="课程列表" />
                <div className="methList-box">
                    <div className={!this.state.hasList?"noLessons schoolOnLine-show":'schoolOnLine-hid'}>暂无课程！</div>
                    {
                        this.state.list!==null?this.state.list.map((item,index)=>{
                            return (
                                <Link key={index}  to={'/LessonDetail/'+item.productId} >
                                    <div className="">
                                        <div className="left_img">
                                            <img src={item.productImg} alt="" />
                                        </div>
                                        <div className="right_contain">
                                            <p className="main-title">{item.productName}</p>
                                            <p className="main-middle">
                                                <img style={{display:'block',marginRight:'5px',width:'12px'}} src={address} alt="" />
                                                <span >{item.select?item.distance:'0km'} |</span> <span>{item.name}</span>
                                            </p>
                                            <p className="price">
                                                ￥{this.yuan(item.promotePrice)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }):''
                    }

                </div>
            </div>
        )
    }
}
export default Meth;
