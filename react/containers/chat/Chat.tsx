import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import queryString from "query-string";
import socketClient from "../../sockets/socketClient";

const Chat = () => {
    const history = useHistory();
    const location = useLocation().search;
    const query = queryString.parse(location);

    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        if (!query.name || !query.room) return history.push('/');

        socketClient.emit('user:logged', {name: query.name, room: query.room}, (err: string, res: any) => {
            if (err) return history.push('/');

            console.log("Users connected:", res)
        });

        const handlePublicMessage = (message: any) => {
            console.log(message);
        };

        const handlePrivateMessage = (message: any) => {
            console.log(message)
        };

        const handleRoomMessage = (message: any) => {
            console.log(message);
        };

        socketClient.on('public:message', handlePublicMessage);
        socketClient.on('private:message', handlePrivateMessage);
        socketClient.on('room:message', handleRoomMessage);
        return () => {
            socketClient.off('public:message', handlePublicMessage);
            socketClient.off('private:message', handlePrivateMessage);
            socketClient.off('room:message', handleRoomMessage);
        }
    }, []);

    const handleSendMessage = () => {
        socketClient.emit('private:message', {userId})
    };

    if (loading) return (
        <div>
            Loading...
        </div>
    );

    return (
        <div>
            Bienvenido {query.name} | sala {query.room}<br/>
            <button onClick={handleSendMessage}>
                Enviar mensaje
            </button>
            <input type="text" placeholder="user" value={userId} onChange={(e: any) => setUserId(e.target.value)}/>
        </div>
    );
};

export default Chat;
