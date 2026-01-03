import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: 1, description: '' })
    id: number;

    @ApiProperty({ example: 'erick@test.com' })
    email: string;

    @ApiProperty({ example: 'Erick Solano' })
    name: string;

    @ApiProperty({ example: '2024-01-01T00:00:00Z', description: '' })
    createdAt: Date;

    @ApiProperty({ example: '2024-01-02T00:00:00Z', description: '' })
    updatedAt: Date;

    @ApiProperty({ example: null, description: '' })
    deletedAt: Date | null;
}