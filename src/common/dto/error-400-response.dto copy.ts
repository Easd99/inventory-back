import { ApiProperty } from '@nestjs/swagger';

export class Error400ResponseDto {
    @ApiProperty({ example: 400 })
    statusCode: number;

    @ApiProperty({ example: 'Bad Request' })
    message: string | string[];

}