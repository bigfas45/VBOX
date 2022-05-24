import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  TransactionUpdatedEvent,
  BadRequestError,
} from '@vboxdev/common';
import { Transaction } from '../../models/transaction';
import { queueGroupName } from './queue-group-name';

export class TransactionUpdatedListener extends Listener<TransactionUpdatedEvent> {
  subject: Subjects.TransactionUpdate = Subjects.TransactionUpdate;
  queueGroupName = queueGroupName;

  async onMessage(data: TransactionUpdatedEvent['data'], msg: Message) {
    const transaction = await Transaction.findByEvent(data);

    if (!transaction) {
      throw new BadRequestError('user not found..');
    }

    const {
      id,
      walletNumber,
      user,
      description,
      extraDescription,
      itemId,
      quantity,
      amount,
      purchaserEmail,
      status,
      transactionReference,
    } = data;
    transaction.set({
      id,
      walletNumber,
      user,
      description,
      extraDescription,
      itemId,
      quantity,
      amount,
      purchaserEmail,
      status,
      transactionReference,
    });
    await transaction.save();

    msg.ack();
  }
}
