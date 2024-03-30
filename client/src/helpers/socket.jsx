import io from 'socket.io-client';
import server from '../Connections/Connections';

export const socket = io(server.api.baseURL, {reconnection: true});
