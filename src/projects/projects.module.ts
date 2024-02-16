import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './project.entity';
import { ProjectsService } from "./projects.service";
import { ProjectsController } from './projects.controller';
@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService, TypeOrmModule]
})
export class ProjectsModule {}
