import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { StatusQueryParams } from '../interfaces/status-query-params.interface';

@Controller('workflows/statuses')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Get(':workflow')
    getWorkflowStatuses(@Param('workflow', ParseIntPipe) workflow: number, @Query() queryParams: StatusQueryParams) {
        return this.statusService.getWorkflowStatuses(workflow, queryParams)
    }
}
