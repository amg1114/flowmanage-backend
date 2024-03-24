import {
    IsInt,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    isNumber,
} from 'class-validator';

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
