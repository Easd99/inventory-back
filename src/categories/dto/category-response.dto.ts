import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Categoria 1' })
    name: string;

    @ApiProperty({ example: 'Esta es la categoria 1' })
    description: string;

    @ApiProperty({ example: true })
    active: boolean;

    @ApiProperty({ example: 1, required: false })
    productsCount?: number;

    @ApiProperty({ example: '2026-01-03T17:27:48.927Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-01-03T17:27:48.927Z' })
    updatedAt: Date;

    @ApiProperty({ example: null, nullable: true })
    deletedAt: Date | null;
}