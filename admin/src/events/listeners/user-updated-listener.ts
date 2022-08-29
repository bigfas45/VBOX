import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  UserUpdatedEvent,
  UserType,
  BadRequestError,
} from '@vboxdev/common';
import { Category } from '../../models/users';
import { queueGroupName } from './queue-group-name';
// import { WalletService } from '../../../../wallet/src/services/wallet';

export class UserUpdatedListener extends Listener<UserUpdatedEvent> {
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserUpdatedEvent['data'], msg: Message) {
    const user = await Category.findByEvent(data);

    if (!user) {
      throw new BadRequestError('user not found..');
    }

    const { id, username, telephone, email, userType, status } = data;

    // user.set({
    //   id,
    //   username,
    //   telephone,
    //   email,
    //   userType,
    //   status,
    // });
    // await user.save();

    msg.ack();
  }
}
