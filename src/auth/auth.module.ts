import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './v1/auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: (configService.get<string>('JWT_EXPIRATION') || '60m') as any },
            }),
            inject: [ConfigService],
        }),],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
