import { IsNumber, IsPositive, IsString,  } from "class-validator";

export class CreateProductDto {


    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    stock: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    categoryId: number;

}

