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

router.get('/api/movies/producer/transaction', requireAuth, requireAuthProducer,  async (req: Request, res: Response) => {
 
  const transaction = await Transaction.find({ user: req.currentUser!.id });

  res.send(transaction);
});

export { router as TransactionRouter };
