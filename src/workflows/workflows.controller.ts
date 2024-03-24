import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

@Controller('workflows')
export class WorkflowsController {
    constructor(private readonly workflowsService: WorkflowsService) {}

    @Get(':slug')
    getOne(@Param('slug') slug: string) {
        return this.workflowsService.findBySlug(slug);
    }

    @Get('manager/:managerId')
    getManagerWorkflows(@Param('managerId') managerId: number) {
        return this.workflowsService.findByManager(+managerId);
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
    delete(@Param('slug') slug: string){
        return this.workflowsService.delete(slug)
    }
}
