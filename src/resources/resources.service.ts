import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from './schema/resource.schema';
import { Model } from 'mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import mongoose from 'mongoose';

@Injectable()
export class ResourcesService {
    constructor(
        @InjectModel('Resource') private resourceModel: Model<Resource>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async addResource(createResourceDto: CreateResourceDto): Promise<any> {
        let createdResource = await this.resourceModel.create(createResourceDto);
        this.logger.log({level: 'info', message: 'New resource created successfully'});
        return createdResource;
    }

    async deleteResource(resourceId: string): Promise<Error | Resource> {
        if (!mongoose.Types.ObjectId.isValid(resourceId)) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete resource - id: {resourceId} not valid',
                resourceId: resourceId,
            });
            return new Error('Resource id not valid');
        }
        const resource = await this.resourceModel.findByIdAndRemove({
            _id: resourceId,
        });
        if (resource == null) {
            this.logger.log({
                level: 'error',
                message: 'Could not delete resource with id: {resourceId} - resource not found',
                resourceId: resourceId,
            });
            return new Error('Resource with id not found');
        } else {
            this.logger.log({level: 'info', message: 'Resource deleted successfully'});
            return resource;
        }
    }

    async getResourceById(resourceId: string): Promise<Resource | null> {
        let resource = await this.resourceModel.findOne({ _id: resourceId });
        if (resource == null) {
            this.logger.log({
                level: 'error',
                message: 'Could not get resource with id: {resourceId} - resource not found',
                resourceId: resourceId,
            });
            return null;
        }
        return resource;
    }

    async getAllResources(): Promise<Resource[] | null> {
        return this.resourceModel.find();
    }
}
