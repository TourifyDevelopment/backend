import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Project } from './entities/projects.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('projects')
export class ProjectsController {
    @Get('/')
    @ApiResponse({
        status: 200,
        description: 'Returns all projects',
        type: Project,
    })
    getAll(): string {
        return 'lost';
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getProfile(@Request() req) {
        return req.user;
    }

}
