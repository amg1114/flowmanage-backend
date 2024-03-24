import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Workflow } from './workflow.entity';

@Entity()
export class WorkflowToManagers extends BaseEntity {
  @Column({ default: false, type: 'bool' })
  isCreator: boolean;

  @ManyToOne(() => User, (user) => user.workflowsToManagers)
  public manager: User;

  @ManyToOne(() => Workflow, (workflow) => workflow.workflowsToManagers)
  public workflow: User;
}
