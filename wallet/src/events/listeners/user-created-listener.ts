import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserCreatedEvent, UserType } from '@vboxdev/common';
import { User } from '../../models/user';
import { queueGroupName } from './queue-group-name';
import { WalletService } from '../../services/wallet';


export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const {
      id,
      username,
      telephone,
      email,
      userType,
      status,
    } = data;
    const user = User.build({
      id,
      username,
      telephone,
      email,
      userType,
      status,
    });
    await user.save();

    await WalletService.create(user.id, userType, telephone.toString());
    msg.ack();
  }
}