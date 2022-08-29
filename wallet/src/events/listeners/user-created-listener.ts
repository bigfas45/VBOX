import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  UserCreatedEvent,
  UserType,
} from '@vboxdev/common';
import { Users } from '../../models/users';
import { queueGroupName } from './queue-group-name';
import { WalletService } from '../../services/wallet';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, username, telephone, email, userType, status } = data;

    const userss = Users.build({
      id,
      username,
      telephone,
      email,
      userType,
      status,
    });
    await userss.save();

     await WalletService.create(userss.id, userType, telephone.toString());
    msg.ack();
  }
}
