import React, {Component} from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import img6 from '../../../images/batch.png'
import address from '../../../images/icon_address.png'
import './lessons.css'
const host = 'http://api.labiyouxue.cn/';
class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    };
    changes() {
        const that = this;
        axios.get(host + "/api/v2/indexLessons", {
            params: {
                city: '441900',
                longitude: '113.660828',
                latitude: '22.942556'
            }
        })
            .then(function (res) {
                that.setState({
                    lists: res.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    yuan(value) {
        return isNaN(value) ? 0.00 : parseFloat((value / 100).toFixed(2)).toFixed(2);
    };

    componentWillMount() {
        this.changes()
    };

    render() {
        return (
            <div>
                <div className="excell">
                    <div className="title">
                        <div className="excell-lf">
                            <span className="shape1"> </span>
                            <span>优学课</span>
                        </div>
                        <div className="excell-rt" onClick={this.changes.bind(this)}>
                            <img src={img6} alt=""/>
                            <span style={{color: '#5EE2C6', fontSize: '12px'}}>换一批</span>
                        </div>
                    </div>
                </div>
                <div className="lessons">
                    {
                        this.state.lists!=null?this.state.lists.map((item, index) => {
                            return (
                                <Link to={"LessonDetail/"+item.productId} className="temp" key={index}>
                                    <img src={item.productImg} alt=""/>
                                    <div className="til">{item.productName}</div>
                                    <div className="centers">
                                        <img src={address} alt=""/>
                                        <span>{item.distance}</span><span>{item.name}</span>
                                    </div>
                                    <div className="bots">￥{this.yuan(item.promotePrice)}元</div>
                                </Link>
                            )
                        }):''
                    }
                </div>
                <Link to="/MoreLesson" className="more">更多优质课程>>></Link>
            </div>
        )
    }
}
export default Lessons;
