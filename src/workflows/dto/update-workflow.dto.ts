import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkflowDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
