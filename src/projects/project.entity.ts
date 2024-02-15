import { Entity, Column } from "typeorm";

import { BaseEntity } from "../common/base.entity";

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}