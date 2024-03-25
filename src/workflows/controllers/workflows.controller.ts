import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { WorkflowsService } from '../services/workflows.service';
import { CreateWorkflowDto } from '../dto/create-workflow.dto';

import { StatusService } from '../services/status.service';

@Controller('workflows')
export class WorkflowsController {
    constructor(
        private readonly workflowsService: WorkflowsService,
        private readonly statusService: StatusService,
    ) {}

    @Get(':manager')
    getManagerWorkflows(@Param('manager') manager: number) {
        return this.workflowsService.getManagerWorkflows(+manager);
    }

    @Get(':manager/:workflow')
    getOne(@Param('manager') manager: number, @Param('workflow') workflow: string) {
        return this.workflowsService.getManagerWorkflow(+manager, workflow);
    }

    @Post(':manager')
    create(@Param('manager') manager: number, @Body() createWorkflowDto: CreateWorkflowDto) {
        return this.workflowsService.createManagerWorkflow(+manager, createWorkflowDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() workflowFields: any) {
        return this.workflowsService.updateWorkflow(+id, workflowFields);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.workflowsService.deleteWorkflow(+id);
    }
}
