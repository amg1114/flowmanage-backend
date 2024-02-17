import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "../../common/base.entity";
import { Team } from "src/teams/entities/team.entity";
import { Task } from "./task.entity";

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(()=> Task, task => task.project)
  tasks: Task[];

  @ManyToOne(()=> Team, team => team.projects)
  team: Team;
}