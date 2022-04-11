import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePageDto } from './dto/create-page.dto';
import { PagesService } from './pages.service';
import { Page } from './schemas/pages.schema';

@Controller('pages')
@ApiTags('pages')
export class PagesController {
    constructor(private pagesService: PagesService) {}

    @ApiResponse({
        status: 201,
        description: 'Create new page',
    })
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createPage(@Body() createPageDto: CreatePageDto) {
        return await this.pagesService.createPage(createPageDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Returns all pages',
        type: [Page],
    })
    @Get('/all')
    async getAllPages(): Promise<Page[]> {
        let allPages = this.pagesService.getAllPages();
        return allPages;
    }

    @ApiResponse({
        status: 200,
        description: 'Deletes a page with id',
    })
    @ApiResponse({
        status: 404,
        description: 'Page with id not found',
    })
    @UseGuards(JwtAuthGuard)
    @Delete(':pageId')
    async deletePage(@Param('pageId') pageId: string) {
        const result = await this.pagesService.deletePage(pageId);
        if (result instanceof Error) {
            throw new HttpException(result.message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Get a page by id',
        type: [Page],
    })
    @Get(':projectId')
    async getAllPagesForProject(@Param() params): Promise<Page[]> {
        return this.pagesService.getAllPagesForProject(params.projectId);
    }
}
