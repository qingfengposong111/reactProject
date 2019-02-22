
import React, {Component} from 'react';
import Header from '../publicComponents/header/index'
import './schoolIntro.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class SchoolIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: {}
        }
    }

    componentDidMount() {
        axios.get(host + '/api/v2/schoolProfile', {
            params: {
                id: this.props.match.params.id
            }
        }).then(res => {
            this.setState({
                intro: res.data.data
            })
        })
    }

    render = () => {
        return (
            <div className="schoolIntro">
                <Header data="校园简介"/>
                <div className="schoolIntro-main">
                    <div className='intro-main'>
                        <div className='intro-img'>
                            <img src={this.state.intro.imgUrl} alt=""/>
                        </div>
                    </div>
                    <div className='main'>
                        <p>
                            {this.state.intro.profile}
                        </p>
                    </div>
                    <div className='foot'>
                        <p>地址：{this.state.intro.addr}</p>
                        <p>电话：{this.state.intro.consultPhone}</p>
                        <p>邮箱：{this.state.intro.email}</p>
                        <p>网址：{this.state.intro.website}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default SchoolIntro;