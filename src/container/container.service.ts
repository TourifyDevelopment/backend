import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Container } from './schemas/container.schema';
import { Model } from 'mongoose';
import { CreateContainerDto } from './dto/create-container.dto';

@Injectable()
export class ContainerService {
    constructor(
        @InjectModel(Container.name) private containerModule: Model<Container>
    ) { }

    async createContainer(createContainerDto: CreateContainerDto){
        await this.containerModule.create(createContainerDto); 
    }

    async deleteContainer(containerId: string) {
        await this.containerModule.deleteOne({_id: containerId});
    }

    async getAllContainer() {
        return this.containerModule.find();
    }

    async getAllContainerforPageId(pageId: string) {
        return this.containerModule.find({page_id: pageId});
    }
}
