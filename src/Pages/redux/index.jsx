import { connect } from "react-redux";
import React from "react";
import * as actions from "/src/store/actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <h1 className="header">{this.props.num}</h1>
                <h1 className="header">{this.props.name}</h1>
                <button onClick={() =>  this.props.addNum(2)}>
                    ++
                </button>
                <button onClick={() =>this.props.setName('谢谢谢谢')}>
                    姓
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        num: state.num,
        name:state.name
    };
};
const mapActionToProps = (dispatch) => {
    // console.log(dispatch(actions.addNote))
    return {
        addNum: (...arg) => dispatch(actions.addNum(...arg)),
        setName: (...arg) => dispatch(actions.setName(...arg)),
    };
};
export default connect(mapStateToProps, mapActionToProps)(App);
