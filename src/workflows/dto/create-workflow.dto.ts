import { IsInt, IsNotEmpty, IsObject } from 'class-validator';

export class CreateWorkflowDto {
    @IsInt()
    @IsNotEmpty()
    manager_id: number;

    @IsObject()
    @IsNotEmpty()
    workflowFields: {
        title: string;
        description?: string;
    };
}
