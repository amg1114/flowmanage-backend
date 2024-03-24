import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowToManagers } from './entities/workflow-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow, WorkflowToManagers])],
})
export class WorkflowsModule {}
