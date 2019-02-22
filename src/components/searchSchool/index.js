import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import Search from '../publicComponents/search/index'
import img1 from './../../images/btn_return.png'
import deleteImg from './../../images/btn_trash.png'
import iconSearch from './../../images/icon_search.png'
import './searchSchool.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class SearchSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotList: [],
            schVal: '',
            historyList: []
        };
    }

    back() {
        const history = creatHistory();
        history.goBack();
    }

    componentDidMount() {
        this.hotSearch();
    }

    hotSearch() {
        axios.get(host + '/api/v2/hotSearch', {
            params: {
                type: 1
            }
        }).then(res => {
            if (res.data.code === '1') {
                this.setState({
                    hotList: res.data.data
                })
            }
        })
    }

    searchScool() {

        this.props.history.push('/SelectSchool/' + this.state.schVal)
    }

    getVal(event) {
        this.setState({
            schVal: event.target.value
        });

    }

    setVal(item) {
        this.setState({
            schVal: item
        });
        let that = this;
        let arr = this.state.historyList;
        if (item !== null && item !== '') {
            if (arr !== null) {
                if (arr.indexOf(item) > -1) {

                } else {
                    arr.push(item);
                    localStorage.setItem('schoolHistory', JSON.stringify(arr));
                }
            } else {
                arr = [item];
                localStorage.setItem('schoolHistory', arr);
            }

        }
        that.setState({
            historyList: arr
        });
    }

    blur() {
        let that = this;
        let message = that.state.schVal;
        let arr = this.state.historyList;
        if (message !== null && message !== '') {
            if (arr !== null) {
                if (arr.indexOf(message) > -1) {

                } else {
                    arr.push(message);
                    localStorage.setItem('schoolHistory', JSON.stringify(arr));
                }
            } else {
                arr = [message];
                localStorage.setItem('schoolHistory', arr);
            }

        }
        that.setState({
            historyList: arr
        });
    }

    render() {
        return (
            <div className="searchSchool-out">
                <div className="searchSchool">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center">
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search blur={this.blur.bind(this)} drs={this.state.schVal} getVal={this.getVal.bind(this)}
                                placeholder="搜索幼儿园/培训机构/俱乐部等"> </Search>
                    </div>
                    <div className="rt" onClick={this.searchScool.bind(this)}>搜索</div>
                </div>
                <div className="school-hot-search">
                    <div className="sh-title">热门搜索</div>
                    <div className="sh-children">
                        {
                            this.state.hotList !== null ? this.state.hotList.map((item, index) => {
                                return (
                                    <span onClick={this.setVal.bind(this, item)} key={index}>{item}</span>
                                )
                            }) : ''
                        }
                    </div>
                </div>
                <div className="school-history-search">
                    <div className="hs-title">
                        <span>历史搜索</span>
                        <img src={deleteImg} alt=""/>
                    </div>
                    <div className="hs-children">
                        {
                            this.state.historyList !== null ? this.state.historyList.map((temp, as) => {
                                return <span onClick={this.setVal.bind(this, temp)} key={as}>{temp}</span>
                            }) : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchSchool;
