import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { UserStatus, UserType } from '@vboxdev/common';


interface CategoryAttrs {
  id: string;
  username: string;
  telephone: number;
  email: string;
  userType: UserType;
  status: UserStatus

}

export interface CategoryDoc extends mongoose.Document {
  id: string;
  username: string;
  telephone: number;
  email: string;
  userType: UserType;
  status: UserStatus

}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
  findByEvent(event: { id: string; version: number }): Promise<CategoryDoc | null>;

}

const CategorySchema = new mongoose.Schema(
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
      },
    },
  }
);
CategorySchema.set('versionKey', 'version');
CategorySchema.plugin(updateIfCurrentPlugin);

CategorySchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Category.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
CategorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category({
    _id: attrs.id,
    username: attrs.username,
    telephone: attrs.telephone,
    email: attrs.email,
    userType: attrs.userType,
    status: attrs.status,
  });
};



const Category = mongoose.model<CategoryDoc, CategoryModel>('Category', CategorySchema);

export { Category };
