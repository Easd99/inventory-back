import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findByEmailWithPassword(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: Omit<User, 'password'>) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async register(input: RegisterDto) {
        return await this.usersService.create(input);
    }

    async profile(userId: number) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    async getAllUsers() {
        return this.usersService.findAll();
    }

    async updateUserRole(id: number, input: UpdateUserDto) {
        return this.usersService.update(id, {
            role: input.role
        });
    }
}
