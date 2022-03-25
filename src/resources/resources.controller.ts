import { Controller, UseGuards, Post, Get, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourcesService } from './resources.service';
import { Resource, ResourceType } from './schema/resource.schema';

@Controller('resources')
export class ResourcesController {
    constructor(
        private resourcesService: ResourcesService
    ){}

    @ApiResponse({
        status: 201,
        description: 'Add new Resource',
    })
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async addResource(@Body() createResourceDto: CreateResourceDto) {
        await this.resourcesService.addResource(createResourceDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Delete Resource with id',
    })
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Delete('/:resourceId')
    async deleteResource(@Param('resourceId') resourceId: string) {
        await this.resourcesService.deleteResource(resourceId);
    }

    @ApiResponse({
        status: 200,
        description: 'Get all resources',
        type: [Resource]
    })
    @HttpCode(200)
    @Get('/all')
    async getAllResources(): Promise<Resource[] | null> {
        return this.resourcesService.getAllResources();
    }

    @ApiResponse({
        status: 200,
        description: 'Get resource by id',
        type: Resource
    })
    @HttpCode(200)
    @Get('/:resourceId')
    async getResourceById(@Param('resourceId') resourceId: string): Promise<Resource | null> {
        return this.resourcesService.getResourceById(resourceId);
    }

}
