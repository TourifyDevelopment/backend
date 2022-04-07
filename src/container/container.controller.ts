import { Body, Controller, UseGuards, Post, Delete, Param, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateContainerDto } from './dto/create-container.dto';
import { ContainerService } from './container.service';
import { ApiResponse } from '@nestjs/swagger';
import { Container } from './schemas/container.schema';

@Controller('container')
export class ContainerController {
    constructor(
        private containerService: ContainerService
    ) { }

    @ApiResponse({
        status: 201,
        description: 'Container successfully created',
    })
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createContainer(@Body() createContainerDto: CreateContainerDto) {
        await this.containerService.createContainer(createContainerDto);
    }

    @ApiResponse({
        status: 200,
        description: 'Container successfully deleted',
    })
    @ApiResponse({
        status: 404,
        description: 'Container not found',
    })
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Delete('/:containerId')
    async deleteContainer(@Param('containerId') containerId: string) {
        let result = await this.containerService.deleteContainer(containerId);
        if(result instanceof Error) {
            throw new HttpException(result.message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Return all container',
        type: [Container]
    })
    @HttpCode(200)
    @Get('/all')
    async getAllContainer(): Promise<Container[] |null>{
        return this.containerService.getAllContainer();
    }

    @ApiResponse({
        status: 200,
        description: 'Return all container with the provided pageId',
        type: [Container]
    })
    @HttpCode(200)
    @Get('/:pageId')
    async getAllContainerForPageId(@Param('pageId') pageId: string): Promise<Container[] | null> {
        return this.containerService.getAllContainerforPageId(pageId);
    }

}
