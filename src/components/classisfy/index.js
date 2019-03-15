import React, {Component} from 'react'
import axios from 'axios'
import './classisfy.css'
const host = 'http://api.labiyouxue.cn/';
class Classify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            smallList: [],
            selected: -1,
            bigId: '',
            add: false
        };
        this.getList();
    }

    getList = () => {
        axios.get(host + '/api/v2/schoolClassify', {
            params: {
                cityId: localStorage.itselfId!==null?localStorage.itselfId:localStorage.locationId
            }
        }).then(res => {

            res.data.data.category.unshift({
                id: 0,
                name: '全部',
                classifies: [
                    {
                        classifyName: "全部分类",
                        id: 0
                    }
                ]
            });
            res.data.data.category.forEach(item => {
                item.active = false;
            });
            this.setState({
                lists: res.data.data.category
            })
        })
    };
    bigSelect = (index) => {
        let that = this;
        that.setState({
            selected: index
        });
        if (this.state.lists[index]) {
            that.state.smallList = that.state.lists[index].classifies;
            that.state.bigId = that.state.lists[index].id;
            that.state.lists[index].add = true;
        }
    };
    smallSelect = (id, txt) => {
        axios.get(host + '/api/v2/search', {
            params: {
                classifyId: id,
                city: localStorage.itselfId!==null?localStorage.itselfId:localStorage.locationId,
                sortType: this.props.msg4,
                town: this.props.msg3,
                name: this.props.msg,
                pageSize: 100,
                latitude:localStorage.lat,
                longitude:localStorage.lng
            }
        }).then(res => {
            this.props.handleVal(id, txt);
            res.data.data.list.forEach((item, index) => {
                item.active = false;
            });
            this.props.handleValList(res.data.data.list);
        })
    };
    render = () => {
        return (
            <div className="classify">
                <div className="classify-two">
                    <div className="classify-two-lf">
                        {
                            this.state.lists !== null ? this.state.lists.map((item, index) => {
                                return (
                                    <div className={index === this.state.selected ? 'bigSelect' : ''}
                                         onClick={this.bigSelect.bind(this, index)} key={index}
                                         title={item.id}>{item.name}</div>
                                )
                            }) : ''
                        }
                    </div>
                    <div className="classify-two-rt">
                        {
                            this.state.smallList !== null ? this.state.smallList.map((temp, single) => {
                                return <div onClick={this.smallSelect.bind(this, temp.id, temp.classifyName)}
                                            key={single} title={temp.id}>{temp.classifyName}</div>
                            }) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Classify;
