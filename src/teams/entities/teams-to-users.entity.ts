import { BaseEntity } from 'src/common/base.entity';
import { Role } from 'src/common/enums/user-roles';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Team } from './team.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class TeamsToUsers extends BaseEntity {
  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYEE })
  rol: Role;
  
  @ManyToOne(()=>Team, team=>team.teamsToUsers)
  public team: Team;
  
  @ManyToOne(()=>User, user=>user.teamsToUsers)
  public user: Team;
}
