import app from "./app";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import { connectDB } from "./db";
import sockets from "./sockets/sockets";
import votingSessionSockets from "./sockets/voting_session_socket.js";

//Iniciar Base de datos
connectDB();

//Configuracion de websockets
//Crear Server
const server = http.createServer(app);
//
const httpServer = server.listen(3001);
//Conección con los clientes de Sockets
const io = new WebSocketServer(httpServer);

//Sockets
//sockets(io);
votingSessionSockets(io);

console.log("server running on port 3001");
