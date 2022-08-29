import {Publisher, MovieCreatedEvent, Subjects} from '@vboxdev/common';


export class MovieCreatedPublisher extends Publisher<MovieCreatedEvent> {
  subject: Subjects.MovieCreated = Subjects.MovieCreated;
}
