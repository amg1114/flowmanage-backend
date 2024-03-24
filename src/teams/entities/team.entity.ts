import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '../../common/base.entity';

import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Workflow } from 'src/workflows/entities/workflow.entity';
import { TeamsToUsers } from './teams-to-users.entity';

@Entity('teams')
export class Team extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => TeamsToUsers, (teamToUsers) => teamToUsers.team)
  teamsToUsers: TeamsToUsers[];

  @ManyToOne(() => Workflow, (workflow) => workflow.teams)
  workflow: Workflow;

  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];
}
