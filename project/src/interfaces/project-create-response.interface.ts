import { IProject } from './project.interface';

export interface IProjectCreateResponse {
  status: number;
  message: string;
  project: IProject | null;
  errors: { [key: string]: any } | null;
}