import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsEnum, IsEmail } from "class-validator";
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/common/enums/user-roles';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    firstName: string;
    
    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;


    @IsEnum(Role)
    @IsOptional()
    roles?: Role[];
    
    @IsString()
    @IsOptional()
    password?: string;
}
