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
import { UploadedFile } from 'express-fileupload';
import { natsWrapper } from '../nats-wrapper';
import { MovieUpdatedPublisher } from '../events/publisher/movie-updated-publisher ';
import { body } from 'express-validator';

const AWS = require('aws-sdk');

const router = express.Router();

router.put(
  '/api/movies/upload/:movieId',
  requireAuth,
  requireAuthProducer,

  [    body('url').not().isEmpty().withMessage('movie link is required'),
],
  async (req: Request, res: Response) => {
    console.log('upload');
    const movieId = req.params.movieId;

    const movie = await Movies.findById(movieId);
    if (!movie) {
      throw new BadRequestError('Movie Id not found.');
    }


    movie.set({ url: req.body.url });

    await movie.save();

  await  new MovieUpdatedPublisher(natsWrapper.client).publish({
      id: movie.id,
      version: movie.version,
      title: movie.title,
      genre: movie.genre,
      language: movie.language,
      subtitle: movie.subtitle,
      year: movie.year,
      length: movie.length,
      sexual: movie.sexual,
      Mrating: movie.Mrating,
      blockbuster: movie.blockbuster,
      trailer: movie.trailer,
      cast: movie.cast,
      description: movie.description,
      user: movie.user,
      director: movie.director,
      Urating: movie.Urating,
      url: movie.url,
      banner: movie.banner,
      status: movie.status,
    });

    res.send(movie);

    // if (!req.files) {
    //   throw new BadRequestError('No movie selected.');
    // }

    // if (req.files.file) {
    //   console.log('Working');
    // }

    // if (!req.files.file) {
    //   throw new BadRequestError('No movie Please select an video to upload.');
    // }

    // let advertImage = req.files.file as UploadedFile;

    // if (!advertImage.mimetype.includes('video/mp4')){
    //   throw new BadRequestError(
    //     'only mp4 video allowed for upload'
    //   );
    // }

    // // Configure client for use with Spaces
    // const spacesEndpoint = new AWS.Endpoint('sfo3.digitaloceanspaces.com');
    // const s3 = new AWS.S3({
    //   endpoint: spacesEndpoint,
    //   accessKeyId: 'FGD6EGHB7JNGTEA67ZII',
    //   secretAccessKey: 'VXfo0ZZb7yYrdef+80wt3Rt85ehGD9g7Os9+nD3wEyI',
    // });

    // var params = {
    //   Body: advertImage.data,
    //   Bucket: 'nasdspace',
    //   Key: advertImage.name,
    //   ACL: 'public-read',
    //   ContentType: advertImage.mimetype,
    // };

    // var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

    // s3.upload(params, options, async function (err: any, data: any) {
    //   if (err) {
    //     console.log(err, err.stack);
    //   } else {
    //     console.log('data', data.Location);
    //     movie.set({ url: data.Location });

    //     await movie.save();

    //   await  new MovieUpdatedPublisher(natsWrapper.client).publish({
    //       id: movie.id,
    //       version: movie.version,
    //       title: movie.title,
    //       genre: movie.genre,
    //       language: movie.language,
    //       subtitle: movie.subtitle,
    //       year: movie.year,
    //       length: movie.length,
    //       sexual: movie.sexual,
    //       Mrating: movie.Mrating,
    //       blockbuster: movie.blockbuster,
    //       trailer: movie.trailer,
    //       cast: movie.cast,
    //       description: movie.description,
    //       user: movie.user,
    //       director: movie.director,
    //       Urating: movie.Urating,
    //       url: movie.url,
    //       banner: movie.banner,
    //       status: movie.status,
    //     });

    //     res.send(movie);
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
  }
);

export { router as UploadRouter };
