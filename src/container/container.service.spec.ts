import { Test, TestingModule } from '@nestjs/testing';
import { ContainerService } from './container.service';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../utils/mongodb-helper';
import { ContainerDocument, ContainerSchema, Container } from './schemas/container.schema';
import { Model } from 'mongoose';
import { CreateContainerDto } from './dto/create-container.dto';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeqTransport } from '@datalust/winston-seq';


describe('ContainerService', () => {
    let service: ContainerService;
    let testingModule: TestingModule;
    let containerModel: Model<ContainerDocument>;


    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{ name: 'Container', schema: ContainerSchema }]),
                WinstonModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        transports: [
                            new SeqTransport({
                                serverUrl: "http://seq:5341",
                                onError: (e => { console.error(e) }),
                            })
                        ],
                    }),
                    inject: [ConfigService],
                }),
            ],
            providers: [ContainerService],
        }).compile();


        service = testingModule.get<ContainerService>(ContainerService);
        containerModel = testingModule.get<Model<ContainerDocument>>('ContainerModel');

    });

    test('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create container', async () => {
        let container = new CreateContainerDto();
        container.pageId = 'kajdflkajsdkf'; 
        container.name = 'image_sn_labor';
        container.xCoordinate = 10;
        container.yCoordinate = 20;
        container.width = 5;
        container.height = 7;
        container.resourceId = 'isdjfk';
        await service.createContainer(container);

        let allContainer = await containerModel.find().exec();
        expect(allContainer[0].name).toBe('image_sn_labor');
        expect(allContainer[0].pageId).toBe('kajdflkajsdkf');
        expect(allContainer[0].yCoordinate).toBe(20);
        expect(allContainer.length).toBe(1);
    });

    test('delete container', async () => {
        let container = new CreateContainerDto();
        container.pageId = 'kajdflkajsdkf'; 
        container.name = 'image_sn_labor';
        container.xCoordinate = 10;
        container.yCoordinate = 20;
        container.width = 5;
        container.height = 7;
        container.resourceId = 'isdjfk';
        let createdContainer = await service.createContainer(container);

        await service.deleteContainer(createdContainer._id);

        let allPages = await containerModel.find().exec();
        expect(allPages.length).toBe(0);
    });

    test('get all containers', () => {
        // TODO: write this
    });

    test('get all containers for page', () => {
        // TODO: write this
    });


    afterEach(async () => {
        // delete all entries after each test
        await containerModel.deleteMany({});
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });
});
