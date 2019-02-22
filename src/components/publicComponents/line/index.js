import React,{Component} from 'react'
import './line.css'
class Line extends Component{
    render(){
        const  {contain,image} = this.props.data2;
        return(
            <div className="single">
                <div className="img">
                    <img src={image} alt=""/>
                </div>
                <div className="find_contain">{contain}</div>
                <div className="shape"> </div>
            </div>
        )
    }
}
export default Line;
