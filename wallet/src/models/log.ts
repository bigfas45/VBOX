import mongoose, { Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describe the properties that are required to create a new User

interface LogAttrs {
    description: string;
    type: string;  
    payload: string;
}


interface LogModel extends mongoose.Model<LogDoc> {
  build(attrs: LogAttrs): LogDoc;
}

// An interface that describes the properties that a user document has

interface LogDoc extends mongoose.Document<Types.ObjectId> {
  description: string;
  type: string;  
  payload: string;
}

const LogSchema = new mongoose.Schema(
  {
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    payload: {
        type: String,
        required: true
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

LogSchema.set('versionKey', 'version');
LogSchema.plugin(updateIfCurrentPlugin);

LogSchema.statics.build = (attrs: LogAttrs) => {
  return new Log(attrs);
};

const Log = mongoose.model<LogDoc, LogModel>('Log', LogSchema);

export { Log };
