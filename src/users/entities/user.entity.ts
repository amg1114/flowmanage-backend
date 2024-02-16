import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('users')
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column()
    password: string;
}
