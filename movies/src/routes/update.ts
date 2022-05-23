import express, { Response, Request } from 'express';
import { Movies } from '../models/movies';
import { body } from 'express-validator';
import { natsWrapper } from '../nats-wrapper';
import {
  NotFoundError,
  requireAuth,
  currentUser,
  BadRequestError,
  NotAuthorizedError,
  requireAuthProducer,
} from '@vboxdev/common';
import { User } from '../models/users';
import { MovieUpdatedPublisher } from '../events/publisher/movie-updated-publisher ';

const router = express.Router();

router.put(
  '/api/movies/:moviesId',
  currentUser,
  requireAuth,
  requireAuthProducer,

  async (req: Request, res: Response) => {
    const {
      title,
      genre,
      language,
      subtitle,
      year,
      length,
      sexual,
      Mrating,
      blockbuster,
      trailer,
      cast,
      description,
      director,
      Urating,
      url,
    } = req.body;
    const movieId = req.params.moviesId;
    const movie = await Movies.findById(movieId);

    if (!movie) {
      console.log('iioio');
      throw new BadRequestError('We cannot proccess this movie');
    }

    const user = await User.findById(movie.user);

    if (!user) {
      throw new BadRequestError('User cannot be found');
    }

    if (user.id != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (title) {
      movie.set({ title });
    }

    if (genre) {
      movie.set({ genre });
    }
    if (language) {
      movie.set({ language });
    }
    if (subtitle) {
      movie.set({ subtitle });
    }

    if (year) {
      movie.set({ year });
    }
    if (length) {
      movie.set({ length });
    }

    if (sexual) {
      movie.set({ sexual });
    }

    if (Mrating) {
      movie.set({ Mrating });
    }

    if (blockbuster) {
      movie.set({ blockbuster });
    }

    if (cast) {
      movie.set({ cast });
    }

    if (description) {
      movie.set({ description });
    }

    if (director) {
      movie.set({ director });
    }

    if (Urating) {
      movie.set({ Urating });
    }

    await movie.save();

    new MovieUpdatedPublisher(natsWrapper.client).publish({
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
      user: user.id ,
      director: movie.director,
      Urating: movie.Urating,
      url: movie.url,
      status: movie.status,
    });

    res.send(movie);
  }
);

export { router as movieUpdateRouter };
