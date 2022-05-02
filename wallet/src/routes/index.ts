import express, { Request, Response } from 'express';
import { NotFoundError, BadRequestError,requireAuth, requireAuthProducer } from '@vboxdev/common';
import { Movie } from '../models/movies';

const router = express.Router();

router.get('/api/wallet/',

async (req: Request, res: Response) => {

  const movie = await Movie.find({})

  console.log(movie)

  

  res.json(movie)




});

export { router as IndexrRouter };
