// dto/login-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class LoginResponseDto {
    @ApiProperty({ 
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', 
        description: 'JWT Access Token' 
    })
    access_token: string;

    @ApiProperty({ type: UserResponseDto })
    user: UserResponseDto;
}