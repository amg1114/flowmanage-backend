import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';

import { Workflow } from './entities/workflow.entity';
import { WorkflowToManagers } from './entities/workflow-manager.entity';
import { WorkflowsController } from './controllers/workflows.controller';
import { WorkflowsService } from './services/workflows.service';

import { Status } from './entities/status.entity';
import { StatusService } from './services/status.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Workflow, Status, WorkflowToManagers]),
        UsersModule,
    ],
    controllers: [WorkflowsController],
    providers: [WorkflowsService, StatusService],
})
export class WorkflowsModule {}
