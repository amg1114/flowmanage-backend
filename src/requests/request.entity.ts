import { BaseEntity } from "src/common/base.entity";
import { RequestStatus } from "src/common/enums/request-status";
import { Project } from "src/projects/project.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('requests')
export class Request extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
    status: RequestStatus;
    
    @ManyToOne(() => Project, project => project.requests)
    project: Project;
}