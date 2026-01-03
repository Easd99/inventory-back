import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateUserRoleDto {

    @IsEnum(UserRole)
    role: UserRole;
}
