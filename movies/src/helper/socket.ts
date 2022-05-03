import socketIO from 'socket.io';
import { Server } from 'http';
import { Socket, Server as Server2 } from 'socket.io';




export const socketConnection = (server: Server) => {
  const io = new Server2(server, {
    cors: {
      origin: '*',
    }
  });

  // @ts-ignore
  global.io = io;
  io.on('connection', (socket: Socket) => {
    console.log('The VBOX sockets is Alive');
    
  });
};