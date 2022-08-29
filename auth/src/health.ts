import express, { Request, Response } from 'express';
import { currentUser, NotFoundError } from '@vboxdev/common';
import { User } from './models/user';

const router = express.Router();

router.get('/api/acuator/health', (req: Request, res: Response) => {
  res.send('UP');
  console.log('UP');
});

export { router as HealthRouter };
