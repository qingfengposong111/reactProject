import React, {Component} from 'react'
import axios from 'axios'
import './brain.css'
const host = 'http://api.labiyouxue.cn/';
class Brain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            selected: -1,
            areaId: '',
            add: false,
            brainFlag:true
        };
        this.getList();
    }
    brainTrip () {
        this.setState({
            brainFlag:false
        })
    }
    getList = () => {
        axios.get(host + '/api/v2/schoolClassify', {
            params: {
                cityId: localStorage.itselfId!==null?localStorage.itselfId:localStorage.locationId
            }
        }).then(res => {
            res.data.data.sort.forEach(item => {
                item.active = false;
            });
            this.setState({
                lists: res.data.data.sort
            })
        })
    };
    brainSelect = (id, txt) => {
        axios.get(host + '/api/v2/search', {
            params: {
                classifyId: this.props.msg2,
                city: localStorage.itselfId!==null?localStorage.itselfId:localStorage.locationId,
                sortType: id,
                town: this.props.msg3,
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

            this.props.handleSort(id, txt);
            this.props.handleValList(res.data.data.list);
        })
    };

    render = () => {
        return (
            <div className="brain">
                <div className="brain-two">
                    <div className="brain-rt">
                        {
                            this.state.lists !== null ? this.state.lists.map((temp, single) => {
                                return <div onClick={this.brainSelect.bind(this, temp.id, temp.name)} key={single}
                                            title={temp.id}>{temp.name}</div>
                            }) : ''
                        }
                    </div>
                </div>
                <div className="bottom-box" onClick={this.brainTrip.bind(this)}>

                </div>
            </div>
        )
    }
}
export default Brain;
