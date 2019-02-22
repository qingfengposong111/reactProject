import React, {Component} from 'react';
import Header from '../publicComponents/header/index'
import './schoolScreen.css'
import axios from 'axios'
const host = 'http://api.kingsf.cn/';
class SchoolScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            picList:[]
        }
    }
    componentDidMount(){
        axios.get(host+'/api/v2/showDetail',{
            params:{
                id:this.props.match.params.id
            }
        }).then((res)=>{
            this.setState({
                picList:res.data.data.picList
            })
        })
    }
    render=()=>{
        return (
            <div className="schoolScreen">
                <Header data="校园风采" />
                <div className="schoolScreen-main">
                    {
                        this.state.picList!==null?this.state.picList.map((item,index)=>{
                            return (
                                <div key={index} className="schoolScreen-img"><img src={item.imgUrl} alt=""/></div>
                            )
                        }):''
                    }
                </div>
            </div>
        )
    }
}
export default SchoolScreen;