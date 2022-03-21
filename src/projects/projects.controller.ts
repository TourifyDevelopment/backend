import { Controller, Get } from '@nestjs/common';
import {ApiResponse} from '@nestjs/swagger';
import { Project } from './entities/projects.entity';

@Controller('projects')
export class ProjectsController {
    @Get('/')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Project,
    })
    getAll(): string {
        return 'lost';
    }
}
