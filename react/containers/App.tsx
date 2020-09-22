import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./home/Home";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home}/>
                <Route component={() => <div>404 Not Found</div>}/>
            </Switch>
        </Router>
    )
};

export default App;
