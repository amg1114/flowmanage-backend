import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';

import { Workflow } from './entities/workflow.entity';
import { WorkflowToManagers } from './entities/workflow-manager.entity';
import { WorkflowsController } from './controllers/workflows.controller';
import { WorkflowsService } from './services/workflows.service';

import { Status } from './entities/status.entity';
import { StatusService } from './services/status.service';
import { StatusController } from './controllers/status.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Workflow, Status, WorkflowToManagers]),
        UsersModule,
    ],
    controllers: [StatusController, WorkflowsController],
    providers: [WorkflowsService, StatusService],
    exports:[WorkflowsService,TypeOrmModule]
})
export class WorkflowsModule {}
