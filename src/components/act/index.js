import React, {Component} from 'react'
import Zmage from 'react-zmage'
import Star from '../star/index'
import './act.css'
class ActComment extends Component {
    formatDate(value) {
        let date = new Date(value);
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '月' + d + '日'
    }

    render() {
        const {createTime, evaluation, nickname, qrcodeImg, score, truename, urls} = this.props.comActive;
        const controller = {
            // 关闭按钮
            close: true,
            // 缩放按钮
            zoom: true,
            // 旋转按钮
            rotate: true,
            // 翻页按钮
            flip: true,
            // 多页指示
            pagination: false,
        };
        let arr = [];
        if (urls !== undefined && urls !== null) {
            urls.forEach((item, index) => {
                arr.push({'src': item, 'alt': index})
            })
        }
        return (
            <div className="activityTemps">
                <div className="activityTemps-lf">
                    <img src={qrcodeImg} alt=""/>
                </div>
                <div className="activityTemps-rt">
                    <div className="activityTt-all">
                        <div className="activityTip-all">
                            <div className="activityTemps-rt-lf">
                                <div>
                                    <span>{nickname}</span><span>{this.formatDate(createTime)}</span>
                                </div>
                                <div>
                                    <span>打分</span>
                                    <Star starFlag={false} star={score}/>
                                </div>
                            </div>
                        </div>
                        <div className="activityTemps-contain">{evaluation}</div>
                        <div className="activityTemps-name">{truename}</div>
                        <div className="activityTemps-pics">
                            {
                                (urls !== undefined && urls !== null) ? urls.map((temp, index1) => {
                                    return (<div className="act-imgBox" key={index1}>
                                        <Zmage edge={5} set={arr} controller={controller} zIndex={index1} src={temp}
                                               alt=""/>
                                    </div>)
                                }) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ActComment;