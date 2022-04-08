import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Container } from './schemas/container.schema';
import { Model } from 'mongoose';
import { CreateContainerDto } from './dto/create-container.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import mongoose from 'mongoose';

@Injectable()
export class ContainerService {
    constructor(
        @InjectModel('Container') private containerModule: Model<Container>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async createContainer(createContainerDto: CreateContainerDto): Promise<any> {
        let createdContainer = await this.containerModule.create(createContainerDto);
        return createdContainer;
    }

    async deleteContainer(containerId: string): Promise<Error | Container> {
        if (!mongoose.Types.ObjectId.isValid(containerId)) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete container - id: {containerId} not valid',
                containerId: containerId,
            });
            return new Error('Container id not valid');
        }
        let result = await this.containerModule.findOneAndRemove({
            _id: containerId,
        });
        if (result == null) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete container - container with id: {containerId} not found',
                containerId: containerId,
            });
            return new Error('Container with id not found');
        } else {
            return result;
        }
    }

    async getAllContainer() {
        return this.containerModule.find();
    }

    async getAllContainerforPageId(pageId: string) {
        return this.containerModule.find({ page_id: pageId });
    }
}
