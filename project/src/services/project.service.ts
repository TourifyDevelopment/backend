import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import mongoose from 'mongoose';
import { IProject } from 'src/interfaces/project.interface';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel('Project')
        private readonly projectModel: Model<IProject>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async createProject(project: IProject): Promise<IProject> {
        const createdProject = new this.projectModel(project);
        return await createdProject.save();
    }

    async findAll(): Promise<IProject[]> {
        return this.projectModel.find().exec();
    }

    async deleteProject(projectId: string): Promise<Error | IProject> {
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete project - id: {projectId} not valid',
                projectId: projectId,
            });
            return new Error('ProjectId not valid');
        }
        const deletedProject = await this.projectModel.findByIdAndRemove(projectId).exec();
        if (deletedProject === null) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete Project with the id: {projectId} - not found',
                projectId: projectId,
            });
            return new Error('Project with id not found');
        } else {
            return deletedProject;
        }
    }
}
