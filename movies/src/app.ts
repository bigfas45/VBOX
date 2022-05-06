import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@vboxdev/common';
import { IndexrRouter } from './routes/index';
import { CreateNewRouter } from './routes/new';
import { UploadRouter } from './routes/upload';

var fileupload = require('express-fileupload');

import cookieSession from 'cookie-session';
const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(fileupload());

app.use(currentUser);

app.use(IndexrRouter);
app.use(CreateNewRouter);
app.use(UploadRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
