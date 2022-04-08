import {
    Controller,
    HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { MessagePattern } from '@nestjs/microservices';
import { IProject } from './interfaces/project.interface';
import { IProjectCreateResponse } from './interfaces/project-create-response.interface';
import { IProjectGetAllResponse } from './interfaces/project-get-all-response.interface';
import { IProjectDeleteResponse } from './interfaces/project-delete-response.interface';

@Controller()
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @MessagePattern('project_get_all')
    async projectGetAll(): Promise<IProjectGetAllResponse> {
        let result: IProjectGetAllResponse;

        try {
            const projects = await this.projectService.findAll();
            result = {
                status: HttpStatus.CREATED,
                message: 'project_get_all_success',
                projects,
            };
        } catch (e) {
            result = {
                status: HttpStatus.PRECONDITION_FAILED,
                message: 'project_get_all_precondition_failed',
                projects: null,
            };
        }

        return result;
    }

    @MessagePattern('project_create')
    async projectCreate(projectBody: IProject): Promise<IProjectCreateResponse> {

        let result: IProjectCreateResponse;

        if (projectBody) {
            try {
                const project = await this.projectService.createProject(projectBody);
                result = {
                    status: HttpStatus.CREATED,
                    message: 'project_create_success',
                    project,
                    errors: null,
                };
            } catch (e) {
                result = {
                    status: HttpStatus.PRECONDITION_FAILED,
                    message: 'project_create_precondition_failed',
                    project: null,
                    errors: e.errors,
                };
            }
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: 'project_create_bad_request',
                project: null,
                errors: null,
            };
        }

        return result;
    }

    @MessagePattern('project_delete_by_id')
    async projectDelete(id: string) {
        let result: IProjectDeleteResponse;

        if (id) {
            try {
                let response = await this.projectService.deleteProject(id);
                if (response instanceof Error) {
                    result = {
                        status: HttpStatus.BAD_REQUEST,
                        message: 'project_delete_by_id_bad_request',
                        errors: {
                            db: {
                                message: response.message,
                            },
                        },
                    };
                }else {
                    result = {
                        status: HttpStatus.OK,
                        message: 'project_delete_by_id_success',
                        errors: null,
                    };
                }
            } catch (e) {
                result = {
                    status: HttpStatus.FORBIDDEN,
                    message: 'project_delete_by_id_forbidden',
                    errors: e.errors,
                };
            }

        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: 'project_delete_by_id_bad_request',
                errors: null,
            };
        }
        return result;
    }
}
