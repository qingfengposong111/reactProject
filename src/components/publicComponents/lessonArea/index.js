import React, {Component} from 'react'
import axios from 'axios'
import './lessonArea.css'
const host = 'http://api.kingsf.cn/';
class LessonArea extends Component {
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
        axios.get(host + '/api/v2/lessonClassify', {
            params: {
                cityId: localStorage.itselfId !== null ? localStorage.itselfId : localStorage.locationId
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
        axios.get(host + '/api/v2/lessonSearch', {
            params: {
                classifyId: this.props.lessonMsg1,
                city: localStorage.itselfId !== null ? localStorage.itselfId : localStorage.locationId,
                sortType: this.props.lessonMsg4,
                town: id,
                age: this.props.lessonMsg2,
                name: this.props.lessonVal,
                pageSize: 100,
                latitude: localStorage.lat,
                longitude: localStorage.lng
            }
        }).then(res => {
            if (res.data.data.list.length > 0) {
                res.data.data.list.forEach((item, index) => {
                    item.active = false;
                });
            }
            this.props.lessonHandleArea(id, txt);
            this.props.lessonHandleValList(res.data.data.list);
        })
    };
    render = () => {
        return (
            <div className="lessonarea">
                <div className="lessonarea-two">
                    <div className="lessonarea-rt">
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
export default LessonArea;
