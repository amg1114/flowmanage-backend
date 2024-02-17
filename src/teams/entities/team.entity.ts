import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "src/users/entities/user.entity";

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
}
