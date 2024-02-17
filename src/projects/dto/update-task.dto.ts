import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../../common/enums/task-status";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}