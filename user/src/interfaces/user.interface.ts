import { Document } from 'mongoose';

export interface IUser extends Document {
  id?: string;
  username: string;
  password: string;
  compareEncryptedPassword: (password: string) => boolean;
  getEncryptedPassword: (password: string) => string;
}