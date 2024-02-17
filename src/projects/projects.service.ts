import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
/**
 * Service responsible for managing projects.
 */
export class ProjectsService {
    constructor(@InjectRepository(Project) private readonly projectsRepository: Repository<Project>) {
    }

    /**
     * Creates a new project.
     * @param project - The project data.
     * @returns A promise that resolves to the created project.
     * @throws HttpException with HttpStatus.CONFLICT if the project already exists.
     */
    async create(project: CreateProjectDto): Promise<Project> {
        const slug = slugify(project.title, { lower: true });
        const projectExists = await this.projectsRepository.findOne({ where: { slug } });

        if (projectExists) {
            throw new HttpException('Project already exists', HttpStatus.CONFLICT);
        }

        const newProject = this.projectsRepository.create({ ...project, slug });
        return this.projectsRepository.save(newProject);
    }

    /**
     * Retrieves all projects.
     * @returns A promise that resolves to an array of projects.
     */
    findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    /**
     * Retrieves a project by its id.
     * @param id - The project id.
     * @returns A promise that resolves to the project.
     * @throws HttpException with HttpStatus.NOT_FOUND if the project does not exist.
     */
    async findById(id: number): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { id } });

        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        return project;
    }

    /**
     * Retrieves a project by its slug.
     * @param slug - The project slug.
     * @returns A promise that resolves to the project.
     * @throws HttpException with HttpStatus.NOT_FOUND if the project does not exist.
     */
    async findBySlug(slug: string): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { slug } });

        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        return project;
    }

    /**
     * Updates a project.
     * @param slug - The project slug.
     * @param project - The project data.
     * @returns A promise that resolves to the updated project.
     * @throws HttpException with HttpStatus.NOT_FOUND if the project does not exist.
     */
    async update(slug: string, project: UpdateProjectDto): Promise<UpdateResult> {
        const projectExists = await this.projectsRepository.findOne({ where: { slug } });
        if (!projectExists) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        const updatedProject = await this.projectsRepository.update({ slug }, project);
        return updatedProject;
    }

    /**
     * Deletes a project.
     * @param slug - The project slug.
     * @returns A promise that resolves to the deleted project.
     * @throws HttpException with HttpStatus.NOT_FOUND if the project does not exist.
     */
    async delete(slug: string): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { slug } });
        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        await this.projectsRepository.delete({ slug });
        return project;
    }
}
