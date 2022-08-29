import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { UserStatus, UserType } from '@vboxdev/common';

interface UserAttrs {
  id: string;
  email: string;
  username: string;
  userType: UserType;
  telephone: number;
  status: UserStatus;
}

export interface UserDoc extends mongoose.Document {
  id: string;
  version: number;
  email: string;
  username: string;
  userType: UserType;
  telephone: number;
  status: UserStatus;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  findByEvent(event: { id: string; version: number }): Promise<UserDoc | null>;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    telephone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },

    userType: {
      type: String,
      required: true,
      enum: Object.values(UserType),
      default: UserType.Customer,
    },

    status: {
      type: String,
      required: true,
      enum: Object.values(UserStatus),
      default: UserStatus.Active,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

      },
    },
  }
);

UserSchema.set('versionKey', 'version');
UserSchema.plugin(updateIfCurrentPlugin);

UserSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return User.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    username: attrs.username,
    telephone: attrs.telephone,
    email: attrs.email,
    userType: attrs.userType,
    status: attrs.status,
  });
};



const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User };
