import express, { Request, Response } from 'express';
import {
  NotFoundError,
  BadRequestError,
  requireAuth,
  requireAuthProducer,
  currentUser,
} from '@vboxdev/common';

import { Wallet } from '../models/wallet';

const router = express.Router();

router.get('/api/movies/producer/wallet', requireAuth, requireAuthProducer,  async (req: Request, res: Response) => {
 
  const wallet = await Wallet.find();

  res.send(wallet);
});

export { router as WalletRouter };
