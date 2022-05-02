import express, { Request, Response } from 'express';
import {
  requireAuth,
  BadRequestError,
  validateRequest,
  MovieStatus,
  requireAuthProducer
} from '@vboxdev/common';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Movies } from '../models/movies';
import { User } from '../models/users';
import { body } from 'express-validator';
import { UploadedFile } from 'express-fileupload';
import AWS from 'aws-sdk';
import { natsWrapper } from '../nats-wrapper';
import {MovieCreatedPublisher} from '../events/publisher/movie-created-publisher'


const router = express.Router();

router.post(
  '/api/movies/',
  requireAuth,
  requireAuthProducer,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('genre').not().isEmpty().withMessage('genre is required'),
    body('language').not().isEmpty().withMessage('language is required'),
    body('subtitle').not().isEmpty().withMessage('subtitle is required'),
    body('year').not().isEmpty().withMessage('year is required'),
    body('length').not().isEmpty().withMessage('year is required'),
    body('sexual').not().isEmpty().withMessage('sexual is required'),
    body('Mrating').not().isEmpty().withMessage('sexual is required'),
    body('blockbuster').not().isEmpty().withMessage('sexual is required'),
    body('cast').not().isEmpty().withMessage('cast is required'),
    body('description').not().isEmpty().withMessage('description is required'),
    body('director').not().isEmpty().withMessage('director is required'),
    body('rate').not().isEmpty().withMessage('rate is required'),

  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // get user model doc
    const { title,
      genre,
      language,
      subtitle,
      year,
      length,
      sexual,
      Mrating,
      blockbuster,
      trailer,
      cast,
      description,
      director,
      Urating,
      url} = req.body;

    const user = await User.findById(req.currentUser!.id);
    if (!user) {
      throw new BadRequestError(
        'User cannot create a movie because user not found.'
      );
    }
    const movies = Movies.build({
      title,
      genre,
      language,
      subtitle,
      year,
      length,
      sexual,
      Mrating,
      blockbuster,
      trailer,
      cast,
      description,
      user,
      director,
      Urating,
      url,
      status: MovieStatus.Pending
    });
    await movies.save();


    new MovieCreatedPublisher(natsWrapper.client).publish({
      id: movies.id,
      version: movies.version,
      title: movies.title,
      genre: movies.genre,
      language: movies.language,
      subtitle: movies.subtitle,
      year: movies.year,
      length: movies.length,
      sexual: movies.sexual,
      Mrating: movies.Mrating,
      blockbuster: movies.blockbuster,
      trailer: movies.trailer,
      cast: movies.cast,
      description: movies.description,
      user: movies.user.id,
      director: movies.director,
      Urating: movies.Urating,
      url: movies.url,
      status: movies.status 
    });
    res.send(movies)

  }
);

export { router as CreateNewRouter };
