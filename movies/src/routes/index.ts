import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  requireAuthProducer,
} from '@vboxdev/common';
import { Movies } from '../models/movies';
import { User } from '../models/users';
import _ from 'lodash';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { Upload } from '@aws-sdk/lib-storage';

const AWS = require('aws-sdk');

const router = express.Router();

router.get(
  '/api/movies/',
  requireAuth,
  requireAuthProducer,
  async (req: Request, res: Response) => {

    const movies = await Movies.find({})
    
    res.send(movies)
  }
);

export { router as IndexrRouter };
