import React, {Component} from 'react';
import Search from '../../components/search/index'
import creatHistory from 'history/createHashHistory'
import img1 from './../../images/btn_return.png'
import iconSearch from './../../images/icon_search.png'
import './moreLesson.css'
import {Link} from "react-router-dom"
import LessonClassify from '../../components/lessonClassify/index'
import LessonBrain from '../../components/lessonBrain/index'
import LessonArea from '../../components/lessonArea/index'
import Age from '../../components/age/index'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class MoreLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                {name: "全部", type: "1", active: true},
                {name: "年龄", type: "2", active: false},
                {name: "全城", type: "3", active: false},
                {name: "智能排序", type: "4", active: false}
            ],
            MoreLessonList: [],
            inpValu: '',
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            LessonAreaId: '',
            lessonClassifyId: '',
            lessonSortId: '',
            lessonAgeId: ''
        };

    }

    componentDidMount() {//获取数据
        axios.get(host + '/api/v2/lessonSearch', {
            params: {
                city: localStorage.itselfId !== null ? localStorage.itselfId : localStorage.locationId,
                name: this.props.match.params.lessonVal
            }
        }).then(res => {
            this.setState({
                MoreLessonList: res.data.data.list
            })
        })
    }

    getList(list) {
        this.setState({
            MoreLessonList: list
        })
    }

    yuan = (value) => {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };
    back = () => {
        const history = creatHistory();
        history.goBack();
    };

    lessonNav(type) {
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
                    flag3: false,
                    flag4: false
                });
                break;
            case 1:
                this.setState({
                    flag1: false,
                    flag2: true,
                    flag3: false,
                    flag4: false
                });
                break;
            case 2:
                this.setState({
                    flag1: false,
                    flag2: false,
                    flag3: true,
                    flag4: false
                });
                break;
            default:
                this.setState({
                    flag1: false,
                    flag2: false,
                    flag3: false,
                    flag4: true
                });
                break;
        }
    }

    getArea(id, txt) {
        let arr = this.state.tabList;
        let areaArr = [
            arr[0],
            arr[1],
            {name: txt, type: id, active: true, key: 2},
            arr[3]
        ];
        this.setState({
            tabList: areaArr,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            LessonAreaId: id
        });
    }

    getSort(id, txt) {
        let arr = this.state.tabList;
        let areaArr = [
            arr[0],
            arr[1],
            arr[2],
            {name: txt, type: id, active: true, key: 2},
        ];
        this.setState({
            tabList: areaArr,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            lessonSortId: id
        })
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
            flag4: false,
            lessonClassifyId: id
        })
    }

    getAge(id, txt) {
        let arr = this.state.tabList;
        let areaArr = [
            arr[0],
            {name: txt, type: id, active: true, key: 2},
            arr[2],
            arr[3]
        ];
        this.setState({
            tabList: areaArr,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            lessonAgeId: id
        });
    }

    goSearch() {
        this.props.history.push('/LessonSearch')
    }

    render() {
        return (
            <div>

                <div className={this.state.flag1 ? 'classify-show' : 'classify-hid'}>
                    <LessonClassify
                        lessonVal={this.props.match.params.lessonVal}
                        lessonMsg2={this.state.lessonAgeId}
                        lessonMsg3={this.state.lessonAreaId}
                        lessonMsg4={this.state.lessonSortId}
                        lessonHandleClassify={this.getSon.bind(this)}
                        lessonHandleValList={this.getList.bind(this)}/>
                </div>
                <div className={this.state.flag2 ? 'classify-show' : 'classify-hid'}>
                    <Age lessonVal={this.props.match.params.lessonVal}
                         lessonMsg1={this.state.lessonClassifyId}
                         lessonMsg3={this.state.lessonAreaId}
                         lessonMsg4={this.state.lessonSortId}
                         lessonHandleAge={this.getAge.bind(this)}
                         lessonHandleValList={this.getList.bind(this)}/>
                </div>
                <div className={this.state.flag3 ? 'classify-show' : 'classify-hid'}>
                    <LessonArea
                        lessonVal={this.props.match.params.lessonVal}
                        lessonMsg1={this.state.lessonClassifyId}
                        lessonMsg2={this.state.lessonAgeId}
                        lessonMsg4={this.state.lessonSortId}
                        lessonHandleArea={this.getArea.bind(this)}
                        lessonHandleValList={this.getList.bind(this)}/>
                </div>
                <div className={this.state.flag4 ? 'classify-show' : 'classify-hid'}>
                    <LessonBrain
                        lessonVal={this.props.match.params.lessonVal}
                        lessonMsg1={this.state.lessonClassifyId}
                        lessonMsg2={this.state.lessonAgeId}
                        lessonMsg3={this.state.LessonAreaId}
                        lessonHandleBrain={this.getSort.bind(this)}
                        lessonHandleValList={this.getList.bind(this)}/>
                </div>
                <div className="header-search">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center" onClick={this.goSearch.bind(this)} style={{width: '82vw'}}>
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search placeholder="搜索课程/培训等"> </Search>
                    </div>
                    {/*<div className="rt"></div>*/}
                </div>

                <div className="lesson-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'lesson-select-nav' : ''}
                                        onClick={this.lessonNav.bind(this, a)}
                            ><span className="les-span">{temp.name.slice(0, 4)}</span> <span
                                className={temp.active ? "lesson-shape lesson-shape-select" : 'lesson-shape'}> </span>
                            </div>
                        })
                    }
                </div>
                <div className="Mlesson-list">
                    {
                        this.state.MoreLessonList !== null ? this.state.MoreLessonList.map((item, index) => {
                            return (
                                <Link to={'/LessonDetail/' + item.productId} className="Mlesson-list-single"
                                      key={index}>
                                    <div className="Mlesson-list-single-img">
                                        <img src={item.productImg} alt=""/>
                                    </div>
                                    <div className="Mlesson-list-single-rt">
                                        <div className="Mlesson-list-single-title">{item.productName}</div>
                                        <div className="Mlesson-list-single-age"> 适用年龄{item.minAge}~{item.maxAge}岁</div>
                                        <div className="Mlesson-list-single-price">
                                            <span>￥{this.yuan(item.promotePrice)}</span><span>剩余{item.productNumber}人</span>
                                        </div>
                                        <div className="Mlesson-list-single-age">{item.name}</div>
                                    </div>
                                </Link>
                            )
                        }) : ''
                    }

                </div>
            </div>
        )
    }
}
export default MoreLesson;
