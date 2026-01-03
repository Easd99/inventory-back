import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    name: string;

    @IsString()
    description?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean = true;

}
