import React, {Component} from 'react';
import {Map, Circle, Marker} from 'react-bmap'
import Header from './../publicComponents/header/index'
import './maps.css'
class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {

    };
    render = () => {
        return (
            <div className="maps">
                <Header data="位置"/>
                <div id="maps-container">
                    <Map center={{lng: this.props.match.params.lng, lat: this.props.match.params.lat}} zoom="12">
                        <Marker position={{lat: this.props.match.params.lat, lng: this.props.match.params.lng}}/>
                        <Circle
                            center={{lat: this.props.match.params.lat, lng: this.props.match.params.lng}}
                            fillColor='pink'
                            strokeColor='white'
                            radius="1000"
                        />
                    </Map>
                </div>
            </div>
        )
    }
}
export default Maps;