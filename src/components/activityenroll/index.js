import React, {Component} from 'react'
import Header from '../publicComponents/header/index'
import SmList from '../publicComponents/schMethList/index'
import { Link } from "react-router-dom";
import './activityenroll.css'
import axios from 'axios'
const host = 'http://api.labiyouxue.cn/';
class ActivityEnroll extends Component{
    constructor(props){
        super(props);
        this.state={
            lists:[]
        };
        this.getList();
    }
    getList(){
        if(localStorage.token){
            axios.get(host+'/api/v2/activityCollections',{
                headers:{
                    'token':localStorage.token
                }
            }).then(res=>{
                let arr=[];
                res.data.data.list.forEach((item)=>{
                    let obj={};
                    obj.id = item.id;
                    obj.imgUrl=item.actImg;
                    obj.name= item.activeName;
                    obj.shortProfile = item.shortDesc;
                    arr.push(obj);
                });
                this.setState({
                    lists:arr
                });
            }).catch(err=>{
               /* if(err.response.status===401){
                    alert('会话过期!');
                    let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
                    this.props.history.push('/login/#'+daa);
                }*/
            });
        }else{
            alert('请登录!');
            let daa = window.location.href.substring(window.location.href.lastIndexOf(':')+5);
            this.props.history.push('/login/#'+daa);
        }

    }
    render () {
        return(
            <div className="activityenroll">
                <Header data="我的活动" />
                <div className="activityenroll-list">
                    <div className='panel'>
                        {
                            this.state.lists!=null?this.state.lists.map((item, index) => {
                                return <Link key={index} to={'/ActivityDetail/'+item.id}><SmList abc={item}/></Link>
                            }):''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default ActivityEnroll;