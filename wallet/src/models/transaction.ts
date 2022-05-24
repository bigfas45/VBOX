import mongoose, { Types } from 'mongoose';
import { UserDoc } from './users';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describe the properties that are required to create a new User

interface TransactionAttrs {
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
}

// An interface that describes the properties that a user document has

interface TransactionDoc extends mongoose.Document {
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

TransactionSchema.statics.build = (attrs: TransactionAttrs) => {
  return new Transaction(attrs);
};

const Transaction = mongoose.model<TransactionDoc, TransactionModel>(
  'Transaction',
  TransactionSchema
);

export { Transaction };
