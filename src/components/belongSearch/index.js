import React, {Component} from 'react';
import creatHistory from 'history/createHashHistory'
import Search from '../publicComponents/search/index'
import img1 from './../../images/btn_return.png'
import iconSearch from './../../images/icon_search.png'
import PinYin from './../../pinyin'
import './belongSearch.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class BelongSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            local: ''
        };
    }

    back = () => {
        const history = creatHistory();
        history.goBack();
    };

    belongSearch() {
        let that = this;
        let list = [];
        axios.get(host + '/api/v2/showAll').then(res => {
            for (let i = 0; i < res.data.data.list.length; i++) {
                if ((that.state.local !== '' && res.data.data.list[i].name.trim().indexOf(that.state.local.trim()) >= 0) || that.ConvertPinyin(res.data.data.list[i].name.trim()).indexOf(that.state.local.trim().toLocaleLowerCase()) >= 0) {
                    list.push(res.data.data.list[i]);
                }
            }
            that.setState({
                list: list,
                local: ''
            });
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
    chooseSh (item) {
        this.props.history.push('/addBelong/'+item.name+'/'+item.type+'/'+item.sId);
    }
    render() {
        return (
            <div className="searchActivity-out">
                <div className="belong-search">
                    <div className="backs" onClick={this.back.bind(this)}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className="center">
                        <img className="publicSearch" src={iconSearch} alt=""/>
                        <Search rt={this.state.local} getVal={this.getVal.bind(this)} placeholder="学校/机构名称"> </Search>
                    </div>
                    <div className="rt" onClick={this.belongSearch.bind(this)}>搜索</div>
                </div>
                <div className="citySearch-list">
                    {
                        (this.state.list !== undefined && this.state.list !== null) ? this.state.list.map((item, index) => {
                            return (
                                <div onClick={this.chooseSh.bind(this,item)} key={index} className="belong-temp">
                                    {item.name}
                                </div>
                            )
                        }) : ''
                    }

                </div>
            </div>
        )
    }
}
export default BelongSearch;
