import { IsOptional, IsPositive, Min, IsString, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class  FiltersProductDto {

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
