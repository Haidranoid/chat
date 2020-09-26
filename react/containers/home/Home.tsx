import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Home = () => {

    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div>
            Bienvenido <br/>
            <input type="text" placeholder="username" value={userName}
                   onChange={(e: any) => setUserName(e.target.value)}/> <br/>
            <input type="text" placeholder="room" value={room}
                   onChange={(e: any) => setRoom(e.target.value)}/> <br/>

            <Link to={`/chat?name=${userName}&room=${room}`}>
                Ingresar
            </Link>

        </div>
    );
};

export default Home;
