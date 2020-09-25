import React, {useEffect} from 'react';
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

    if (!query.name) return <div>
        Not name found
    </div>;

    useEffect(() => {
        socketClient.emit('userLogged', {name: query.name}, (res: Array<user>) => {
            console.log("Users connected: ", res)
        })

    }, []);

    return (
        <div>
            Bienvenido {query.name}
        </div>
    );
};

export default Home;
