import { RequestStatus } from "src/common/enums/request-status";
import { IsEnum, IsOptional, IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateRequestDto {
    @IsString()
    @IsNotEmpty()
    title: string;
 
    @IsNumber()
    @IsNotEmpty()
    projectId: number;

    @IsOptional()
    @IsString()
    description?: string;
}