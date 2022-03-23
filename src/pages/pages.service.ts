import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Page } from './schemas/pages.schema';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';


@Injectable()
export class PagesService {
    constructor(
        @InjectModel(Page.name) private readonly pageModel: Model<Page>
    ) { }

    async createPage(pageDto: CreatePageDto) {
        // TODO: check if page name is unique
        await this.pageModel.create(pageDto);
    }

    async getAllPagesForProject(projectId: string): Promise<Page[] | null> {
        let pages: Page[] | null = await this.pageModel.find({ projectId: projectId });
        return pages;
    }

    async getAllPages(): Promise<Page[] | null> {
        let pages: Page[] | null = await this.pageModel.find();
        return pages;
    }

    async deletePage(pageId: string) {
        await this.pageModel.deleteOne({ _id: pageId });
    }
}
