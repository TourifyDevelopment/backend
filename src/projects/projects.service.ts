import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/projects.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel('ProjectModel') private readonly projectModel: Model<ProjectDocument>
    ) { }

    async create(project: Project): Promise<any> {
        const createdProject = await this.projectModel.create(project);
        return createdProject;
    }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }

    async delete(id: string): Promise<undefined | Project> {
        const deletedProject = await this.projectModel
            .findByIdAndRemove({_id: id})
            .exec();
        if(deletedProject === null) {
            return undefined;
        }else{
            return deletedProject;
        }
    }
}
