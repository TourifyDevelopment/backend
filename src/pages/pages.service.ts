import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Page } from './schemas/pages.schema';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import mongoose from 'mongoose';

@Injectable()
export class PagesService {
    constructor(
        @InjectModel('Page') private readonly pageModel: Model<Page>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async createPage(pageDto: CreatePageDto): Promise<any> {
        // TODO: check if page name is unique
        let createdPage = await this.pageModel.create(pageDto);
        this.logger.log({level: 'info', message: 'New page created successfully'});
        return createdPage;
    }

    async getAllPagesForProject(projectId: string): Promise<Page[] | null> {
        let pages: Page[] | null = await this.pageModel.find({
            projectId: projectId,
        });
        return pages;
    }

    async getAllPages(): Promise<Page[] | null> {
        let pages: Page[] | null = await this.pageModel.find();
        return pages;
    }

    async deletePage(pageId: string): Promise<Error | Page> {
        // Check if id is valid mongodb id
        if (!mongoose.Types.ObjectId.isValid(pageId)) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete page - id: {pageId} not valid',
                pageId: pageId,
            });
            return new Error('PageId not valid');
        }
        let page = await this.pageModel.findByIdAndRemove({ _id: pageId });
        if (page == null) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete page - page with id: {pageId} not found',
                pageId: pageId,
            });
            return new Error('Page with id not found');
        } else {
            this.logger.log({level: 'info', message: 'Page deleted successfully'});
            return page;
        }
    }
}
