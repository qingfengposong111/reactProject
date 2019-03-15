import React, {Component} from'react'
import './star.css'
class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: 0,
            starFlag:this.props.starFlag
        };
    }

    select(index) {
        if(this.state.starFlag){
            this.setState({
                flag: index + 1
            });
            this.props.getStars(index+1);
        }
    }

    render() {
        let num = this.state.flag === 0 ? this.props.star : this.state.flag;
        return (
            <div className="starmarking">
                <div className="functionname">{this.props.data}</div>
                <div className="starcontainer">
                    {
                        [1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <span key={index} onClick={this.select.bind(this, index)} className="staricon">
                                    {num > index ? '★' : '☆'}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Star;