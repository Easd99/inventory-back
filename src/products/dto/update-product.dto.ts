import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) { }



export class UpdateStockDto {

    @IsNumber()
    @IsPositive()
    stock: number;

}
