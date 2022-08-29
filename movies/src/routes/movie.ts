import express, { Request, Response } from 'express';
import {
  NotFoundError,
  requireAuth,
} from '@vboxdev/common';
import { Movies } from '../models/movies';

const router = express.Router();

router.get(
  '/api/movies/:movieId',
  requireAuth,
  async (req: Request, res: Response) => { 
      const { movieId } = req.params;

  const movie = await Movies.findById(movieId);

  if (!movie) {
    throw new NotFoundError();
  }

 

  res.send(movie);
   
  }
);

export { router as MovieByIdRouter };
