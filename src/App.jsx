import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ActiveTable from "./Components/Table";
import Drag from "/src/Pages/Drag";
import { Nav } from "@alifd/next";
const { Item } = Nav;
function App() {
    return (
        <Router>
            <Nav direction="hoz">
                <Item key="Drag">
                    <Link to="/Drag">Drag</Link>
                </Item>
                <Item key="ActiveTable">
                    <Link to="/ActiveTable">ActiveTable</Link>
                </Item>
            </Nav>
            <Switch>
                <Route
                    exact
                    path="/ActiveTable"
                    component={ActiveTable}
                ></Route>
                <Route exact path="/Drag" component={Drag}></Route>
            </Switch>
        </Router>
    );
}

export default App;
