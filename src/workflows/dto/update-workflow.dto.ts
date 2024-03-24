import { IsOptional, IsString } from 'class-validator';

export class CreateWorkflowDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
