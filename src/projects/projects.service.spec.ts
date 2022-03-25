import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../mongodb-helper';
import { Project, ProjectDocument, ProjectSchema } from './schemas/projects.schema';
import { CreateProjectDto } from './dto/projects.dto';
import { Model } from 'mongoose';


describe.skip('ProjectsService', () => {
    let service: ProjectsService;
    let testingModule: TestingModule;
    let projectModel: Model<ProjectDocument>;


    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{ name: 'ProjectModel', schema: ProjectSchema }]),
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
    });

    test('delete project', async () => {
    });

    test('get all projects', () => {

    });


    afterAll(async () => {
        await closeInMongodConnection();
    });
});
