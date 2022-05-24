import { Message } from 'node-nats-streaming';
import { Subjects, Listener, WalletUpdateEvent, BadRequestError } from '@vboxdev/common';
import { Wallet } from '../../models/wallet';
import { queueGroupName } from './queue-group-name';


export class WalletUpdatedListener extends Listener<WalletUpdateEvent> {
  subject: Subjects.WalletUpdated = Subjects.WalletUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: WalletUpdateEvent['data'], msg: Message) {





    const wallet = await Wallet.findByEvent(data);

    if (!wallet) {
      throw new BadRequestError('user not found..');
    }
    const {
      id,
      walletNumber,
      balance,
      user,
    } = data;
     wallet.set({
      id,
      walletNumber,
      balance,
      user,
    });
    await wallet.save();

    msg.ack();
  }
}