import { IProject } from './project.interface';

export interface IServiceProjectGetAllResponse {
  status: number;
  message: string;
  projects: IProject[];
}