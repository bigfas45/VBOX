import { Message } from 'node-nats-streaming';
import { Subjects, Listener, WalletCreatedEvent } from '@vboxdev/common';
import { Wallet } from '../../models/wallet';
import { queueGroupName } from './queue-group-name';


export class WalletCreatedListener extends Listener<WalletCreatedEvent> {
  subject: Subjects.WalletCreated = Subjects.WalletCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: WalletCreatedEvent['data'], msg: Message) {
    const {
      id,
      walletNumber,
      balance,
      user,
    } = data;
    const userRes = Wallet.build({
      id,
      walletNumber,
      balance,
      user,
    });
    await userRes.save();

    msg.ack();
  }
}