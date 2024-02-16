import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project';
import { UpdateProjectDto } from './dto/update-project';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {
    }

    @Get()
    async findAll() {
        return this.projectsService.findAll();
    }

    @Get(':slug')
    async findBySlug(@Param('slug') slug: string) {
        return this.projectsService.findBySlug(slug);
    }

    @Post()
    async create(@Body() projectFields: CreateProjectDto) {
        return this.projectsService.create(projectFields);
    }

    @Patch(':slug')
    async update(@Param('slug') slug: string, @Body() projectFields: UpdateProjectDto) {
        return this.projectsService.update(slug, projectFields);
    }

    @Delete(':slug')
    async delete(@Param('slug') slug: string) {
        return this.projectsService.delete(slug);
    }
}
