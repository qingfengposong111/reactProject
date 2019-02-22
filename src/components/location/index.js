import React, {Component} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import creatHistory from 'history/createHashHistory'
import Search from '../publicComponents/search/index'
import img1 from './../../images/btn_return.png'
import iconSearch from './../../images/icon_search.png'
import locationImg from './../../images/icon_positioning.png'
import './location.css'
const host = 'http://api.kingsf.cn/'/*'https://api.labiyouxue.cn/'*/;
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            city:'',
            selectCity:'',
            letterList:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','']
        };
        this.getInfo();
        this.getCity();
    }

    back = () => {
        const history = creatHistory();
        history.goBack();
    };
    getInfo = () => {
        axios.get(host + '/api/v2/getYxwRegionInfo').then(res => {
            this.setState({
                list: res.data.data
            })
        })
    };
    getCity = () => {
        let BMap = window.BMap;
        let that = this;
        let myCity = new BMap.LocalCity();
        myCity.get(function (result) {
            that.setState({
                city:result.name,
                selectCity:result.name
            })
        })
    };
    selectCity (id,item) {
        localStorage.setItem('currentCity',item);
        localStorage.setItem('itself',item);
        localStorage.setItem('itselfId',id);
    }
    citySearch () {
        this.props.history.push('/CitySearch')
    }
    render = () => {
        return (
            <div className="location">
                <div className="hotIndex">
                    <div>定位</div>
                    {
                        this.state.letterList.map((single,b)=>{
                            return (<a key={b}  href={'#'+single}>{single}</a>)
                        })
                    }
                </div>
                <div className="header-search">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center singleCenter" onClick={this.citySearch.bind(this)}>
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search drs={this.props.match.params.local} placeholder="城市/拼音"> </Search>
                    </div>
                </div>
                <div className="current-city">
                    <span>当前城市:</span><span>{localStorage.itself||localStorage.locationName}</span>
                </div>
                <div className="later">
                    <div className="later-title">定位/最近访问</div>
                    <div className="later-children">
                        <div >
                            <img src={locationImg} alt=""/>
                            <span>{this.state.city}</span>
                        </div>
                        <span>广州市</span>
                    </div>
                </div>
                <div className="locationCity">
                    {
                        this.state.list !== null ? this.state.list.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to="" className="locationCity-title" name={item.tag}>{item.tag}</Link>
                                    <div className="locationCity-list">
                                        {
                                            item.cities !== null ? item.cities.map((temp, single) => {
                                                return (
                                                    <Link to="/" onClick={this.selectCity.bind(this,temp.id,temp.name)} id={temp.id} key={single} className="locationCity-list-temp">
                                                        <div>{temp.name}</div>
                                                    </Link>
                                                )
                                            }) : ''
                                        }
                                    </div>
                                </div>
                            )
                        }) : ''
                    }

                </div>
            </div>
        )
    }
}
export default Location;