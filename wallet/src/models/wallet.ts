import mongoose, { Types } from 'mongoose';
import { UserDoc } from './users';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describe the properties that are required to create a new User

interface WalletAttrs {
  walletNumber: string;
  balance: number;
  user: mongoose.Types.ObjectId;
}

interface WalletModel extends mongoose.Model<WalletDoc> {
  build(attrs: WalletAttrs): WalletDoc;
}

// An interface that describes the properties that a user document has

interface WalletDoc extends mongoose.Document<Types.ObjectId> {
  version: number;
  walletNumber: string;
  balance: number;
  user: mongoose.Types.ObjectId;
}

const WalletSchema = new mongoose.Schema(
  {
    walletNumber: {
      type: String,
      trim: true,
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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

WalletSchema.set('versionKey', 'version');
WalletSchema.plugin(updateIfCurrentPlugin);

WalletSchema.statics.build = (attrs: WalletAttrs) => {
  return new Wallet(attrs);
};

const Wallet = mongoose.model<WalletDoc, WalletModel>('Wallet', WalletSchema);

export { Wallet };
