import React, {useEffect, useState} from 'react';
import useSocket from "../../hooks/use-socket/useSocket";
import {useLocation} from "react-router-dom";
import queryString from "query-string";

interface user {
    id: string,
    name: string,
    room: string,
}

const Home = () => {
    const socketClient = useSocket();
    const location = useLocation().search;
    const query = queryString.parse(location);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        socketClient.on('inbox', (message: any) => {
            console.log(message);
        });

        socketClient.emit('userLogged', {name: query.name}, (err: string, res: any) => {
            setLoading(false);
            if (err) {
                console.log(err);
                setError(true);
                return;
            }

            console.log("users connected: ", res)
        });
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
