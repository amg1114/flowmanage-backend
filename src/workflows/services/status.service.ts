import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) {}

    async getWorkflowStatuses(workflow_slug: string, limit: number | undefined) {
        const status = await this.statusRepository.find({
            where: {
                workflow: { slug: workflow_slug },
            },
            relations: ['tasks'],
            take: limit,
        });

        if (status.length === 0) {
            throw new HttpException('No status founded for the workflow', HttpStatus.NOT_FOUND);
        }

        return status;
    }
}
