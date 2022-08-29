import { Publisher, WalletUpdateEvent, Subjects } from '@vboxdev/common';

export class WalletUpdatedPublisher extends Publisher<WalletUpdateEvent> {
  subject: Subjects.WalletUpdated = Subjects.WalletUpdated;
}
