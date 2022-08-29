import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  requireAuthProducer,
} from '@vboxdev/common';
import { Movies } from '../models/movies';
import { User } from '../models/users';
import { Transaction } from '../models/transaction';
import _ from 'lodash';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { Upload } from '@aws-sdk/lib-storage';

const AWS = require('aws-sdk');

const router = express.Router();

router.get(
  '/api/movies/new-release',
  requireAuth,
  async (req: Request, res: Response) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    const count = await Movies.countDocuments();

    const movies = await Movies.find({})
      .sort({ releaseDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(count / limit);

    res.send({ movies, totalPages, currentPage: page });
  }
);

export { router as NewReleaseRouter };
