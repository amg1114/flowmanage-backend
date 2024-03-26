import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../entities/status.entity';
import { Repository } from 'typeorm';
import { StatusQueryParams } from '../interfaces/status-query-params.interface';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) {}

    async getWorkflowStatuses(workflow: number, queries: StatusQueryParams) {
        const status = await this.statusRepository.find({
            where: {
                workflow: { id: workflow },
                state: queries?.type,
            },
            relations: ['tasks', 'tasks.project', 'tasks.project.team'],
        });

        if (status.length === 0) {
            throw new HttpException('No status founded for the workflow', HttpStatus.NOT_FOUND);
        }

        return status;
    }
}
