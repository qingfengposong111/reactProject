import React from 'react';
import './components/index/index.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from './components/index/index'//主页
import School from './components/school/school'//学校
import Find from './components/find/find'//发现
import Mine from './components/mine/mine'//我的
import LessonDetail from './components/lessonDetail/lessonDetail'//课程详情
import SchoolDetail from './components/schoolDetail'//学校详情
import CommentDetail from './components/commentDetail'//学校中单个评论详情
import ActiveComDetail from './components/activecomDetail'//活动中单个评论详情
import Excellent from './components/excellent'//优秀机构
import Activity from './components/activity'//活动列表
import ActivityDetail from './components/activeDetail'//活动详情
import Found from './components/found'//优学圈
import CircleDetail from './components/circleDetail'//优学圈评论详情
import MoreLesson from './components/moreLesson'//更多课程
import SelectSchool from './components/selectSchool'//择校
import Login from './components/login'//登录
import MyAttention from './components/myAttention'//我的关注
import ActivityEnroll from './components/activityenroll'//我的活动
import BelongSchool from './components/belongSchool'//所属学校
import MyOrder from './components/myOrder'//我的订单
import SearchSchool from './components/searchSchool'//学校搜索
import SearchActivity from './components/activitySearch'//活动搜索
import SchoolGoComment from './components/schoolGoComment'//去评论学校
import HotMore from './components/hotMore'//更多热点
import TipOff from './components/tipoff'//爆料圈
import Rule from './components/rule'//爆料圈中的规则
import TipList from './components/tiplist'//我的爆料列表
import TipListDetail from './components/tipListDetail'//单个爆料详情
import Wallet from './components/wallet'//我的钱包
import Cash from './components/cash'//提现
import Location from './components/location'//城市选择
import Maps from './components/maps'//地图
import LessonSearch from './components/lessonSearch'//课程搜索
import CitySearch from './components/citySearch'//城市搜索
import SchoolIntro from './components/schoolIntro'//学校信息
import SchoolScreen from './components/schoolScreen'//学校风采
import SchoolOnLine from './components/schoolOnline'//学校报名
import Meth from './components/meth'//机构报名
import Pay from './components/pay'//支付
import ActivityOnLine from './components/activityOnLine'//活动报名
import SchoolAllComment from './components/schoolAllComment'//学校更多评论
import ActivityAllComment from'./components/activityAllComment'//活动更多评论
import ActivityPay from './components/activityPay'//活动套票支付
import Register from './components/register'//注册
import Forget from './components/forget'//忘记密码
import FoundGoComment from './components/foundGoComment'//优学圈发表评论
import TipSendGoComment from './components/tipSend'//爆料圈发布
import ActivityGoComment from './components/activityGoComment'//评价活动
import Personal from './components/personal'//个人信息
import AddBelong from './components/addBelong'//添加所属学校/机构
import BelongSearch from './components/belongSearch'
import Self from'./components/self'
const App = () => (
    <div>
        <Router>
            <div>
                <Route exact path="/" component={Main}/>
                <Route path="/School" component={School}/>
                <Route path="/Self" component={Self}/>
                <Route path="/Find" component={Find}/>
                <Route path="/Mine" component={Mine}/>
                <Route path="/Activity/:acv?" component={Activity}/>
                <Route path="/ActiveComDetail/:id" component={ActiveComDetail}/>
                <Route path="/ActivityDetail/:id" component={ActivityDetail}/>
                <Route path="/ActivityEnroll" component={ActivityEnroll}/>
                <Route path="/ActivityOnLine/:id" component={ActivityOnLine}/>
                <Route path="/ActivityGoComment/:id" component={ActivityGoComment}/>
                <Route path="/ActivityAllComment/:id?" component={ActivityAllComment}/>
                <Route path="/ActivityPay/:id/:actId" component={ActivityPay}/>
                <Route path="/BelongSchool" component={BelongSchool}/>
                <Route path="/CommentDetail/:id" component={CommentDetail}/>
                <Route path="/CircleDetail/:id" component={CircleDetail}/>
                <Route path="/Cash" component={Cash}/>
                <Route path="/CitySearch" component={CitySearch}/>
                <Route path="/Excellent" component={Excellent}/>
                <Route path="/Found" component={Found}/>
                <Route path="/FoundGoComment" component={FoundGoComment}/>
                <Route path="/Forget" component={Forget}/>
                <Route path="/HotMore" component={HotMore}/>
                <Route path="/LessonDetail/:id" component={LessonDetail}/>
                <Route path="/Login/:daa?" component={Login}/>
                <Route path="/Location/:local?" component={Location}/>
                <Route path="/LessonSearch" component={LessonSearch}/>
                <Route path="/MoreLesson/:lessonVal?" component={MoreLesson}/>
                <Route path="/MyAttention" component={MyAttention}/>
                <Route path="/Maps/:lat/:lng" component={Maps}/>
                <Route path="/MyOrder" component={MyOrder}/>
                <Route path="/Meth/:id/:lat/:lng" component={Meth}/>
                <Route path="/Pay/:id" component={Pay}/>
                <Route path="/Personal" component={Personal}/>
                <Route path="/Register" component={Register}/>
                <Route path="/Rule" component={Rule}/>
                <Route path="/SearchSchool" component={SearchSchool}/>
                <Route path="/SearchActivity" component={SearchActivity}/>
                <Route path="/SchoolGoComment/:id" component={SchoolGoComment}/>
                <Route path="/SchoolDetail/:id" component={SchoolDetail}/>
                <Route path="/SchoolIntro/:id" component={SchoolIntro}/>
                <Route path="/SchoolScreen/:id" component={SchoolScreen}/>
                <Route path="/SchoolOnLine/:id" component={SchoolOnLine}/>
                <Route path="/SchoolAllComment/:id?" component={SchoolAllComment}/>
                <Route path="/SelectSchool/:val?" component={SelectSchool}/>
                <Route path="/TipOff" component={TipOff}/>
                <Route path="/TipList" component={TipList}/>
                <Route path="/TipSendGoComment" component={TipSendGoComment}/>
                <Route path="/TipListDetail/:id?" component={TipListDetail}/>
                <Route path="/Wallet" component={Wallet}/>
                <Route path="/AddBelong/:name?/:type?/:id?" component={AddBelong} />
                <Route path="/BelongSearch" component={BelongSearch} />
            </div>
        </Router>
    </div>
);
export default App;
