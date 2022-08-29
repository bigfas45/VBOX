import mongoose from 'mongoose';
import { UserDoc } from './users';
import { MovieStatus, MovieLanguage } from '@vboxdev/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describe the properties that are required to create a new User

interface MoviesAttrs {
  title: string;
  genre: string;
  language: MovieLanguage;
  subtitle: Boolean;
  year: string;
  length: string;
  sexual: Boolean;
  Mrating: string;
  blockbuster: Boolean;
  trailer: string;
  banner: string;
  cast: [];
  description: string;
  user: string;
  director: [];
  Urating: number;
  url: string;
  status: MovieStatus;
  releaseDate: Date;
}

interface MoviesModel extends mongoose.Model<MoviesDoc> {
  build(attrs: MoviesAttrs): MoviesDoc;
}

// An interface that describes the properties that a user document has

interface MoviesDoc extends mongoose.Document {
  version: number;
  title: string;
  genre: string;
  language: MovieLanguage;
  subtitle: Boolean;
  year: string;
  length: string;
  sexual: Boolean;
  banner: string;
  Mrating: string;
  blockbuster: Boolean;
  trailer: string;
  cast: [];
  description: string;
  user: string;
  director: [];
  Urating: number;
  url: string;
  status: MovieStatus;
  releaseDate: Date;
}

const MoviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },

    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10000,
    },

    genre: {
      type: String,
      trim: true,
      required: true,
    },


    language: {
      type: String,
      enum: Object.values(MovieLanguage),
      required: true,
    },

    subtitle: {
      type: Boolean,
      trim: true,
      required: true,
    },

    year: {
      type: String,
      trim: true,
      required: true,
    },

    length: {
      type: String,
      trim: true,
    },

    sexual: {
      type: Boolean,
      trim: true,
      required: true,
    },
    Mrating: {
      type: String,
      trim: true,
      required: true,
    },
    blockbuster: {
      type: Boolean,
      trim: true,
      required: true,
    },
    trailer: {
      type: String,
      trim: true,
    },
    cast: {
      type: [],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(MovieStatus),
    },

    releaseDate: {
      type: Date,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },

    Urating: {
      type: Number,
    },
    director: {
      type: [],
      required: true,
    },

    url: {
      type: String,
    },
    banner: {
      type: String,
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

MoviesSchema.set('versionKey', 'version');
MoviesSchema.plugin(updateIfCurrentPlugin);

MoviesSchema.statics.build = (attrs: MoviesAttrs) => {
  return new Movies(attrs);
};

const Movies = mongoose.model<MoviesDoc, MoviesModel>('Movies', MoviesSchema);

export { Movies };
