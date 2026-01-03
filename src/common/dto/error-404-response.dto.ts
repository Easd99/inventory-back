import { ApiProperty } from '@nestjs/swagger';

export class Error404ResponseDto {
    @ApiProperty({ example: 404 })
    statusCode: number;

    @ApiProperty({ example: 'Not Found' })
    message: string | string[];

    @ApiProperty({ example: 'Not Found' })
    error: string;
}