import React, {Component} from 'react'
import Hot from '../publicComponents/hot/index'
import Header from '../publicComponents/header/index'
import './hotMore.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class HotMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                {name: "周边新闻", type: 1, active: true},
                {name: "活动咨询", type: 2, active: false},
                {name: "学校咨询", type: 3, active: false},
                {name: "培训咨询", type: 4, active: false}
            ],
            lists: []
        };
        this.getList(1);
    }

    getList(type) {
        let that = this;
        axios.get(host + '/api/v2/popularRecommend', {
            params: {
                type: type,
                pageSize: 200
            }
        }).then(res => {
            res.data.data.list.forEach((item, j) => {
                item.url = res.data.data.list[j].url.slice(res.data.data.list[j].url.indexOf('www')).replace(/%2F/g, '/');
            });
            this.setState({
                lists: res.data.data.list
            })
        }).catch(err => {

        });

        for (let i = 0; i < this.state.tabList.length; i++) {
            that.state.tabList[i].active = false;
            that.state.tabList[parseInt(type) - 1].active = true;
        }
    }

    render() {
        return (
            <div className="HotMore">
                <Header data="热门推荐"/>
                <div className="school-nav">
                    {
                        this.state.tabList.map((temp, a) => {
                            return <div key={a} className={temp.active ? 'select-nav' : ''}
                                        onClick={this.getList.bind(this, temp.type)}>{temp.name}</div>
                        })
                    }
                </div>
                <div className="Hot-list">
                    {
                        this.state.lists != null ? this.state.lists.map((temp, hotIndex) => {
                            return <Hot key={hotIndex} hotData={temp}/>
                        }) : ''
                    }
                </div>
            </div>
        )
    }
}
export default HotMore;