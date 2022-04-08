import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../util/mongodb-helper';
import { ProjectSchema } from '../schemas/project.schema';
import { Model } from 'mongoose';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeqTransport } from '@datalust/winston-seq';
import { IProject } from 'src/interfaces/project.interface';
import { MongoConfigService } from './config/mongo-config.service';

describe('ProjectsService', () => {
    let service: ProjectService;
    let testingModule: TestingModule;
    let projectModel: Model<IProject>;

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    {
                        name: 'Project',
                        schema: ProjectSchema,
                    },
                ]),
                WinstonModule.forRoot({
                    transports: [
                        new SeqTransport({
                            serverUrl: 'http://seq:5341',
                            onError: (e) => {
                                console.error(e);
                            },
                        }),
                    ],
                }),
            ],
            providers: [ProjectService],
        }).compile();

        service = testingModule.get<ProjectService>(ProjectService);
        projectModel = testingModule.get<Model<IProject>>('ProjectModel');
    });

    test('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create project', async () => {
        /*
        let project: IProject = {
            projectName: 'TFO tour',
            description: 'Cool tfo tour',
            owner: 'gabriel',
            mapBlob: 'image/png;base64;alkdjfalk...',
        };
        await service.createProject(project);
        const allProjects = await projectModel.find().exec();
        expect(allProjects[0].projectName).toBe('TFO tour');
        expect(allProjects[0].description).toBe('Cool tfo tour');
        expect(allProjects[0].owner).toBe('gabriel');
        expect(allProjects.length).toBe(1);
        */
    });

    test('delete project', async () => {
        /*
        let project: IProject = {
            projectName: 'TFO tour',
            description: 'Cool tfo tour',
            owner: 'gabriel',
            mapBlob: 'image/png;base64;alkdjfalk...',

        };
        let createdProject = await service.createProject(project);
        await service.deleteProject(createdProject._id);
        let allProjects = await projectModel.find().exec();
        expect(allProjects.length).toBe(0);
        */
    });

    test('get all projects', () => {
        // Skipping, because this is already tested in create project
    });

    afterEach(async () => {
        // delete all entries after each test
        await projectModel.deleteMany({});
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });
});
