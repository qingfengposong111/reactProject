import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import Search from '../../components/search/index'
import img1 from './../../images/btn_return.png'
import iconSearch from './../../images/icon_search.png'
import PinYin from './../../pinyin'
import './citySearch.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class CitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local: '',
            list: []
        };
    }

    back = () => {
        const history = creatHistory();
        history.goBack();
    };

    searchActivity() {
        let that = this;
        let list = [];
        axios.get(host + '/api/v2/getYxwRegionInfo').then(res => {
            for (let i = 0; i < res.data.data.length; i++) {
                for (let j = 0; j < res.data.data[i].cities.length; j++) {
                    if ((that.state.local !== '' && res.data.data[i].cities[j].name.trim().indexOf(that.state.local.trim()) >= 0) || that.ConvertPinyin(res.data.data[i].cities[j].name.trim()).indexOf(that.state.local.trim().toLocaleLowerCase()) >= 0) {
                        list.push(res.data.data[i].cities[j]);
                    }
                }
            }
            that.setState({
                list: list,
                local: ''
            })
        })
    }

    getVal(e) {
        this.setState({
            local: e.target.value
        })
    }

    ConvertPinyin(l1) {
        let l2 = l1.length;
        let I1 = "";
        let reg = new RegExp('[a-zA-Z0-9\\- ]');
        for (let i = 0; i < l2; i++) {
            let val = l1.substr(i, 1);
            let name = this.arraySearch(val, PinYin);
            if (reg.test(val)) {
                I1 += val;
            } else if (name !== false) {
                I1 += name;
            }

        }
        I1 = I1.replace(/ /g, '-');
        while (I1.indexOf('--') > 0) {
            I1 = I1.replace('--', '-');
        }
        return I1;
    }

    arraySearch = (l1) => {
        for (let name in PinYin) {
            if (PinYin[name].indexOf(l1) !== -1) {
                return name;
            }
        }
        return false;
    };

    goHome(id, item) {
        localStorage.setItem('currentCity', item);
        localStorage.setItem('itself', item);
        localStorage.setItem('itselfId', id);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="searchActivity-out">
                <div className="searchActivity">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center">
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search drs={this.state.local} getVal={this.getVal.bind(this)} placeholder="城市/拼音"> </Search>
                    </div>
                    <div className="rt" onClick={this.searchActivity.bind(this)}>搜索</div>
                </div>
                <div className="citySearch-list">
                    {
                        this.state.list !== null ? this.state.list.map((temp, single) => {
                            return (
                                <div onClick={this.goHome.bind(this, temp.id, temp.name)} id={temp.id} key={single}
                                     className="locationCity-list-temp">
                                    <div>{temp.name}</div>
                                </div>
                            )
                        }) : ''
                    }
                </div>
            </div>
        )
    }
}
export default CitySearch;
