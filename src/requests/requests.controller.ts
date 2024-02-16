import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request';

@Controller('requests')
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) { }

    @Get(':projectId')
    findAll(@Param('projectId') projectId: number) {
        return this.requestsService.findAll(projectId);
    }

    @Post()
    create(@Body() request: CreateRequestDto) {
        return this.requestsService.create(request);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() request: CreateRequestDto) {
        return this.requestsService.update(id, request);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.requestsService.delete(id);
    }
}
