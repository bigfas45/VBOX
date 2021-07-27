import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@vboxdev/common';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { EmailVerificationRouter } from './routes/verification-email';
import { signoutRouter } from './routes/signout';
import { PasswordResetEmailRouter } from './routes/password-reset-email';
import { PasswordResetRouter } from './routes/password-reset';
import { UserRouter } from './routes/user';
import { UserUpdateRouter } from './routes/update';
import { UserOnBoardingMessageRouter } from './routes/onboardingMessage';
import { GetUserOnBoardingMessageRouter } from './routes/getOnboardingMessage';
import { OnboardingUpdateRouter } from './routes/updateOnboardingMessage';
import { RequestVerificationCodeRouter } from './routes/RequestVerificationCode';



import cookieSession from 'cookie-session';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(EmailVerificationRouter);
app.use(signoutRouter);
app.use(PasswordResetEmailRouter);
app.use(PasswordResetRouter);
app.use(UserRouter);
app.use(UserUpdateRouter);
app.use(UserOnBoardingMessageRouter);
app.use(GetUserOnBoardingMessageRouter);
app.use(OnboardingUpdateRouter);
app.use(RequestVerificationCodeRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
