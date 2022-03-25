import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../mongodb-helper';
import { Project, ProjectDocument, ProjectSchema } from './schemas/projects.schema';
import { ProjectDto } from './dto/projects.dto';
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
        let projectDto = new ProjectDto();
        projectDto.projectName = 'cool name';
        let createdProject = await service.create(projectDto);

        let projectsInDB: Project[] = await projectModel.find({});
        expect(projectsInDB[0].projectName).toEqual(createdProject.projectName);
    });

    test('delete project', async () => {
        let projectDto = new ProjectDto();
        projectDto.projectName = 'cool name';
        let createdProject = await service.create(projectDto);
        await service.delete(createdProject._id);

        let projectsInDB: Project[] = await projectModel.find({});
        expect(projectsInDB.length).toBe(0);
    });

    test('get all projects', () => {

    });


    afterAll(async () => {
        await closeInMongodConnection();
    });
});
