import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import slugify from 'slugify';

import { Workflow } from '../entities/workflow.entity';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';
import { UsersService } from 'src/users/users.service';
import { WorkflowToManagers } from '../entities/workflow-manager.entity';
import { UpdateWorkflowDto } from '../dto/update-workflow.dto';

@Injectable()
export class WorkflowsService {
    constructor(
        @InjectRepository(Workflow)
        private readonly workflowsRepository: Repository<Workflow>,

        @InjectRepository(WorkflowToManagers)
        private readonly workflowsToManager: Repository<WorkflowToManagers>,

        private readonly usersService: UsersService,
    ) {}

    /**
     * Finds all manager workflows
     * @param manager The manager's id
     * @param workflow The workflow slug
     * @returns Workflow list
     */
    public async getManagerWorkflows(manager: number) {
        const wManager = await this.usersService.findOne(manager);
        const workflows = await this.workflowsRepository.find({
            where: { workflowsToManagers: { manager: { id: wManager.id } } },
        });

        if (!workflows.length) {
            throw new HttpException('Workflows was not found', HttpStatus.NOT_FOUND);
        }

        return workflows;
    }

    /**
     * Finds a manager workflow based on the given workflow slug
     * @param manager The manager's id
     * @param workflow The workflow slug
     * @returns Workflow
     */
    public async getManagerWorkflow(manager: number, workflow: string) {
        const wManager = await this.usersService.findOne(manager);
        const slug = slugify(workflow, { lower: true });

        const mWorkflow = await this.workflowsRepository.findOne({
            where: { slug, workflowsToManagers: { manager: { id: wManager.id } } },
        });

        if (!mWorkflow) {
            throw new HttpException('Workflow was not found', HttpStatus.NOT_FOUND);
        }

        return mWorkflow;
    }

    /**
     * Finds a workflow based on the given ID
     * @param id The workflow ID
     * @returns Workflow
     */
    public async findById(id: number) {
        const workflow = await this.workflowsRepository.findOne({
            where: { id },
        });

        if (!workflow) {
            throw new HttpException('Workflow was not found', HttpStatus.NOT_FOUND);
        }

        return workflow;
    }

    public async createManagerWorkflow(manager: number, workflowFields: CreateWorkflowDto) {
        const wManager = await this.usersService.findOne(manager);
        const slug = slugify(workflowFields.title, { lower: true });
        const alreadyExists = await this.workflowsRepository.exists({
            where: {
                slug,
                workflowsToManagers: { manager: { id: wManager.id } },
            },
        });        
        
        if (alreadyExists) {
            throw new HttpException('Workflow already exists', HttpStatus.CONFLICT);
        }

        const mWorkflow = await this.workflowsRepository.save({ ...workflowFields, slug });
        await this.workflowsToManager.save({
            isCreator: true,
            manager: wManager,
            workflow: mWorkflow,
        });

        return mWorkflow;
    }

    /**
     * Updates a workflow
     * @param workflow The workflow ID
     * @param updateWorkflow The updated workflow fields
     * @returns The update result
     */
    public async updateWorkflow(workflow: number, updateWorkflow: UpdateWorkflowDto) {
        const updateResult = await this.workflowsRepository.update(workflow, updateWorkflow);
        if (updateResult.affected === 0) {
            throw new HttpException('The workflow could not be updated', HttpStatus.CONFLICT);
        }
        return updateResult;
    }

    /**
     * Deletes a workflow
     * @param workflow The workflow ID
     * @returns The delete result
     */
    public async deleteWorkflow(workflow: number) {
        const deleteResult = await this.workflowsRepository.delete(workflow);
        if (deleteResult.affected === 0) {
            throw new HttpException('The workflow could not be deleted', HttpStatus.CONFLICT);
        }
        return deleteResult;
    }
}
