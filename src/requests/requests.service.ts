import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as RequestEntity } from './request.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRequestDto } from './dto/create-request';
import { ProjectsService } from 'src/projects/projects.service';
import { UpdateRequestDto } from './dto/update-request';
import { log } from 'console';

@Injectable()
export class RequestsService {
    constructor(@InjectRepository(RequestEntity) private readonly requestsRepository: Repository<RequestEntity>, private readonly projectsService: ProjectsService) { }

    async findAll(projectId: number): Promise<RequestEntity[]> {
        const project = await this.projectsService.findById(projectId);
        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
        console.log('project', project);
        
        return this.requestsRepository.find({
            where: { project: { id: projectId } } 
        });
    }

    async create(request: CreateRequestDto): Promise<RequestEntity> {
        const project = await this.projectsService.findById(request.projectId);
        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
        const newRequest = this.requestsRepository.create({...request, project});
        return this.requestsRepository.save(newRequest);
    }

    async update(id: number, request: UpdateRequestDto): Promise<UpdateResult> {
        const requestExists = await this.projectsService.findById(id);
        if (!requestExists) {
            throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
        }
        return this.requestsRepository.update(id, request);
    }

    async delete(id: number): Promise<DeleteResult> {
        const requestExists = await this.projectsService.findById(id);
        if (!requestExists) {
            throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
        }
        return await this.requestsRepository.delete(id);
    }
}
