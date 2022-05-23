import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
  validateRequest,
  BadRequestError,
  VerificationStatus,
} from '@vboxdev/common';
import { User } from '../models/user';

import { natsWrapper } from '../nats-wrapper';
import { UserCreatedPublisher } from '../events/publisher/user-created-publisher';

const router = express.Router();

router.post(
  '/api/users/signup',

  [
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 4 and 20 chracters')
      .matches(/\d/)
      .withMessage('Password must contain a number'),
    body('rpassword')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must contain at least 6 characters, Password must contain a number ')
      .matches(/\d/)
      .withMessage('Password must contain a number'),
      body('fullname')
      .trim()
      .notEmpty().withMessage('You must supply your full name'),
    body('telephone')
      .notEmpty()
      .matches(/^[0-9]{13}$/)
      .withMessage('Invalid telephone number'),
      body('email').notEmpty().withMessage('Email must not be empty').isEmail(),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password, fullname, telephone, rpassword } =
      req.body;

    let existingUser;

    if (email) {
      existingUser = await User.findOne({
        $or: [{ email }, { telephone }],
      });
    } else {
      existingUser = await User.findOne({ telephone });
    }

    if (existingUser) {
      // console.log('Email in use');
      // return res.send({})
      throw new BadRequestError('Email or Telephone Already In Use');
    }

    if (rpassword !== password) {
      throw new BadRequestError('Password do not match');
    }

    const user = User.build({
      email,
      password,
      username: fullname,
      telephone,
    });

    await user.save();

    //Publish an event that a user was created

    new UserCreatedPublisher(natsWrapper.client).publish({
      id: user.id,
      email: user.email,
      username: user.username,
      userType: user.userType!,
      telephone: parseInt(user.telephone),
      status: user.status!,
      version: user.version,
    });

    // Generate JWT

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        userType: user.userType,
        status: user.status,
      },
      process.env.JWT_KEY!
    );

    // store it on session object

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({
      success: true,
      message: 'Registration was successful!',
      code: 201,
      user,
    });
  }
);

export { router as signupRouter };
