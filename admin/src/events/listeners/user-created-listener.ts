import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  UserCreatedEvent,
  UserType,
} from '@vboxdev/common';
import { Category } from '../../models/users';
import { queueGroupName } from './queue-group-name';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, username, telephone, email, userType, status } = data;


    const userss = Category.build({
      id,
      username,
      telephone,
      email,
      userType,
      status,
    });
    await userss.save();

    msg.ack();
  }
}
