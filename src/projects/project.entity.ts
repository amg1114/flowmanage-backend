import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity } from "../common/base.entity";
import { Request } from "src/requests/request.entity";

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(()=> Request, request => request.project)
  requests: Request[];
}