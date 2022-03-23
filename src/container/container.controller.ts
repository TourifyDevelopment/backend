import { Body, Controller, UseGuards, Post, Delete, Param, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateContainerDto } from './dto/create-container.dto';
import { ContainerService } from './container.service';

@Controller('container')
export class ContainerController {
    constructor(
        private containerService: ContainerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createContainer(@Body() createContainerDto: CreateContainerDto) {
        await this.containerService.createContainer(createContainerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:containerId')
    async deleteContainer(@Param('containerId') containerId: string) {
        await this.containerService.deleteContainer(containerId);
    }

    @Get('/all')
    async getAllContainer() {
        return this.containerService.getAllContainer();
    }

    @Get('/:pageId')
    async getAllContainerForPageId(@Param('pageId') pageId: string) {
        return this.containerService.getAllContainerforPageId(pageId);
    }

}
