import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from './schema/resource.schema';
import { Model } from 'mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourcesService {
    constructor(
        @InjectModel(Resource.name) private resourceModel: Model<Resource>
    ) { }

    async addResource(createResourceDto: CreateResourceDto) {
        await this.resourceModel.create(createResourceDto);
    }

    async deleteResource(id: string) {
        await this.resourceModel.deleteOne({_id: id});
    }

    async getResourceById(id: string): Promise<Resource | null> {
        return this.resourceModel.findOne({_id: id}); 
    }

    async getAllResources(): Promise<Resource[] | null> {
        return this.resourceModel.find();
    }
}
