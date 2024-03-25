import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatusService } from '../services/status.service';

@Controller('workflows')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Get(':slug/statuses')
    getWorkflowStatuses(@Param('slug') workflow_slug: string, @Query('limit') limit) {
        return this.statusService.getWorkflowStatuses(workflow_slug, limit)
    }
}
