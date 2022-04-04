import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Page } from './schemas/pages.schema';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';


@Injectable()
export class PagesService {
    constructor(
        @InjectModel('Page') private readonly pageModel: Model<Page>
    ) { }

    async createPage(pageDto: CreatePageDto): Promise<any> {
        // TODO: check if page name is unique
        let createdPage = await this.pageModel.create(pageDto);
        return createdPage;
    }

    async getAllPagesForProject(projectId: string): Promise<Page[] | null> {
        let pages: Page[] | null = await this.pageModel.find({ projectId: projectId });
        return pages;
    }

    async getAllPages(): Promise<Page[] | null> {
        let pages: Page[] | null = await this.pageModel.find();
        return pages;
    }

    async deletePage(pageId: string): Promise<undefined | Page > {
        let page = await this.pageModel.findByIdAndDelete({ _id: pageId }).exec();
        if(page == null) {
            return undefined;
        }else {
            return page;
        }
    }
}
