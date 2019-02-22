import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Luo from 'iscroll-luo';
import Header from '../publicComponents/header/index'
import Swiper from '../publicComponents/swiper/index'
import CircleComment from '../publicComponents/circleComment/index'
import circleBtn from './../../images/circleBtn.png'
import './found.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class Found extends Component{
    constructor(props){
        super(props);
        this.state={
            bannerList:[],
            circleList:[],
            pageSize:20,
            pageNumber:1
        };
    }
    componentDidMount () {
        this.getDetail();
        this.getBanner();
    }
    getDetail () {
        axios.get(host+'/api/v2/circleNewsList',{
            params:{
                pageSize:this.state.pageSize*this.state.pageNumber
            },
            headers: {
                'token': localStorage.token || ''
            }
        }).then(res=>{
            this.setState({
                circleList:res.data.data.list
            })
        })
    }
    getBanner () {
        const that = this;
        axios.get(host+"/api/v2/getAdvImg",{
            params: {
                id: 0,
                type: 5
            }
        }).then(function (response) {
            let arr = response.data.data;
            let ars = [];
            arr.forEach(function(item){
                let obj={};
                obj.image = item.imgUrl;
                ars.push(obj);
            });
            that.setState({
                bannerList:ars
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
    goComment () {
        if(localStorage.token){
            this.props.history.push('/FoundGoComment');
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
            this.props.history.push('/login/#'+daa);
        }
    }
    onDown () {
        this.setState({
            circleList:this.state.circleList
        })
    }
    onUp () {
        if(this.state.circleList.length>=this.state.pageNumber*this.state.pageSize){
            this.setState({
                pageNumber:this.state.pageNumber+1
            });
            this.getDetail();
        }else{
            return false;
        }
    }
    render(){
        return(
            <div>
                <Header data="优学圈" />
                <div className="found-box">
                    <div className="bannerList1">
                        <Swiper list={this.state.bannerList} />
                    </div>
                    <div className="circleComment" style={{height:'100vh'}}>
                        <Luo id="circle" onDown={this.onDown.bind(this)} onUp={this.onUp.bind(this)}>
                        {
                            this.state.circleList!==null?this.state.circleList.map((item,index)=>{
                                return <div key={index} style={{width:'92%',margin:'0 auto',borderBottom:'1px solid #eee'}}>
                                        <Link to={'/CircleDetail/'+item.id}><CircleComment com={item} /></Link>
                                    </div>
                            }):''
                        }
                        </Luo>
                    </div>
                </div>
                <img className="circleBtn" onClick={this.goComment.bind(this)} src={circleBtn} alt=""/>
            </div>


        )
    }
}
export default Found;