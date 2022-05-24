import { Publisher, TransactionUpdatedEvent, Subjects } from '@vboxdev/common';

export class TransactionUpdatedPublisher extends Publisher<TransactionUpdatedEvent> {
  subject: Subjects.TransactionUpdate = Subjects.TransactionUpdate;
}
