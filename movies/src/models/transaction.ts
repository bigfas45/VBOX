import mongoose,{ Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { UserStatus, UserType } from '@vboxdev/common';

interface TransactionAttrs {
  id: string;
  walletNumber: string;
  user: Types.ObjectId;
  description: string;
  extraDescription: string;
  itemId: Types.ObjectId;
  quantity: number;
  amount: number;
  purchaserEmail: string;
  status: string;
  transactionReference: string;
}

export interface TransactionDoc extends mongoose.Document {
  id: string;
  version: number;
  walletNumber: string;
  user: Types.ObjectId;
  description: string;
  extraDescription: string;
  itemId: Types.ObjectId;
  quantity: number;
  amount: number;
  purchaserEmail: string;
  status: string;
  transactionReference: string;
}

interface TransactionModel extends mongoose.Model<TransactionDoc> {
  build(attrs: TransactionAttrs): TransactionDoc;
  findByEvent(event: { id: string; version: number }): Promise<TransactionDoc | null>;
}

const TransactionSchema = new mongoose.Schema(
  {
    walletNumber: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    extraDescription: {
      type: String,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
    },
    purchaserEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending',
    },
    transactionReference: {
      type: String,
      required: true,
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

TransactionSchema.set('versionKey', 'version');
TransactionSchema.plugin(updateIfCurrentPlugin);

TransactionSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Transaction.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
TransactionSchema.statics.build = (attrs: TransactionAttrs) => {
  return new Transaction({
  _id: attrs.id,
  walletNumber: attrs.walletNumber,
  user: attrs.user,
  description: attrs.description,
  extraDescription: attrs.extraDescription,
  itemId: attrs.itemId,
  quantity: attrs.quantity,
  amount: attrs.amount,
  purchaserEmail: attrs.purchaserEmail,
  status: attrs.status,
  transactionReference: attrs.transactionReference,
  });
};

const Transaction = mongoose.model<TransactionDoc, TransactionModel>('Transaction', TransactionSchema);

export { Transaction };
