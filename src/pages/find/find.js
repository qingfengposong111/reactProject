import React,{Component} from 'react'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import {Link} from "react-router-dom";
import './find.css'
import img2 from '../../images/find1.png'
import img3 from '../../images/icon_fact.png'
class Find extends Component{
    render(){
        return(
            <div className="find">
                <Header data="发现" />
                <div className="out">
                    <Link to="/Found" className="single">
                        <div className="img">
                            <img src={img2} alt=""/>
                        </div>
                        <div className="find_contain">优学圈</div>
                        <div className="shape"> </div>
                    </Link>
                    <Link to="/TipOff" className="single">
                        <div className="img">
                            <img src={img3} alt=""/>
                        </div>
                        <div className="find_contain">爆料圈</div>
                        <div className="shape"> </div>
                    </Link>
                </div>
                <Footer footerFlag='3' />
            </div>
        )
    }
}
export default Find;