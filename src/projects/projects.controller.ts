import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-roles';
import { ProjectsGuard } from 'src/auth/guards/project.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('projects')
@UseGuards(RolesGuard, ProjectsGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {
    }

    // Project CRUD operations
    @Get()
    @Roles(Role.ADMIN)
    async findAllProjects() {
        return this.projectsService.findAllProjects();
    }

    @Get(':slug')
    async findProjectBySlug(@Param('slug') slug: string) {
        return this.projectsService.findProjectBySlug(slug);
    }

    @Roles(Role.ADMIN)
    @Post()
    async createProject(@Body() projectFields: CreateProjectDto) {
        return this.projectsService.createProject(projectFields);
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Patch(':slug')
    async updateProject(@Param('slug') slug: string, @Body() projectFields: UpdateProjectDto) {
        return this.projectsService.updateProject(slug, projectFields);
    }

    @Roles(Role.ADMIN)
    @Delete(':slug')
    async deleteProject(@Param('slug') slug: string) {
        return this.projectsService.deleteProject(slug);
    }

    // Task CRUD operations
    @Get(':slug/tasks')
    async findProjectTasks(@Param('slug') slug: string) {
        return this.projectsService.findProjectTasks(slug);
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Post(':slug/tasks')
    async createTask(@Param('slug') slug: string, @Body() taskFields: CreateTaskDto) {
        return this.projectsService.createTask(slug, taskFields);
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Patch(':slug/tasks/:taskId')
    async updateTask(@Param('taskId') projectId: number, @Param('taskId') taskId: number, @Body() taskFields: UpdateTaskDto) {
        return this.projectsService.updateTask(projectId, taskId, taskFields);
    }

    @Roles(Role.ADMIN, Role.MANAGER)
    @Delete('tasks/:taskId')
    async deleteTask(@Param('taskId') id: number) {
        return this.projectsService.deleteTask(id);
    }
}
