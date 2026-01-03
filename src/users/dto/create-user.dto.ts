import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";
export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    passwordConfirmation: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole = UserRole.USER;
}
