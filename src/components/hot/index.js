import React, {Component} from 'react';
import eye from './../../images/icon_eyes.png'
import tj from './../../images/icon_recommended.png'
import './hot.css'
class Hot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    }

    formatDate = (value) => {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
    };
    goWlink = (url) => {
        window.location.href = 'https://' + url;
    };

    render() {
        const {title, imgUrl, status, describes, createTime, readNum, url} = this.props.hotData;
        return (<div onClick={this.goWlink.bind(this, url)} className="hot-item">
            <img className={status === 3 ? "bgImg imgShow" : 'imgHid'} src={tj} alt=""/>
            <div className="hot-til">{title}</div>
            <div className="hot-bet">
                <div className="hot-img">
                    <img src={imgUrl} alt=""/>
                </div>
                <div className="hot-rt">
                    <div className="hot-content">{describes}</div>
                    <div className="hot-time">
                        <span>{this.formatDate(createTime)}</span>
                        <div className="ts">
                            <span>{readNum}</span>
                            <img src={eye} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default Hot;
