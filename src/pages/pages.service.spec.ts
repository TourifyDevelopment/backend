import { Test, TestingModule } from '@nestjs/testing';
import { PagesService } from './pages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../mongodb-helper';
import { PageDocument, PageSchema, Page } from './schemas/pages.schema';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';


describe('PagesService', () => {
    let service: PagesService;
    let testingModule: TestingModule;
    let pageModel: Model<PageDocument>;


    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }]),
            ],
            providers: [PagesService],
        }).compile();


        service = testingModule.get<PagesService>(PagesService);
        pageModel = testingModule.get<Model<PageDocument>>('PageModel');

    });

    test('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create page', async () => {
        let page = new CreatePageDto();
        page.displayName = 'SN Labor';
        page.name = 'sn_labor';
        page.projectId = '9sjf2h4tdsfj';
        page.mapX = 67;
        page.mapY = 70;
        await service.createPage(page);

        let allPages = await pageModel.find().exec();
        expect(allPages[0].displayName).toBe('SN Labor');
        expect(allPages[0].projectId).toBe('9sjf2h4tdsfj');
        expect(allPages[0].mapX).toBe(67);
        expect(allPages.length).toBe(1);
    });

    test('delete page', async () => {
        let page = new CreatePageDto();
        page.displayName = 'SN Labor';
        page.name = 'sn_labor';
        page.projectId = '9sjf2h4tdsfj';
        page.mapX = 67;
        page.mapY = 70;
        let createdPage = await service.createPage(page);

        await service.deletePage(createdPage._id);

        let allPages = await pageModel.find().exec();
        expect(allPages.length).toBe(0);
    });

    test('get all pages', () => {
        // TODO: write this
    });

    test('get all pages for project', () => {
        // TODO: write this
    });


    afterEach(async () => {
        // delete all entries after each test
        await pageModel.deleteMany({});
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });
});
