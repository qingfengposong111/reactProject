import React, {Component} from 'react';
import {Link} from "react-router-dom";
import img1 from '../../images/home_btn_choose.png'
import img2 from '../../images/home_btn_institutions.png'
import img3 from '../../images/home_btn_activity.png'
import img4 from '../../images/home_btn_daily.png'
import img5 from '../../images/home_btn_integral.png'
import iconSearch from './../../images/icon_search.png'
import Search from '../publicComponents/search/index.js'
import Footer from '../publicComponents/footer/index.js'
import Swiper from '../publicComponents/swiper/index.js'
import Lessons from '../publicComponents/lessons/index.js'
import Hot from '../publicComponents/hot/index.js'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';

class Main extends Component {
    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = {
            list: [],
            lists: [],
            city: '',
            cityId: 0,
            selectCity: ' ',
            local: localStorage.itself != null ? localStorage.itself.slice(0, 3) : ''
        };
    }
    changes() {
        const that = this;
        axios.get(host + "/api/v2/popularRecommend")
            .then(function (res) {
                res.data.data.list.forEach((item, j) => {
                    item.url = res.data.data.list[j].url.slice(res.data.data.list[j].url.indexOf('www')).replace(/%2F/g, '/');
                });
                that.setState({
                    lists: res.data.data.list
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    searchSchool() {
        this.props.history.push('/SearchSchool')
    }

    location() {
        this.props.history.push('/Location')
    }
    //加载
   /* static getDerivedStateFromProps(){
        console.log('静态加载');
        return {

        }
    }*/
    componentWillMount(){
        const that = this;
        axios.get(host + "/api/v2/getAdvImg", {
            params: {
                id: 0,
                type: 0
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
                    list: ars
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        /*console.log("组件将要加载 componentWillMount")*/
    }
    componentDidMount = () => {
        this.changes();
       /*console.log('组件已经加载 componentDidMount');*/
        let BMap = window.BMap;
        let that = this;
        let myCity = new BMap.LocalCity();
        myCity.get(function (result) {
            localStorage.setItem('lng', result.center.lng);
            localStorage.setItem('lat', result.center.lat);
            localStorage.setItem('locationName', result.name);
            that.setState({
                city: result.name
            });
            axios.get(host + '/api/v2/getCity', {
                params: {
                    name: result.name
                }
            }).then(res => {
                let id = res.data.data[0].id;
                that.setState({
                    cityId: id
                });
                localStorage.setItem('locationId', id)
            }).catch(err => {
                console.log(err)
            })
        });
    };
    /*componentWillReceiveProps(){
        console.log('组件将要更新 componentWillReceiveProps')
    }
    //更新
    shouldComponentUpdate(){
        console.log('组件是否应该更新 componentUpdate');
        return true;
    }
    componentWillUpdate(){
        console.log('组件将要更新 componentWillUpdate');
    }
    /!*getSnapshotBeforeUpdate(){
        console.log('更新前获取截图 getSnapshotBeforeUpdate');
        return true;
    }*!/
    //卸载
    componentWillUnmount(){
        console.log('组件将要卸载 componentWillUnmount')
    }*/
    goWlink = () => {
        window.location.href = 'https://www.labiyouxue.com/article/1';
    };
    goWlink2 = () => {
        window.location.href = 'https://www.labiyouxue.com/article/2'
    };
    loadMore () {
        this.props.history.push('/LoadMore')
    }
    render() {
        /*console.log('render');*/
        return (
            <div className="box">
                <div className="header-search">
                    <div className="backs" onClick={this.location.bind(this)}>
                        <span>{this.state.local || localStorage.locationName}</span>
                        <span className="index-shape"> </span>
                    </div>
                    <div className="center" onClick={this.searchSchool.bind(this)}>
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search placeholder="搜索幼儿园/培训机构/俱乐部等"> </Search>
                    </div>
                    <Link to="/Login" className="rt">登录</Link>
                </div>
                <Swiper list={this.state.list}/>
                <div className="nav">
                    <Link to="/selectSchool" className="choose">
                        <img src={img1} alt=""/>
                        <p style={{color: 'rgb(107, 178, 255)'}}>择校</p>
                    </Link>
                    <Link to="/Excellent" className="good">
                        <img src={img2} alt=""/>
                        <p style={{color: 'rgb(250, 186, 122)'}}>优秀机构</p>
                    </Link>
                    <Link to="/Activity" className="active">
                        <img src={img3} alt=""/>
                        <p style={{color: 'rgb(238, 138, 139)'}}>亲子活动</p>
                    </Link>
                    <Link to="" className="baby" onClick={this.goWlink.bind(this)}>
                        <img src={img4} alt=""/>
                        <p style={{color: 'rgb(253, 170, 125)'}}>宝宝日常</p>
                    </Link>
                    <Link to="" onClick={this.goWlink2.bind(this)} className="score">
                        <img src={img5} alt=""/>
                        <p style={{color: 'rgb(235, 142, 251)'}}>积分入学</p>
                    </Link>
                </div>
                <Lessons />
                <div className="excell">
                    <div className="title">
                        <div className="excell-lf" onClick={this.loadMore.bind(this)}>
                            <span className="shape1"> </span>
                            <span>热门推荐</span>
                        </div>
                        <div className="excell-rt">
                            <Link to="/HotMore" style={{fontSize: '12px', color: '#999'}}>更多></Link>
                        </div>
                    </div>
                </div>
                <div className="hot-main">
                    {
                        this.state.lists !== null ? this.state.lists.map((temp, hotIndex) => {
                            return <Hot key={hotIndex} hotData={temp}/>
                        }) : ''
                    }
                </div>

                <Footer footerFlag='1'/>
            </div>
        )
    }
}
export default Main