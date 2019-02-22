import React, {Component} from 'react';
import ReactSwiper from 'reactjs-swiper';
import './swiper.css'
class Swiper extends Component {
    constructor(props){
        super(props);
        this.state={
            swiperOptions:{
                preloadImages: true,
                autoplay: false,
                autoplayDisableOnInteraction: false
            }
        }
    }

    render() {
        const list = this.props.list;
        return (
            <ReactSwiper swiperOptions={this.state.swiperOptions} showPagination items={list} className="swiper-example"/>
        )
    }
}
export default Swiper;