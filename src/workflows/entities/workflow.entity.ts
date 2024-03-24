import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { WorkflowToManagers } from './workflow-manager.entity';
import { Team } from 'src/teams/entities/team.entity';

@Entity('workflows')
export class Workflow extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => WorkflowToManagers,
    (workflowsToManagers) => workflowsToManagers.workflow,
  )
  workflowsToManagers: WorkflowToManagers[];

  @OneToMany(()=>Team, team=>team.workflow)
  teams: Team[];
}
