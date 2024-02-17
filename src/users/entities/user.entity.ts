import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Team } from "src/teams/entities/team.entity";

@Entity('users')
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column()
    password: string;

    @ManyToMany(()=> Team, team => team.members)
    teams: Team[];
}
