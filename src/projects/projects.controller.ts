import { Body, Controller, Delete, Get, Post, UseGuards, Param, HttpCode} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectDto } from './dto/projects.dto';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/projects.schema';


@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService) {}


    @ApiResponse({
        status: 200,
        description: 'Returns all projects',
        type: [Project]
    })
    @HttpCode(200)
    @Get('/')
    async getAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @ApiResponse({
        status: 201,
        description: 'Create new project',
    })
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(@Body() projectDto: ProjectDto) {
        await this.projectsService.create(projectDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Delete project',
    })
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return this.projectsService.delete(id);
    }

}
