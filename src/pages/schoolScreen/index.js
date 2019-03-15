import React, {Component} from 'react';
import Zmage from 'react-zmage'
import Header from '../../components/header/index'
import './schoolScreen.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class SchoolScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picList: [],
            arr:[]
        }
    }

    componentDidMount() {
        axios.get(host + '/api/v2/showDetail', {
            params: {
                id: this.props.match.params.id
            }
        }).then((res) => {
            this.setState({
                picList: res.data.data.picList
            })
        })
    }

    render = () => {
        const controller = {
            close: true, zoom: true, rotate: true, flip: true, pagination: false,
        };
        if (this.state.picList !== undefined && this.state.picList !== null) {
            this.state.picList.forEach((item, index) => {
                this.state.arr.push({'src': item.imgUrl, 'alt': index})
            });
        }
        return (
            <div className="schoolScreen">
                <Header data="校园风采"/>
                <div className="schoolScreen-main">
                    {
                        this.state.picList !== null ? this.state.picList.map((item, index) => {
                            return (
                                <div key={index} className="schoolScreen-img">
                                    <Zmage set={this.state.arr} edge={5} controller={controller} radius={10}
                                           preset="mobile" zIndex={index}
                                           src={item.imgUrl} alt=""/>
                                </div>
                            )
                        }) : ''
                    }
                </div>
            </div>
        )
    }
}
export default SchoolScreen;