import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Search from '../publicComponents/search/index'
import SmList from '../publicComponents/schMethList/index'
import Footer from '../publicComponents/footer/index'
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import imgs from './../../images/img_image01.png'
import iconSearch from './../../images/icon_search.png'
import img2 from './../../images/school_btn_screening.png'
import './school.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class School extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            tabList: [
                {name: "学校", type: "1", active: true},
                {name: "培训机构", type: "2", active: false},
                {name: "俱乐部", type: "3", active: false}
            ],
            pageSize:20,
            pageNumber:1,
            isLoadingMore: false,
            type:1,
            showOrHid:true
        };

    };

    getList(type) {
        axios.get(host + 'api/v2/showAll', {
            params: {
                type: type,
                pageSize: this.state.pageSize*this.state.pageNumber,
                latitude: localStorage.lat,
                longitude: localStorage.lng
            }
        }).then(res => {
            if (res.data.data.list !== null || res.data.data.list !== undefined) {
                res.data.data.list.forEach(item => {
                    if (item.imgUrl === null) {
                        item.imgUrl = imgs
                    }
                });
                this.setState({
                    lists: res.data.data.list
                });
            }

        });
        let arr = this.state.tabList;
        for (let i = 0; i < arr.length; i++) {
            arr[i].active = false;
            arr[parseInt(type) - 1].active = true;
        }
        this.setState({
            tabList: arr,
            type:type
        });
        this.loadMore();
    }
    loadMore () {
        const wrapper = this.refs.moreWrap;
        const loadMoreDataFn = this.loadMoreDataFn;
        const that = this; // 为解决不同context的问题
        let timeCount;
        function callback() {
            const top = wrapper.getBoundingClientRect().top;//相对于视窗,到顶部的距离
            const windowHeight = window.screen.height;//视窗的高度
            if (top && top < windowHeight) {
                // 当 wrapper 已经被滚动到页面可视范围之内触发
                loadMoreDataFn(that);
            }
        }
        window.addEventListener('scroll', function () {
            if (this.state.isLoadingMore) {
                return ;
            }
            if (timeCount) {
                clearTimeout(timeCount);
            }
            timeCount = setTimeout(callback, 50);
        }.bind(this), false);
    }
    componentDidMount() {
        this.getList(1);
        this.loadMore();
    }
    loadMoreDataFn=()=> {//加载更多
        if(this.state.lists.length>=this.state.pageNumber*this.state.pageSize){
            this.setState({
                pageNumber:this.state.pageNumber+1
            });
            this.getList(this.state.type);
        }
        if(this.state.lists.length<20){
            this.setState({
                showOrHid:false
            });
            return false;
        }
    };
    back = () => {
        const history = creatHistory();
        history.goBack();
    };

    selectSchool() {
        this.props.history.push('/SelectSchool')
    }

    searchSchool() {
        this.props.history.push('/SearchSchool')
    }
    render() {
        return (
            <div>
                <div className="header-search">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center" onClick={this.searchSchool.bind(this)}>
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search searchVal='' placeholder="搜索幼儿园/培训机构/俱乐部等"> </Search>
                    </div>
                    <div className="rt" onClick={this.selectSchool.bind(this)}>
                        <img src={img2} alt=""/>
                    </div>
                </div>
                <div className="school-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'select-nav' : ''}
                                        onClick={this.getList.bind(this, temp.type)}>{temp.name}</div>
                        })
                    }
                </div>
                <div className="schoolList">
                    <div className='panel'>
                        {
                            this.state.lists.map((item, index) => {
                                return <Link key={index} to={'/SchoolDetail/' + item.sId}><SmList abc={item}/></Link>
                            })
                        }
                    </div>
                </div>
                <div className={this.state.showOrHid?"load-more load-more-show":"load-more-hid"} ref="moreWrap" >加载更多</div>
                <Footer footerFlag='2'/>
            </div>
        )
    }
}
export default School