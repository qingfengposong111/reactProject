import React,{Component} from 'react'
import img1 from '../../../images/btn_return.png'
import creatHistory from 'history/createHashHistory'
import './header.css'
class Header extends Component{
    back(){
        const history = creatHistory();
        history.goBack();
    }
    render(){
        const data = this.props.data;
        return(
            <div className="header">
                <div>
                    <img onClick={this.back.bind(this)} src={img1} alt=""/>
                </div>
                <div>{data}</div>
                <div> </div>
            </div>
        )
    }
}
export default Header;