import {
    Controller,
    UseGuards,
    Post,
    Get,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpException,
    HttpStatus,
    Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ResourcesService } from './resources.service';
import { Resource, ResourceType } from './schema/resource.schema';
import {Response} from 'express';

@Controller('resources')
@ApiTags('resources')
export class ResourcesController {
    constructor(private resourcesService: ResourcesService) {}

    @ApiResponse({
        status: 201,
        description: 'Add new Resource',
    })
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async addResource(@Body() createResourceDto: CreateResourceDto) {
        return await this.resourcesService.addResource(createResourceDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Delete Resource with id',
    })
    @ApiResponse({
        status: 404,
        description: 'Resource not found',
    })
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Delete('/:resourceId')
    async deleteResource(@Param('resourceId') resourceId: string) {
        let result = await this.resourcesService.deleteResource(resourceId);
        if (result instanceof Error) {
            throw new HttpException(result.message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Get all resources',
        type: [Resource],
    })
    @Get('/all')
    @HttpCode(200)
    async getAllResources(): Promise<Resource[]> {
        return await this.resourcesService.getAllResources();
    }

    @ApiResponse({
        status: 200,
        description: 'Get resource by id',
        type: Resource,
    })
    @ApiResponse({
        status: 404,
        description: 'Resource not found',
        type: null,
    })
    @HttpCode(200)
    @Get('/:resourceId')
    async getResourceById(@Param('resourceId') resourceId: string): Promise<Resource | void> {
        let resource = await this.resourcesService.getResourceById(resourceId);
        if(resource === null) {
            throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        }
        return resource;
    }
}
