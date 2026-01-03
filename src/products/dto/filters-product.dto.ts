import { IsOptional, IsPositive, Min, IsString, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltersProductDto {

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset: number = 0;
}
