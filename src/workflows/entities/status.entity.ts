import { BaseEntity } from 'src/common/base.entity';
import { StatusState } from 'src/common/enums/task-status';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Workflow } from './workflow.entity';
import { Task } from 'src/projects/entities/task.entity';

@Entity('statuses')
export class Status extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', enum: StatusState, default: StatusState.UNSTARTED })
    state: StatusState;

    @Column({ type: 'int', default: 0 })
    order: number;

    @ManyToOne(() => Workflow, (workflow) => workflow.statuses)
    workflow: Workflow;

    @OneToMany(() => Task, (task) => task.status)
    tasks: Task[];
}
