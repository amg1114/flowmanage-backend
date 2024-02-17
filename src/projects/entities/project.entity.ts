import { Entity, Column, ManyToOne } from "typeorm";

import { BaseEntity } from "../../common/base.entity";
import { Team } from "src/teams/entities/team.entity";

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(()=> Team, team => team.projects)
  team: Team;
}