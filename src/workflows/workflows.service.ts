import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import slugify from 'slugify';

import { Workflow } from './entities/workflow.entity';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UsersService } from 'src/users/users.service';
import { WorkflowToManagers } from './entities/workflow-manager.entity';

@Injectable()
export class WorkflowsService {
    constructor(
        @InjectRepository(Workflow)
        private readonly workflowsRepository: Repository<Workflow>,

        @InjectRepository(WorkflowToManagers)
        private readonly workflowsToManager: Repository<WorkflowToManagers>,

        private readonly usersService: UsersService,
    ) {}

    async create({ manager_id, workflowFields }: CreateWorkflowDto) {
        const manager = await this.usersService.findOne(manager_id);
        const slug = slugify(workflowFields.title);
        const alreadyExists: boolean = await this.workflowsRepository.exists({
            where: { slug },
        });

        if (alreadyExists) {
            throw new HttpException(
                'Workflow already exists',
                HttpStatus.CONFLICT,
            );
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

    async getByManager(manager_id: number) {
        const workflows = this.workflowsRepository.findAndCount({
            where: {
                workflowsToManagers: {
                    manager: {
                        id: manager_id,
                    },
                },
            },
            relations: ['workflowsToManagers'],
        });

        return workflows;
    }
}
