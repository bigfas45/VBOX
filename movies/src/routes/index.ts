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

router.put(
  '/api/movies/upload/:movieId',
  requireAuth,
  requireAuthProducer,
  async (req: Request, res: Response) => {
    const movieId = req.params.movieId;

    const movie = await Movies.findById(movieId);
    if (!movie) {
      throw new BadRequestError('Movie Id not found.');
    }

    if (!req.files) {
      throw new BadRequestError('No movie selected.');
    }

    if (!req.files.file) {
      throw new BadRequestError('No movie Please select an video to upload.');
    }

    let advertImage = req.files.file as UploadedFile;

    // if (!advertImage.mimetype.includes('video/mp4')){
    //   throw new BadRequestError(
    //     'only mp4 video allowed for upload'
    //   );
    // }

    // Configure client for use with Spaces
    const spacesEndpoint = new AWS.Endpoint('sfo3.digitaloceanspaces.com');
    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: 'FGD6EGHB7JNGTEA67ZII',
      secretAccessKey: 'VXfo0ZZb7yYrdef+80wt3Rt85ehGD9g7Os9+nD3wEyI',
    });

    var params = {
      Body: advertImage.data,
      Bucket: 'nasdspace',
      Key: advertImage.name,
      ACL: 'public-read',
      ContentType: advertImage.mimetype,
    };

    var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

    s3.upload(params, options, function (err: any, data: any) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log('data', data.Location);
        movie.set({ url: data.Location });
        movie.save();
        res.send(movie);
      }
    }).on(
      'httpUploadProgress',
      ({ loaded, total }: { loaded: any; total: any }) => {
        console.log(
          'ContentType',
          'Progress:',
          loaded,
          '/',
          total,
          `${Math.round((100 * loaded) / total)}%`
        );
      }
    );
  }
);

export { router as IndexrRouter };
