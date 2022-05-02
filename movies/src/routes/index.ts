import express, { Request, Response } from 'express';
import { NotFoundError, BadRequestError,requireAuth, requireAuthProducer } from '@vboxdev/common';
import { Movies } from '../models/movies';
import { User } from '../models/users';
import _ from 'lodash';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

router.put('/api/movies/upload/:movieId',
requireAuth,
requireAuthProducer,
async (req: Request, res: Response) => {

  const movieId = req.params.movieId;

  const movie = await Movies.findById(movieId);
  if (!movie) {
    throw new BadRequestError(
      'Movie Id not found.'
    );
  }

  if (!req.files){
    throw new BadRequestError(
      'No movie selected.'
    );
  }

  console.log(req.files?.file)

  res.send({})




});

export { router as IndexrRouter };
