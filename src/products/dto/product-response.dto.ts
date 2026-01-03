import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

export class ProductResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Producto 2' })
    name: string;

    @ApiProperty({ example: 'Esta es el producto 2' })
    description: string;

    @ApiProperty({ example: '5000.00', description: 'Precio en formato decimal string' })
    price: string;

    @ApiProperty({ example: 15 })
    stock: number;

    @ApiProperty({ example: '2026-01-03T17:29:35.493Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-01-03T17:29:35.493Z' })
    updatedAt: Date;

    @ApiProperty({ example: null, nullable: true })
    deletedAt: Date | null;

    @ApiProperty({ type: CategoryResponseDto })
    category: CategoryResponseDto;
}