import React, {Component} from 'react';
import './search.css'
class First extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    };
    render() {
        const placeholder = this.props.placeholder;
        const drs =this.props.drs;
        return (
                <input type="text" ref="publicInput" value={drs} onBlur={this.props.blur}   onChange={this.props.getVal}  placeholder={placeholder}/>
        )
    }
}
export default First;