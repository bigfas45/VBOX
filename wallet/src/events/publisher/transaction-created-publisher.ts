import { Publisher, TransactionCreatedEvent, Subjects } from '@vboxdev/common';

export class TransactionCreatedPublisher extends Publisher<TransactionCreatedEvent> {
  subject: Subjects.TransactionCreated = Subjects.TransactionCreated;
}
