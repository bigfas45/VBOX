import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  requireAuthProducer,
} from '@vboxdev/common';
import { Movie } from '../models/movies';

import { Wallet } from '../models/wallet';

const router = express.Router();

router.get(
  '/api/wallet/',

  async (req: Request, res: Response) => {
    const movie = await Movie.find({});


    res.json(movie);
  }
);

export { router as IndexrRouter };
