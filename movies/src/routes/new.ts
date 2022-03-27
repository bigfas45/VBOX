import express, { Request, Response } from 'express';
import {
  requireAuth,
  requireAuthAdmin,
  BadRequestError,
  validateRequest
} from '@vboxdev/common';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Movies } from '../models/movies';
import { User } from '../models/users';
import { Category } from '../models/category';
import { body } from 'express-validator';
import { UploadedFile } from 'express-fileupload';
import AWS from 'aws-sdk';


const router = express.Router();

const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
  const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: '6HWP557BFFXFDOU5OTHN',
      secretAccessKey: 'KmQE0RZilHFIlcQG1rljognFwEsQ3vxgK+lMM3riIHQ'
  });

router.post(
  '/api/movies/upload',
  requireAuth,
  requireAuthAdmin,
  async (req: Request, res: Response) => {
    // get user model doc
    
    const movieFile = req.files && req.files.movie as UploadedFile;
console.log(movieFile)
    // const params = {
    //   Body: movieFile?.data,
    //   Bucket: "tets",
    //   Key: movieFile?.name,
    //   ACL: "public-read",
    //   ContentType: "application/json"
    // };

  }
);

router.post(
  '/api/movies/',
  requireAuth,
  requireAuthAdmin,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('description is required'),
    body('director').not().isEmpty().withMessage('director is required'),
    body('cast').not().isEmpty().withMessage('cast is required'),
    body('category').not().isEmpty().withMessage('category is required'),
    body('rate').not().isEmpty().withMessage('rate is required'),
    body('url').not().isEmpty().withMessage('url is required'),


  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // get user model doc
    const { title, description, director , cast, category, rate, url} = req.body;
    const user = await User.findById(req.currentUser!.id);
    if (!user) {
      throw new BadRequestError(
        'User cannot create a movie because user not found.'
      );
    }
    console.log(user);

    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(400).json({
        error: 'Category ID provided is invalid or does not exist!!!',
      });
    }

    const movies = Movies.build({
      title,
      description,
      director,
      cast,
      category: cat,
      rate,
      url,
      user
    });

    await movies.save();

    res.send(movies)

  }
);

export { router as CreateNewRouter };
