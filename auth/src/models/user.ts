import mongoose from 'mongoose';
import { Password } from '../services/password';
import { UserStatus, UserType } from '@vboxdev/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describe the properties that are required to create a new User

interface UserAttrs {
  username: string;
  telephone: string;
  email: string;
  password: string;
  userType?: UserType;
  status?: UserStatus;
}



// An interface that describes the properties that a user model has

 interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a user document has

 interface UserDoc extends mongoose.Document {
  username: string;
  version: number;
  telephone: string;
  email: string;
  password: string;
  userType?: UserType;
  status?: UserStatus;
}

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
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
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
