import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { UserStatus, UserType, MovieStatus } from '@vboxdev/common';

interface MovieAttrs {
  id: string;
  title: string;
  genre: string;
  language: string;
  subtitle: Boolean;
  year: string;
  length: string;
  sexual: Boolean;
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
}

export interface MovieDoc extends mongoose.Document {
  id: string;
  version: number;
  title: string;
  genre: string;
  language: string;
  subtitle: Boolean;
  year: string;
  length: string;
  sexual: Boolean;
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
}

interface MovieModel extends mongoose.Model<MovieDoc> {
  build(attrs: MovieAttrs): MovieDoc;
  findByEvent(event: { id: string; version: number }): Promise<MovieDoc | null>;
}

const MovieSchema = new mongoose.Schema(
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
      trim: true,
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
      required: true,
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
      type: MovieStatus,
    },

    user: {
      type: String,
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

MovieSchema.set('versionKey', 'version');
MovieSchema.plugin(updateIfCurrentPlugin);

MovieSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  
  return Movie.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
MovieSchema.statics.build = (attrs: MovieAttrs) => {
  return new Movie({
    _id: attrs.id,
    title: attrs.title,
    genre: attrs.genre,
    language: attrs.language,
    subtitle: attrs.subtitle,
    year: attrs.year,
    length: attrs.length,
    sexual: attrs.sexual,
    Mrating: attrs.Mrating,
    blockbuster: attrs.blockbuster,
    trailer: attrs.trailer,
    cast: attrs.cast,
    description: attrs.description,
    user: attrs.user,
    director: attrs.director,
    Urating: attrs.Urating,
    url: attrs.url,
    status: attrs.status,
  });
};

const Movie = mongoose.model<MovieDoc, MovieModel>('User', MovieSchema);

export { Movie };
