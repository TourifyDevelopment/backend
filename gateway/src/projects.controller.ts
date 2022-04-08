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

import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { GetAllProjectsDto } from './interfaces/project/dto/get-all-projects-response.dto';
import { IServiceProjectGetAllResponse } from './interfaces/project/service-project-get-all-response.interface';
import { CreateProjectDto } from './interfaces/project/dto/create-project.dto';
import { CreateProjectResponseDto } from './interfaces/project/dto/create-project-response.dto';
import { IServiceProjectCreateResponse } from './interfaces/project/service-project-create-response.interface';
import { DeleteProjectByIdResponseDto } from './interfaces/project/dto/delete-project-by-id-response.dto';
import { ProjectIdDto } from './interfaces/project/dto/project-id.dto';
import { IServiceProjectDeleteResponse } from './interfaces/project/service-project-delete-response.interface';

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
    type: CreateProjectResponseDto,
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
  @ApiOkResponse({
    type: DeleteProjectByIdResponseDto,
  })
  public async deleteProject(
    @Req() request: IAuthorizedRequest,
    @Param() params: ProjectIdDto,
  ): Promise<DeleteProjectByIdResponseDto> {

    const deleteProjectResponse: IServiceProjectDeleteResponse = await firstValueFrom(
      this.projectServiceClient.send('project_delete_by_id',
        params.id
      ),
    );

    if (deleteProjectResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteProjectResponse.message,
          errors: deleteProjectResponse.errors,
          data: null,
        },
        deleteProjectResponse.status,
      );
    }

    return {
      message: deleteProjectResponse.message,
      data: null,
      errors: null,
    };
  }

}