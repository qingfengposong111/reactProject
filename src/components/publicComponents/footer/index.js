import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './footer.css'
import indexImage from '../../../images/index.png'
import schoolImage from '../../../images/school.png'
import findImage from '../../../images/find.png'
import myImage from '../../../images/my.png'
import indexImagePre from '../../../images/tad_Home_pre.png'
 import schoolImagePre from '../../../images/tad_school_pre.png'
 import findImagePre from '../../../images/tad_found_pre.png'
 import myImagePre from '../../../images/tad_my_pre.png'
class Footer extends Component {
    render() {
        const footerFlag=this.props.footerFlag;
        return (
            <div className="footer">
                <div className="index">
                    <Link to="/">
                        <img src={ footerFlag==='1'?indexImagePre:indexImage} alt=""/>
                        <p className={footerFlag==='1'?"selected":''}>首页</p>
                    </Link>
                </div>
                <div className="school">
                    <Link to="/school">
                        <img src={footerFlag==='2'?schoolImagePre:schoolImage} alt=""/>
                        <p  className={footerFlag==='2'?"selected":''}>学校</p>
                    </Link>
                </div>
                <div className="finds">
                    <Link to="/find">
                        <img src={footerFlag==='3'?findImagePre:findImage} alt=""/>
                        <p className={footerFlag==='3'?"selected":''}>发现</p>
                    </Link>
                </div>
                <div className="mine">
                    <Link to="/mine">
                        <img src={footerFlag==='4'?myImagePre:myImage} alt=""/>
                        <p className={footerFlag==='4'?"selected":''}>我的</p>
                    </Link>
                </div>
            </div>
        )
    }
}
export default Footer;