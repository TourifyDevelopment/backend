import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesService } from './resources.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '../utils/mongodb-helper';
import {
    ResourceDocument,
    ResourceSchema,
    Resource,
    ResourceType,
} from './schema/resource.schema';
import { Model } from 'mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeqTransport } from '@datalust/winston-seq';

describe('ResourceService', () => {
    let service: ResourcesService;
    let testingModule: TestingModule;
    let resourceModel: Model<ResourceDocument>;

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    { name: 'Resource', schema: ResourceSchema },
                ]),
                WinstonModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        transports: [
                            new SeqTransport({
                                serverUrl: 'http://seq:5341',
                                onError: (e) => {
                                    console.error(e);
                                },
                            }),
                        ],
                    }),
                    inject: [ConfigService],
                }),
            ],
            providers: [ResourcesService],
        }).compile();

        service = testingModule.get<ResourcesService>(ResourcesService);
        resourceModel = testingModule.get<Model<ResourceDocument>>('ResourceModel');
    });

    test('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create resource', async () => {
        const newResource = new CreateResourceDto();
        newResource.type = ResourceType.Image;
        newResource.blob = 'image/png...';

        await service.addResource(newResource);

        let allResources = await resourceModel.find().exec();
        expect(allResources.length).toBe(1);
        expect(allResources[0].blob).toBe('image/png...');
        expect(allResources[0].type).toBe(ResourceType.Image);
    });

    test('delete resource', async () => {
        const newResource = new CreateResourceDto();
        newResource.type = ResourceType.Image;
        newResource.blob = 'image/png...';

        let createdResource = await service.addResource(newResource);
        await service.deleteResource(createdResource._id);

        let allResources = await resourceModel.find().exec();

        expect(allResources.length).toBe(0);
    });

    test('get resources with id', () => {
    //TODO: implement this
    });

    test('get all resources', () => {
    //TODO: implement this
    });

    afterEach(async () => {
    // delete all entries after each test
        await resourceModel.deleteMany({});
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });
});
