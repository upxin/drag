import { connect } from "react-redux";
import React from "react";
import * as actions from "/src/store/actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    onAddNote(title, text) {
        this.props.addNote(title, text);
    }
    deleteNote(id) {
        this.props.deleteNote(id);
    }
    render() {
        return (
            <div className="container">
                <h1 className="header">{[8,9]}</h1>
                <button onClick={() => this.onAddNote(991, 444)}>
                    ++
                </button>
                <button
                    notes={this.props.notes}
                    onClick={(id) => this.deleteNote(id)}
                >
                    --
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        notes: state.notes,
    };
};
const mapActionToProps = (dispatch) => {
    // console.log(dispatch(actions.addNote))
    return {
        addNote: (...arg) => dispatch(actions.addNote(arg)),
    };
};
export default connect(mapStateToProps, mapActionToProps)(App);
