import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto'; // Importa tu DTO de producto

export class PaginatedProductResponseDto {
    @ApiProperty({ 
        type: [ProductResponseDto], // <--- Aquí indicas que es un ARRAY de Productos
        description: 'Lista de productos de la página actual'
    })
    data: ProductResponseDto[];

    @ApiProperty({ example: 1, description: 'Total de registros en la base de datos' })
    total: number;

    @ApiProperty({ example: 10, description: 'Límite de registros por página' })
    limit: number;

    @ApiProperty({ example: 0, description: 'Registros saltados (offset)' })
    offset: number;
}