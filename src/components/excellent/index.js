import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Swiper from '../publicComponents/swiper/index.js'
import Header from '../publicComponents/header/index'
import SmList from '../publicComponents/schMethList/index'
import imgs from './../../images/img_image01.png'
import './excellent.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class Excellent extends Component{
    constructor(props){
        super(props);
        this.state={
            imgList:[],
            excellent:[]
        };
        let that = this;
        axios.get(host + "/api/v2/getAdvImg", {
            params: {
                id: '',
                type: 6
            }
        })
        .then(function (response) {
            let arr = response.data.data;
            let ars = [];
            arr.forEach(function (item) {
                let obj = {};
                obj.image = item.imgUrl;
                ars.push(obj);
            });
            that.setState({
                imgList: ars
            })
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get(host+'api/v2/hotOrganization').then(res=>{
            if(res.data.data!==null){
                res.data.data.forEach(item=>{
                    if(item.imgUrl==='http://qiniu.wantfg.com/null'){
                        item.imgUrl = imgs
                    }
                });
                this.setState({
                    excellent:res.data.data
                })
            }
            that.setState({
                excellent:res.data.data
            })
        })
    }
    render (){
        return(
            <div>
                <Header data="优秀机构"/>
                <div className="excellent-out">
                    <div className="banner">
                        <Swiper list={this.state.imgList} />
                    </div>
                    <div className="excelent">
                        <span className="shape1"> </span>
                        <span>优秀机构</span>
                    </div>
                    <div className="excellentList">
                        <div className='panel'>
                            {
                                this.state.excellent.map((item, index) => {
                                    return <Link key={index} to={'/SchoolDetail/'+item.sId}><SmList abc={item} /></Link>
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Excellent;