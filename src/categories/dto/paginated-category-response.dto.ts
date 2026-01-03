import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from './category-response.dto'; // Importa tu DTO de producto

export class PaginatedCategoryResponseDto {
    @ApiProperty({
        type: [CategoryResponseDto], // <--- Aquí indicas que es un ARRAY de Productos
        description: 'Lista de productos de la página actual'
    })
    data: CategoryResponseDto[];

    @ApiProperty({ example: 1, description: 'Total de registros en la base de datos' })
    total: number;

    @ApiProperty({ example: 10, description: 'Límite de registros por página' })
    limit: number;

    @ApiProperty({ example: 0, description: 'Registros saltados (offset)' })
    offset: number;
}