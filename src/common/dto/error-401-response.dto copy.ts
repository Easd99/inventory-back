import { ApiProperty } from '@nestjs/swagger';

export class Error401ResponseDto {
    @ApiProperty({ example: 401 })
    statusCode: number;

    @ApiProperty({ example: 'Unauthorized' })
    message: string | string[];
}