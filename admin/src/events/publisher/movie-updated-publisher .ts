import { Publisher, Subjects, MoiveUpdatedEvent } from '@vboxdev/common';

export class MovieUpdatedPublisher extends Publisher<MoiveUpdatedEvent> {
  subject: Subjects.MovieUpdate = Subjects.MovieUpdate;
}
