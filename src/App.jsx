import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ActiveTable from "./Components/Table";
import Drag from "/src/pages/drag";
import { Nav } from "@alifd/next";
import ReduxDemo from '/src/pages/redux'
const { Item } = Nav;
function App() {
    return (
        <Router>
            <Nav direction="hoz">
                <Item key="Drag">
                    <Link to="/drag">Drag</Link>
                </Item>
                <Item key="ActiveTable">
                    <Link to="/activeTable">ActiveTable</Link>
                </Item>
                <Item key="Redux">
                    <Link to="/reduxDemo">Redux</Link>
                </Item>
                <Item key="Overlay">
                    <Link to="/overlay">overlay</Link>
                </Item>
            </Nav>
            <Switch>
                <Route
                    exact
                    path="/activeTable"
                    component={ActiveTable}
                ></Route>
                <Route exact path="/drag" component={Drag}></Route>
                <Route exact path="/reduxDemo" component={ReduxDemo}></Route>
            </Switch>
        </Router>
    );
}

export default App;
