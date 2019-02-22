import React, {Component} from 'react'
import axios from 'axios'
import './area.css'
const host = 'http://api.kingsf.cn/';
class Area extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            selected: -1,
            areaId: '',
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
            res.data.data.region.unshift({
                id: '',
                name: '附近'
            });
            res.data.data.region.forEach(item => {
                item.active = false;
            });
            this.setState({
                lists: res.data.data.region
            })
        })
    };
    areaSelect = (id, txt) => {
        axios.get(host + '/api/v2/search', {
            params: {
                classifyId: this.props.msg2,
                city: localStorage.itselfId!==null?localStorage.itselfId:localStorage.locationId,
                sortType: this.props.msg4,
                town: id,
                name: this.props.msg,
                pageSize: 100,
                latitude:localStorage.lat,
                longitude:localStorage.lng
            }
        }).then(res => {
            if (res.data.data.list.length > 0) {
                res.data.data.list.forEach((item, index) => {
                    item.active = false;
                });
            }
            this.props.handleArea(id, txt);
            this.props.handleValList(res.data.data.list);
        })
    };
    render = () => {
        return (
            <div className="area">
                <div className="area-two">
                    <div className="area-rt">
                        {
                            this.state.lists !== null ? this.state.lists.map((temp, single) => {
                                return <div onClick={this.areaSelect.bind(this, temp.id, temp.name)} key={single}
                                            title={temp.id}>{temp.name}</div>
                            }) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Area;
