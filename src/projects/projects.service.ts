import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
/**
 * Service responsible for managing projects.
 */
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>
    ) {
    }

    // Porject CRUD operations

    /**
     * Creates a new project.
     * @param project - The project data.
     * @returns A promise that resolves to the created project.
     * @throws HttpException with HttpStatus.CONFLICT if the project already exists.
     */
    async createProject(project: CreateProjectDto): Promise<Project> {
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
    findAllProjects(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    /**
     * Retrieves a project by its id.
     * @param id - The project id.
     * @returns A promise that resolves to the project.
     * @throws HttpException with HttpStatus.NOT_FOUND if the project does not exist.
     */
    async findProjectById(id: number): Promise<Project> {
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
    async findProjectBySlug(slug: string): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { slug }, relations: ['tasks', 'team'] });

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
    async updateProject(slug: string, project: UpdateProjectDto): Promise<UpdateResult> {
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
    async deleteProject(slug: string): Promise<Project> {
        const project = await this.projectsRepository.findOne({ where: { slug } });
        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        await this.projectsRepository.delete({ slug });
        return project;
    }

    // Project tasks operations

    async createTask(slug: string, taskFields: CreateTaskDto): Promise<Task> {
        const project = await this.findProjectBySlug(slug);
        const newTask = this.tasksRepository.create({ ...taskFields, project });

        return this.tasksRepository.save(newTask);
    }

    async findProjectTasks(slug: string): Promise<Task[]> {
        const project = await this.findProjectBySlug(slug);

        return project.tasks;
    }

    async findTaskById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });

        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return task;
    }

    async updateTask(projectId: number, taskId: number, taskFields: UpdateTaskDto): Promise<UpdateResult> {
        const task = await this.tasksRepository.findOne({ where: { id: taskId, project: { id: projectId } } });
        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        return this.tasksRepository.update({ id: taskId }, taskFields);
    }

    async deleteTask(id: number): Promise<DeleteResult> {
        const task = await this.tasksRepository.delete(id);
        if (task.affected === 0) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return task;
    }
}

