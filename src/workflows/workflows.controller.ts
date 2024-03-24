import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

@Controller('workflows')
export class WorkflowsController {
    constructor(private readonly workflowsService: WorkflowsService) {}

    @Get(':managerId')
    getManagerWorkflows(@Param('managerId') managerId: string) {
        return this.workflowsService.getByManager(+managerId);
    }

    @Post()
    create(@Body() createWorkflowDto: CreateWorkflowDto) {
        return this.workflowsService.create(createWorkflowDto);
    }
}
