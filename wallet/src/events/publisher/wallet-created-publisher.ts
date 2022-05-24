import { Publisher, WalletCreatedEvent, Subjects } from '@vboxdev/common';

export class WalletCreatedPublisher extends Publisher<WalletCreatedEvent> {
  subject: Subjects.WalletCreated = Subjects.WalletCreated;
}
