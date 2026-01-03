import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, UseGuards, Put, Query } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FiltersProductDto } from '../dto/filters-product.dto';
import { Product } from '../entities/product.entity';
import { PaginatedProductResponseDto } from '../dto/paginated-product-response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductResponseDto } from '../dto/product-response.dto';
import { Error400ResponseDto } from 'src/common/dto/error-400-response.dto copy';
import { Error404ResponseDto } from 'src/common/dto/error-404-response.dto';
import { Error401ResponseDto } from 'src/common/dto/error-401-response.dto copy';

@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'created product',
    type: ProductResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Error401ResponseDto
  })
  @ApiBadRequestResponse({
    type: Error400ResponseDto
  })
  create(@Body() input: CreateProductDto) {
    return this.productsService.create(input);
  }

  @Get()
  @ApiOkResponse({
    description: 'get products',
    type: PaginatedProductResponseDto,
  })
  findAll(@Query() filters: FiltersProductDto) {
    return this.productsService.findAll(filters);
  }

  @Get(':id')
  @ApiNotFoundResponse({
    type: Error404ResponseDto
  })
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`product not found`);
    }
    return product;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'updated product',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({
    type: Error400ResponseDto
  })
  @ApiNotFoundResponse({
    type: Error404ResponseDto
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Error401ResponseDto
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    type: Error404ResponseDto
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: Error401ResponseDto
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
