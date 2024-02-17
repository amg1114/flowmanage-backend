import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";

import { BaseEntity } from "../../common/base.entity";

import { User } from "src/users/entities/user.entity";
import { Project } from "src/projects/project.entity";

@Entity('teams')
export class Team extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => User, user => user.teams)
    @JoinTable()
    members: User[];

    @OneToMany(()=> Project, project => project.team)
    projects: Project[];
}
