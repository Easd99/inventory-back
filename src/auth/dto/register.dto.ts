import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { UserRole } from "src/users/enums/user-role.enum";

export class RegisterDto {

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

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole = UserRole.USER;

}