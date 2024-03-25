import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get(':workflow')
    async findAllProjects(@Param('workflow') workflow: string) {
        return this.projectsService.getWorkflowProjects(+workflow);
    }

    @Get(':workflow/:project')
    async findProjectBySlug(@Param('workflow') workflow: string, @Param('project') project: string) {
        return this.projectsService.getProject(+workflow, project);
    }

    @Post(':workflow')
    async createProject(@Param('workflow') workflow: string, @Body() projectFields: CreateProjectDto) {
        return this.projectsService.createProject(+workflow, projectFields);
    }

    @Patch(':id')
    async updateProject(@Param('id') id: string, @Body() projectFields: UpdateProjectDto) {
        return `Update project with ID: ${id}`;
    }

    @Delete(':id')
    async deleteProject(@Param('id') id: string) {
        return `Delete project with ID: ${id}`;
    }
}
