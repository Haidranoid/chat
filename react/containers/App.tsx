import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./home/Home";
import Chat from "./chat/Chat";
import socketClient from "../sockets/socketClient";

const App = () => {

    useEffect(() => {
        const handleConnected = () => {
            console.log("Connected to the server")
        };
        const handleDisconnected = () => {
            console.log("Connected to the server")
        };

        socketClient.on('connect', handleConnected);
        socketClient.on('disconnect', handleDisconnected);
        return () => {
            socketClient.off('connect', handleConnected);
            socketClient.off('connect', handleDisconnected);
        }
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/chat" component={Chat}/>
                <Route exact path="/" component={Home}/>
                <Route component={() => <div>404 Not Found</div>}/>
            </Switch>
        </Router>
    )
};

export default App;
