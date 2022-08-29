import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  requireAuthProducer,
  currentUser,
} from '@vboxdev/common';

import { Transaction } from '../models/transaction';

const router = express.Router();

router.get(
  '/api/movies/transaction/:movieId',
  requireAuth,
  requireAuthProducer,
  async (req: Request, res: Response) => {



    const transaction = await Transaction.find({ itemId: req.params.movieId});

    res.send(transaction);
  }
);

export { router as TransactionMovieRouter };
