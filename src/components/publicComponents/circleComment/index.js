import React, {Component} from 'react'
import Zmage from 'react-zmage'
import './circleComment.css'
class CircleComment extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    formatDate = (value) => {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
    };

    render() {
        const {createTime, content, nickname, qrcodeImg, truename, urls} = this.props.com;
        const controller = {
            close: true, zoom: true, rotate: true, flip: true, pagination: false,
        };
        let arr = [];
        if (urls !== undefined && urls !== null) {
            urls.forEach((item, index) => {
                arr.push({'src': item, 'alt': index})
            });
        }
        return (
            <div className="circleTemps">
                <div className="circleTemps-lf">
                    <img src={qrcodeImg} alt=""/>
                </div>
                <div className="circleTemps-rt">
                    <div className="circleTt-all">
                        <div className="circleTip-all">
                            <div className="circleTemps-rt-lf">
                                <div>
                                    <span>{nickname}</span><span>{this.formatDate(createTime)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="circleTemps-contain2">{content}</div>
                        <div className="circleTemps-name">{truename}</div>
                        <div className="circleTemps-pics">
                            {
                                (urls !== undefined && urls !== null) ? urls.map((temp, index1) => {
                                    return <div className="cicle-imgBox" key={index1}>
                                            <Zmage set={arr} edge={5} controller={controller} radius={10} preset="mobile" zIndex={index1}
                                                   src={temp} alt=""/>
                                        </div>
                                }) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CircleComment;