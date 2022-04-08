import { Document } from 'mongoose';

export interface IProject extends Document {
    projectName: string;
    owner: string;
    description: string;
    mapBlob: string;
}