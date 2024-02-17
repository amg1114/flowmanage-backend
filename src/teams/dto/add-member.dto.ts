import { IsInt, IsNotEmpty } from "class-validator";



export class AddMemberDto {
    @IsInt()
    @IsNotEmpty()
    teamId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}