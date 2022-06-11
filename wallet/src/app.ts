import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@vboxdev/common';
import { IndexrRouter } from './routes/index';
import { PaymentRouter } from './routes/payment';
import { TransactionRouter } from './routes/transaction';



import cookieSession from 'cookie-session';
const app = express();

// app.use(fileupload({
//   useTempFiles: false,
// }));

app.set('trust proxy', true);
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);


app.use(currentUser);

app.use(IndexrRouter)
app.use(PaymentRouter)
app.use(TransactionRouter)




app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
