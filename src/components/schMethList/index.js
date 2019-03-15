import React, {Component} from 'react';
import './sch-methList.css'
class SmList extends Component {
    render() {
        const {imgUrl, name, shortProfile ,distance} = this.props.abc;
        return (
            <div>
                <div className='panel_img'>
                    <img src={imgUrl} alt="" />
                </div>
                <div className='panel_rt'>
                    <div className='panel_title'>
                        <span>{name}</span><span className="distance">{distance}</span>
                    </div>
                    <div className='panel_intro'>
                        {shortProfile}
                    </div>
                </div>
            </div>
        )
    }
}
export default SmList;
