import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./home/Home";
import useSocket from "../hooks/use-socket/useSocket";

const App = () => {
    const socketClient = useSocket();

    useEffect(() => {
        socketClient.on('connect', () => {
            console.log("Connected to the server")
        });
        socketClient.on('disconnect', () => {
            console.log("Disconnected from the server")
        });
    }, []);

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
