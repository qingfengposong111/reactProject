import React, {Component} from 'react'
import img1 from './../../images/btn_return.png'
import SmList from '../../components/schMethList/index'
import { Link } from "react-router-dom";
import creatHistory from 'history/createHashHistory'
import './belongSchool.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class BelongSchool extends Component{
    constructor(props){
        super(props);
        this.state={
            lists:[]
        }
        axios.get(host+"api/v2/schoolBelongShow", {
            headers: {
                'token' : localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({
                lists:res.data.data
            })
        }).catch(err => {

        });
    }
    back(){
        const history = creatHistory();
        history.goBack();
    }
    addBelong () {
        this.props.history.push('/AddBelong');
    }
    render () {
        return (
            <div className="belongSchool">
                <div className="belongSchool-head">
                    <div className="belongSchool-img" onClick={this.back.bind(this)} >
                        <img src={img1} alt=""/>
                    </div>
                    <div className="belongSchool-center">所属学校</div>
                    <div className="belongSchool-rt" onClick={this.addBelong.bind(this)}>添加</div>
                </div>
                <div className="belongSchool-list">
                    <div className='panel'>
                        {
                            this.state.lists!=null?this.state.lists.map((item, index) => {
                                return <Link key={index} to={'/SchoolDetail/'+item.sId}><SmList abc={item}/></Link>
                            }):''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default BelongSchool;