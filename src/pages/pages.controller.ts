import { Body, Controller, Delete, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePageDto } from './dto/create-page.dto';
import { PagesService } from './pages.service';
import { Page } from './schemas/pages.schema';

@Controller('pages')
export class PagesController {
    constructor(
        private pagesService: PagesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createPage(@Body() createPageDto: CreatePageDto) {
        await this.pagesService.createPage(createPageDto);
    }

    @Get('/all')
    async getAllPages(): Promise<Page[]>{
        let allPages = this.pagesService.getAllPages();
        return allPages;
    } 

    @UseGuards(JwtAuthGuard)
    @Delete(':pageId')
    async deletePage(@Param('pageId') pageId: string) {
        this.pagesService.deletePage(pageId);
    } 

    @Get(':projectId')
    async getAllPagesForProject(@Param() params): Promise<Page[]>{
        return this.pagesService.getAllPagesForProject(params.projectId);
    } 

}
