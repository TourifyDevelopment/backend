import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Authorization } from './decorators/authorization.decorator';
import { Permission } from './decorators/permission.decorator';

import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { GetAllProjectsDto } from './interfaces/project/dto/get-all-projects-response.dto';
import { IServiceProjectGetAllResponse } from './interfaces/project/service-project-get-all-response.interface';
import { CreateProjectDto } from './interfaces/project/dto/create-project.dto';
import { CreateProjectResponseDto } from './interfaces/project/dto/create-project-response.dto';
import { IServiceProjectCreateResponse } from './interfaces/project/service-project-create-response.interface';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(
    @Inject('PROJECT_SERVICE') private readonly projectServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetAllProjectsDto,
    description: 'Get all projects',
  })
  public async getAllProjects(): Promise<GetAllProjectsDto> {

    const projectsResponse: IServiceProjectGetAllResponse = await firstValueFrom(
      this.projectServiceClient.send('project_get_all', null),
    );

    return {
      message: projectsResponse.message,
      data: {
        projects: projectsResponse.projects,
      },
      errors: null,
    };
  }

  @Post()
  @Authorization(true)
  @ApiCreatedResponse({
    type: CreateProjectDto,
    description: 'Create new project',
  })
  public async createProject(
    @Req() request: IAuthorizedRequest,
    @Body() projectRequest: CreateProjectDto,
  ): Promise<CreateProjectResponseDto> {
    const userInfo = request.user;
    const createProjectsResponse: IServiceProjectCreateResponse = await firstValueFrom(
      this.projectServiceClient.send(
        'project_create',
        Object.assign(projectRequest, { owner: userInfo.username }),
      ),
    );

    if (createProjectsResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createProjectsResponse.message,
          data: null,
          errors: createProjectsResponse.errors,
        },
        createProjectsResponse.status,
      );
    }

    return {
      message: createProjectsResponse.message,
      data: {
        project: createProjectsResponse.project,
      },
      errors: null,
    };
  }

  @Delete(':id')
  @Authorization(true)
  @Permission('task_delete_by_id')
  @ApiOkResponse({
    type: DeleteTaskResponseDto,
  })
  public async deleteTask(
    @Req() request: IAuthorizedRequest,
    @Param() params: TaskIdDto,
  ): Promise<DeleteTaskResponseDto> {
    const userInfo = request.user;

    const deleteTaskResponse: IServiceTaskDeleteResponse = await firstValueFrom(
      this.taskServiceClient.send('task_delete_by_id', {
        id: params.id,
        userId: userInfo.id,
      }),
    );

    if (deleteTaskResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteTaskResponse.message,
          errors: deleteTaskResponse.errors,
          data: null,
        },
        deleteTaskResponse.status,
      );
    }

    return {
      message: deleteTaskResponse.message,
      data: null,
      errors: null,
    };
  }

  @Put(':id')
  @Authorization(true)
  @Permission('task_update_by_id')
  @ApiOkResponse({
    type: UpdateTaskResponseDto,
  })
  public async updateTask(
    @Req() request: IAuthorizedRequest,
    @Param() params: TaskIdDto,
    @Body() taskRequest: UpdateTaskDto,
  ): Promise<UpdateTaskResponseDto> {
    const userInfo = request.user;
    const updateTaskResponse: IServiceTaskUpdateByIdResponse = await firstValueFrom(
      this.taskServiceClient.send('task_update_by_id', {
        id: params.id,
        userId: userInfo.id,
        task: taskRequest,
      }),
    );

    if (updateTaskResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateTaskResponse.message,
          errors: updateTaskResponse.errors,
          data: null,
        },
        updateTaskResponse.status,
      );
    }

    return {
      message: updateTaskResponse.message,
      data: {
        task: updateTaskResponse.task,
      },
      errors: null,
    };
  }
}