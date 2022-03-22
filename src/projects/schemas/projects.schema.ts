import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  /**
   * The name of the project
   * @example "TFO tour"
   */
  @Prop()
  projectName: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);