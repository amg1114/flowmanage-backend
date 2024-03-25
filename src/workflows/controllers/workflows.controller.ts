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

    @Get('manager/:managerId')
    getManagerWorkflows(@Param('managerId') managerId: number) {
        return this.workflowsService.findByManager(+managerId);
    }

    @Get('manager/:managerId/:slug')
    getOne(@Param('managerId') manager_id: string, @Param('slug') slug: string) {
        return this.workflowsService.findBySlug(+manager_id, slug);
    }

    @Get(':slug/statuses')
    getWorkflowStatuses(@Param('slug') workflow_slug: string, @Query('limit') limit) {
        return this.statusService.getWorkflowStatuses(workflow_slug, limit);
    }

    @Post()
    create(@Body() createWorkflowDto: CreateWorkflowDto) {
        return this.workflowsService.create(createWorkflowDto);
    }

    @Patch(':slug')
    update(@Param('slug') slug: string, @Body() workflowFields: any) {
        return this.workflowsService.update(slug, workflowFields);
    }

    @Delete(':slug')
    delete(@Param('slug') slug: string) {
        return this.workflowsService.delete(slug);
    }
}
