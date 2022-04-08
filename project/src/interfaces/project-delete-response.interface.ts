import { IProject } from './project.interface';

export interface IProjectDeleteResponse {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}