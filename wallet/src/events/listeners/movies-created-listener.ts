import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserCreatedEvent, MovieCreatedEvent } from '@vboxdev/common';
import { Movie } from '../../models/movies';
import { queueGroupName } from './queue-group-name';


export class MovieCreatedListener extends Listener<MovieCreatedEvent> {
  subject: Subjects.MovieCreated = Subjects.MovieCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: MovieCreatedEvent['data'], msg: Message) {
    const {
      id,
      version,
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
      status
    } = data;
    const movie = Movie.build({
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
      status
    
    });
    await movie.save();

    msg.ack();
  }
}