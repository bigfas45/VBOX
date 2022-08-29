import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TransactionCreatedEvent } from '@vboxdev/common';
import { Transaction } from '../../models/transaction';
import { queueGroupName } from './queue-group-name';


export class TransactionCreatedListener extends Listener<TransactionCreatedEvent> {
  subject: Subjects.TransactionCreated = Subjects.TransactionCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TransactionCreatedEvent['data'], msg: Message) {
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
    const transaction = Transaction.build({
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