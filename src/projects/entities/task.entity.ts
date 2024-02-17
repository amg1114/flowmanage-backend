import { TaskStatus } from "src/common/enums/task-status";
import { Project } from "./project.entity";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('tasks')
export class Task extends BaseEntity {
    @Column()
    title: string;
    
    @Column({ type: 'text', nullable: true})
    description: string;
    
    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING})
    status: TaskStatus;

    @ManyToOne(()=> Project, project => project.tasks, { onDelete: 'CASCADE'})
    project: Project;
}