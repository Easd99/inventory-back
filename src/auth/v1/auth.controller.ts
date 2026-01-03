import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiBodyOptions, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user-response.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiOkResponse({
        description: 'login successful',
        type: LoginResponseDto,
    })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOkResponse({
        description: 'created user',
        type: UserResponseDto,
    })
    async register(@Body() input: RegisterDto) {
        return this.authService.register(input);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'profile info',
        type: UserResponseDto,
    })
    async getProfile(
        @Request() req
    ) {
        return this.authService.profile(req.user.id);
    }

}
