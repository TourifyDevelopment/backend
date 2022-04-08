import * as mongoose from 'mongoose';
import { IProject } from '../interfaces/project.interface';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    description: String,
    owner: {
      type: String,
      required: [true, 'Owner can not be empty'],
    },
    mapBlob: {
      type: String,
      required: [true, 'Mapblob can not be empty'],
    },
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);
