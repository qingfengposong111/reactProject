import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../store'
class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    mountIncrease = () => {
        let { increaseNum } = this.props;
        increaseNum();
        console.log(this.props.count)
    };
    mountDecrement = () => {
        let { decrement } = this.props;
        decrement();
        console.log(this.props.count)
    };
    render() {
        return (
            <div>
                <p>{this.props.count.count}</p>
                <button onClick={this.mountIncrease}>
                    增加
                </button>
                <button onClick={this.mountDecrement}>
                    减少
                </button>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        count: state //对应本组件需要的传入的props
    }
}

function countToNext(dispatch) {
    return {
        increaseNum () {
            dispatch((dispatch) => dispatch({type: 'INCREMENT', count: store.getState().count}))
        },
        decrement(){
            dispatch((dispatch) => dispatch({type: 'DECREMENT', count: store.getState().count}))
        }
    }
}
export default connect(mapStateToProps, countToNext)(Counter)
