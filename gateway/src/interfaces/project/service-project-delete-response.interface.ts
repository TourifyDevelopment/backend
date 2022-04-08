export interface IServiceProjectDeleteResponse {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}