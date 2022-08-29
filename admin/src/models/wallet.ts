import mongoose from 'mongoose';
import { CategoryDoc } from './users';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describe the properties that are required to create a new User

interface WalletAttrs {
  id: string;
  walletNumber: string;
  balance: number;
  user: CategoryDoc;
}

interface WalletModel extends mongoose.Model<WalletDoc> {
  build(attrs: WalletAttrs): WalletDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<WalletDoc | null>;
}

// An interface that describes the properties that a user document has

interface WalletDoc extends mongoose.Document {
  id: string;
  version: number;
  walletNumber: string;
  balance: number;
  user: CategoryDoc;
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
      type: mongoose.Schema.Types.ObjectId,
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

WalletSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Wallet.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

WalletSchema.statics.build = (attrs: WalletAttrs) => {
  return new Wallet({
    _id: attrs.id,
    walletNumber: attrs.walletNumber,
    balance: attrs.balance,
    user: attrs.user,
  });
};

const Wallet = mongoose.model<WalletDoc, WalletModel>('Wallet', WalletSchema);

export { Wallet };
