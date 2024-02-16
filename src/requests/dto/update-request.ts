import { RequestStatus } from "src/common/enums/request-status";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateRequestDto {
    @IsOptional()
    @IsString()
    title?: string;
 
    @IsOptional()
    @IsString()
    description?: string;
 
    @IsOptional()
    @IsEnum(RequestStatus)
    status?: RequestStatus;
}