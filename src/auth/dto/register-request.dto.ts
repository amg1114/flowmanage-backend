import { IsString, IsNotEmpty } from "class-validator";

export class RegisterRequestDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}