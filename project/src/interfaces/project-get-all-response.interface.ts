import { IProject } from './project.interface';

export interface IProjectGetAllResponse {
  status: number;
  message: string;
  projects: IProject[];
}