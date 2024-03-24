import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowToManagers } from './entities/workflow-manager.entity';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';
import { UsersModule } from 'src/users/users.module';
import { Status } from './entities/status.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Workflow, Status, WorkflowToManagers]),
        UsersModule,
    ],
    controllers: [WorkflowsController],
    providers: [WorkflowsService],
})
export class WorkflowsModule {}
