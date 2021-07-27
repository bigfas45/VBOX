import {
  Listener,
  Subjects,
  ExirationVerificationEvent,
  VerificationStatus,
} from '@vboxdev/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { User } from '../../models/user';
import { natsWrapper } from '../../nats-wrapper';
import { UserUpdatedPublisher } from '../publisher/user-updated-publisher ';

export class ExpirationVerificationListener extends Listener<ExirationVerificationEvent> {
  subject: Subjects.VerificationCOmplete = Subjects.VerificationCOmplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExirationVerificationEvent['data'], msg: Message) {
    const user = await User.findById(data.userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.verification === VerificationStatus.Unverified) {
      user.set({
        verification: VerificationStatus.Expire,
      });
    }

    await user.save();

     new UserUpdatedPublisher(natsWrapper.client).publish({
       id: user.id,
       email: user.email,
       username: user.username,
       userType: user.userType!,
       telephone: parseInt(user.telephone),
       expiresAt: user.expiresAt,
       status: user.status!,
       version: user.version,
       verification: user.verification,
     });

    msg.ack();
  }
}
