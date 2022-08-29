import express, { Request, Response } from 'express';
import {
  requireAuth,
  BadRequestError,
  validateRequest,
  MovieStatus,
  requireAuthProducer,
  currentUser,
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
import { MovieCreatedPublisher } from '../events/publisher/movie-created-publisher';

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
    // try {
    const {
      title,
      genre,
      language,
      subtitle,
      year,
      length,
      sexual,
      Mrating,
      blockbuster,
      cast,
      description,
      director,
      Urating,
      url,
      banner,
      releaseDate,
      trailer,
    } = req.body;

    // console.log("banner", req.files?.banner );

    // if (!req.files?.trailer) {
    //   throw new BadRequestError(
    //     'No movie trailer Please select an video to upload.'
    //   );
    // }

    // let bannerImage = req.files?.trailer as UploadedFile;

    // if (!bannerImage.mimetype.includes('video/mp4')) {
    //   throw new BadRequestError('only mp4 video allowed for upload');
    // }

    // Configure client for use with Spaces
    // const spacesEndpoint = new AWS.Endpoint('sfo3.digitaloceanspaces.com');
    // const s3 = new AWS.S3({
    //   endpoint: spacesEndpoint,
    //   accessKeyId: 'FGD6EGHB7JNGTEA67ZII',
    //   secretAccessKey: 'VXfo0ZZb7yYrdef+80wt3Rt85ehGD9g7Os9+nD3wEyI',
    // });

    // var params = {
    //   Body: bannerImage.data,
    //   Bucket: 'nasdspace',
    //   Key: bannerImage.name,
    //   ACL: 'public-read',
    //   ContentType: bannerImage.mimetype,
    // };

    // var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

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
      user: user.id,
      director,
      Urating,
      url,
      banner: '',
      status: MovieStatus.Pending,
      releaseDate: new Date(releaseDate),
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
      user: movies.user,
      director: movies.director,
      Urating: movies.Urating,
      url: movies.url,
      banner: movies.banner,
      status: movies.status,
    });
    res.send(movies);

    // s3.upload(params, options, async function (err: any, data: any) {
    //   if (err) {
    //     console.log(err, err.stack);
    //   } else {
    //     console.log('data', data.Location);

    //     const movies = Movies.build({
    //       title,
    //       genre,
    //       language,
    //       subtitle,
    //       year,
    //       length,
    //       sexual,
    //       Mrating,
    //       blockbuster,
    //       trailer: data.Location,
    //       cast,
    //       description,
    //       user: user.id,
    //       director,
    //       Urating,
    //       url,
    //       banner: '',
    //       status: MovieStatus.Pending,
    //       releaseDate: new Date(releaseDate),
    //     });
    //     await movies.save();

    //     new MovieCreatedPublisher(natsWrapper.client).publish({
    //       id: movies.id,
    //       version: movies.version,
    //       title: movies.title,
    //       genre: movies.genre,
    //       language: movies.language,
    //       subtitle: movies.subtitle,
    //       year: movies.year,
    //       length: movies.length,
    //       sexual: movies.sexual,
    //       Mrating: movies.Mrating,
    //       blockbuster: movies.blockbuster,
    //       trailer: movies.trailer,
    //       cast: movies.cast,
    //       description: movies.description,
    //       user: movies.user,
    //       director: movies.director,
    //       Urating: movies.Urating,
    //       url: movies.url,
    //       banner: movies.banner,
    //       status: movies.status,
    //     });
    //     res.send(movies);
    //   }
    // }).on(
    //   'httpUploadProgress',
    //   ({ loaded, total }: { loaded: any; total: any }) => {
    //     console.log(
    //       'ContentType',
    //       'Progress:',
    //       loaded,
    //       '/',
    //       total,
    //       `${Math.round((100 * loaded) / total)}%`
    //     );
    //   }
    // );
    //} catch (error) {
    //console.log(error);
    // }
    // get user model doc
  }
);

export { router as CreateNewRouter };
