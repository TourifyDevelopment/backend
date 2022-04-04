import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from './schema/resource.schema';
import { Model } from 'mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourcesService {
    constructor(
        @InjectModel('Resource') private resourceModel: Model<Resource>
    ) { }

    async addResource(createResourceDto: CreateResourceDto): Promise<any> {
        let createdResource = await this.resourceModel.create(createResourceDto);
        return createdResource;
    }

    async deleteResource(id: string): Promise<undefined | Resource> {
        let resource = await this.resourceModel.findByIdAndDelete({_id: id});
        if(resource == null) {
            return undefined;
        }else{
            return resource;
        }
    }

    async getResourceById(id: string): Promise<Resource | null> {
        return this.resourceModel.findOne({_id: id}); 
    }

    async getAllResources(): Promise<Resource[] | null> {
        return this.resourceModel.find();
    }
}
