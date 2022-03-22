import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/projects.schema';
import { Model } from 'mongoose';
import { ProjectDto } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>
    ) { }

    async create(projectDto: ProjectDto): Promise<Project> {
        const createdProject = await this.projectModel.create(projectDto);
        return createdProject;
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

    async delete(id: string) {
        const deletedProject = await this.projectModel
            .findByIdAndRemove({_id: id})
            .exec();
        return deletedProject;
    }
}
