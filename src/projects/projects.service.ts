import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/projects.schema';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import mongoose from 'mongoose';
import { errorMonitor } from 'events';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel('Project')
        private readonly projectModel: Model<ProjectDocument>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async create(project: Project): Promise<any> {
        const createdProject = await this.projectModel.create(project);
        return createdProject;
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

    async deleteProject(projectId: string): Promise<Error | Project> {
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
