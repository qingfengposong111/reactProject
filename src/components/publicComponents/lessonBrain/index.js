import React, {Component} from 'react'
import axios from 'axios'
import './lessonBrain.css'
const host = 'http://api.kingsf.cn/';
class LessonBrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            selected: -1,
            areaId: '',
            add: false,
            brainFlag: true
        };
        this.getList();
    }

    brainTrip() {
        this.setState({
            brainFlag: false
        })
    }

    getList = () => {
        axios.get(host + '/api/v2/lessonClassify', {
            params: {
                cityId: localStorage.itselfId !== null ? localStorage.itselfId : localStorage.locationId
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
        axios.get(host + '/api/v2/lessonSearch', {
            params: {
                classifyId: this.props.lessonMsg1,
                city: localStorage.itselfId !== null ? localStorage.itselfId : localStorage.locationId,
                sortType: id,
                age: this.props.lessonMsg2,
                town: this.props.lessonMsg3,
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

            this.props.lessonHandleBrain(id, txt);
            this.props.lessonHandleValList(res.data.data.list);
        })
    };

    render = () => {
        return (
            <div className="lessonbrain">
                <div className="lessonbrain-two">
                    <div className="lessonbrain-rt">
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
export default LessonBrain;
