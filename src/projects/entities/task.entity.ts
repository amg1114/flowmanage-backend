import { Project } from "./project.entity";
import { BaseEntity } from "src/common/base.entity";
import { Status } from "src/workflows/entities/status.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

@Entity('tasks')
export class Task extends BaseEntity {
    @Column()
    title: string;
    
    @Column({ type: 'text', nullable: true})
    description: string;

    @ManyToOne(()=> Project, project => project.tasks, { onDelete: 'CASCADE'})
    project: Project;

    @ManyToOne(()=>Status, status=>status.tasks)
    status: Status
}