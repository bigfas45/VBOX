import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  MoiveUpdatedEvent,
  BadRequestError,
  NotFoundError,
} from '@vboxdev/common';
import { Movie } from '../../models/movies';
import { queueGroupName } from './queue-group-name';

export class MovieUpdatedListener extends Listener<MoiveUpdatedEvent> {
  subject: Subjects.MovieUpdate = Subjects.MovieUpdate;
  queueGroupName = queueGroupName;

  async onMessage(data: MoiveUpdatedEvent['data'], msg: Message) {
    const movie = await Movie.findByEvent(data);




    if (!movie) {
      throw new BadRequestError('movie not found..');
    }
    const {
      id,
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
      user,
      director,
      Urating,
      url,
      banner,
      status,
    } = data;

    movie.set({
      id,
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
      user,
      director,
      Urating,
      url,
      banner,
      status,
    });
    await movie.save();

    msg.ack();
  }
}
