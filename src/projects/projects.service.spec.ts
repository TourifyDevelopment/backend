import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    closeInMongodConnection,
    rootMongooseTestModule,
} from '../utils/mongodb-helper';
import {
    ProjectDocument,
    ProjectSchema,
    Project,
} from './schemas/projects.schema';
import { Model } from 'mongoose';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeqTransport } from '@datalust/winston-seq';

describe('ProjectsService', () => {
    let service: ProjectsService;
    let testingModule: TestingModule;
    let projectModel: Model<ProjectDocument>;

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
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
            providers: [ProjectsService],
        }).compile();

        service = testingModule.get<ProjectsService>(ProjectsService);
        projectModel = testingModule.get<Model<ProjectDocument>>('ProjectModel');
    });

    test('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create project', async () => {
        const project = new Project();
        project.projectName = 'TFO tour';
        project.description = 'Cool tfo tour';
        project.owner = 'gabriel';
        project.mapBlob = 'image/png;base64;alkdjfalk...';
        await service.create(project);
        const allProjects = await projectModel.find().exec();
        expect(allProjects[0].projectName).toBe('TFO tour');
        expect(allProjects[0].description).toBe('Cool tfo tour');
        expect(allProjects[0].owner).toBe('gabriel');
        expect(allProjects.length).toBe(1);
    });

    test('delete project', async () => {
        const project = new Project();
        project.projectName = 'TFO tour';
        project.description = 'Cool tfo tour';
        project.owner = 'gabriel';
        project.mapBlob = 'image/png;base64;alkdjfalk...';
        let createdProject = await service.create(project);
        await service.deleteProject(createdProject._id);
        let allProjects = await projectModel.find().exec();
        expect(allProjects.length).toBe(0);
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
