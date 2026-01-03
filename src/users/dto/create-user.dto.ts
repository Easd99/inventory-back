import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
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
}
