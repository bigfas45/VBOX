import mongoose from 'mongoose';
import http from 'http';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { UserCreatedListener } from './events/listeners/user-created-listener';
import { UserUpdatedListener } from './events/listeners/user-updated-listener';
import { TransactionCreatedListener } from './events/listeners/transaction-created-listener';
import { WalletCreatedListener } from './events/listeners/wallet-created-listener';
import { TransactionUpdatedListener } from './events/listeners/transaction-updated-listener';
import { WalletUpdatedListener } from './events/listeners/wallet-updated-listener';
import { Server } from 'socket.io';

const start = async () => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('a client connected');

    socket.on('disconnect', () => {
      console.log(' client disconnected');
    });
  });

  console.log('Starting..........');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URL must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection close');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new UserCreatedListener(natsWrapper.client).listen();
    new UserUpdatedListener(natsWrapper.client).listen();
    new TransactionCreatedListener(natsWrapper.client).listen();
    new TransactionUpdatedListener(natsWrapper.client).listen();

    new WalletCreatedListener(natsWrapper.client).listen();
    new WalletUpdatedListener(natsWrapper.client).listen();

    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  server.listen(3000, () => {
    console.log('Listening on port 3000!!!!!');
  });
};

start();
