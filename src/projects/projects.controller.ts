import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {
    }

    @Get()
    async findAllProjects() {
        return this.projectsService.findAllProjects();
    }

    @Get(':slug')
    async findProjectBySlug(@Param('slug') slug: string) {
        return this.projectsService.findProjectBySlug(slug);
    }

    @Post()
    async createProject(@Body() projectFields: CreateProjectDto) {
        return this.projectsService.createProject(projectFields);
    }

    @Patch(':slug')
    async updateProject(@Param('slug') slug: string, @Body() projectFields: UpdateProjectDto) {
        return this.projectsService.updateProject(slug, projectFields);
    }

    @Delete(':slug')
    async deleteProject(@Param('slug') slug: string) {
        return this.projectsService.deleteProject(slug);
    }
}
