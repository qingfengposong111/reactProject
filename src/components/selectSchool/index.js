import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Search from '../publicComponents/search/index'
import creatHistory from 'history/createHashHistory'
import SmList from '../publicComponents/schMethList/index'
import Classify from './../publicComponents/classisfy/index'
import Brain from './../publicComponents/brain/index'
import Area from './../publicComponents/area/index'
import imgs from './../../images/img_image01.png'
import img1 from './../../images/btn_return.png'
import iconSearch from './../../images/icon_search.png'
import './selectSchool.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class SelectSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                {name: "全部", type: "1", active: true, key: 1},
                {name: "全城", type: "2", active: false, key: 2},
                {name: "智能排序", type: "3", active: false, key: 3}
            ],
            selectSchoolList: [],
            flag1: false,
            flag2: false,
            flag3: false,
            classifyId: '',
            areaId: '',
            sortId: ''
        };
    }

    componentDidMount() {
        axios.get(host + '/api/v2/search', {
            params: {
                name: this.props.match.params.val,
                latitude: localStorage.lat,
                pageSize:200,
                longitude: localStorage.lng,
                city: localStorage.itselfId !== null ? localStorage.itselfId : localStorage.locationId
            }
        }).then(res => {
            if (res.data.data.list !== null || res.data.data.list !== undefined) {
                res.data.data.list.forEach(item => {
                    if (item.imgUrl === null) {
                        item.imgUrl = imgs
                    }
                });
                this.setState({
                    selectSchoolList: res.data.data.list
                })
            }
        })
    }

    yuan = (value) => {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    back = () => {
        const history = creatHistory();
        history.goBack();
    };

    searchSchool() {
        this.props.history.push('/SearchSchool')
    }

    getSon(id, txt) {
        let arr = this.state.tabList.splice(1);
        arr.unshift({
            name: txt,
            type: id,
            active: true
        });
        this.setState({
            tabList: arr,
            flag1: false,
            flag2: false,
            flag3: false,
            classifyId: id
        })
    }

    getList(list) {
        this.setState({
            selectSchoolList: list
        })
    }

    schoolNav(type) {
        let arr = this.state.tabList;
        arr.forEach((item, index) => {
            item.active = false;
            arr[parseInt(type)].active = true;
        });
        this.setState({
            tabList: arr
        });
        switch (type) {
            case 0:
                this.setState({
                    flag1: true,
                    flag2: false,
                    flag3: false
                });
                break;
            case 1:
                this.setState({
                    flag1: false,
                    flag2: true,
                    flag3: false
                });
                break;
            default:
                this.setState({
                    flag1: false,
                    flag2: false,
                    flag3: true
                });
                break;
        }
    }

    getArea(id, txt) {
        let arr = this.state.tabList;
        let areaArr = [
            arr[0],
            {name: txt, type: id, active: true, key: 2},
            arr[2]
        ];
        this.setState({
            tabList: areaArr,
            flag1: false,
            flag2: false,
            flag3: false,
            areaId: id
        });
    }

    getSort(id, txt) {
        let arr = this.state.tabList;
        let areaArr = [
            arr[0],
            arr[1],
            {name: txt, type: id, active: true, key: 2},
        ];
        this.setState({
            tabList: areaArr,
            flag1: false,
            flag2: false,
            flag3: false,
            sortId: id
        })
    }

    render() {
        return (
            <div>
                <div className={this.state.flag3 ? 'classify-show' : 'classify-hid'}>
                    <Brain msg2={this.state.classifyId} msg3={this.state.areaId} msg={this.props.match.params.val}
                           handleSort={this.getSort.bind(this)} handleValList={this.getList.bind(this)}/>
                </div>
                <div className={this.state.flag1 ? 'classify-show' : 'classify-hid'}>
                    <Classify msg4={this.state.sortId} msg3={this.state.areaId} msg={this.props.match.params.val}
                              handleVal={this.getSon.bind(this)} handleValList={this.getList.bind(this)}/>
                </div>
                <div className={this.state.flag2 ? 'classify-show' : 'classify-hid'}>
                    <Area msg4={this.state.sortId} msg2={this.state.classifyId} msg={this.props.match.params.val}
                          handleArea={this.getArea.bind(this)} handleValList={this.getList.bind(this)}/>
                </div>
                <div className="header-search">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center singleCenter" onClick={this.searchSchool.bind(this)}>
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search drs={this.props.match.params.val} placeholder="搜索幼儿园/培训机构/俱乐部等"> </Search>
                    </div>
                </div>
                <div className="lesson-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} id={temp.type} className={temp.active ? 'lesson-select-nav' : '' }
                                        onClick={this.schoolNav.bind(this, a)}
                            ><span className="les-span">{temp.name}</span> <span
                                className={temp.active ? "lesson-shape lesson-shape-select" : 'lesson-shape'}> </span>
                            </div>
                        })
                    }
                </div>
                <div className="selectSchool-list">
                    <div className='panel'>
                        {
                            this.state.selectSchoolList.map((item, index) => {
                                return <Link key={index} to={'/SchoolDetail/' + item.sId}><SmList abc={item}/></Link>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default SelectSchool;
