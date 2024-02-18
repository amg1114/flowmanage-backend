import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Team } from "src/teams/entities/team.entity";
import { Role } from "src/common/enums/user-roles";
import { Exclude } from "class-transformer";

@Entity('users')
export class User extends BaseEntity {
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({type: 'enum', enum: Role, array: true, default: [Role.EMPLOYEE]})
    roles: Role[];

    @ManyToMany(()=> Team, team => team.members, { onDelete: 'CASCADE'})
    teams: Team[];
}
