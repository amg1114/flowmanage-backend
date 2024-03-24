import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Role } from 'src/common/enums/user-roles';
import { Exclude } from 'class-transformer';
import { Workflow } from 'src/workflows/entities/workflow.entity';
import { WorkflowToManagers } from 'src/workflows/entities/workflow-manager.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(
    () => WorkflowToManagers,
    (workflowsToManagers) => workflowsToManagers.manager,
  )
  workflowsToManagers: WorkflowToManagers[];

  @ManyToMany(() => Team, (team) => team.members, { onDelete: 'CASCADE' })
  teams: Team[];
}
