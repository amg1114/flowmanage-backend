import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from "class-validator";
import { Role } from "src/common/enums/user-roles";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(Role, { each: true })
    @IsOptional()
    roles?: Role[];

    @IsString()
    @IsNotEmpty()
    password: string;
}
