import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import slugify from 'slugify';

import { Workflow } from '../entities/workflow.entity';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';
import { UsersService } from 'src/users/users.service';
import { WorkflowToManagers } from '../entities/workflow-manager.entity';

@Injectable()
export class WorkflowsService {
    constructor(
        @InjectRepository(Workflow)
        private readonly workflowsRepository: Repository<Workflow>,

        @InjectRepository(WorkflowToManagers)
        private readonly workflowsToManager: Repository<WorkflowToManagers>,

        private readonly usersService: UsersService,
    ) {}

    async findBySlug(manager_id: number, slug: string) {
        const workflow = await this.workflowsRepository.findOne({
            where: {
                slug,
                workflowsToManagers: {
                    manager: { id: manager_id },
                },
            },
            relations: ['workflowsToManagers'],
        });

        if (!workflow) {
            throw new HttpException('Workflow was not found', HttpStatus.NOT_FOUND);
        }

        return workflow;
    }

    async findByManager(manager_id: number) {
        const workflows = this.workflowsRepository.find({
            where: {
                workflowsToManagers: {
                    manager: {
                        id: manager_id,
                    },
                },
            },
        });

        return workflows;
    }

    async findById(id: number) {
        const workflow = await this.workflowsRepository.findOne({
            where: {
                id,
            },
        });

        if (!workflow) {
            throw new HttpException('Workflow was not found', HttpStatus.NOT_FOUND);
        }

        return workflow;
    }

    async create({ manager_id, workflowFields }: CreateWorkflowDto) {
        const manager = await this.usersService.findOne(manager_id);
        const slug = slugify(workflowFields.title, { lower: true });
        const alreadyExists: boolean = await this.workflowsRepository.exists({
            where: { slug, workflowsToManagers: { manager } },
        });

        if (alreadyExists) {
            throw new HttpException('Workflow already exists', HttpStatus.CONFLICT);
        }

        const workflow = await this.workflowsRepository.save({
            ...workflowFields,
            slug,
        });

        return this.workflowsToManager.save({
            isCreator: true,
            manager,
            workflow,
        });
    }

    async update(slug: string, workflowFields: any) {
        const updateResult = await this.workflowsRepository.update({ slug }, workflowFields);

        if (updateResult.affected === 0) {
            throw new HttpException('Workflow was not found', HttpStatus.NOT_FOUND);
        }

        return updateResult;
    }

    async delete(slug: string) {
        const deleteResult = await this.workflowsRepository.delete({
            slug,
        });

        if (deleteResult.affected === 0) {
            throw new HttpException('Workflow was not found', HttpStatus.NOT_FOUND);
        }

        return deleteResult;
    }
}
