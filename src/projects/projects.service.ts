import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import slugify from 'slugify';

import { WorkflowsService } from 'src/workflows/services/workflows.service';

import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
/**
 * Service responsible for managing projects.
 */
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        private readonly workflowsService: WorkflowsService,
    ) {}

    /**
     * Finds a list of project based on the given workflow id.
     * @param workflow The workflow's id
     */
    public async getWorkflowProjects(workflow: number): Promise<Project[]> {
        const projects = await this.projectsRepository.find({
            where: {
                workflow: { id: workflow },
            },
        });

        if (!projects.length) {
            throw new HttpException('No projects founded for the given workflow', HttpStatus.NOT_FOUND);
        }

        return projects;
    }

    /**
     * Finds a project based on the given workflow and the project slug
     * @param workflow The workflow's id
     * @param slug The project slug
     * @returns Project
     */
    public async getProject(workflow: number, slug: string): Promise<Project> {
        const project = await this.projectsRepository.findOne({
            where: {
                workflow: { id: workflow },
                slug,
            },
        });

        if (!project) {
            throw new HttpException('The given project was not found', HttpStatus.NOT_FOUND);
        }

        return project;
    }

    /**
     * Creates a new project
     * @param workflow The workflow's ID
     * @param projectFields The project Field
     * @returns The new project
     */
    public async createProject(workflow: number, projectFields: CreateProjectDto) {
        const project_slug = slugify(projectFields.title, { lower: true });
        const project_workflow = await this.workflowsService.findById(workflow);
        const alreadyExists = await this.projectsRepository.exists({ where: { slug: project_slug, workflow:{ id: project_workflow.id } } });

        if (alreadyExists) {
            throw new HttpException('Project already exists', HttpStatus.CONFLICT);
        }

        return this.projectsRepository.save({ ...projectFields, slug: project_slug, workflow: project_workflow });
    }

    /**
     * Updates a project
     * @param id The project ID
     * @param projectFields The updated project fields
     * @returns Update Result
     */
    public async updateProject(id: number, projectFields: UpdateProjectDto) {
        const updateResult = await this.projectsRepository.update(id, projectFields);
        if (updateResult.affected === 0) {
            throw new HttpException('The project could not be updated', HttpStatus.CONFLICT);
        }

        return updateResult;
    }

    /**
     * Deletes a project
     * @param id The project ID
     * @returns Delete Result
     */
    public async deleteProject(id: number) {
        const deleteResult = await this.projectsRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new HttpException('The project could not be deleted', HttpStatus.CONFLICT);
        }

        return deleteResult;
    }
}
