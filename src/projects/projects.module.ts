import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { ProjectsService } from "./projects.service";
import { ProjectsController } from './projects.controller';
import { Task } from './entities/task.entity';
import { WorkflowsModule } from 'src/workflows/workflows.module';
@Module({
    imports: [TypeOrmModule.forFeature([Project, Task]), WorkflowsModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService, TypeOrmModule]
})
export class ProjectsModule {}
