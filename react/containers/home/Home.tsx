import React, {useEffect, useState} from 'react';
import socketClient from "../../sockets/socketClient";
import {useLocation} from "react-router-dom";
import queryString from "query-string";

const Home = () => {
    const location = useLocation().search;
    const query = queryString.parse(location);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        socketClient.emit('userLogged', {name: query.name}, (err: string, res: any) => {
            setLoading(false);
            if (err) {
                console.log(err);
                setError(true);
                return;
            }
            console.log("users connected: ", res);
        });

        const handleInbox = (message: any) => {
            console.log(message);
        };

        socketClient.on('inbox', handleInbox);
        return () => {
            socketClient.off('inbox', handleInbox);
        }
    }, []);

    if (loading) return (
        <div>
            Loading...
        </div>
    );

    if (error) return (
        <div>
            Not name found
        </div>
    );

    return (
        <div>
            Bienvenido {query.name}
        </div>
    );
};

export default Home;
