import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// autoConnect: false lets App.jsx connect only once the username is known.
const socket = io(SOCKET_URL, { autoConnect: false });

export default socket;
