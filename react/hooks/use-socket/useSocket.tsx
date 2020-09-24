import socket from 'socket.io-client';

const useSocket = (host: string = 'http://localhost:3000') => socket(host);

export default useSocket;
